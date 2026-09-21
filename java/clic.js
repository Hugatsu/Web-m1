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


/*Botones*/
const coinButton = document.querySelector("#coinButton");
const autoClickButton = document.querySelector("#autoClic");
const addFactoryButton = document.querySelector("#addFactory");
const addBankButton = document.querySelector("#addBank");
const duplicarClicsButton = document.querySelector("#duplicarClics");
const duplicarTrabajoButton = document.querySelector("#duplicarTrabajo");
const nightModeButton = document.querySelector("#nightMode");


/*addEventListener*/
coinButton.addEventListener