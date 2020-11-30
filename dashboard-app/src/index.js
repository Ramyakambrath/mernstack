import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { HashRouter as Router, Route } from "react-router-dom";
import ExplorePage from "./pages/ExplorePage";
import DashboardPage from "./pages/DashboardPage";

import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavbar from './components/AppNavbar';
import CombineModalShoppingList from './components/CombineModalShoppingList'
import './App.css'
import { Provider} from 'react-redux'
import store from './store'
import ItemModal from './components/ItemModal'
import {Container} from 'reactstrap'
import  {loadUser} from './actions/authActions'

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <App>
               
   
            <Provider store={store}>
               <Route key="shoppingList" exact path="/" component={CombineModalShoppingList} />
               <Route key="index" exact path="/dashboard" component={DashboardPage} />
               <Route key="explore" path="/explore" component={ExplorePage} />

                {/* <AppNavbar /> */}
                {/* <Container> */}
                
                    {/* <ItemModal /> */}
                    {/* <ShoppingList /> */}
                {/* </Container> */}


            </Provider>

      </App>
   </Router>
    </React.StrictMode>,
    document.getElementById("root")
); // If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister();
