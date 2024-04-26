let bigImg = document.querySelector(".big-img img");
function showImg(pic) {
  bigImg.src = pic;
}

const image = document.querySelectorAll(".preview img");
const plusBtn = document.querySelector("#plus");
const minusBtn = document.querySelector("#minus");
const amount = document.querySelector(".amount");
const addBtn = document.querySelector(".add_btn");
const headline = document.getElementById("headline");
const title = document.querySelector(".title");
const oldPrice = document.querySelector(".old-price");
const price = document.querySelector(".now");
const para = document.querySelector(".info");
const vendor = document.querySelector(".company");
const sizes = document.querySelector(".size");
let amountValue = 0;
let currentImg = 1;

function handlePlus() {
  amountValue = amountValue + 1;
  amount.innerText = amountValue;
}
function handleMinus() {
  if (amountValue > 0) {
    amountValue--;
  }
  amount.innerText = amountValue;
}
function addItem() {
  if (amountValue > 0) {
    headline.style.display = "block";
  }
}

let orignalPrice, givenPrice, discount;

async function fetchApi() {
  const res = await fetch(
    `https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448`
  );
  const data = await res.json();

  for (i = 0; i < data.product.images.length; i++) {
    image.src = data.product.images[i].src;
  }

  for (i = 0; i < data.product.options[1].length; i++) {
    sizes.innerText = data.product.options[1].values[i];
  }

  title.innerText = data.product.title;
  oldPrice.innerText = data.product.compare_at_price;
  para.innerText = data.product.description
    .replace('<p data-mce-fragment="1">', "")
    .replace("</p>", "");
  price.innerText = data.product.price;
  vendor.innerText = data.product.vendor;

  orignalPrice = data.product.price;
  givenPrice = data.product.compare_at_price;
  discount = ((orignalPrice - givenPrice) / 100) * 100;
}

fetchApi();
