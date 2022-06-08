import { recipes } from "../../data/recipes.js";
import { filters } from "./searchBar.js";
import { filterAction } from "./searchBar.js";
import { cleanString } from "./utils.js";

function targetListTags(tag) {
  const tagsElement = document.querySelectorAll(`.${tag}-list li`);

  for (let i = 0; i < tagsElement.length; i++) {
    tagsElement[i].addEventListener("click", () => {
      addFilterTag(i, tagsElement);
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
        uniqueIngredientsSet.add(detailsIngredients.ingredient);
      }
    }
    //Sanify appliances
    let detailsAppliances = recipe.appliance;
    uniqueAppliancesSet.add(detailsAppliances);

    //Sanify utensils
    for (let j = 0; j < recipe.ustensils.length; j++) {
      let detailsUtensils = recipe.ustensils[j];
      uniqueUtensilsSet.add(detailsUtensils);
    }
  }
  filters.ingredients = Array.from(uniqueIngredientsSet).sort();

  //Sort(), filter() and addFisrtMaj function on each list
  filters.ingredients = filters.ingredients.filter(
    (e) =>
      e !== "Bananes" &&
      e !== "Crème Fraiche" &&
      e !== "Crême fraîche" &&
      e !== "Crème Fraîche" &&
      e !== "Huile d'olives" &&
      e !== "Crème fraiche" &&
      e !== "Lait de Coco" &&
      e !== "Kiwis"
  );
  addFirstMajOnEachStringInArray(filters.ingredients);

  filters.appliances = Array.from(uniqueAppliancesSet).sort();
  filters.appliances = filters.appliances.filter(
    (e) => e !== "Casserolle" && e !== "Casserolle."
  );
  addFirstMajOnEachStringInArray(filters.appliances);

  filters.utensils = Array.from(uniqueUtensilsSet).sort();
  filters.utensils = filters.utensils.filter(
    (e) =>
      e !== "économe" &&
      e !== "cuillère en bois" &&
      e !== "poelle à frire" &&
      e !== "cuillère à Soupe"
  );
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
  //Affiche ingrédients, appareils, ustensils en fonction des recettes disponibles

  let list = document.querySelector(`.${tag}-list`);
  let inputTag = document.getElementById(`${tag}`);
  list.innerHTML = "";
  if (filters.searchTag.length !== 0) {
    //Supprimer le tag de la liste si il est selectionné
    for (let tagIndex = 0; tagIndex < filters.searchTag.length; tagIndex++) {
      filters[tag] = filters[tag].filter(
        (e) => e !== filters.searchTag[tagIndex]
      );
    }
  }
  //Affichage des tags disponibles
  for (let i = 0; i < filters[tag].length; i++) {
    list.innerHTML += `<li>${filters[tag][i]}</li>`;
  }
  if (list.childNodes.length === 0) {
    list.innerHTML = "Plus de filtres possible";
  }

  //Barre de recherche des tags
  inputTag.addEventListener("input", (e) => {
    list.innerHTML = "";

    for (let i = 0; i < filters[tag].length; i++) {
      let matchList = [];

      // Si le ou les mots inscrit dans l'input match avec les tags, on les affiche
      if (cleanString(filters[tag][i]).includes(cleanString(e.target.value))) {
        matchList.push(filters[tag][i]);
        for (let j = 0; j < matchList.length; j++) {
          list.innerHTML += `<li>${matchList[j]}</li>`;
        }
      }
    }
    //Si ça ne match pas...
    if (list.childNodes.length === 0) {
      list.innerHTML = "Aucun résultat";
    }
    targetListTags(tag);
  });
}

function addFilterTag(i, tagsElement) {
  const filterTag = document.querySelector(".tag");

  filters.searchWord.push(tagsElement[i].innerHTML);
  filters.searchTag.push(tagsElement[i].innerHTML);

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

  filterAction();
}

export { tagsSanify };
