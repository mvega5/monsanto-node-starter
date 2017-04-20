'use strict';

class ExampleRepository{

  constructor(){
  }

  getExamples(){
   return new Promise( (resolve, reject) =>{

     let items = [{
       id: 1,
       name: 'movies'
     }
     //, { id: 2, name: 'shows'}
    ];

     resolve(items);
    });
  }
}

module.exports =  ExampleRepository;
