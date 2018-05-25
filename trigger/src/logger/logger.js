'use strict'
const winston = require('winston');

exports.logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console({
            json: true
        })
    ]
});