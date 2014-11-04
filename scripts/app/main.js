var app = angular.module("main", ['sub']);

function Expense(expenseItem) { 
    this.expenseItem = expenseItem;
}

function ExpenseItem(expenseAmout){
    this.amount = expenseAmout;
}