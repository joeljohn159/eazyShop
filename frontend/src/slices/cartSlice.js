import {createSlice} from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtil';

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : 
                        {cartItems: [], shippingAddress:{}, paymentMethod:'PayPal'}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers: {
        addToCart: (state, action)=>{
            const newItem = action.payload;
            const existItem = state.cartItems.find((item) => item._id === newItem._id);

            if(existItem){
                state.cartItems = state.cartItems.map((i) => i._id === existItem._id ? newItem : i)
            }else{
                state.cartItems = [...state.cartItems, newItem];

            }

           return updateCart(state)
        },
        removeFromCart: (state,action) => {
            state.cartItems = state.cartItems.filter((item)=> item._id != action.payload)
            return updateCart(state)
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            return updateCart(state);
        },
        savePaymentMethod: (state, action)=>{
            state.payload = action.payload;
            return updateCart(state)
        },
        clearCartItems: (state, action)=>{
            state.cartItems= []
            return updateCart(state)
        },
        resetCart: (state) => (state = initialState)
    }
})

export const {addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems, resetCart} = cartSlice.actions;

export default cartSlice.reducer;