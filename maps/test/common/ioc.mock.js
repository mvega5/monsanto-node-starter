'use strict';

const ioc = require('../../ioc');

class Contract{
    
    register(tags, service){ }
    
    resolve(service){
        throw new Error("you should do scopeMock.expects('resolve').returns(serviceMock.object)");
    }
}

module.exports = (sandbox)=>{
    
    let scope = new Contract();

    let containerMock = sandbox.mock(ioc.rootContainer);
    
    containerMock.expects('createChild').returns(scope);

    return sandbox.mock(scope);
}

