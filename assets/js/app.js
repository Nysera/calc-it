
const operations = {
    addition: function(a, b) {
        return a + b;
    },
    subtraction: function(a, b) {
        return a - b;
    },
    multiplication: function(a, b) {
        return a * b;
    },
    division: function(a, b) {
        return a / b;
    },
    percentage: function(a, b) {
        return (a * b) / 100;
    },
    squareRoot: function(a) {
        return Math.sqrt(a).toPrecision(11);
    },
    powerOfTwo: function(a) {
        return Math.pow(a, 2);
    }
};

const keyboardValues = [
    "=", "Enter", "+", "-", "*", "/", "%", "@", "Backspace", "Delete", "Escape", ".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "q"
];

const keyboardInput = function(event) {
    const { key } = event;

    if (keyboardValues.includes(key)) {
        if (key === "=" || key === "Enter") {
            event.preventDefault();
            const button = document.querySelector(".equals");
            button.click();
        } else if (key === "+") {
            const button = document.querySelector("#addition");
            button.click();
        } else if (key === "-") {
            const button = document.querySelector("#subtraction");
            button.click();
        } else if (key === "*") {
            const button = document.querySelector("#multiplication");
            button.click();
        } else if (key === "/") {
            const button = document.querySelector("#division");
            button.click();
        } else if (key === "Escape") {
            const button = document.querySelector(".clear");
            button.click();
        } else if (key === "%") {
            const button = document.querySelector("#percentage");
            button.click();
        } else if (key === "@") {
            const button = document.querySelector("#squareRoot");
            button.click();
        } else if (key === "q") {
            const button = document.querySelector("#powerOfTwo");
            button.click();
        } else if (key === "Backspace" || key=== "Delete") {
            const button = document.querySelector(".del");
            button.click();
        } else {
            const button = document.querySelector(`button[value="${key}"]`);
            button.click();
        }
    }
};

const backspace = function() {
    if (strInput === "") {
        delBtn.classList.remove("active");
    } else if (strInput !== "") {
        strInput = strInput.slice(0, -1);
        expressionValue = expressionValue.slice(0, -1);
    }
    display();
};

const clear = function() {
    strInput = "";
    strOperator = ""
    strTotal = "";
    expressionValue = "";
    results = "";
    resultsDisplay.innerHTML = "";
    expressionWrapper.innerHTML = "";
    delBtn.classList.remove("active");
};

const toggleDecimal = function() {
    if (strInput === "") {
        strInput = "0.";
        expressionValue += "0.";
    } else if (strInput.includes(".")) {
        return;
    } else {
        strInput += ".";
        expressionValue += ".";
    }
    display();
};

const display = function() {
    const expressionMql = window.matchMedia("(min-width: 440px)");
    const expressionLength = expressionMql.matches ? 30 : 18;

    if (expressionValue.length > expressionLength) {
        expressionWrapper.innerHTML = expressionValue.slice(expressionValue.length - expressionLength);
    } else {
        expressionWrapper.innerHTML = expressionValue;
    }
};

const operate = function(button) {
    if (button.id === "squareRoot" || button.id === "powerOfTwo") {
        strTotal = operations[strOperator](parseFloat(strTotal));
    } else if (strInput !== "" && strOperator !== "") {
        strTotal = operations[strOperator](parseFloat(strTotal), parseFloat(strInput));
    } 

    strInput = "";
    strOperator = "";

    if (strTotal === Infinity || strTotal === "NaN") {
        resultsDisplay.innerHTML = "Error"
    } else {
        resultsDisplay.innerHTML = strTotal;
    }
    if (strInput === "") {
        delBtn.classList.remove("active");
    }
};

const getOperator = function(event) {
    const { target } = event;
    const opForDisplay = target.value;

    if (strInput === "") {
        return;
    } else {
        if (strOperator !== "") {
            operate(target);
        }
        strOperator = target.id;
        if (strTotal === "") {
            strTotal = strInput;
            strInput = "";
        }
        if(strInput === "") {
            delBtn.classList.remove("active");
        }
        if (this.id === "squareRoot" || this.id === "powerOfTwo") {
            operate(target);
        };
        expressionValue += opForDisplay;
        display();
    }
};

const getNumber = function(event) {
    const { target } = event;

    if (strInput.length >= 15) {
        errorContainer.innerHTML = "Can't enter more than 15 digits.";
        errorContainer.classList.add("active");
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(function(){
            errorContainer.classList.remove("active");
            setTimeout(function(){
                errorContainer.innerHTML="";
            }, 300);
        }, 3000);
    } else {
        if (strTotal !== "" && strOperator === "") {
            strTotal = "";
            expressionValue = "";
            resultsDisplay.innerHTML = "";
        }
        if (strInput === "") {
            strInput = target.value;
        } else {
            strInput += target.value;
        }
        if (strInput !== "") {
            delBtn.classList.add("active");
        }
        expressionValue += target.value;
        display();
    }
};

const createEventHandlers = function() {
    numberBtn.forEach(function(button) {
        button.addEventListener("click", getNumber);
    });
    operatorBtn.forEach(function(button) {
        button.addEventListener("click", getOperator);
    });
    equalsBtn.addEventListener("click", operate);
    decimalBtn.addEventListener("click", toggleDecimal);
    clearBtn.addEventListener("click", clear);
    delBtn.addEventListener("click", backspace);
    buttons.forEach(function(button) {
        button.addEventListener("mousedown", function(){
            this.classList.add("active");
        });
        button.addEventListener("mouseup", function() {
            this.classList.remove("active");
        })
    });
    window.addEventListener("keydown", keyboardInput);
    document.querySelectorAll(".drawer").forEach(function(button) {
        button.addEventListener("click", function() {
            if (button.id === "drawerOpen") {
                document.body.classList.add("drawer-open");
            } else {
                document.body.classList.remove("drawer-open");
            }
        });
    });
};

const buttons = document.querySelectorAll(".buttons-wrapper button");
const numberBtn = document.querySelectorAll(".numbers");
const operatorBtn = document.querySelectorAll(".operator");
const equalsBtn = document.querySelector(".equals");
const decimalBtn = document.querySelector(".decimal");
const clearBtn = document.querySelector(".clear");
const delBtn = document.querySelector(".del");
const expressionWrapper = document.querySelector(".expression-wrapper .text");
const resultsDisplay = document.querySelector(".calculator-results-wrapper");
const errorContainer = document.querySelector(".error-container");
let timeoutId;
let strInput = "";
let strOperator = "";
let strTotal = "";
let expressionValue = "";

createEventHandlers();