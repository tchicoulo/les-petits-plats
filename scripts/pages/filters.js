import { recipes } from "../../data/recipes.js";
import { filters } from "./searchBar.js";
import { filterAction } from "./searchBar.js";

function targetListIngredients() {
  const ingredientElement = document.querySelectorAll(".ingredients-list li");
  for (let i = 0; i < ingredientElement.length; i++) {
    ingredientElement[i].addEventListener("click", () => {
      addFilterIngredientTag(i, ingredientElement);
    });
  }
}

function ingredientsDisplay(arrayFilteredRecipeIndex) {
  let ingredientList = document.querySelector(".ingredients-list");
  let ingredientsTags = [];
  let uniqueIngredientsSet = new Set();
  ingredientList.innerHTML = "";

  for (let i = 0; i < arrayFilteredRecipeIndex.length; i++) {
    let recipeIndex = arrayFilteredRecipeIndex[i];

    let recipe = recipes[recipeIndex];

    for (let j = 0; j < recipe.ingredients.length; j++) {
      let detailsIngredients = recipe.ingredients[j];

      if (detailsIngredients.quantity) {
        //normaliser les ingrédients et les mettre en minuscule
        let detailsIngredientsNormalize = detailsIngredients.ingredient
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();

        ingredientsTags.push(detailsIngredientsNormalize);
        uniqueIngredientsSet.add(detailsIngredientsNormalize);
      }
    }
  }
  filters.ingredients = Array.from(uniqueIngredientsSet).sort();
  console.log(filters.ingredients);

  for (
    let uniqueIngredient = 0;
    uniqueIngredient < filters.ingredients.length;
    uniqueIngredient++
  ) {
    ingredientList.innerHTML += `<li>${filters.ingredients[uniqueIngredient]}</li>`;
  }
  targetListIngredients();
}

function appliancesDisplay(arrayFilteredRecipeIndex) {
  let appliancesList = document.querySelector(".appliances-list");
  let appliancesTags = [];

  let uniqueAppliancesSet = new Set();
  let uniqueAppliancesList = [];
  appliancesList.innerHTML = "";

  for (let i = 0; i < arrayFilteredRecipeIndex.length; i++) {
    let recipeIndex = arrayFilteredRecipeIndex[i];
    let recipe = recipes[recipeIndex];
  }
}

function addFilterIngredientTag(i, ingredientElement) {
  const filterTag = document.querySelector(".tag");
  console.log(ingredientElement[i].innerHTML);
  ingredientElement[i].remove();

  filters.ingredients.push(ingredientElement[i].innerHTML);
  filters.searchWord.push(ingredientElement[i].innerHTML);

  console.log(filters.searchWord);

  const divTag = document.createElement("div");
  divTag.classList.add("filtered-details");
  divTag.innerHTML = `<span>${ingredientElement[i].innerHTML}</span>`;
  const deleteTag = document.createElement("img");
  deleteTag.classList.add("delete-selected-filter");
  deleteTag.setAttribute("src", "./assets/icons/delete.svg");
  divTag.appendChild(deleteTag);
  filterTag.appendChild(divTag);

  deleteTag.addEventListener("click", () => {
    deleteFilterTag(divTag);
  });

  filterAction();
}

function deleteFilterTag(divTag) {
  let valueTagDeleted = divTag.firstChild.innerHTML;
  divTag.remove();
  filters.searchWord = filters.searchWord.filter(
    (tag) => tag !== valueTagDeleted
  );
  console.log(filters.searchWord);
  filters.ingredients = filters.ingredients.filter(
    (ingredient) => ingredient !== valueTagDeleted
  );
  console.log(filters.ingredients);
  if (filters.searchWord.length === 0) {
    console.log("vide.");
  }
  filterAction();
}

export { ingredientsDisplay, appliancesDisplay };
