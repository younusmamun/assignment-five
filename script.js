

const searchBtn = document.getElementById('search_button');
searchBtn.addEventListener('click', () => {
    const inputFoodName = document.getElementById('foodNameInput').value;
    if(inputFoodName === ""){
        alert("give food name please!");
    }else{
        getFoodName(inputFoodName);
    }
});

const apiBase = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
const getFoodName = fname => {
    const url = `${apiBase}${fname}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayFoods(data));
}


const displayFoods = foods =>{
    const item = foods.meals;
    const parentDiv = document.getElementById('food-container');
    console.log(item);
    
    for(let i=0;i<item.length;i++){
        const meal = item[i];
        const foodDiv = document.createElement('div');
        foodDiv.className = 'food'
        const countryInfo = `
        <img onclick="displayFoodDetail('${meal.idMeal}')" src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
    
        ` 
        foodDiv.innerHTML = countryInfo;
        parentDiv.appendChild(foodDiv);
    }
}

const displayFoodDetail = foodId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => renderMealInfo(data.meals[0]));
}
const renderMealInfo = meal => {
    const mealDiv = document.getElementById('menu-detail');
    mealDiv.innerHTML = `

    <img src="${meal.strMealThumb}">
    <h1>${meal.strMeal}</h1>
    <h3>Ingredients</h3>
    <p> ${meal.strIngredient3}</p>
    <p> ${meal.strIngredient4}</p>
    <p> ${meal.strIngredient5}</p>
    <p> ${meal.strIngredient6}</p>
    

    `
}