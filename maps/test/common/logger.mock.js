'use strict';

class Contract{
    
    info(message){ }
}

module.exports = (sandbox)=>{
    
    let log = new Contract();

    return sandbox.mock(log);
}

