'use client'
import { createSlice } from '@reduxjs/toolkit';


interface Cart {
    productList:product[]
}
interface product {
    id:number,
    name:string,
    cover:string, // 封面，选列表第一个
    type_name:string, 
    price:number, // 单价
    amount:number, // 购买数量
}


interface CartState {
  cartInfo: Cart | null;
  loading: boolean;
  error: string | null;
}

export const getCartFromLocalStorage = (): Cart | null => {
  if (typeof window !== 'undefined') {
    const cart = localStorage.getItem('cartInfo');
    return cart ? JSON.parse(cart) : null;
  }
  return null;
};


const initialState: CartState = {
  cartInfo: getCartFromLocalStorage(),
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // setCartInfo: (state, action) => {
    //   let cartInfo: Cart = JSON.parse(localStorage.getItem('cartInfo') || '{"productList":[]}');

    //   const existingProductIndex = cartInfo.productList.findIndex(item =>
    //     item.id === action.payload.id && item.type_name === action.payload.type_name
    //   );

    //   if (existingProductIndex !== -1) {
    //     // 如果商品已经在购物车中，更新数量
    //     cartInfo.productList[existingProductIndex].amount = action.payload.amount;
    //   } else {
    //     // 如果商品不在购物车中，直接新增
    //     cartInfo.productList.push(action.payload);
    //   }

    //   // 保存到 localStorage
    //   localStorage.setItem('cartInfo', JSON.stringify(cartInfo));

    //   // 更新 Redux state
    //   state.cartInfo = cartInfo;
    // },
    setCartInfo: (state, action) => {
      let cartInfo: Cart = JSON.parse(localStorage.getItem('cartInfo') || '{"productList":[]}');
      const existingProductIndex = cartInfo.productList.findIndex(item => 
        item.id === action.payload.id && item.type_name === action.payload.type_name
      );
      
    
      if (existingProductIndex !== -1) {
        // 如果商品已经在购物车中，更新数量
        cartInfo.productList[existingProductIndex].amount += action.payload.amount;
      } else {
        // 如果商品不在购物车中，直接新增
        cartInfo.productList.push(action.payload);
      }
      localStorage.setItem('cartInfo', JSON.stringify(cartInfo));
      state.cartInfo = cartInfo;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    loadCartFromLocalStorage: (state) => {
      const cart = getCartFromLocalStorage();
      if (cart) {
        state.cartInfo = cart;
      }
    },
    removeCartFromLocalStorage: (state) => {
      state.cartInfo = null;
      localStorage.removeItem('cartInfo');
    },
  },
});

// 导出 actions
export const { setCartInfo, setLoading, setError, loadCartFromLocalStorage,removeCartFromLocalStorage } = cartSlice.actions;

// 导出 reducer
export default cartSlice.reducer;
