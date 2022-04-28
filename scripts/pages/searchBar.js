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
 * @return {boolean} true : si tous les mots sont trouvés
 */

function searchWords(recipe) {
  const search = filters.searchWord;

  //Boucle de recherche par mots

  for (let searchWord of search) {
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
      // hasResultUtensils = mot présent dans un ustensile
      let hasResultIngredient = false;
      let hasResultUtensils = false;

      for (let ingredient of recipe.ingredients) {
        const recipeIngredientsNormalized = cleanString(ingredient.ingredient);

        if (recipeIngredientsNormalized.includes(searchWordNormalized)) {
          hasResultIngredient = true;
          break;
        }
      }

      for (let ustensil of recipe.ustensils) {
        const recipeUtensilNormalized = cleanString(ustensil);

        if (recipeUtensilNormalized.includes(searchWordNormalized)) {
          hasResultUtensils = true;
          break;
        }
      }
      // si mot trouvé dans ustensils ou ingredient, on cherche le mot suivant
      if (
        hasResultIngredient ||
        hasResultUtensils ||
        (hasResultIngredient && hasResultUtensils)
      ) {
        continue;
      } else {
        // mot non trouvé
        return false;
      }
    }
  }
  return true;
}

export { searchFilter, filterAction };
export { filters };
