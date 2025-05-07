import cart from '../data/cart-class.js';
import {products, loadProducts} from '../data/products.js';

loadProducts(renderProductsGrid);

function renderProductsGrid(){
  let productsHtml="";
  products.forEach((products)=>{
      productsHtml +=`
          <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${products.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${products.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${products.getStarsUrl()}">
              <div class="product-rating-count link-primary">
                ${products.rating.count}
              </div>
            </div>

            <div class="product-price">
            ${products.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select class="js-quantity-selector js-quantity-selector-${products.id}">
                <option value="1" >1</option>
                <option value="2" >2</option>
                <option value="3" >3</option>
                <option value="4" >4</option>
                <option value="5" >5</option>
                <option value="6" >6</option>
                <option value="7" >7</option>
                <option value="8" >8</option>
                <option value="9" >9</option>
                <option value="10" >10</option>
              </select>
            </div>

            ${products.extraInfoHtml()}

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${products.id}" >
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-addtocartBtn" data-product-id=${products.id}>
              Add to Cart
            </button>
          </div>
      `;

  });
  const addedMessageTimeouts = {};

  document.querySelector(".js-product-grid").innerHTML=productsHtml;

  cart.calculateCartQuantity();

  function addedMessage(productId){
    let added=document.querySelector(`.js-added-to-cart-${productId}`);
      added.classList.add("added-msg");

      const previousTimeoutId = addedMessageTimeouts[productId]; 
      if (previousTimeoutId) {
        clearTimeout(previousTimeoutId);
      }
      const timeoutId = setTimeout(() => {
        added.classList.remove("added-msg");
      }, 2000);
      addedMessageTimeouts[productId] = timeoutId;

  }
  document.querySelectorAll(".js-addtocartBtn").forEach((button)=>{
      button.addEventListener("click", ()=>{
          
        // const productId=button.dataset.productId; below is destructuring shortcut syntax
        const {productId}=button.dataset;

        cart.addToCart(productId);
        cart.calculateCartQuantity();
        addedMessage(productId);
      })
  })
}