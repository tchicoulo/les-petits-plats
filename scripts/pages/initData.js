import { recipes } from "../../data/recipes.js";
import { mealsDisplay } from "./mealsDisplay.js";
import { tagsSanify } from "./filters.js";

//Supprime les ingredients sans quantité et uniformise les données
function initData() {
  for (let i = 0; i < recipes.length; i++) {
    let recipe = recipes[i];

    let arrayIngredients = [];
    // let arrayAppliances = [];
    // let arrayUtensils = [];

    for (let j = 0; j < recipe.ingredients.length; j++) {
      let detailsIngredients = recipe.ingredients[j];

      if (detailsIngredients.quantite) {
        detailsIngredients["quantity"] = detailsIngredients["quantite"];
        delete detailsIngredients["quantite"];
      }

      if (detailsIngredients.quantity) {
        arrayIngredients.push(detailsIngredients);
      }
    }
    recipe["ingredients"] = arrayIngredients;
  }

  let arrayFilteredRecipeIndex = [];
  // boucle pour reset les index
  for (let i = 0; i < recipes.length; i++) {
    arrayFilteredRecipeIndex.push(i);
  }

  tagsSanify(arrayFilteredRecipeIndex);
  mealsDisplay(arrayFilteredRecipeIndex);
}

export { initData, mealsDisplay };
