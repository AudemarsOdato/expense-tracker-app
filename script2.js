const currentBalance_el = document.getElementById("current-balance");
const amountInput = document.getElementById("amountInput");
const categoryInput = document.getElementById("categoryOptions");
const addTransactionButton = document.getElementById("addTransaction-button");
const undoTransactionButton = document.getElementById("undoTransaction-button");
const transactionLog = document.getElementById("log-list");

var currentBalance = 0;

const expenses = ["Food", "Transportation", "Academics", "Savings"];
const incomes  = ["Received money", "Withdrew money"];

addTransactionButton.onclick = () => {
        
        i
};

function determineTransactionType(category) {

        if (expenses.includes(categoryInput.value)) {
                return "expense";
        }
        else if (incomes.includes(categoryInput.value)) {
                return "income";
        }
        else {
                return "Invalid input!";
        }
}