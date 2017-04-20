'use strict';

const IocMock = require('./ioc.mock');

exports.iocMock = (sandbox)=>{
    return IocMock(sandbox);
}