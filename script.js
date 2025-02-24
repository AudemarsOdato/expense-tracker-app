const availableCash_el = document.getElementById("available-cash");
const amountInput = document.getElementById("amountInput");
const categoryInput = document.getElementById("categoryOptions");
const addTransactionButton = document.getElementById("addTransaction-button");
const undoTransactionButton = document.getElementById("undoTransaction-button");
const transactionLog = document.getElementById("log-list");

var availableCash = 0;

// On Load
const hasSavedTransactions = !(localStorage.getItem("transactions") === null);
if (hasSavedTransactions) {
        retrievSavedTransactions();
        retrievSavedCash();
}

const expenses = ["Food", "Transportation", "Academics", "Savings", "Grocery"];
const incomes  = ["Received money", "Withdrew money"];

addTransactionButton.onclick = () => {
        const transactionType = determineTransactionType(categoryInput.value);

        if (amountInput.value) {
                addTransaction(transactionType);
                saveTransactionLogs();
                amountInput.value = "";
        }
        else {
                alert("Please input an amount.");
        }
};

undoTransactionButton.onclick = () => {
        const transactionType = identifyClass(transactionLog.firstElementChild.textContent);
        console.log(transactionType);

        removePreviousTrans(transactionType);
        saveTransactionLogs();
}

function removePreviousTrans(transactionType) {
        let amount = getTransactionAmount(transactionLog.firstElementChild);

        if (transactionType == "income") {
                availableCash -= amount;
                updateAvailableCash(availableCash);
        }
        else if (transactionType == "expense") {
                availableCash += amount;
                updateAvailableCash(availableCash);
        }

        transactionLog.removeChild(transactionLog.firstElementChild);
}

function getTransactionAmount(transaction) {
        return extractIntFrom(transaction.textContent);
}

function extractIntFrom(text) {
        const regEx = /\d+/;

        let extractedValue = text.match(regEx);

        return parseInt(extractedValue);
}

function addTransaction(transactionType) {
        if (transactionType == "income") {
                displayTransaction(amountInput.value, categoryInput.value, "income");

                availableCash = availableCash + parseInt(amountInput.value);
                updateAvailableCash(availableCash);
        }
        else if (transactionType == "expense") {
                displayTransaction(amountInput.value, categoryInput.value, "expense");

                availableCash = availableCash - parseInt(amountInput.value);
                updateAvailableCash(availableCash);
        }
}

function saveTransactionLogs() {
        const TRANSACTION_LOGS  = [];

        let transactions = document.querySelectorAll("li");
        transactions.forEach(transaction => {
                TRANSACTION_LOGS.unshift(transaction.innerHTML);
        });

        localStorage.setItem("transactions", JSON.stringify(TRANSACTION_LOGS));
}

function retrievSavedTransactions() {
        const savedTransactions = JSON.parse(localStorage.getItem("transactions"));
        savedTransactions.forEach(displaySavedTransaction);
}

function retrievSavedCash() {
        availableCash = JSON.parse(localStorage.getItem("savedCashBalance"));
        updateAvailableCash(availableCash);
}

function displaySavedTransaction(transaction) {
        const li = document.createElement("li");
        li.innerHTML = transaction;
        li.classList.add(identifyClass(transaction));
        transactionLog.prepend(li);
}

function updateAvailableCash(updatedAvailableCash) {
        availableCash_el.textContent = `Php ${updatedAvailableCash}.00`;

        if ((updatedAvailableCash == 0) || (updatedAvailableCash === null)) {
                availableCash_el.textContent = "Php 0.00"
        }

        localStorage.setItem("savedCashBalance", JSON.stringify(updatedAvailableCash));
}

function determineTransactionType(category) {
        if (expenses.includes(category)) {
                return "expense";
        }
        else if (incomes.includes(category)) {
                return "income";
        }
        else {
                return "Invalid input!";
        }
}

function displayTransaction(amount, category, elementClass) {
        let currentTimeAndDate = getTimeAndDate();

        const li = document.createElement("li");
        li.classList.add(elementClass);
        li.innerHTML = `<p><b>${elementClass.toUpperCase()}: </b>${amount}</p>
                        <p>${currentTimeAndDate}</p>
                        <p>${category}</p>`;
        transactionLog.prepend(li);
}

function identifyClass(transaction) {
        let transactionClass = transaction.slice(0, 7);
        console.log(transactionClass);

        if (transactionClass == "INCOME:") {
                return "income";
        }
        return "expense";
}

function getTimeAndDate()  {
        let date = new Date();
        let month = date.getMonth() + 1; // the getMonth function returns value of 0 - 11
        let day = date.getDate();
        let year = date.getFullYear() - 2000; // To get the year in 2 digits without splicing
        let hour = date.getHours();
        let minute = date.getMinutes();

        if (minute < 10) {
                minute = `0${minute}`;
        }

        let meridiemTime;
        let past12 = hour > 12;
        if (past12) {
                hour -= 12;
                meridiemTime = "pm";
        }
        else {
                meridiemTime = "am";
        }

        return  `${month}/${day}/${year} ${hour}:${minute}${meridiemTime}`;
}