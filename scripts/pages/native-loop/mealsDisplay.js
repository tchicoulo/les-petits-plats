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

  result.innerHTML = recipes.map((recipe) => {
    let ingredients = [];
    let appliances = [];
    let utensils = [];

    // for (let i = 1; i < 50; i++) {
    //   console.log(recipe);
    // }
    console.log(recipe.appliance);
    console.log(recipe.ingredients);
    console.log(recipe.ustensils);
  });
}
