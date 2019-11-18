'use strict'

var mysql = require('mysql');

module.exports = {
    name: 'restify_project',
    hostname : 'http://localhost',
    version: '0.0.1',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    db: {
      get : mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '123456',
        database : 'test'
		  })
    }
}