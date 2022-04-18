import { recipes } from "../../data/recipes.js";
import { mealsDisplay } from "./mealsDisplay.js";
import { tagsSanify } from "./filters.js";
import { filtersRules } from "./filtersRules.js";

const filters = filtersRules();

// Recherche les index de recettes par mots clés
function searchFilter(e) {
  filters.searchWord = e.target.value.split(" ");
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
      console.log(arrayFilteredRecipeIndex);
    }
    // if (isValidTag) {
    //   arrayFilteredRecipeIndex.push(i);
    //   console.log(arrayFilteredRecipeIndex);
    // }
  }
  tagsSanify(arrayFilteredRecipeIndex);
  mealsDisplay(arrayFilteredRecipeIndex);
}

// function containsTags(recipe) {
//   if (filters.ingredients.length > 0) {
//     for (let i = 0; i < filters.ingredients.length; i++) {
//       let searchedIngredient = filters.ingredients[i].toLowerCase();
//       let hasIngredient = false;
//       for (let j = 0; j < recipe.ingredients.length; j++) {
//         let actualIngredient = recipe.ingredients[j].ingredient;
//         if (actualIngredient.toLowerCase() === searchedIngredient) {
//           hasIngredient = true;
//           break;
//         }
//       }

//       if (!hasIngredient) {
//         return false;
//       }
//     }
//   }

//   // if (filters.appliances.length > 0) {
//   //   //todo
//   // }

//   // if (filters.utensils.length > 0) {
//   //   //todo
//   // }
//   return true;
// }

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

    const searchWordNormalized = searchWord
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    const recipeNameNormalized = recipe.name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    const recipeDescriptionNormalized = recipe.description
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    if (recipeNameNormalized.includes(searchWordNormalized)) {
      continue;
    } else if (recipeDescriptionNormalized.includes(searchWordNormalized)) {
      continue;
    } else {
      // hasResult = mot présent dans un ingredient
      let hasResult = false;

      for (let j = 0; j < recipe.ingredients.length; j++) {
        const recipeIngredientsNormalized = recipe.ingredients[j].ingredient
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();

        if (recipeIngredientsNormalized.includes(searchWordNormalized)) {
          // mot tapé dans l'input présent dans l'ingrédient
          hasResult = true;
          break;
        }
      }
      // si mot trouvé, on cherche le mot suivant
      if (hasResult) {
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
