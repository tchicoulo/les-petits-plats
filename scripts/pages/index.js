console.log("ça fonctionne");

const filterContainers = document.querySelectorAll(".filter-container");

console.log(filterContainers);

filterContainers.forEach((filterContainer, index) => {
  filterContainer.addEventListener("click", (e) => openFilter(e, index));
});

function openFilter(e, index) {
  console.log(e);
  console.log(index);
  console.log("openFilter ok");
}
