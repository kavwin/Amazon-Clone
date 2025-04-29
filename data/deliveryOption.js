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
    let x=0;
    let i=0;

    while(i<matchedDeliveryOptionId.deliveryDays){
            const dayCheck=today.add(x, 'days').day();
            if(dayCheck !==0 && dayCheck !==6){
                i++;
            }
            x++;
        }


    let deliveryDate=today.add(x, 'days');
    return deliveryDate.format("dddd, MMMM D");
}