//display de carrossel para os itens
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

function handleDropdownClass(item) {
  //mostrar dados a mais do item

  const dropdownButton = item.children[0].children[2].children[1];
  const dropdownData = item.children[0].children[3];
  const dropdownImg = item.children[0].children[2].children[1];

  let hide = true;

  function toggleDropdownDataClass() {
    if (hide) {
      dropdownData.classList.add("item-dropdown-data-show");
      dropdownData.classList.remove("item-dropdown-data-hide");
      dropdownImg.setAttribute("src", "assets/up-arrow-svgrepo-com (1).svg");
    } else {
      dropdownData.classList.remove("item-dropdown-data-show");
      dropdownData.classList.add("item-dropdown-data-hide");
      dropdownImg.setAttribute("src", "assets/down-arrow-svgrepo-com.svg");
    }
  }

  dropdownButton.addEventListener("click", () => {
    toggleDropdownDataClass();
    hide = !hide;
  });
}

function transferDataFromJsToHtml(item, data) {
  //passar dados do js para o html
  const item_content = item.children[0];
  const [img, title, price, dropdownData] = item_content.children;

  img.setAttribute("src", `${data.foto}`);
  title.innerHTML = data.nome;

  const formattedPrice = data.preco.replace(".", ",").padEnd(5, "0");
  price.children[0].innerHTML = `R$ ${formattedPrice}`;

  dropdownData.children[0].innerHTML = `Intensidade : ${data.intensidade}`;
  dropdownData.children[1].innerHTML = data.descricao;
}

function handleEachItem(item, data) {
  transferDataFromJsToHtml(item, data);
  handleDropdownClass(item);
}

//http request

async function getData(id) {
  const response = await fetch(
    `https://entregavel.polijrinternal.com/produtos/${id}`
  );

  const data = await response.json();
  return data;
}

const items = document.querySelectorAll(".item");
let id = -1;

items.forEach(async (item) => {
  id += 1;
  const data = await getData(id);
  handleEachItem(item, data);
});
