import {cart, removeFromCart, calculateCartQuantity, updateCartQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';


let cartSummaryHTML="";

cart.forEach((cartItems)=>{

    const productId=cartItems.productId
    let matchingProduct;
    products.forEach((productsItem)=>{
        if(productsItem.id===productId){
            matchingProduct=productsItem;
        }
    });

    cartSummaryHTML+= 
    `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}" data-cartProduct-id-${matchingProduct.id} >
            <div class="delivery-date">
                Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                ${matchingProduct.name}
                </div>
                <div class="product-price">
                $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label js-quantity-label">${cartItems.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                    Update
                    </span>
                    <span class="link-primary">
                        <input class="quantity-input show">
                        <span class="save-quantity-link show" data-product-id="${matchingProduct.id}">Save</span>
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                <div class="delivery-option">
                    <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                        Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                        FREE Shipping
                    </div>
                    </div>
                </div>
                <div class="delivery-option">
                    <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                        Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                        $4.99 - Shipping
                    </div>
                    </div>
                </div>
                <div class="delivery-option">
                    <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                        Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                        $9.99 - Shipping
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
       
    `;
});
document.querySelector(".js-order-summary").innerHTML=cartSummaryHTML;

calculateCartQuantity();


document.querySelectorAll(".js-delete-link").forEach((deleteLink)=>{
    deleteLink.addEventListener('click',()=>{
        const productId=deleteLink.dataset.productId;

        removeFromCart(productId);

        let cartItemContainer=document.querySelector(`.js-cart-item-container-${productId}`);
        cartItemContainer.remove();

        calculateCartQuantity();
       
    });
});


document.querySelectorAll(".js-update-link").forEach((updateLink)=>{
    updateLink.addEventListener('click',()=>{
        const productId=updateLink.dataset.productId;

        let cartItemContainer=document.querySelector(`.js-cart-item-container-${productId}`);
        cartItemContainer.classList.add("is-editing-quantity");

        cartItemContainer.querySelector(".quantity-input").addEventListener('keydown',(event)=>{
            if(event.key==="Enter"){
                cartItemContainer.querySelector(".save-quantity-link").click();
            }

        });


    });
   
});
document.querySelectorAll(".save-quantity-link").forEach((saveLink)=>{
    saveLink.addEventListener('click',()=>{

        const productId=saveLink.dataset.productId;
        let cartItemContainer=document.querySelector(`.js-cart-item-container-${productId}`);
        
        const inputCartValue=cartItemContainer.querySelector(".quantity-input");
        const updatedCartValue=Number(inputCartValue.value);

        if(updatedCartValue>0 && updatedCartValue<=100){

            cartItemContainer.querySelector(".js-quantity-label").innerHTML=updatedCartValue;

            updateCartQuantity(productId,updatedCartValue);

            cartItemContainer.classList.remove("is-editing-quantity");
        }else{
            console.log("NOT VALIDD")
        }

        
    });
});





