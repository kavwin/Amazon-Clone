// import {renderCheckoutHeaderQuantity} from '../scripts/Checkout/checkoutHeader.js';

// export let cart= JSON.parse(localStorage.getItem("cart"));
// if(!cart){
//   cart=[{
//     productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
//     quantity:2,
//     deliveryOptionId:"1"

//   },{
//     productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
//     quantity:1,
//     deliveryOptionId:"2"
//   }];
// }

// export function addToCart(productId){
//   const quantitySelector=document.querySelector(`.js-quantity-selector-${productId}`);
//   const quantity=Number(quantitySelector.value);

//   let matchingItem;
  
//   cart.forEach((cartItem)=>{
//     if(productId==cartItem.productId){
//       matchingItem=cartItem;
//     }
//   });
//   if(matchingItem){
//     matchingItem.quantity+=quantity;
//   }else{
//     cart.push({
//       productId,
//       quantity,
//       deliveryOptionId:"1"

//     });
//   }
//   saveToLocalStorage()
// }

// function saveToLocalStorage(){
//   localStorage.setItem("cart", JSON.stringify(cart));
// }

// export function removeFromCart(productId){
//   const newCartArray=[];
//   cart.forEach((cartItem)=>{
//     if(cartItem.productId !== productId){
//       newCartArray.push(cartItem)
//     }

//   });
//   cart=newCartArray;
//   saveToLocalStorage();
// }

// export function calculateCartQuantity(){
//   let cartQuantity=0;
//   cart.forEach((cartItem)=>{
//     cartQuantity+=cartItem.quantity;
//   });
//   let amazonCartQuantity=document.querySelector(".js-cart-quantity");
//   if(amazonCartQuantity){ 
//     amazonCartQuantity.innerHTML=`${cartQuantity}`;
//   }
//   renderCheckoutHeaderQuantity(cartQuantity);

// }

// export function updateCartQuantity(productId, newQuantity){

//   cart.forEach((cartItem)=>{
//     if(cartItem.productId === productId){
//       cartItem.quantity=newQuantity;
//     }
//   });
//   saveToLocalStorage();
//   calculateCartQuantity();
  
// }
// export function updateDeliveryOptionId(productId, deliveryOptionId){
//   let matchingItem;
//   cart.forEach((cartItem)=>{
//     if(productId==cartItem.productId){
//       matchingItem=cartItem;
//     }
//   });
//   matchingItem.deliveryOptionId=deliveryOptionId;


//   saveToLocalStorage();
// }


