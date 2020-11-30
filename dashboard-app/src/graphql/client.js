/* globals window */
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { SchemaLink } from "apollo-link-schema";
import { makeExecutableSchema } from "graphql-tools";
import axios from 'axios';

const cache = new InMemoryCache();
const defaultDashboardItems = [];

const getDashboardItems = async() =>{

  // console.log('parse',JSON.parse(window.localStorage.getItem("dashboardItems")))

  // return JSON.parse(window.localStorage.getItem("dashboardItems")) ||
  // defaultDashboardItems;


  let res=await axios.get('/api/dashboardItems')
       console.log('stringify',res.data)
  return res.data || defaultDashboardItems;
//  return await axios.get('/api/dashboardItems')
//   .then(res=>  {
//     console.log('stringify',res.data)
//     return res.data
//   }
//   )
//   .catch(err=> console.log('err',err))


}



  


const setDashboardItems = items =>
{

  
 // window.localStorage.setItem("dashboardItems", JSON.stringify(items))
 items.map(item=>{

  axios.post('/api/dashboardItems',item)
  .then(res=>  {
    console.log('xsxs', res.data)
    return res.data
  }
  )
  .catch(err=> console.log('err',err))

 })
 
};



const nextId = () => {
  const currentId =
    parseInt(window.localStorage.getItem("dashboardIdCounter"), 10) || 1;
  window.localStorage.setItem("dashboardIdCounter", currentId + 1);
  return currentId.toString();
};

const toApolloItem = i => ({ ...i, __typename: "DashboardItem" });

const typeDefs = `
  type DashboardItem {
    id: String!
    layout: String
    vizState: String
    name: String
  }

  input DashboardItemInput {
    layout: String
    vizState: String
    name: String
  }

  type Query {
    dashboardItems: [DashboardItem]
    dashboardItem(id: String!): DashboardItem
  }

  type Mutation {
    createDashboardItem(input: DashboardItemInput): DashboardItem
    updateDashboardItem(id: String!, input: DashboardItemInput): DashboardItem
    deleteDashboardItem(id: String!): DashboardItem
  }
`;
const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: {
      dashboardItems() {
        const dashboardItems = getDashboardItems()
        return dashboardItems.then(data=>data.map(toApolloItem));
      },

      dashboardItem(_, { id }) {
        const dashboardItems = getDashboardItems();
        return toApolloItem(dashboardItems.find(i => i.id.toString() === id));
      }
    },
    Mutation: {
      createDashboardItem: (_, { input: { ...item } }) => {
        const dashboardItems = getDashboardItems();
        item = { ...item, id: nextId(), layout: JSON.stringify({}) };
        dashboardItems.push(item);
        setDashboardItems(dashboardItems);
        return toApolloItem(item);
      },
      updateDashboardItem: (_, { id, input: { ...item } }) => {
        const dashboardItems = getDashboardItems();
        item = Object.keys(item)
          .filter(k => !!item[k])
          .map(k => ({
            [k]: item[k]
          }))
          .reduce((a, b) => ({ ...a, ...b }), {});
        const index = dashboardItems.findIndex(i => i.id.toString() === id);
        dashboardItems[index] = { ...dashboardItems[index], ...item };
        setDashboardItems(dashboardItems);
        return toApolloItem(dashboardItems[index]);
      },
      deleteDashboardItem: (_, { id }) => {
        const dashboardItems = getDashboardItems();
        const index = dashboardItems.findIndex(i => i.id.toString() === id);
        const [removedItem] = dashboardItems.splice(index, 1);
        setDashboardItems(dashboardItems);
        return toApolloItem(removedItem);
      }
    }
  }
});
export default new ApolloClient({
  cache,
  link: new SchemaLink({
    schema
  })
});
