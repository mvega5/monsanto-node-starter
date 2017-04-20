'use strict';

const IocMock = require('./ioc.mock');
const LoggerMock = require('./logger.mock');

exports.iocMock = (sandbox)=>{
    return IocMock(sandbox);
};

exports.loggerMock = (sandbox)=>{
    return LoggerMock(sandbox);
};