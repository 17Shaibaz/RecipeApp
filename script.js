const searchBox = document.querySelector('.searchBox');
const searchButton = document.querySelector('.searchButton');
const recipeContainer = document.querySelector('.recipe-container');
const recipieDetailContent = document.querySelector('.recipie-detail-content');
const recipeCloseButton = document.querySelector('.recipe-close-button');

const fetchRecipies = async (query) => {
    recipeContainer.innerHTML = "<h2>FETCHING RECIPES....</h2>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    recipeContainer.innerHTML = "";
    response.meals.forEach(meal => {
        renderRecipe(meal);
    });
};

const fetchDefaultRecipes = async () => {
    recipeContainer.innerHTML = "";
    const recipes = [];
    
    // Fetch 10 random recipes
    for (let i = 0; i < 10; i++) {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const data = await response.json();
        recipes.push(data.meals[0]);
    }

    // Render each recipe
    recipes.forEach(recipe => renderRecipe(recipe));
};

const renderRecipe = (meal) => {
    const recipieDiv = document.createElement('div');
    recipieDiv.classList.add('recipe');
    recipieDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h2>${meal.strMeal}</h2>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>
        <button>View Recipe</button>
    `;
    recipieDiv.querySelector('button').addEventListener('click', () => {
        openRecipiePopup(meal);
    });
    recipeContainer.appendChild(recipieDiv);
};

const openRecipiePopup = (meal) => {
    recipieDetailContent.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p><strong>Category:</strong> ${meal.strCategory}</p>
        <p><strong>Area:</strong> ${meal.strArea}</p>
        <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
        <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
    `;
    document.querySelector('.recipie-details').style.display = "block";
};

recipeCloseButton.addEventListener('click', () => {
    document.querySelector('.recipie-details').style.display = "none";
});

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipies(searchInput);
});

// Fetch default recipes when the page loads
window.addEventListener('load', fetchDefaultRecipes);
