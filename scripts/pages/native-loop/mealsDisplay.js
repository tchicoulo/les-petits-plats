import { recipes } from "../../../data/recipes.js";

console.log(recipes);

const searchContainer = document.querySelector(".search-container input");
const result = document.getElementById("result");

searchContainer.addEventListener("input", (e) => {
  mealsdisplay(e);
});

function mealsdisplay(e) {
  if (recipes === null) {
    result.innerHTML = `<li class="no-result">Aucun résultat</li>`;
  }

  for (let i = 0; i < recipes.length; i++) {
    let ingredients = [];
    let appliances = [];
    let recipe = recipes[i];
    // console.log(recipe);

    // console.log(recipe.appliance);
    // console.log(recipe.description);
    // console.log(recipe.name);
    // console.log(recipe.time);
    console.log(recipe.ingredients);

    for (let j = 0; j < recipe.ingredients.length; j++) {
      let detailsIngredients = recipe.ingredients[j];

      console.log(detailsIngredients);

      ingredients.push(
        `<li><b>${detailsIngredients.ingredient}:</b> ${
          detailsIngredients.quantity
            ? detailsIngredients.quantity
            : detailsIngredients.quantite
        } ${detailsIngredients.unit ? detailsIngredients.unit : ""}`
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
