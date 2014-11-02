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
        
        var _userGen, httpBackend, result;
        
         //Testing a service that returns an XHR response
         beforeEach(
            inject(
                function(_userGen_, $httpBackend){
                    _userGen = _userGen_;
                    httpBackend = $httpBackend;
                }
            )
        );
    
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
                console.dir(_result);
                expect(_result.results.length).toEqual(2);
            });
            
            httpBackend.flush();
        });
        
    });
    
   
});