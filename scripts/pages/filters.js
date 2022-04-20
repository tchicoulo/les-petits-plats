import { recipes } from "../../data/recipes.js";
import { filters } from "./searchBar.js";
import { filterAction } from "./searchBar.js";
import { cleanString } from "./utils.js";

function targetListTags(tag) {
  const tagsElement = document.querySelectorAll(`.${tag}-list li`);

  for (let i = 0; i < tagsElement.length; i++) {
    tagsElement[i].addEventListener("click", () => {
      addFilterIngredientTag(i, tagsElement);
    });
  }
}

function tagsSanify(arrayFilteredRecipeIndex) {
  let uniqueIngredientsSet = new Set();
  let uniqueAppliancesSet = new Set();
  let uniqueUtensilsSet = new Set();

  for (let i = 0; i < arrayFilteredRecipeIndex.length; i++) {
    let recipeIndex = arrayFilteredRecipeIndex[i];

    let recipe = recipes[recipeIndex];

    //Sanify ingredients
    for (let j = 0; j < recipe.ingredients.length; j++) {
      let detailsIngredients = recipe.ingredients[j];

      if (detailsIngredients.quantity) {
        //normaliser les ingrédients et les mettre en minuscule
        let detailsIngredientsNormalize = cleanString(
          detailsIngredients.ingredient
        );

        uniqueIngredientsSet.add(detailsIngredientsNormalize);
      }
    }

    //Sanify appliances
    let detailsAppliances = recipe.appliance;

    let detailsAppliancesNormalize = cleanString(detailsAppliances);

    uniqueAppliancesSet.add(detailsAppliancesNormalize);

    //Sanify utensils
    for (let j = 0; j < recipe.ustensils.length; j++) {
      let detailsUtensils = recipe.ustensils[j];

      let detailsUtensilsNormalize = cleanString(detailsUtensils);

      uniqueUtensilsSet.add(detailsUtensilsNormalize);
    }
  }

  //Sort(), filter() and addFisrtMaj function on each list
  filters.ingredients = Array.from(uniqueIngredientsSet).sort();
  filters.ingredients = filters.ingredients.filter(
    (e) => e !== "bananes" && e !== "huile d'olive" && e !== "kiwi"
  );
  addFirstMajOnEachStringInArray(filters.ingredients);

  filters.appliances = Array.from(uniqueAppliancesSet).sort();
  filters.appliances = filters.appliances.filter(
    (e) => e !== "casserole" && e !== "casserolle."
  );
  addFirstMajOnEachStringInArray(filters.appliances);

  filters.utensils = Array.from(uniqueUtensilsSet).sort();

  addFirstMajOnEachStringInArray(filters.utensils);

  filterTagsDisplay("ingredients");
  filterTagsDisplay("appliances");
  filterTagsDisplay("utensils");
  targetListTags("ingredients");
  targetListTags("appliances");
  targetListTags("utensils");
}

function addFirstMajOnEachStringInArray(array) {
  for (let i = 0; i < array.length; i++) {
    array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1);
  }
}

function filterTagsDisplay(tag) {
  let list = document.querySelector(`.${tag}-list`);
  list.innerHTML = "";

  for (let i = 0; i < filters[tag].length; i++) {
    list.innerHTML += `<li>${filters[tag][i]}</li>`;
  }
}

function addFilterIngredientTag(i, tagsElement) {
  const filterTag = document.querySelector(".tag");
  tagsElement[i].remove();

  filters.searchWord.push(tagsElement[i].innerHTML);
  filters.searchTag.push(tagsElement[i].innerHTML);
  console.log(filters.searchWord);

  const divTag = document.createElement("div");
  divTag.classList.add("filtered-details");
  divTag.innerHTML = `<span>${tagsElement[i].innerHTML}</span>`;
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
  filters.searchTag = filters.searchTag.filter(
    (tag) => tag !== valueTagDeleted
  );
  console.log(filters.searchWord);
  console.log(filters.searchTag);

  filterAction();
}

export { tagsSanify };
