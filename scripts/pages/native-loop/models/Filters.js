// import { uniqueIngredientsList } from "../mealsDisplay.js";

// let inputIngredient = document.getElementById("ingredients");

// inputIngredient.addEventListener("input", (e) => {
//   // let filteredIngredient = genericFilterSearch(
//   //   uniqueIngredientsList,
//   //   e.target.value
//   // );
//   ingredientsDisplay(filteredIngredient);
// });

function ingredientsDisplay(ingredientNameList) {
  let ingredientList = document.querySelector(".ingredients-list");
  ingredientList.innerHTML = "";
  for (let i = 0; i < ingredientNameList.length; i++) {
    ingredientList.innerHTML += `<li>${ingredientNameList[i]}</li>`;
  }
}

export { ingredientsDisplay };
