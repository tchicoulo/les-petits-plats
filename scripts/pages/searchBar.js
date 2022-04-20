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

  for (let i = 0; i < recipes.length; i++) {
    let recipe = recipes[i];
    let isValidWord = searchWords(recipe);
    // let isValidTag = containsTags(recipe);

    if (isValidWord) {
      arrayFilteredRecipeIndex.push(i);
    }
  }
  tagsSanify(arrayFilteredRecipeIndex);
  mealsDisplay(arrayFilteredRecipeIndex);
}

/**
 * indiquer si les mots sont présents dans la recettes
 * @param {object} recipe objet de la recette
 * @param {string[]} search tableau des mots a rechercher
 * @returns {boolean} true : si tous les mots sont trouvés
 */

function searchWords(recipe) {
  const search = filters.searchWord;

  //Boucle de recherche par mots
  for (let searchIndex = 0; searchIndex < search.length; searchIndex++) {
    let searchWord = search[searchIndex];

    const searchWordNormalized = cleanString(searchWord);
    const recipeNameNormalized = cleanString(recipe.name);
    const recipeDescriptionNormalized = cleanString(recipe.description);
    const recipeApplianceNormalized = cleanString(recipe.appliance);

    if (recipeNameNormalized.includes(searchWordNormalized)) {
      continue;
    } else if (recipeDescriptionNormalized.includes(searchWordNormalized)) {
      continue;
    } else if (recipeApplianceNormalized.includes(searchWordNormalized)) {
      continue;
    } else {
      // hasResultIngredient = mot présent dans un ingredient
      // hasResultUtensils = mot présent dans un ingredient
      let hasResultIngredient = false;
      let hasResultUtensils = false;

      for (let j = 0; j < recipe.ingredients.length; j++) {
        const recipeIngredientsNormalized = cleanString(
          recipe.ingredients[j].ingredient
        );

        if (recipeIngredientsNormalized.includes(searchWordNormalized)) {
          hasResultIngredient = true;
          break;
        }
      }
      // si mot trouvé dans ingredient, on cherche le mot suivant
      if (hasResultIngredient) {
        continue;
      }

      for (let j = 0; j < recipe.ustensils.length; j++) {
        const recipeUtensilNormalized = cleanString(recipe.ustensils[j]);

        if (recipeUtensilNormalized.includes(searchWordNormalized)) {
          hasResultUtensils = true;
          break;
        }
      }
      // si mot trouvé dans ustensils, on cherche le mot suivant
      if (hasResultUtensils) {
        continue;
      }
      // mot non trouvé, recette rejeté
      return false;
    }
  }
  return true;
}

export { searchFilter, filterAction };
export { filters };
