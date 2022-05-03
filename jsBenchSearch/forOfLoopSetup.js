//Boucle de recherche par mots
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

function filterAction() {
  // tableau des index qui correspondent
  let arrayFilteredRecipeIndex = [];

  recipes.forEach((elem, index) => {
    let isValidWord = searchWords(elem);

    if (isValidWord) {
      arrayFilteredRecipeIndex.push(index);
    }
  });
}

searchFilter("coco", "poulet");
