import { recipes } from "../../data/recipes.js";
import { mealsDisplay } from "./mealsDisplay.js";
import { tagsSanify } from "./filters.js";
import { filtersRules } from "./filtersRules.js";
import { cleanString } from "./utils.js";

const filters = filtersRules();

// Recherche les index de recettes par mots clés
function searchFilter(e) {
  filters.searchWord = e.target.value.split(" ");
  filters.searchWord.push(...filters.searchTag);
  filterAction();
}

function filterAction() {
  // tableau des index qui correspondent
  let arrayFilteredRecipeIndex = [];

  recipes.forEach((elem, index) => {
    let isValidWord = searchWords(elem);

    if (isValidWord) {
      arrayFilteredRecipeIndex.push(index);
    }
  });
  tagsSanify(arrayFilteredRecipeIndex);
  mealsDisplay(arrayFilteredRecipeIndex);
}

/**
 * indiquer si les mots sont présents dans la recettes
 * @param {object} recipe objet de la recette
 * @param {string[]} search tableau des mots a rechercher
 * @param {string[]} words = tableau regroupant tous les mots dans le titre, la description, appareils, ingrédients, ustensils
 * @return {boolean} true : si tous les mots sont trouvés
 */

function searchWords(recipe) {
  const search = filters.searchWord;

  //Boucle de recherche par mots
  for (let searchWord of search) {
    let words = `${cleanString(recipe.name)} ${cleanString(
      recipe.description
    )} ${cleanString(recipe.appliance)}`;

    for (let ingredient of recipe.ingredients) {
      words = words.concat(" ", cleanString(ingredient.ingredient));
    }
    for (let ustensil of recipe.ustensils) {
      words = words.concat(" ", cleanString(ustensil));
    }
    // si mot trouvé dans ustensils ou ingredient, on cherche le mot suivant
    words = new Set(words.split(" "));
    words = [...words].filter((word) => word.length > 2);
    words = words.toString();

    if (words.includes(cleanString(searchWord))) {
      continue;
    }
    return false;
  }
  return true;
}

export { searchFilter, filterAction };
export { filters };
