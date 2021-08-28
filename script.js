//carrossel
const gap = 16;

const carousel = document.getElementById("carousel"),
  content = document.getElementById("content"),
  next = document.getElementById("next"),
  prev = document.getElementById("prev");

next.addEventListener("click", () => {
  carousel.scrollBy(width + gap, 0);
});
prev.addEventListener("click", () => {
  carousel.scrollBy(-(width + gap), 0);
});

let width = carousel.offsetWidth;

//evitar que o botao do form dê refresh na página

const botao = document.querySelector(".form-button");

botao.addEventListener("click", (e) => {
  e.preventDefault();
});

const items = document.querySelectorAll(".item");
console.log(items);

items.forEach((item) => {
  //mostrar dados a mais do item

  const dropdownButton = item.children[0].children[2].children[1];
  const dropdownData = item.children[0].children[3];

  let hide = true;

  function toggleDropdownDataClass() {
    if (hide) {
      dropdownData.classList.add("item-dropdown-data-show");
      dropdownData.classList.remove("item-dropdown-data-hide");
    } else {
      dropdownData.classList.remove("item-dropdown-data-show");
      dropdownData.classList.add("item-dropdown-data-hide");
    }
  }

  dropdownButton.addEventListener("click", () => {
    hide = !hide;
    toggleDropdownDataClass();
  });
});
