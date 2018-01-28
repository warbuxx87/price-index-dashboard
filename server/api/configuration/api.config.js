let express = require('express');
let bodyParser = require('body-parser');
let ExchangeController = require('../exchange/controller/exchange.controller');
class ApiConfig{
    constructor(){
        this.app = express();
        this.port = 3000;
    }
    
    setApi(){
        
        this.app.use(express.static('./public/'));
        this.app.use(express.static('./'));
        this.app.use('/', express.static('./public/index.html'));
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use('/api/exchange', ExchangeController);
    }

    runApi(){
        this.app.listen(this.port, () => console.log(`runing on port ${this.port}`));
    }

}

module.exports = new ApiConfig();