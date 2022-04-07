import { recipes } from "../../../../data/recipes.js";
import { mealsDisplay } from "../mealsDisplay.js";
//Supprime les ingredients sans quantité et uniformise les données
function initData() {
  let arrayFilteredRecipeIndex = [];

  let uniqueIngredientsList = [];

  let uniqueIngredientsSet = new Set();
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
        //normaliser les ingrédients et les mettre en minuscule
        let detailsIngredientsNorm = detailsIngredients.ingredient
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();

        arrayIngredients.push(detailsIngredients);
        uniqueIngredientsSet.add(detailsIngredientsNorm);
      }
    }
    recipe["ingredients"] = arrayIngredients;
  }
  console.log(arrayFilteredRecipeIndex);
  // uniqueIngredientsList = Array.from(uniqueIngredientsSet).sort();

  mealsDisplay(arrayFilteredRecipeIndex);
}

export { initData, mealsDisplay };
