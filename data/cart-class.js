import {renderCheckoutHeaderQuantity} from '../scripts/Checkout/checkoutHeader.js';

export class Cart{
    cartItems;
    #localStorageKey;

    constructor(localStorageKey){
        this.#localStorageKey=localStorageKey;       
        this.#loadFromStorage();

    }

    #loadFromStorage(){
        this.cartItems= JSON.parse(localStorage.getItem(this.#localStorageKey));

        if(!this.cartItems){
            this.cartItems=[{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity:2,
                deliveryOptionId:"1"

            }, {
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity:1,
                deliveryOptionId:"2"
            }];
        }
    }
    saveToLocalStorage(){
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }
    addToCart(productId){
        const quantitySelector=document.querySelector(`.js-quantity-selector-${productId}`);
        const quantity=Number(quantitySelector.value);
      
        let matchingItem;
        
        this.cartItems.forEach((cartItem)=>{
          if(productId==cartItem.productId){
            matchingItem=cartItem;
          }
        });

        if(matchingItem){
          matchingItem.quantity+=quantity;
        }else{
          this.cartItems.push({
            productId,
            quantity,
            deliveryOptionId:"1"
          });
        }

        this.saveToLocalStorage()
    }

    removeFromCart(productId){
        const newCartArray=[];
        this.cartItems.forEach((cartItem)=>{
          if(cartItem.productId !== productId){
            newCartArray.push(cartItem)
          }
      
        });

        this.cartItems=newCartArray;

        this.saveToLocalStorage();
    }
    calculateCartQuantity(){
        let cartQuantity=0;
        this.cartItems.forEach((cartItem)=>{
          cartQuantity+=cartItem.quantity;
        });
        let amazonCartQuantity=document.querySelector(".js-cart-quantity");
        if(amazonCartQuantity){ 
          amazonCartQuantity.innerHTML=`${cartQuantity}`;
        }
        renderCheckoutHeaderQuantity(cartQuantity);
    }

    updateCartQuantity(productId, newQuantity){

        this.cartItems.forEach((cartItem)=>{
          if(cartItem.productId === productId){
            cartItem.quantity=newQuantity;
          }
        });

        this.saveToLocalStorage();

        this.calculateCartQuantity();
    }

    updateDeliveryOptionId(productId, deliveryOptionId){
        let matchingItem;
        this.cartItems.forEach((cartItem)=>{
          if(productId==cartItem.productId){
            matchingItem=cartItem;
          }
        });
        matchingItem.deliveryOptionId=deliveryOptionId;
      
      
        this.saveToLocalStorage();
    }

}
export const cart=new Cart("cart");
export default cart;
