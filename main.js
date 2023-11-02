import { createCartLine, showCartContent } from './lib/ui.js';

/**
 * @typedef {Object} Product
 * @property {number} id Auðkenni vöru, jákvæð heiltala stærri en 0.
 * @property {string} title Titill vöru, ekki tómur strengur.
 * @property {string} description Lýsing á vöru, ekki tómur strengur.
 * @property {number} price Verð á vöru, jákvæð heiltala stærri en 0.
 * 
 */

const products = [
  {
    id: 1,
    title: 'HTML húfa',
    description:
      'Húfa sem heldur hausnum heitum og hvíslar hugsanlega að þér hvaða element væri best að nota.',
    price: 5_000,
  },
  {
    id: 2,
    title: 'CSS sokkar',
    description: 'Sokkar sem skalast vel með hvaða fótum sem er.',
    price: 3_000,
  },
  {
    id: 3,
    title: 'JavaScript jakki',
    description: 'Mjög töff jakki fyrir öll sem skrifa JavaScript reglulega.',
    price: 20_000,
  },
];

/**
 * Bæta vöru í körfu
 * @param  {Product} product
 * @param {number} quantity 
 */
function addProductToCart(product, quantity) {
  const cartTableBodyElement = document.querySelector('.cart table tbody');

  const existingLine = cartTableBodyElement.querySelector(`tr[data-product-id="${product.id}"]`);
  
  if (!cartTableBodyElement) {
    console.warn('fann ekki .cart table');
    return;
  }
  
  if (existingLine) {

    const currentQuantity = parseInt(existingLine.dataset.quantity, 10);
    existingLine.dataset.quantity = currentQuantity + quantity;


    const quantityElement = existingLine.querySelector('.quantity');
    if (quantityElement) {
      quantityElement.textContent = existingLine.dataset.quantity;
    }
    
  } else {

    const cartLine = createCartLine(product, quantity);
    cartTableBodyElement.appendChild(cartLine);
  }


  showCartContent(true);

  updateTotalPrice();

}

function submitHandler(event) {
  // prevent submitting forms
  event.preventDefault();
  
  // find the next tr element
  const parent = event.target.closest('tr');

  const productId = Number.parseInt(parent.dataset.productId);

  // we find the good that correponds to the product identification number
  const product = products.find((i) => i.id === productId);

  if (!product) {
    return;
  }

  // the command in order to find the total amount of input
  const quantityInputElement = parent.querySelector('input');



  // on input
  const quantity = Number.parseInt(quantityInputElement.value);

  


  // add to cart
  addProductToCart(product, quantity);
  let element = document.getElementsByClassName("foo");
  element.innerText = 1 * quantity;

  // new price shown as total price
  element.textContent = `${element} kr.-`;

  updateAmount();
  updateTotalPrice();
}

// to get all forms under the class add
const addToCartForms = document.querySelectorAll('.add')

// rewrite as arrays
for (const form of Array.from(addToCartForms)) {
  // add submit to each
  form.addEventListener('submit', submitHandler);
}

// attach an event handler


document.addEventListener("DOMContentLoaded", function() {
  
  let state = 'form';
  const toggleButton = document.getElementById("toggleButton");
  const formFields = document.querySelectorAll('.form-field');
  const receiptSection = document.querySelector('.receipt');


  toggleButton.addEventListener("click", function(event) {

    event.preventDefault();

    if (state === 'form') {

      formFields.forEach(function(field) {
        field.style.display = "block";
      });
      state = 'receipt';
    } else if (state === 'receipt') {

      receiptSection.style.display = "block";
      toggleButton.style.display = "none";
    }
  });
});


function updateTotalPrice() {
  const totalPriceElement = document.querySelector('.priceTotal');

  const cartRows = document.querySelectorAll('.cart tbody tr');
  let totalSum = 0;

  // here is the for-loop that calculates the sum
  for (const line of cartRows) {
    const p = line.dataset.price
    const q = line.dataset.quantity;
    

    totalSum += p * q;
  };

  // send the result out
  totalPriceElement.textContent = `${totalSum} kr.-`;
}
updateTotalPrice();


  




