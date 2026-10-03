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
let nightModeBought = false;
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
const nightModeDiv = document.querySelector("#nightModeDiv");
const nightCost = document.querySelector("#nightCost");
const incomeText = document.querySelector("#incomeText");
const addClickerIncrease = 1.1;
const addFactoryIncrease = 1.2;
const addBankIncrease = 1.3;
let autoClickPrice = Number(autoClicCost.textContent);
let factoryPrice = Number(factoryCost.textContent);
let bankPrice = Number(bankCost.textContent);
let nightModePrice = Number(nightCost.textContent);
const coinSound = new Audio("media/sounds/coin.mp3");
const buySound = new Audio("media/sounds/cash.mp3");


/*Botones*/
const coinButton = document.querySelector("#coinButton");
const autoClickButton = document.querySelector("#autoClic");
const addFactoryButton = document.querySelector("#addFactory");
const addBankButton = document.querySelector("#addBank");
const duplicarClicsButton = document.querySelector("#duplicarClics");
const duplicarTrabajoButton = document.querySelector("#duplicarTrabajo");
const nightModeButton = document.querySelector("#nightMode");


/*addEventListener*/
coinButton.addEventListener("click", () => {
    addMoney(1 * clickMultiplier);
    coinSound.currentTime = 0;
    coinSound.play();
});
autoClickButton.addEventListener("click", () => buy(autoClickButton));
addFactoryButton.addEventListener("click",  () => buy(addFactoryButton));
addBankButton.addEventListener("click", () => buy(addBankButton));
duplicarClicsButton.addEventListener("click", () => duplicar(duplicarClicsButton));
duplicarTrabajoButton.addEventListener("click", () => duplicar(duplicarTrabajoButton));
nightModeButton.addEventListener("click", () => buy(nightModeButton));
document.addEventListener("keydown", (event) => {
    if(event.key.toLocaleLowerCase() === "n" && nightModeBought){
        document.body.classList.toggle("night");
    }
});

setInterval(ingresos, 1000);

/*Funciones*/
function addMoney(cantidad) {
    money += cantidad;
    moneyNumber.textContent = money;

    if(money >= 100){
        autoClick.style.visibility = "visible";
        autoClickSection.style.visibility = "visible";
    }

    if(money >= 500){
        factory.style.visibility = "visible";
        factorySection.style.visibility = "visible";
    }

    if(money >= 4000){
        bank.style.visibility = "visible";
        bankSection.style.visibility = "visible";
    }

    if(money >= 1500){
        duplicate.style.visibility = "visible";
    }

    if(money >= 10000 && !nightModeBought){
        nightModeDiv.style.visibility = "visible";
    }
}

function ingresos() {
    const ingreso = (autoclickCounter * 1 * clickMultiplier) + (factoryCounter * 10 * buildingMultiplier) + (bankCounter * 50 * buildingMultiplier);
    addMoney(ingreso);
    incomeText.textContent = `+${ingreso} 🪙/s`;
}

function buy(button){
    if (button === autoClickButton) {
        if (money < autoClickPrice) return;
        money -= autoClickPrice;
        autoclickCounter++;
        autoClickPrice = round(autoClickPrice * addClickerIncrease);
        autoClicCost.textContent = autoClickPrice;
        autoClickNumber.textContent = autoclickCounter;
    } else if (button === addFactoryButton) {
        if (money < factoryPrice) return;
        money -= factoryPrice;
        factoryCounter++;
        factoryPrice = round(factoryPrice * addFactoryIncrease);
        factoryCost.textContent = factoryPrice;
        factoryNumber.textContent = factoryCounter;
    } else if (button === addBankButton) {
        if (money < bankPrice) return;
        money -= bankPrice;
        bankCounter++;
        bankPrice = round(bankPrice * addBankIncrease);
        bankCost.textContent = bankPrice;
        bankNumber.textContent = bankCounter;
    } else if (button === nightModeButton) {
        if (money < nightModePrice) return;
        money -= nightModePrice;
        activateNightMode();
    }

    incomeText.style.visibility = "visible";
    moneyNumber.textContent = money;
    buySound.currentTime = 0;
    buySound.play();
}

function round(coste){
    const decimal = coste % 1;
    return decimal === 0 ? coste : coste - decimal + 1;
    // coste % 1 te da solo la parte decimal (ej. 2.4 % 1 = 0.4). Si no hay parte
    // decimal, el número ya es entero. Si la hay, le quitas la parte decimal y
    // sumas 1 para subir al siguiente entero. Como tus costes siempre son
    // positivos, funciona igual que "redondear para arriba" Math.ceil.
}

function duplicar(button){

    if(button === duplicarClicsButton){
        if(restanteClics > 0){
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
    }else if(button === duplicarTrabajoButton){
        if(restanteBuilding > 0){
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


}

function activateNightMode(){
    nightModeBought = true;
    nightModeButton.disabled = true;
    alert("A partir de ahora puedes usar la tecla N para activar el modo noche");
    nightModeDiv.style.visibility = "hidden";
}