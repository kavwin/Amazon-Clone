import {addToCart, cart} from '../../data/cart.js';

describe('test suite: addTocart', ()=>{
    it('adds an existing produt to cart',()=>{

    });
    it('adds a new  produt to cart',()=>{

        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        });
        console.log(localStorage.getItem('cart'))
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart.length).toEqual(1);
    });
})