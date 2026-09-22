/*Variables Globales*/
let money = 0;
let autoclickCounter = 0;
let factoryCounter = 0;
let bankCounter = 0;
let duplicateClicksCooldown = 60;
let duplicateClicksTime = 10;
let duplicateWorkZoneCooldown = 80;
let duplicateWorkZoneTime = 10; 
const moneyNumber = document.querySelector("#moneyNumber");
const autoClicCost = document.querySelector("#autoClicCost");
const factoryCost = document.querySelector("#factoryCost");
const bankCost = document.querySelector("#bankCost");
const autoClickNumber = document.querySelector("#autoClick-number");
const factoryNumber = document.querySelector("#factory-number");
const bankNumber = document.querySelector("#bank-number");
const addClickerIncreaser = 1.1;
const addFactoryIncrease = 1.2;
const addBankIncrease = 1.3;


/*Botones*/
const coinButton = document.querySelector("#coinButton");
const autoClickButton = document.querySelector("#autoClic");
const addFactoryButton = document.querySelector("#addFactory");
const addBankButton = document.querySelector("#addBank");
const duplicarClicsButton = document.querySelector("#duplicarClics");
const duplicarTrabajoButton = document.querySelector("#duplicarTrabajo");
const nightModeButton = document.querySelector("#nightMode");


/*addEventListener*/
coinButton.addEventListener("click", () => addMoney(1));
autoClickButton.addEventListener("click", () => buy(autoClicCost.textContent, autoClickButton));
addFactoryButton.addEventListener("click",  () => buy(factoryCost.textContent, addFactoryButton));
addBankButton.addEventListener("click", () => buy(bankCost.textContent, addBankButton));

setInterval(ingresos, 1000);

/*Funciones*/
function addMoney(cantidad) {
    money += cantidad;
    moneyNumber.textContent = money;
}

function ingresos() {
    const ingreso = (autoclickCounter * 1) + (factoryCounter * 1) + (bankCounter * 2);
    addMoney(ingreso);
}

function buy(coste, button){
    coste = Number(coste);
    if(money < coste){
        return;
    }

    money -= coste;

    if (button === addFactoryButton) {
        factoryCounter++;
        factoryCost.textContent = round(coste * addFactoryIncrease);
        factoryNumber.textContent = factoryCounter;
    } else if (button === addBankButton) {
        bankCounter++;
        bankCost.textContent = round(coste * addBankIncrease);
        bankNumber.textContent = bankCounter;
    } else if (button === autoClickButton) {
        autoclickCounter++;
        autoClicCost.textContent = round(coste * addClickerIncreaser);
        autoClickNumber.textContent = autoclickCounter;
    }

    moneyNumber.textContent = money;
}

function round(coste){
    const decimal = coste % 1;
    return decimal === 0 ? coste : coste - decimal + 1;
    // coste % 1 te da solo la parte decimal (ej. 2.4 % 1 = 0.4). Si no hay parte
    // decimal, el numero ya es entero. Si la hay, le quitas la parte decimal y
    // sumas 1 para subir al siguiente entero. Como tus costes siempre son
    // positivos, funciona igual que "redondear para arriba" Math.ceil.
}