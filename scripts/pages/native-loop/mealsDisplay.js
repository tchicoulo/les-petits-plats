import { recipes } from "../../../data/recipes.js";

let arrayFilteredRecipeIndex = [];
let uniqueIngredientsList = [];

const searchContainer = document.querySelector(".search-container input");

searchContainer.addEventListener("input", (e) => {
  if (e.target.value.length >= 3) {
    searchFilter(e);
  } else if (e.target.value.length === 0) {
    initData();
  }
  mealsDisplay();
});

//Supprime les ingredients sans quantité et uniformise les données
function initData() {
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
        arrayIngredients.push(detailsIngredients);
        uniqueIngredientsSet.add(detailsIngredients.ingredient);
      }
    }
    recipe["ingredients"] = arrayIngredients;
  }
  uniqueIngredientsList = Array.from(uniqueIngredientsSet).sort();

  console.log(uniqueIngredientsList);
  mealsDisplay();
}

// Recherche les index de recettes par mots clés
function searchFilter(e) {
  // tableau des index qui correspondent
  arrayFilteredRecipeIndex = [];

  //tableau des mots inscrits dans l'input
  const search = e.target.value.split(" ");

  //transformer search pour la casse en maj et sans accents

  for (let i = 0; i < recipes.length; i++) {
    let recipe = recipes[i];

    let isValid = searchWords(recipe, search);

    //
    if (isValid) {
      arrayFilteredRecipeIndex.push(i);
    }
  }
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

function mealsDisplay() {
  const result = document.getElementById("result");
  result.innerHTML = "";

  for (let i = 0; i < arrayFilteredRecipeIndex.length; i++) {
    let recipeIndex = arrayFilteredRecipeIndex[i];

    let ingredients = [];
    // let appliances = [];
    // let utensils = [];
    let recipe = recipes[recipeIndex];

    for (let j = 0; j < recipe.ingredients.length; j++) {
      let detailsIngredients = recipe.ingredients[j];
      let quantity = detailsIngredients.quantity;

      ingredients.push(
        `<li><b>${detailsIngredients.ingredient}: </b>${quantity} ${
          detailsIngredients.unit ? detailsIngredients.unit : ""
        }`
      );
    }

    result.innerHTML += `<li class="card">
          <img
          src="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          alt="image static"
          />
          <div class="card-info">
          <div class="card-title">
          <h1>${recipe.name}</h1>
          <img src="./assets/icons/time.svg" alt="Logo temps de cuisson" />
          <span>${recipe.time} min</span>
          </div>
          <div class="card-description">
          <ul>${ingredients.join("")}</ul>
              <p>${recipe.description}</p>
            </div>
          </div>
          </li>`;
  }
}

let inputIngredient = document.getElementById("ingredients");

inputIngredient.addEventListener("input", (e) => {
  let filteredIngredient = genericFilterSearch(
    uniqueIngredientsList,
    e.target.value
  );
  ingredientsDisplay(filteredIngredient);
});

function ingredientsDisplay(ingredientNameList) {
  let ingredientList = document.querySelector(".ingredients-list");
  ingredientList.innerHTML = "";
  for (let i = 0; i < ingredientNameList.length; i++) {
    ingredientList.innerHTML += `<li>${ingredientNameList[i]}</li>`;
  }
}

// function genericFilterSearch(listText, search) {
//   let searchListWord = search.split(" ");
//   let validText = [];
//   for (
//     let listTextIndex = 0;
//     listTextIndex < listText.length;
//     listTextIndex++
//   ) {
//     let hasAllWord = false;
//     let text = listText[listTextIndex];
//     for (
//       let searchIndex = 0;
//       searchIndex < searchListWord.length;
//       searchIndex++
//     ) {
//       let searchWord = search[searchIndex];
//       if (text.includes(searchWord)) {
//         continue;
//       }
//       hasAllWord = true;
//     }
//     if (hasAllWord) {
//       validText.push(listText[listTextIndex]);
//     }
//   }
//   console.log(validText);
//   return validText;
// }

initData();
ingredientsDisplay(uniqueIngredientsList);
