app

.value('teststing', "Hello!")

.factory('userGen', function($http){
    return {
        getUsers : function(callback){
           $http.get('http://api.randomuser.me/0.3.1/?results=15&seed=mean').success(callback);
        }
    }
});