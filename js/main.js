


let rowData=document.getElementById('rowData');
let searchContainer=document.getElementById('searchInput');
let x=$('.side-nav-menu .nav-header').outerWidth();
let btnSubmit;
let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

// Start Nav-Menu
$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})
function closeNav(){
    let boxWidth=$('.side-nav-menu .nav-tab').outerWidth();
    $('.side-nav-menu').animate({left:-boxWidth},500)
    $('.close-open-icon').removeClass('fa-x')
    $('.close-open-icon').addClass('fa-align-justify')
    $('.links ul li').animate({top:300},500)
}
function openNav(){
    $('.side-nav-menu').animate({left:0},500)
    $('.close-open-icon').removeClass('fa-align-justify')
    $('.close-open-icon').addClass('fa-x')
    for(let i=0;i<5;i++){
        $('.links ul li').eq(i).animate({top:0},(i+5)*100)
    }
}
closeNav();
$('.side-nav-menu i.close-open-icon').click(()=>{
    if($('.side-nav-menu').css('left')=='0px'){
        closeNav();
    }
    else{
        openNav();
    }
})

// End Nav-Menu

// dispaly meals

function displayMeals(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div  class="meal position-relative overflow-hidden rounded-2 curser-pointer" onclick="getMealDetailes('${arr[i].idMeal}')">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona;
}

async function getCategories(){
    rowData.innerHTML="";

    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()
    dispalyCategories(response.categories)
    $(".inner-loading-screen").fadeOut(300)

}
function dispalyCategories(arr){
    searchContainer.innerHTML="";

    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div  class="meal position-relative overflow-hidden rounded-2 curser-pointer" onclick="getCategoryMeals('${arr[i].strCategory}')">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <div class="layer position-absolute text-center text-black p-2 d-block">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription?.split(" ").slice(0,20).join(" ")}</p> 
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona;

}
async function getArea(){
    rowData.innerHTML="";

    $(".inner-loading-screen").fadeIn(300)

    
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    response=await response.json();
    dispalyAreas(response.meals)
    $(".inner-loading-screen").fadeOut(300)


}
function dispalyAreas(arr){
    searchContainer.innerHTML="";

    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div  class=" rounded-2 cursor-pointer text-center curser-pointer" onclick="getAreaMeals('${arr[i].strArea}')">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona;

}

async function getIngredients(){
    rowData.innerHTML="";

    $(".inner-loading-screen").fadeIn(300)

    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    response=await response.json();
    dispalyIngredients(response.meals.slice(0,20))
    $(".inner-loading-screen").fadeOut(300)


}
function dispalyIngredients(arr){
    searchContainer.innerHTML="";
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div  class=" rounded-2 curser-pointer text-center" onclick="getIngredientsMeals('${arr[i].strIngredient}')">
                <i class="fa-solid fa-drumstick-bite fa-3x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p width="300px">${arr[i].strDescription?.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona;

}
async function getCategoryMeals(category) {
    rowData.innerHTML="";

    $(".inner-loading-screen").fadeIn(300)


    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)


}

async function getAreaMeals(area) {
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}

async function getIngredientsMeals(ingredients) {
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)


}

async function getMealDetailes(mealID){
    $(".inner-loading-screen").fadeIn(300)

    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    response=await response.json();
    console.log(response.meals)
    displayMealDetails(response.meals[0])
    $(".inner-loading-screen").fadeOut(300)

}
function displayMealDetails(meal){
    closeNav();
    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }
    let cartonaa=`
    <div class="col-md-3">
    <img src="${meal.strMealThumb}" alt="" class="w-100 rounded-3">
    <h2 class="mt-3">${meal.strCategory}</h2>
</div>
<div class="col-md-8">
    <h3>Instructions</h3>
    <p>${meal.strInstructions}</p>
    <h3><span class="fw-bold">Area :</span>${meal.strArea}</h3>  
    <h3><span class="fw-bold">Category :</span>${meal.strCategory}</h3> 
    <h3>Recipes :</h3>
    <ul class="list-unstyled d-flex flex-wrap g-3">${ingredients }
    </ul>   
    <h3>Tags :</h3>
    <ul  class="list-unstyled d-flex flex-wrap g-3">
    ${tagsStr}
    </ul> 
    <a href="${meal.strSource}" class="btn btn-success" target="_self">Source</a> 
    <a href="${meal.strYoutube}" class="btn btn-danger" target="_self">Youtube</a> 
</div>
    `
    rowData.innerHTML=cartonaa;
}

function showSearchInputs() {
    searchContainer.innerHTML = `
    <div class="row py-4 m-3">
        <div class="col-md-6 mb-4">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    rowData.innerHTML = ""
}

async function searchByName(term) {
    $(".inner-loading-screen").fadeIn(300)
    
    rowData.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()
    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(300)

}

async function searchByFLetter(term) {
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300)

    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()
    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading-screen").fadeIn(300)

}

function showContactInputs(){
    rowData.innerHTML=`
    <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-3">
            <div class="col-md-6">
                <input id="nameinput" type="text" placeholder="Enter Your Name" class="form-control" onkeyup=" inputValidation()">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailinput" type="email" placeholder="Enter Your Email" class="form-control" onkeyup="inputValidation()">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneinput" type="tel" placeholder="Enter Your phone" class="form-control" onkeyup="inputValidation()">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageinput" type="number" placeholder="Enter Your Age" class="form-control" onkeyup="inputValidation()">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input id="passwordinput" type="password" placeholder="Enter Your Password" class="form-control" onkeyup="inputValidation()">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input id="repasswordinput" type="password" placeholder="Repassword" class="form-control" onkeyup="inputValidation()">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button disabled class="btn btn-outline-danger mt-3" id="btnSubmit">Submit</button>
    </div>
</div> `
btnSubmit=document.getElementById('btnSubmit')
document.getElementById("nameinput").addEventListener("focus", () => {
    nameInputTouched = true
})

document.getElementById("emailinput").addEventListener("focus", () => {
    emailInputTouched = true
})

document.getElementById("phoneinput").addEventListener("focus", () => {
    phoneInputTouched = true
})

document.getElementById("ageinput").addEventListener("focus", () => {
    ageInputTouched = true
})

document.getElementById("passwordinput").addEventListener("focus", () => {
    passwordInputTouched = true
})

document.getElementById("repasswordinput").addEventListener("focus", () => {
    repasswordInputTouched = true
})
}

function inputValidation(){
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }
    if(nameValidation()&&emailValidation()&&phoneValidation()&&ageValidation()&&passwordValidation()&&repasswordValidation()){

        btnSubmit.removeAttribute("disabled");
    }
    else{
        btnSubmit.setAttribute("disabled", true)
    }

}

function nameValidation(){
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameinput").value))

}
function emailValidation(){
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailinput").value))
    
}
function phoneValidation(){
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneinput").value))
    
}
function ageValidation(){
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageinput").value))
}
function passwordValidation(){
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordinput").value))

    
}
function repasswordValidation(){
    return document.getElementById("repasswordinput").value == document.getElementById("passwordinput").value
    
}
