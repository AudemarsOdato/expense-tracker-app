# Documentation

## Cash Tracker app
Helps you track your expenses and your current cash that you have.

## Version 2
### Changes:
- Changed purpose into cash and expense tracker
- Replaced add buttons for income and expense with add and undo transaction

### Algorithm
1. Input
    1. input amount and category
2. determine if category is income or expense
    1. if income 
        1. then update the available balance by adding the amount and saving it to the local storage
    2. if expense
        1. then update the current balance by subtracting the amount and saving it to the local storage
3. add the transaction to the transaction log
4. save the list of transaction log to the local storage
5. clear the amount value and reset the category