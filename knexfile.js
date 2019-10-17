// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
   
    connection:{
      host:'127.0.0.1',
  
     user:"postgres",
     password:"junior4210@",
     database: "postgres",
     charset:'utf8'

    },
    pool:{
      min:2,
      max:10
    },
  
      migrations: {
        directory: './database/migrations'
      },
      seeds: {
        directory: './database/seeds',
  },
  useNullAsDefault:true,
},
}

