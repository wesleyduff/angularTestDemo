app

.value('teststing', "Hello!")

.factory('userGen', function($http){
    return {
        getUsers : function(callback){
           $http.get('http://api.randomuser.me/0.3.1/?results=15&seed=mean').success(callback);
        }
    }
})
.factory('firebase', function(){
    return {
        store : {},
        get : function(){
            return this.store;
        },
        add: function(obj, fn){
            
            this._store = this.get();
            if(typeof fn === 'function'){
                fn.apply(this, arguments);
            }
            
            for(prop in obj){
                this.store[prop] = obj[prop];
            }
            
            return this;
        },
        delete: function(obj, fn){
            this._store = this.get();
            if(typeof fn === 'function'){
                fn.apply(this, arguments[0]);
            }
            
            for(prop in obj){
                if(this._store.hasOwnProperty(prop)){
                    delete this.store[prop];
                }
            }
        },
        read: function(str, fn){
            if(typeof fn === 'function'){
                fn.apply(this, arguments[0]);
            }
            if(typeof str !== 'string'){
                throw "Type Execption: Not a String";
            }
            if(this.store.hasOwnProperty(str))
                return this.store[str];
            else
                return "not found";
        },
        save: function(){
            if(typeof window.localStorage === 'object'){
                localStorage.removeItem('store');
                var lenBefore = localStorage.length, lenAfter;
                
                localStorage.setItem('store', JSON.stringify(this.store));
                
                lenAfter = localStorage.length;
                
                if(lenBefore !== lenAfter){
                    return true;
                } else {
                    false;
                }
            } else {
                throw "Browser Not Supported";
                return false;
            }
        },
        deepGet : function(){
          if(typeof localStorage === 'object'){
              return localStorage.getItem('store') !== null ? JSON.parse(localStorage.getItem('store')) : null;
          }  
        },
        initialize: function(){
            var _store = this.deepGet();
            
            if(_store !== null){
                delete this.store;
                this.store = _store;
            }
        }
    }
});