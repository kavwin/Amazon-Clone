import {cart} from '../../data/cart.js';
import {products} from '../../data/products.js';
import formatCurrency from '../utils/money.js';
import {deliveryOptions} from '../../data/deliveryOption.js';

let paymentSummaryHtml="";
export function renderPaymentSummary(){
    
    let productsPrice=0;
    let itemsInCart=0;
    let deliveryPrice=0;

    let totalBeforeTax=0, tax=0, final=0;

    cart.forEach((element) => {

        let productQuantity=element.quantity;
        let productId=element.productId;
        let deliverytId=element.deliveryOptionId;

        itemsInCart =itemsInCart + productQuantity;

        products.forEach((products)=>{
            if(products.id===productId){
                productsPrice+=Number(formatCurrency(products.priceCents *productQuantity));    
            }
        });

        deliveryOptions.forEach((deliveryOptions)=>{
            if(deliverytId===deliveryOptions.id){
                deliveryPrice+=Number(formatCurrency(deliveryOptions.priceCents));

            }
        });
        
        totalBeforeTax=productsPrice+deliveryPrice;
        tax=Number((totalBeforeTax/10).toFixed(2));
        final=Number((totalBeforeTax+tax).toFixed(2));
    });

  paymentSummaryHtml=
            `   
                <div class="payment-summary-title">
                    Order Summary
                </div>
                <div class="payment-summary-row">
                    <div>Items (${itemsInCart}):</div>
                    <div class="payment-summary-money">$${productsPrice.toFixed(2)}</div>
                </div>

                <div class="payment-summary-row">
                    <div>Shipping &amp; handling:</div>
                    <div class="payment-summary-money">$${deliveryPrice}</div>
                </div>

                <div class="payment-summary-row subtotal-row">
                    <div>Total before tax:</div>
                    <div class="payment-summary-money">$${totalBeforeTax.toFixed(2)}</div>
                </div>

                <div class="payment-summary-row">
                    <div>Estimated tax (10%):</div>
                    <div class="payment-summary-money">$${tax}</div>
                </div>

                <div class="payment-summary-row total-row">
                    <div>Order total:</div>
                    <div class="payment-summary-money">$${final}</div>
                </div>

                <button class="place-order-button button-primary">
                    Place your order
                </button>    
            `;
    document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHtml
}
