// =========================================
// HOME LOAN EMI CALCULATOR
// =========================================

const loanForm = document.getElementById("loanForm");

const loanEmi = document.getElementById("loanEmi");
const loanPrincipal = document.getElementById("loanPrincipal");
const loanInterest = document.getElementById("loanInterest");
const loanTotal = document.getElementById("loanTotal");
const loanYears = document.getElementById("loanYears");


// Indian currency formatter
function formatCurrency(amount) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(amount);
}


// Calculate EMI
loanForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const loanAmount = Number(
        document.getElementById("loanAmount").value
    );

    const interestRate = Number(
        document.getElementById("interestRate").value
    );

    const loanTenure = Number(
        document.getElementById("loanTenure").value
    );

    const downPayment = Number(
        document.getElementById("downPayment").value
    );


    // Basic validation
    if (loanAmount <= 0) {
        alert("Please enter a valid loan amount.");
        return;
    }

    if (interestRate <= 0) {
        alert("Please enter a valid interest rate.");
        return;
    }

    if (loanTenure <= 0) {
        alert("Please select a valid loan tenure.");
        return;
    }

    if (downPayment < 0) {
        alert("Down payment cannot be negative.");
        return;
    }


    // Monthly interest rate
    const monthlyRate = interestRate / 12 / 100;

    // Number of monthly payments
    const numberOfPayments = loanTenure * 12;

    // EMI formula
    const emi =
        loanAmount *
        monthlyRate *
        Math.pow(1 + monthlyRate, numberOfPayments) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);


    // Total amount paid
    const totalPayment = emi * numberOfPayments;

    // Total interest
    const totalInterest = totalPayment - loanAmount;


    // Display results
    loanEmi.textContent = formatCurrency(emi);

    loanPrincipal.textContent = formatCurrency(loanAmount);

    loanInterest.textContent = formatCurrency(totalInterest);

    loanTotal.textContent = formatCurrency(totalPayment);

    loanYears.textContent = loanTenure + " Years";


    // Show a small down-payment message in console
    console.log("Down Payment:", formatCurrency(downPayment));
    console.log("Loan Amount:", formatCurrency(loanAmount));
    console.log("Monthly EMI:", formatCurrency(emi));
});