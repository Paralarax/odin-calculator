
var text = document.querySelector('.input-div');
var buttons = document.querySelectorAll("button");
var operators = ['+', '×', '-', '÷'];
var tempOperator = "";

var number1 = "";
var number2 = "";
var operator = "";

function result() {
    number2 = "";
    number1 = String(number1);

    if (tempOperator) {
        text.innerText = number1 + tempOperator;
        operator = tempOperator;
        tempOperator = "";
    }
    else {
        text.innerText = number1;
        operator = "";
    }
}

function evaluate() {
    switch (operator) {
        case '+': 
            number1 = (Number(number1) + Number(number2));
            result();
            break;
        case '-':
            number1 = (Number(number1) - Number(number2));
            result();
            break;
        case '×':
            number1 = (Number(number1) * Number(number2));
            result();
            break;
        case '÷':
            number1 = (Number(number1) / Number(number2));
            result();
            break;
    }  
}

function isNum(val) {
    return !isNaN(val);
}

function includesOperator() {
    for (let i = 0; i < operators.length-1; i++) {
        if (text.innerText.includes(operators[i])) return true;
        else return false;
    }
}

function AC() {
    text.innerText = "";
    number1 = "";
    number2 = "";
    operator = "";
}

function CE() {
    if (number2.length > 0) {
        number2 = number2.slice(0, -1);
    }
    else if (operator) {
        operator = "";
    }
    else {
        number1 = number1.slice(0, -1);
    }

    text.innerText = text.innerText.slice(0, -1);

}

function equelButton() {
    if (number1 && operator && number2) {
        evaluate();
    }
}

function DotCheck() {
    if (text.innerText.length) {
        if (text.innerText[text.innerText.length-1] != '.') {
            if (text.innerText.includes('.')) {
                if (operator && !number2.includes('.')) {
                    text.innerText += '.';
                    number2 += '.';
                }
                else if (!operator && !number1.includes('.')) {
                    text.innerText += '.';
                    number1 += '.';
                }
            }
            else if (!text.innerText.includes('.')) {
                text.innerText += '.';
                if (!operator) number1 += '.';
                else number2 += '.'
            }
        }
    }
}

function returnPos(text) {
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].innerText == text) return i;
    }
}

function operatorsFunc(e) {
    let pos = returnPos(e.target.textContent);

    if (!operator && isNum(text.innerText[text.innerText.length-1])) {
        operatorPos = text.innerText.length;
        text.innerText += buttons[pos].innerText;
        operator = buttons[pos].innerText;
    }
    else if (operator == text.innerText[text.innerText.length-1]) {
        text.innerText = text.innerText.slice(0, text.innerText.length-1) + buttons[pos].innerText;
        operator = buttons[pos].innerText;

    }
    else if (operator != text.innerText[text.innerText.length-1] && isNum(text.innerText[text.innerText.length-1])) {
        tempOperator += buttons[pos].innerText;
        evaluate();
    }
}

function numberBtns(e) {
    let pos = returnPos(e.target.textContent)

    text.innerText += buttons[pos].innerText;
    if (!operator) {
        number1 += buttons[pos].innerText;
    }else {
        number2 += buttons[pos].innerText;
    }
}

function addFuncToButtons() {
    for (let i = 0; i < buttons.length; i++) {
        switch (buttons[i].innerText) {
            case "AC": {
                buttons[i].addEventListener("click", AC)
                break;
            }
            case "CE": {
                buttons[i].addEventListener("click", CE)
                break;
            }
            case '.': {
                buttons[i].addEventListener("click", DotCheck)
                break;
            }
            case '=': {
                buttons[i].addEventListener("click", equelButton)
                break;
            }
            default: {
                if (isNum(buttons[i].innerText)) {
                    buttons[i].addEventListener("click", numberBtns)
                    break;
                }
                else {
                    buttons[i].addEventListener("click", operatorsFunc)
                    break;
                }
            }
        }
    }
}

addFuncToButtons();

