const addIncomeButton  = document.getElementById("income-button");
const addExpenseButton = document.getElementById("expense-button");
const categoryInput = document.getElementById("categoryOptions");
const amountInput   = document.getElementById("amountInput");
const currentBalance_el = document.getElementById("current-balance");
const transactionLog = document.getElementById("log-list");

var currentBalance = 0;

onload();
function onload() 
{
        const hasSavedTransactions = !(localStorage.getItem("transactions") === null);
        if (hasSavedTransactions)
        {
                retrievSavedTransactions();
                retrievSavedCurrentBalance();
        }
}

// display the transaction to the list
// Update the current balance
// Save to the local storage
addIncomeButton.onclick = () => {

        if (amountInput.value && (categoryInput.value == "Received money")) {

                addIncome(amountInput.value, categoryInput.value);
                let updatedCurrentBalance = currentBalance + parseInt(amountInput.value); // the input becomes a string when getting added to the current balance
                currentBalance = updatedCurrentBalance;
                updateCurrentBalance(updatedCurrentBalance);
                saveTransactionLogs();

                amountInput.value = "";

        }
        else if ((categoryInput.value !== "Received money") && amountInput.value) {
                alert("Please check category.");
        }
        else {
                alert("Please input an amount.");
        }
};

addExpenseButton.onclick = () => {

        if (amountInput.value && (categoryInput.value !== "Received money")) {

                addExpense(amountInput.value, categoryInput.value);
                let updatedCurrentBalance = currentBalance - parseInt(amountInput.value);
                currentBalance = updatedCurrentBalance;
                updateCurrentBalance(updatedCurrentBalance);
                saveTransactionLogs();

                amountInput.value = "";

        }
        else if (amountInput.value && (categoryInput.value = "Received money")) {
                alert("PLease check category.");
        }
        else {
                alert("Please enter an amount.");
        }
};

function addIncome(amount, category) 
{
        displayTransaction(amount, category, "income");
}

function addExpense(amount, category) 
{
        displayTransaction(amount, category, "expense");
}

// Create new li element
// Get the current time and date
// change the inner html
// apply the class name to it from the css to identify whether income or expense
// append it to the list
function displayTransaction(amount, category, elementClass) 
{
        let currentTimeAndDate = getTimeAndDate();

        const li = document.createElement("li");
        li.classList.add(elementClass);
        li.innerHTML = `<p><b>${elementClass.toUpperCase()}: </b>${amount}</p>
                        <p>${currentTimeAndDate}</p>
                        <p>${category}</p>`;
        transactionLog.prepend(li);
}

function updateCurrentBalance(updatedCurrentBalance) 
{
        currentBalance_el.textContent = `Php ${updatedCurrentBalance}.00`;

        if ((updatedCurrentBalance == 0) || (updatedCurrentBalance === null)) {
                currentBalance_el.textContent = "Php 0.00"
        }

        localStorage.setItem("savedCurrentBalance", JSON.stringify(updatedCurrentBalance));
}

// get all li elements
// add each to an array
// save that array to the
function saveTransactionLogs()
{
        const TRANSACTION_LOGS  = [];
        let transactions = document.querySelectorAll("li");
        transactions.forEach(transaction => {
                TRANSACTION_LOGS.unshift(transaction.innerHTML);
        });
        localStorage.setItem("transactions", JSON.stringify(TRANSACTION_LOGS));
}

function retrievSavedTransactions() 
{
        const savedTransactions = JSON.parse(localStorage.getItem("transactions"));
        savedTransactions.forEach(displaySavedTransaction);
}

function displaySavedTransaction(transaction) 
{
        const li = document.createElement("li");
        li.innerHTML = transaction;
        li.classList.add(identifyCategory(transaction));
        transactionLog.prepend(li);
}

function identifyCategory(transaction)
{
        transactionCategory = transaction.slice(6, 13);
        console.log(transactionCategory);
        if (transactionCategory == "INCOME:") {
                return "income";
        }
        return "expense";
}

function retrievSavedCurrentBalance()
{
        const savedCurrentBalance = JSON.parse(localStorage.getItem("savedCurrentBalance"));
        currentBalance = savedCurrentBalance;
        updateCurrentBalance(currentBalance);
}

function displaySavedCurrentBalance(savedCurrentBalance)
{
        currentBalance_el.textContent = `Php ${savedCurrentBalance}`;
}

// utils functions
function getTimeAndDate()  
{
        let date = new Date();
        let month = date.getMonth() + 1; // the getMonth function returns value of 0 - 11
        let day = date.getDate();
        let year = date.getFullYear() - 2000; // To get the year in 2 digits without splicing

        let hour = date.getHours();
        let minute = date.getMinutes();

        if (minute < 10) {
                minute = `0${minute}`
        }

        let past12 = hour > 12
        if (past12) {
                hour -= 12
                return `${month}/${day}/${year} ${hour}:${minute}pm`
        }
        return  `${month}/${day}/${year} ${hour}:${minute}am`;
}