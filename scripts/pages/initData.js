import { recipes } from "../../data/recipes.js";
import { mealsDisplay } from "./mealsDisplay.js";
import { ingredientsDisplay, appliancesDisplay } from "./filters.js";

//Supprime les ingredients sans quantité et uniformise les données
function initData() {
  let arrayFilteredRecipeIndex = [];

  for (let i = 0; i < recipes.length; i++) {
    let recipe = recipes[i];

    arrayFilteredRecipeIndex.push(i);

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

  ingredientsDisplay(arrayFilteredRecipeIndex);
  appliancesDisplay(arrayFilteredRecipeIndex);
  mealsDisplay(arrayFilteredRecipeIndex);
}

export { initData, mealsDisplay };
