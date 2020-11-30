cube(`Accounts`, {
  sql: `SELECT * FROM accounts.accounts`,
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [name, registerDate]
    }
  },
  
  dimensions: {
    accounttype: {
      sql: `${CUBE}.\`accountType\``,
      type: `string`
    },
    
    name: {
      sql: `name`,
      type: `string`
    },
    
    registerDate: {
      sql: `register_date`,
      type: `time`
    }
  }
});
