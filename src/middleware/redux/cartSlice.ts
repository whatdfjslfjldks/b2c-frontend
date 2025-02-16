'use client'
import { createSlice } from '@reduxjs/toolkit';


interface Cart {
    productList:product[]
}
interface product {
    id:number,
    name:string,
    cover:string, // 封面，选列表第一个
    // type_name:string, 
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
    updateProductQuantity: (state, action) => {
      const { productId, productType, newAmount } = action.payload;
      const cartInfo = state.cartInfo;
      if (cartInfo) {
        // 查找商品
        const existingProductIndex = cartInfo.productList.findIndex(item => 
          item.id === productId
        );
        if (existingProductIndex !== -1) {
          // 更新数量
          cartInfo.productList[existingProductIndex].amount = newAmount;
          // 更新 localStorage
          localStorage.setItem('cartInfo', JSON.stringify(cartInfo));
        }
      }
    },

    // 删除商品，使用 id 和 type_name 组合查找商品
    removeProductFromCart: (state, action) => {
      const { productId} = action.payload;
      const cartInfo = state.cartInfo;
      if (cartInfo) {
        // 查找并删除商品
        cartInfo.productList = cartInfo.productList.filter(item => 
          !(item.id === productId)
        );
        // 更新 localStorage
        localStorage.setItem('cartInfo', JSON.stringify(cartInfo));
      }
    },

    setCartInfo: (state, action) => {
      let cartInfo: Cart = JSON.parse(localStorage.getItem('cartInfo') || '{"productList":[]}');
      const existingProductIndex = cartInfo.productList.findIndex(item => 
        item.id === action.payload.id
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
export const { setCartInfo, setLoading, setError, loadCartFromLocalStorage,removeCartFromLocalStorage,updateProductQuantity,removeProductFromCart } = cartSlice.actions;

// 导出 reducer
export default cartSlice.reducer;
