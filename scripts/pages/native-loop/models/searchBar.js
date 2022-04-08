import { recipes } from "../../../../data/recipes.js";
import { mealsDisplay } from "../mealsDisplay.js";
import { filterIngredients } from "./filters.js";

// Recherche les index de recettes par mots clés
function searchFilter(e, arrayFilteredRecipeIndex) {
  // tableau des index qui correspondent
  arrayFilteredRecipeIndex = [];
  //tableau des mots inscrits dans l'input
  const search = e.target.value.split(" ");
  //transformer search pour la casse en maj et sans accents
  for (let i = 0; i < recipes.length; i++) {
    let recipe = recipes[i];
    let isValid = searchWords(recipe, search);

    if (isValid) {
      arrayFilteredRecipeIndex.push(i);
    }
  }
  filterIngredients(arrayFilteredRecipeIndex);
  mealsDisplay(arrayFilteredRecipeIndex);
}

/**
 * indiquer si les mots sont présents dans la recettes
 * @param {object} recipe objet de la recette
 * @param {string[]} search tableau des mots a rechercher
 * @returns {boolean} true : si tous les mots sont trouvés
 */

function searchWords(recipe, search) {
  //Boucle de recherche par mots
  for (let searchIndex = 0; searchIndex < search.length; searchIndex++) {
    let searchWord = search[searchIndex];

    if (recipe.name.includes(searchWord)) {
      continue;
    } else if (recipe.description.includes(searchWord)) {
      continue;
    } else {
      // hasResult = mot présent dans un ingredient
      let hasResult = false;

      for (let j = 0; j < recipe.ingredients.length; j++) {
        if (recipe.ingredients[j].ingredient.includes(searchWord)) {
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

export { searchFilter };
