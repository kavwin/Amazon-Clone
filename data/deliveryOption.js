import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const deliveryOptions=[{
    id:"1",
    deliveryDays:0,
    priceCents:0
}, {
    id:"2",
    deliveryDays:3,
    priceCents:499
}, {
    id:"3",
    deliveryDays:7,
    priceCents:999
}];

export function calculateDeliveryDate(matchedDeliveryOptionId){

    const today=dayjs();
    const deliveryDate=today.add(matchedDeliveryOptionId.deliveryDays, 'days');
    const deliveryDateFormat=deliveryDate.format("dddd, MMMM D");
    return deliveryDateFormat

};