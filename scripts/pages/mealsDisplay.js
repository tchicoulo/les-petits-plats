import { recipes } from "../../data/recipes.js";
import { searchFilter } from "./searchBar.js";
import { initData } from "./initData.js";

const searchContainer = document.querySelector(".search-container input");

searchContainer.addEventListener("input", (e) => {
  if (e.target.value.length >= 3) {
    searchFilter(e);
  } else if (e.target.value.length === 0) {
    initData();
  }
});

function mealsDisplay(arrayFilteredRecipeIndex) {
  const result = document.getElementById("result");
  result.innerHTML = "";
  console.log(arrayFilteredRecipeIndex);

  for (let i = 0; i < arrayFilteredRecipeIndex.length; i++) {
    let recipeIndex = arrayFilteredRecipeIndex[i];

    let ingredients = [];
    let recipe = recipes[recipeIndex];

    for (let j = 0; j < recipe.ingredients.length; j++) {
      let detailsIngredients = recipe.ingredients[j];
      let quantity = detailsIngredients.quantity;

      detailsIngredients =
        detailsIngredients.ingredient.charAt(0).toUpperCase() +
        detailsIngredients.ingredient.slice(1);

      ingredients.push(
        `<li><b>${detailsIngredients}: </b>${quantity} ${
          detailsIngredients.unit ? detailsIngredients.unit : ""
        }`
      );
    }

    result.innerHTML += `<li class="card">
          <img
          src="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          alt="image static"
          />
          <div class="card-info">
          <div class="card-title">
          <h1>${recipe.name}</h1>
          <img src="./assets/icons/time.svg" alt="Logo temps de cuisson" />
          <span>${recipe.time} min</span>
          </div>
          <div class="card-description">
          <ul>${ingredients.join("")}</ul>
              <p>${recipe.description}</p>
            </div>
          </div>
          </li>`;
  }
}

initData();

export { mealsDisplay };
