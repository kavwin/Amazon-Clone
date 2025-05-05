// import {cart, removeFromCart, calculateCartQuantity, updateCartQuantity, updateDeliveryOptionId} from '../../data/cart.js';
import cart from '../../data/cart-class.js';
import {products} from '../../data/products.js';
import formatCurrency from '../utils/money.js';
import {deliveryOptions, calculateDeliveryDate} from '../../data/deliveryOption.js';
import {renderPaymentSummary} from './paymentSummary.js';


export function renderOrderSummary(){
    let cartSummaryHTML="";

    cart.cartItems.forEach((cartItems)=>{

        const productId=cartItems.productId
        let matchingProduct;
        products.forEach((productsItem)=>{
            if(productsItem.id===productId){
                matchingProduct=productsItem;
            }
        });

        let deliveryOptionId=cartItems.deliveryOptionId;
        let matchedDeliveryOptionId;

        deliveryOptions.forEach((deliveryOptions)=>{
            if(deliveryOptions.id===deliveryOptionId){
                matchedDeliveryOptionId=deliveryOptions;
            }
        });
        
        cartSummaryHTML+= 
        `
            <div class="cart-item-container js-cart-item-container-${matchingProduct.id}" data-cartProduct-id-${matchingProduct.id} >
                <div class="delivery-date js-delivery-date">
                    Delivery date: ${calculateDeliveryDate(matchedDeliveryOptionId)}
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image"
                    src="${matchingProduct.image}">

                    <div class="cart-item-details">
                    <div class="product-name">
                    ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                    ${matchingProduct.getPrice()}
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

                    <div class="delivery-options ">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        ${deliveryOptionsGenerator(matchingProduct, cartItems)}
                    </div>
                </div>
            </div>
        
        `;

    });

    document.querySelector(".js-order-summary").innerHTML=cartSummaryHTML;

    function deliveryOptionsGenerator(matchingProduct, cartItems){
        let deliveryHtml="";
        deliveryOptions.forEach((deliveryOptions)=>{
            renderPaymentSummary();
            
            let deliveryPrice=deliveryOptions.priceCents;

            const priceString= deliveryPrice == 0 ? "FREE" :`$${formatCurrency(deliveryPrice)} -`;
            
            let isChecked=deliveryOptions.id===cartItems.deliveryOptionId;
        
            deliveryHtml+=
            `
                <div class="delivery-option js-deliver-option"
                    data-product-id="${matchingProduct.id}"
                    data-delivery-option-id="${deliveryOptions.id}"
                >
                    <input type="radio" 
                    ${isChecked ? "checked":""}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date js-delivery-option-date">
                    ${calculateDeliveryDate(deliveryOptions)}
                </div>
                
                <div class="delivery-option-price">
                    ${priceString} Shipping
                </div>
                
                </div>
                
                </div> 
            `;
        });
        return deliveryHtml;
    }

    cart.calculateCartQuantity();

    document.querySelectorAll(".js-delete-link").forEach((deleteLink)=>{
        deleteLink.addEventListener('click',()=>{
            const productId=deleteLink.dataset.productId;

            cart.removeFromCart(productId);
            renderOrderSummary();
            cart.calculateCartQuantity();
            renderPaymentSummary();
        
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
            renderPaymentSummary();


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
            renderPaymentSummary();
        });
    });

    document.querySelectorAll('.js-deliver-option').forEach((element)=>{
            element.addEventListener('click',()=>{

                const{productId, deliveryOptionId}=element.dataset
                updateDeliveryOptionId(productId, deliveryOptionId);
                
                // let updatedDeliveryOption=element.querySelector('.js-delivery-option-date').textContent;
                // let parentEleOfCartHtml=element.closest(`.js-cart-item-container-${productId}`);
                // parentEleOfCartHtml.querySelector(".js-delivery-date").innerHTML=updatedDeliveryOption;

                renderOrderSummary();
            });

    });

}







