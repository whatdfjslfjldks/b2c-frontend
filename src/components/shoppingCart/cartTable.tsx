'use client'
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Checkbox, TablePagination, Typography, Box, Grid, Avatar } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { updateProductQuantity, removeProductFromCart, getCartFromLocalStorage } from '@/middleware/redux/cartSlice'; // 导入 actions
import Loading from '../loading/loadingComponents';
import Image from 'next/image';

interface Cart {
  productList: product[];
}

interface product {
  id: number;
  name: string;
  cover: string; // 封面，选列表第一个
  // type_name: string;
  price: number; // 单价
  amount: number; // 购买数量
}

const CartTable: React.FC = () => {
  const [cartItems, setCartItems] = useState<Cart | null>(null);
  const [page, setPage] = useState(0); // 当前页码
  const [selectedItems, setSelectedItems] = useState<number[]>([]); // 选中的商品index
  const itemsPerPage = 5; // 每页显示的商品数
  const [loadState, setLoadState] = useState({
    isLoading: true,
    isEmpty: false,  // 购物车内无商品
  });
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const cart = getCartFromLocalStorage();
    if (cart) {
      setCartItems(cart);
      setLoadState({
        isLoading: false,
        isEmpty: false,
      });
    } else {
      setLoadState({
        isLoading: false,
        isEmpty: true,
      });
    }
  }, []);

  // 更新数量
  const handleQuantityChange = (index: number, amount: number) => {
    const updatedCartItems = {
      productList: cartItems!.productList.map((item, idx) =>
        idx === index ? { ...item, amount } : item
      ),
    };
    setCartItems(updatedCartItems);

    // 同步到 Redux 和 localStorage
    dispatch(updateProductQuantity({ productId: updatedCartItems.productList[index].id, newAmount: amount }));
  };

  // 删除商品
  const handleDeleteItem = (index: number) => {
    const updatedCartItems = {
      productList: cartItems!.productList.filter((_, idx) => idx !== index),
    };
    setCartItems(updatedCartItems);

    // 同步到 Redux 和 localStorage
    dispatch(removeProductFromCart({ productId: cartItems!.productList[index].id }));
  };

  // 选择商品
  const handleSelectItem = (id: number) => {
    setSelectedItems(prevSelectedItems =>
      prevSelectedItems.includes(id)
        ? prevSelectedItems.filter(itemId => itemId !== id)
        : [...prevSelectedItems, id]
    );
  };

  // 选择全选
  const handleSelectAll = () => {
    if (selectedItems.length === cartItems?.productList.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems!.productList.map((item, index) => item.id));
    }
  };

  // 计算选中的商品总额
  const calculateTotal = () => {
    return cartItems?.productList
      .filter((item, index) => selectedItems.includes(item.id))
      .reduce((total, item) => total + item.price * item.amount, 0);
  };

  // 去结算
  const handleCheckout = () => {
    console.log("cccc: ",cartItems)
    const selectedCartItems = cartItems?.productList.filter(item => selectedItems.includes(item.id));
    // selectedCartItems?.forEach(item => {
    //   console.log(`${item.name} - 数量: ${item.amount} - 总价: ${item.price * item.amount}`);
    // });
    // console.log(selectedCartItems);
    const productIds = selectedCartItems?.map(item => item.id).join(',');
    const amounts = selectedCartItems?.map(item => item.amount).join(',');

    router.push(`/orderConfirm?productIds=${productIds}&amounts=${amounts}`);
  };

  if (loadState.isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  if (loadState.isEmpty) {
    return (
      <div className='flex justify-center items-center'>
        <Typography variant="h5" gutterBottom>
          购物车为空
        </Typography>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedItems.length === cartItems?.productList.length}
                  onChange={handleSelectAll}
                  inputProps={{ 'aria-label': '全选' }}
                />
              </TableCell>
              <TableCell>商品信息</TableCell>
              <TableCell align="right">单价</TableCell>
              <TableCell align="center">数量</TableCell>
              <TableCell align="center">金额</TableCell>
              <TableCell align="center">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems?.productList.map((item, index) => (
              <TableRow key={index}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                    inputProps={{ 'aria-label': `选择 ${item.name}` }}
                  />
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_PREFIX}${item.cover}`}
                      alt="pic"
                      width={80}
                      height={80}
                    />
                    <Typography component="div" variant="body2">
                      {item.name}<br />
                      {/* <small>{item.type_name}</small> */}
                      </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">{item.price}</TableCell>
                <TableCell align="center">
                  <Box display="inline-flex" alignItems="center">
                    <Button
                      variant="outlined"
                      size="small"
                      style={{ padding: '4px 10px' }}
                      onClick={() => handleQuantityChange(index, item.amount - 1)}
                      disabled={item.amount <= 1}
                    >
                      -
                    </Button>
                    <Typography component="div" sx={{
                        fontSize: 16,
                        color:'#282828',
                        margin: '0 8px'
                    }}>{item.amount}</Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      style={{ padding: '4px 10px' }}
                      onClick={() => handleQuantityChange(index, item.amount + 1)}
                    >
                      +
                    </Button>
                  </Box>
                </TableCell>
                <TableCell sx={{
                    fontSize: 16,
                    color:'#e93323',
                }} align="center">&yen;{item.price * item.amount}</TableCell>
                <TableCell align="center">
                  <div onClick={() => handleDeleteItem(index)} className='cursor-pointer'>
                    <DeleteOutlineIcon sx={{
                      fontSize: 28,
                    }}/>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container alignItems="center" justifyContent={'flex-end'}>
        <Grid item>
          <Typography component="div" sx={{
            marginRight: '20px',
          }} className='flex flex-row items-center cursor-pointer'>
            <div className='text-[16px] text-[#282828]'>
              合计：
            </div>
            <div className='text-[22px] text-[#e93323]'>&yen;{calculateTotal()}</div>
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCheckout}
            disabled={selectedItems.length === 0}
            size="large"
          >
            去结算
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default CartTable;