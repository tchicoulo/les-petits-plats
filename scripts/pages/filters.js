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

function tagsSanify(arrayFilteredRecipeIndex) {
  let uniqueIngredientsSet = new Set();
  let uniqueAppliancesSet = new Set();

  for (let i = 0; i < arrayFilteredRecipeIndex.length; i++) {
    let recipeIndex = arrayFilteredRecipeIndex[i];

    let recipe = recipes[recipeIndex];

    //Sanify ingredients
    for (let j = 0; j < recipe.ingredients.length; j++) {
      let detailsIngredients = recipe.ingredients[j];

      if (detailsIngredients.quantity) {
        //normaliser les ingrédients et les mettre en minuscule
        let detailsIngredientsNormalize = detailsIngredients.ingredient
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();

        // ingredientsTags.push(detailsIngredientsNormalize);
        uniqueIngredientsSet.add(detailsIngredientsNormalize);
      }
    }
    //Sanify appliances
    console.log(recipe.appliance);
    let detailsAppliances = recipe.appliance;

    let detailsAppliancesNormalize = detailsAppliances
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .split(".")[0]
      .toLowerCase();

    uniqueAppliancesSet.add(detailsAppliancesNormalize);
  }

  filters.ingredients = Array.from(uniqueIngredientsSet).sort();
  filters.ingredients = filters.ingredients.filter(
    (e) => e !== "bananes" && e !== "huile d'olive" && e !== "kiwi"
  );

  //Add maj for each string in array
  for (let i = 0; i < filters.ingredients.length; i++) {
    filters.ingredients[i] =
      filters.ingredients[i].charAt(0).toUpperCase() +
      filters.ingredients[i].slice(1);
  }

  filters.appliances = Array.from(uniqueAppliancesSet).sort();
  filters.appliances = filters.appliances.filter((e) => e !== "casserolle");

  // Add maj
  for (let i = 0; i < filters.appliances.length; i++) {
    filters.appliances[i] =
      filters.appliances[i].charAt(0).toUpperCase() +
      filters.appliances[i].slice(1);
  }

  ingredientDisplay();
  appliancesDisplay();
  targetListIngredients();
}

function ingredientDisplay() {
  let ingredientList = document.querySelector(".ingredients-list");
  ingredientList.innerHTML = "";

  for (let i = 0; i < filters.ingredients.length; i++) {
    ingredientList.innerHTML += `<li>${filters.ingredients[i]}</li>`;
  }
}

function appliancesDisplay() {
  let appliancesList = document.querySelector(".appliances-list");
  console.log(filters.appliances);
  appliancesList.innerHTML = "";

  for (let i = 0; i < filters.appliances.length; i++) {
    appliancesList.innerHTML += `<li>${filters.appliances[i]}</li>`;
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

export { tagsSanify, appliancesDisplay };
