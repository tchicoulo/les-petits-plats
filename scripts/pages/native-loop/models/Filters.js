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

setTimeout(() => {
  const ingredientElement = document.querySelectorAll(".ingredients-list li");
  for (let i = 0; i < ingredientElement.length; i++) {
    ingredientElement[i].addEventListener("click", () => {
      console.log(ingredientElement[i].textContent);
      ingredientElement[i].remove();
    });
  }
}, 300);

function filterIngredients(ingredientNameList, arrayFilteredRecipeIndex) {
  console.log(ingredientNameList);
  console.log(arrayFilteredRecipeIndex);
  console.log("ok");

  ingredientsDisplay(ingredientNameList);
}

export { filterIngredients };
