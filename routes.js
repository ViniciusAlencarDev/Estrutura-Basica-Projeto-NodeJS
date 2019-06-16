module.exports = (function() {
    'use strict';
    const router = require('express').Router();
    const serverConfig = require('./config')

    router.get('/', function (req, res) {
        res.render('index', { ip: "http://"+serverConfig.ip+":"+serverConfig.port })
    });

    router.get('/sobre', function (req, res) {
        res.render('pages/about', {})
    });

    router.get('*', function (req, res) {
        res.send('Página Não Encontrada')
    });

    return router;
})()