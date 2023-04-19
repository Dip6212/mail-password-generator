let displayMail=document.querySelector(".maildisplay");
let copytxt=document.querySelector(".copymsg");
let copybtn=document.querySelector(".copy_btn");
let slideRange=document.querySelector(".slider_range");
let displayLength=document.querySelector(".length");
let fname=document.querySelector(".first_name");
let lname=document.querySelector(".last_name");
let subbtn=document.querySelector(".submit_btn")
let generateBtn=document.querySelector(".generate_btn");
let lengthDisplay=15;
let email="";
handleSlide();

function handleSlide(){
    // lengthDisplay=fName.value.length+lname.value.length;
    displayLength.innerHTML=lengthDisplay;
    slideRange.value=lengthDisplay;
    
    
}

function getRandomInt(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}

function getRandomNum() {
    return getRandomInt(0,9);
}

async function copyContents() {
    try {
        await navigator.clipboard.writeText(displayMail.value);
        copytxt.innerHTML = "copied";
        console.log("copycont");
    }
    catch (e) {
        copytxt.innerHTML = "failed";
    }

    copytxt.classList.add("active");

    setTimeout(() => {
        copytxt.classList.remove("active");

    }, 2000);
}

slideRange.addEventListener('input',(e)=>{
    lengthDisplay=e.target.value;
    handleSlide();
})



copybtn.addEventListener('click',()=>{
    if(displayMail.value){
        copyContents();
    }
          
})

generateBtn.addEventListener('click',()=>{
    lengthDisplay=fname.value.length+lname.value.length;
    console.log(lengthDisplay);
    handleSlide();
    let revname=lname.value+fname.value;
    revname;
    console.log(revname);

    const revarr=[];
    // revarr.push(revname);
    // revarr.toString();
    let randnum="";

    for (let i = 0; i < 4; i++) {

       randnum+= getRandomNum();


    }
    // randnum.toString();
    // revarr.toString();
    displayMail.value=revname+randnum+"@gmail.com";
    lengthDisplay+=14;
    handleSlide();

})




///////// password generator code //////////


const inputSlider = document.querySelector("[data-passwordlength]");
const lengthshow = document.querySelector("[ data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-displaypassword]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyTarget]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generatepassword = document.querySelector('.generateButton');
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
setIndicator("#ccc");
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthshow.innerHTML = passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
}


function getRandomInt(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}
function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}



function getLowerCase() {
    return String.fromCharCode(getRandomInt(97,123));
}

function getUpperCase() {
    return String.fromCharCode(getRandomInt(65,91));
}

function getSymbols() {
    const ransym = getRandomInt(0,symbols.length);
    return symbols.charAt(ransym);
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator("#0f0");
    } else if (
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        passwordLength >= 6
    ) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
}

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerHTML = "copied";
        console.log("copycont");
    }
    catch (e) {
        copyMsg.innerHTML = "failed";
    }

    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");

    }, 2000);
}


inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value) {
        copyContent();
    }
})

function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {

        if (checkbox.checked) {
            checkCount++;
        }
    })
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})


generatepassword.addEventListener('click', () => {
    
    if (checkCount == 0)
        return;
       
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    password = "";

    let funcArr = [];

    if (uppercaseCheck.checked) {
        funcArr.push(getUpperCase);
    }

    if (lowercaseCheck.checked)
        funcArr.push(getLowerCase);

    if (numbersCheck.checked)
        funcArr.push(getRandomNum);

    if (symbolsCheck.checked)
        funcArr.push(getSymbols);

    for (let i = 0; i < funcArr.length; i++) {
            password+=funcArr[i]();
        
    }
    console.log("working");

    for (let i = 0; i < passwordLength-funcArr.length ; i++) {
        let randIndex=getRandomInt(funcArr.length,0);
        password+=funcArr[randIndex]();   
    }

    password = shufflePassword(Array.from(password));

    passwordDisplay.value = password;

    calcStrength();

});

