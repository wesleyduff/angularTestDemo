describe("Expenses Controller", function(){
    
    var $scope;
    
    beforeEach(module("main"));
    
    beforeEach(inject(function($rootScope, $controller) {
        $scope = $rootScope.$new();
        $controller('MainController', {$scope: $scope});
    }));
    
    it('should have three epense items', function() {
        expect($scope.expenses.length).toBe(2);
    });
    
    
});