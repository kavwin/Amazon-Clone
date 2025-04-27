export function renderCheckoutHeaderQuantity(cartQuantity){
    let checkoutCartQuantity=document.querySelector(".js-checkoutCart-quantity");
    if(checkoutCartQuantity){
      checkoutCartQuantity.innerHTML=`${cartQuantity} Items`
    };
}

