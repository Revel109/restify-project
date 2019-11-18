const config  = require('./config'),
restify = require('restify'),
mysql      = require('mysql')
const swaggerUi = require('swagger-ui-restify');
const swaggerDocument = require('./api.json');
var connection = config.db.get;

const server = restify.createServer({
  name    : config.name,
  version : config.version,
  url : config.hostname
});
server.listen(4001, function () {
console.log('%s listening at %s', server.name, server.url);
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());


server.get(/\/api-docs\/+.*/, ...swaggerUi.serve)
server.get('/api-docs', swaggerUi.setup(swaggerDocument));


server.get('/customers', function (req, res) {
  connection.query('select * from customer', function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

//rest api to get a single customer data
server.get('/customer/:id', function (req, res) {
   connection.query('select * from customer where id=?', [req.params.id], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});


//rest api to create a new record into mysql database
server.post('/customer', function (req, res) {
  var postData  = req.body;
  connection.query('INSERT INTO customer SET ?', postData, function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});


//rest api to update record into mysql database
server.put('/customers', function (req, res) {
  connection.query('UPDATE `customer` SET `Name`=?,`Address`=?,`Country`=?,`Phone`=? where `Id`=?', [req.body.Name,req.body.Address, req.body.Country, req.body.Phone, req.body.Id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

//rest api to delete record from mysql database
server.del('/customer/:id', function (req, res) {
  connection.query('DELETE FROM `customer` WHERE `id`=?', [req.params.id], function (error, results, fields) {
   if (error) throw error;
   res.end('Record has been deleted!');
 });
});