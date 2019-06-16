const express = require('express')
const server = express()
const ejs = require('ejs')
const ip = require('ip')
const path = require('path')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const serverConfig = require('./config')


/***************************************/
/*      Configuração do servidor       */
/***************************************/

server.use(express.static(path.join(__dirname, './public')))
server.set('views', path.join(__dirname, './public'))
server.engine('ejs', ejs.renderFile)
server.set('view engine', 'ejs')
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.listen(serverConfig.port, (req, res) => {
    console.log('Server started... ' + serverConfig.protocol + "://" + serverConfig.ip + ":" + serverConfig.port);
})


/***************************************/
/*                API                  */
/***************************************/


//Configurações para conexao com o banco de dados
const connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : '',
  database : 'itask'
});

connection.connect(function(err){
  if(err) return console.log(err);
  console.log('Connected with database!');
})

server.get('/data', (req, res) => {
    connection.query("SELECT * FROM tasks", function(error, results, fields){
        if(error) {
            console.log(error);
            res.json({ error: 'Erro ao fazer a requisição!' });
        } else
          res.json(results);
    });
});

/***************************************/
/*               Rotas                 */
/***************************************/

const router = require('./routes.js')
server.use('/', router)
