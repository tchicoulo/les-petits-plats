import { recipes } from "../../../data/recipes.js";

console.log(recipes);

const searchContainer = document.querySelector(".search-container input");
const result = document.getElementById("result");

searchContainer.addEventListener("input", (e) => {
  mealsdisplay(e);
});

function mealsdisplay(e) {
  if (e.target.value.length >= 3) {
    for (let i = 0; i < recipes.length; i++) {
      let ingredients = [];
      let appliances = [];
      let utensils = [];
      let recipe = recipes[i];

      for (let j = 0; j < recipe.ingredients.length; j++) {
        let detailsIngredients = recipe.ingredients[j];

        // console.log(detailsIngredients);
        // if (Object.keys(detailsIngredients).length === 1) {
        // delete detailsIngredients.ingredient;
        // detailsIngredients.quantite = detailsIngredients.quantity;
        // }

        ingredients.push(
          `<li><b>${detailsIngredients.ingredient}: </b>${
            detailsIngredients.quantity
              ? detailsIngredients.quantity
              : detailsIngredients.quantite
              ? detailsIngredients.quantite
              : ""
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
}
