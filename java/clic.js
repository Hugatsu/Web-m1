/*Variables Globales*/
let money = 0;
let autoclickCounter = 0;
let factoryCounter = 0;
let bankCounter = 0;
let duplicateClicksCooldown = 60;
let duplicateClicksTime = 10;
let duplicateBuildingsCooldown = 80;
let duplicateBuildingsTime = 10;
let clickMultiplier = 1;
let buildingMultiplier = 1;
let restanteClics = 0;
let restanteBuilding = 0;
const moneyNumber = document.querySelector("#moneyNumber");
const autoClicCost = document.querySelector("#autoClicCost");
const factoryCost = document.querySelector("#factoryCost");
const bankCost = document.querySelector("#bankCost");
const autoClickNumber = document.querySelector("#autoClick-number");
const factoryNumber = document.querySelector("#factory-number");
const bankNumber = document.querySelector("#bank-number");
const duplicarClicsText = document.querySelector("#cooldownClics");
const duplicarEdificiosText = document.querySelector("#cooldownTrabajo");
const autoClick = document.querySelector("#autoClick");
const autoClickSection = document.querySelector("#autoclickSection");
const factory = document.querySelector("#factory");
const factorySection = document.querySelector("#factorySection");
const bank = document.querySelector("#bank");
const bankSection = document.querySelector("#bankSection");
const duplicate = document.querySelector("#duplicate");
const addClickerIncrease = 1.1;
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
coinButton.addEventListener("click", () => addMoney(1 * clickMultiplier));
autoClickButton.addEventListener("click", () => buy(autoClicCost.textContent, autoClickButton));
addFactoryButton.addEventListener("click",  () => buy(factoryCost.textContent, addFactoryButton));
addBankButton.addEventListener("click", () => buy(bankCost.textContent, addBankButton));
duplicarClicsButton.addEventListener("click", duplicateClicks);
duplicarTrabajoButton.addEventListener("click", duplicateBuildings);

setInterval(ingresos, 1000);

/*Funciones*/
function addMoney(cantidad) {
    money += cantidad;
    moneyNumber.textContent = money;

    if(money >= 1){
        autoClick.style.visibility = "visible";
        autoClickSection.style.visibility = "visible";
    }

    if(money >= 5){
        factory.style.visibility = "visible";
        factorySection.style.visibility = "visible";
    }

    if(money >= 40){
        bank.style.visibility = "visible";
        bankSection.style.visibility = "visible";
    }

    if(money >= 15){
        duplicate.style.visibility = "visible";
    }

    if(money >= 100){
        nightModeButton.style.visibility = "visible";
    }
}

function ingresos() {
    const ingreso = (autoclickCounter * 1 * clickMultiplier) + (factoryCounter * 3 * buildingMultiplier) + (bankCounter * 5 * buildingMultiplier);
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
        autoClicCost.textContent = round(coste * addClickerIncrease);
        autoClickNumber.textContent = autoclickCounter;
    }

    moneyNumber.textContent = money;
}

function round(coste){
    const decimal = coste % 1;
    return decimal === 0 ? coste : coste - decimal + 1;
    // coste % 1 te da solo la parte decimal (ej. 2.4 % 1 = 0.4). Si no hay parte
    // decimal, el número ya es entero. Si la hay, le quitas la parte decimal y
    // sumas 1 para subir al siguiente entero. Como tus costes siempre son
    // positivos, funciona igual que "redondear para arriba" Math.ceil.
}

function duplicateClicks(){
    if(duplicarClicsText.textContent != 0){
        return;
    }

    // Activa el x2 durante duplicateClicksTime segundos
    clickMultiplier = 2;
    duplicarClicsButton.disabled = true;
    setTimeout(() => {
        clickMultiplier = 1;
    }, duplicateClicksTime * 1500);

    // Cuenta atrás del cooldown, cuando llega a 0 se puede volver a usar
    restanteClics = duplicateClicksCooldown;
    duplicarClicsText.textContent = restanteClics;
    const intervaloClics = setInterval(() => {
        restanteClics--;
        duplicarClicsText.textContent = restanteClics;
        if(restanteClics <= 0){
            clearInterval(intervaloClics);
            duplicarClicsButton.disabled = false;
        }
    }, 1000);
}


function duplicateBuildings(){
    if(duplicarEdificiosText.textContent != 0){
        return;
    }

    buildingMultiplier = 2;
    duplicarTrabajoButton.disabled = true;

    setTimeout(() =>{buildingMultiplier = 1; }, duplicateBuildingsTime * 1000);

    restanteBuilding = duplicateBuildingsCooldown;
    duplicarEdificiosText.textContent = restanteBuilding;

    const intervaloEdificios = setInterval(() => {
        restanteBuilding--;
        duplicarEdificiosText.textContent = restanteBuilding;
        if(restanteBuilding <= 0){
            clearInterval(intervaloEdificios);
            duplicarTrabajoButton.disabled = false;
        }
    }, 1000);
}