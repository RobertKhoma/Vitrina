import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface IProdukt {
  id: string;
  displayName: string;
  priceProduct: number;
}

export interface ICardItem extends IProdukt {
  quantity: number;
}

export interface ICardState {
  displayName: string;
  isBasketShow: boolean;
  order: ICardItem[];
}

const initialState: ICardState = {
  order: [],
  displayName: "",
  isBasketShow: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    handleBasketShow(state) {
      state.isBasketShow = !state.isBasketShow;
    },
    handleAddToCart(state, action) {
      /*       console.log(action); */

      const itemIndex = state.order.findIndex(
        (item) => item.id === action.payload.id
      );
      /*    console.log(itemIndex); */

      const newOrder =
        itemIndex < 0
          ? [...state.order, { ...action.payload, quantity: 1 }]
          : state.order.map((item, index) =>
              index === itemIndex
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );

      state.order = newOrder;
    },
    handleDeleteItemFromCart(state, action) {
      state.order=state.order.filter((item)=>item.id!==action.payload)
    },
    handleDecQuantity() {},
    handleIncQuantity(state,action) {
      state.order=state.order.map((item)=>
      item.id ===action.payload
      ? {...item,quantity:item.quantity+1}
      : item
      )
    },
  },
});

export const selectIsBasketShow = (state: RootState) => state.cart.isBasketShow;
export const {
  handleBasketShow,
  handleAddToCart,
  handleDecQuantity,
  handleDeleteItemFromCart,
  handleIncQuantity,
} = cartSlice.actions;
export const selectOrder = (state: RootState) => state.cart.order;
export default cartSlice.reducer;
