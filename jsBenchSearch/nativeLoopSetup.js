function searchWords(recipe) {
  const search = filters.searchWord;

  //Boucle de recherche par mots
  for (let searchIndex = 0; searchIndex < search.length; searchIndex++) {
    let searchWord = search[searchIndex];

    const searchWordNormalized = cleanString(searchWord);
    const recipeNameNormalized = cleanString(recipe.name);
    const recipeDescriptionNormalized = cleanString(recipe.description);
    const recipeApplianceNormalized = cleanString(recipe.appliance);

    if (recipeNameNormalized.indexOf(searchWordNormalized) !== -1) {
      continue;
    } else if (
      recipeDescriptionNormalized.indexOf(searchWordNormalized) !== -1
    ) {
      continue;
    } else if (recipeApplianceNormalized.indexOf(searchWordNormalized) !== -1) {
      continue;
    } else {
      // hasResultIngredient = mot présent dans un ingredient
      // hasResultUtensils = mot présent dans un ustensile
      let hasResultIngredient = false;
      let hasResultUtensils = false;

      for (let j = 0; j < recipe.ingredients.length; j++) {
        const recipeIngredientsNormalized = cleanString(
          recipe.ingredients[j].ingredient
        );

        if (recipeIngredientsNormalized.indexOf(searchWordNormalized) !== -1) {
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

        if (recipeUtensilNormalized.indexOf(searchWordNormalized) !== -1) {
          hasResultUtensils = true;
          break;
        }
      }
      // si mot trouvé dans ustensils, on cherche le mot suivant
      if (hasResultUtensils) {
        continue;
      }
      // mot non trouvé
      return false;
    }
  }
  return true;
}

function filterAction() {
  // tableau des index qui correspondent
  let arrayFilteredRecipeIndex = [];

  for (let i = 0; i < recipes.length; i++) {
    let recipe = recipes[i];
    let isValidWord = searchWords(recipe);

    if (isValidWord) {
      arrayFilteredRecipeIndex.push(i);
    }
  }
  console.log(arrayFilteredRecipeIndex);
}

searchFilter("coco", "poulet");
