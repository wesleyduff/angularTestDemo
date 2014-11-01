var app = angular.module("main", []);

function Expense(expenseItem) { 
    this.expenseItem = expenseItem;
}

function ExpenseItem(expenseAmout){
    this.amount = expenseAmout;
}