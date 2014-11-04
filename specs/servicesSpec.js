describe("Services", function(){
    
    beforeEach(module("main"));
    
   
    describe("value from service", function(){
        
        var _testingService;
        
        beforeEach(
            inject(
                function(_teststing_){
                    _testingService = _teststing_;
                }
            )
        );
        
        
        
        //Testing a value service
    
        it("Should return \"Hello!\" from value in service", function(){
            expect(_testingService).toBe("Hello!");
        });
    
        
    });
    
    describe("ASYNC service test", function(){
        
        var _userGen, _firebase, httpBackend, result;
        
         //Testing a service that returns an XHR response
         beforeEach(
            inject(
                function(_userGen_, _firebase_, $httpBackend){
                    _userGen = _userGen_;
                    _firebase = _firebase_;
                    httpBackend = $httpBackend;
                }
            )
        );
        
        afterEach(function(){
            if(typeof localStorage === 'object'){
                console.dir(localStorage);
                localStorage.clear();
            } else {
                throw "LocalStorage is not available or your browser is out of date."
            }
       
       
        });
    
    
        it("Should return 2 users from the getUsers method", function(){
            
            httpBackend.when('GET', 'http://api.randomuser.me/0.3.1/?results=15&seed=mean').respond(
                {
                    results : 
                    [
                        {
                            seed: 'mean',
                            user : {
                                gender : 'male',
                                email : 'xray@gmail.com'
                            }
                        },
                        {
                            seed: 'mean',
                            user : {
                                gender : 'female',
                                email : 'test@gmail.com'
                            }
                        }
                    ]
                }
            );
            
            _userGen.getUsers(function(_result){
                expect(_result.results.length).toEqual(2);
            });
            
            httpBackend.flush();
        });
        
        it("Should return an empty object when calling store before you add anything", function(){
           expect(_firebase.get()).toEqual({}); 
        });
        
        it("Should retrun one object that is a child of store after an item is added", function(){
           var store, counter = 0;
           
           _firebase.add({subchild: 'hello'});
           
           store = _firebase.get();
           
           for(prop in store){
               counter++;
           }
           
           expect(counter).toEqual(1);
          
        });
        
        it("should retrun an updated value for subchild when subchild has already been set then changed", function(){
            var store;
            
            _firebase.add({subchild: 'test'});
            _firebase.add({tach: 'test'});
            
            var predicate = function(){
               var _obj = arguments[0];
               for(prop in _obj){
                   if(this._store.hasOwnProperty(prop)){
                       _obj[prop] = "Changed";
                       this.add(_obj);
                   }
               } 
           };
           
           _firebase.add({subchild: 'test'}, predicate);
           
           store = _firebase.get();
           
           expect(store.subchild).toEqual('Changed');
           
        });
        
        it("Should delete one object from the store", function(){
           
           var  store,
                subchild = {subchild: 'test'},
                counter = 0;
           
           _firebase.add(subchild);
           _firebase.add({tach: 'test'});
            
            store = _firebase.get();
           
           for(prop in store){
               counter++;
           }
           
           expect(counter).toEqual(2);
          
           counter = 0;
            
           _firebase.delete(subchild);
           store = _firebase.get();
           
           for(prop in store){
               counter++;
           }
           
           expect(counter).toEqual(1);
            
        });
        
        it("Should be able to read a value from the store", function(){
           
           _firebase.add({subchild: 'test'}); //setup the data;
           
           var value = _firebase.read('subchild');
           expect(value).toBe('test');
            
        });
        
        it("Should be able to save your store", function(){
            
            _firebase.add({subchild: 'testing'}); //setup data
            
            var val = _firebase.save(); //returns true or false. 
            
            expect(val).toBe(true);
            
        });
        
        it("Should be the same : deepGet and LocalStorage 'store' ", function(){
            
               var _store = {name: 'wes'}, deepGet;
               
               //clear store from localStorage if it is there
               if(typeof localStorage === 'object'){
                   localStorage.removeItem('store'); //will return undefined if store is not loaded
                   
                   //load up firestore
                    _firebase.add({name: 'wes'}); //setup data
                    var save = _firebase.save();
                    
                    if(save){
                        deepGet = _firebase.deepGet();
                        expect(deepGet).toEqual(_store);
                    } else {
                        expect(true).toBe(false); //fail test
                    }
                   
               } else {
                   expect(true).toBe(false); //fail test
                   throw "localStorage not supported";
               }
        });
        
        it("Should set this.store to localStorage.getItem('store') ", function(){
            
               var _store, obj = {name: 'wes'};
               
               //clear store from localStorage if it is there
               if(typeof localStorage === 'object'){
                    localStorage.clear(); //will clearout localStorage;
                   
                    localStorage.setItem('store', JSON.stringify(obj)); //set data in localStorage
                    
                    _firebase.initialize(); //takes localStorage getItem and assigns its value to the this.store;
                    _store = _firebase.get();
                    
                    expect(_store).toEqual(JSON.parse(localStorage.getItem('store')));
                   
               } else {
                   expect(true).toBe(false); //fail test
                   throw "localStorage not supported";
               }
        });
        
    });
    
    describe("Restful services Testing", function(){
       
        
    });
    
   
});