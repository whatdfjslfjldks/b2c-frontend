'use client'
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Checkbox, TablePagination, Typography, Box, Grid, Avatar } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { getCartFromLocalStorage, setCartInfo } from '@/middleware/redux/cartSlice';
import Loading from '../loading/loadingComponents';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

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


const CartTable: React.FC = () => {
  const [cartItems, setCartItems] = useState<Cart|null>(null)
  const [page, setPage] = useState(0); // 当前页码
  const [selectedItems, setSelectedItems] = useState<number[]>([]); // 选中的商品index
  const itemsPerPage = 5; // 每页显示的商品数
  const [loadState,setLoadState]=useState({
    isLoading:true,
    isEmpty:false,  // 购物车内无商品
  })
  const dispatch=useDispatch()
  const router=useRouter()


  useEffect(()=>{
    const cart=getCartFromLocalStorage()
    if (cart) {
      setCartItems(cart)
      setLoadState({
        isLoading:false,
        isEmpty:false,
      })
    }else{
      setLoadState({
        isLoading:false,
        isEmpty:true,
      })
    }
  },[])


  // 处理数量变化
  const handleQuantityChange = (index: number, amount: number) => {
    setCartItems((prev) => ({
      productList: prev!.productList.map((item, idx) =>
          idx === index ? { ...item, amount } : item
      )
    }));
  };

  // const handleQuantityChange = (index: number, amount: number) => {
  //   // 获取当前购物车商品列表
  //   setCartItems((prev) => {
  //     const updatedProductList = prev!.productList.map((item, idx) =>
  //       idx === index ? { ...item, amount } : item
  //     );
  //     console.log('更新购物车商品列表：', updatedProductList);
  
  //     // 同步更新到 Redux 和 localStorage
  //     dispatch(setCartInfo(updatedProductList));
  
  //     return {
  //       ...prev!,
  //       productList: updatedProductList,
  //     };
  //   });
  // };


  // 处理选择某个商品
  const handleSelectItem = (id: number) => {
    setSelectedItems(prevSelectedItems =>
      prevSelectedItems.includes(id)
        ? prevSelectedItems.filter(itemId => itemId !== id)
        : [...prevSelectedItems, id]
    );
  };

  // 处理全选/取消全选
  const handleSelectAll = () => {
    if (selectedItems.length === cartItems?.productList.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems!.productList.map((item,index) => index));
    }
  };

  // 计算选中的商品合计
  const calculateTotal = () => {
    return cartItems?.productList
      .filter((_,index) => selectedItems.includes(index))
      .reduce((total, item) => total + item.price * item.amount, 0);
  };

  // 处理去结算
  const handleCheckout = () => {
    const selectedCartItems = cartItems?.productList.filter(item => selectedItems.includes(item.id));
    console.log('用户选择了以下商品：');
    selectedCartItems?.forEach(item => {
      console.log(`${item.name} - 数量: ${item.amount} - 总价: ${item.price * item.amount}`);
    });

    router.push('/orderConfirm')
  };

  if(loadState.isLoading) {
    return (
      <div>
        <Loading/>
      </div>
    );
  }
  if(loadState.isEmpty) {
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
          {/* .slice(page * itemsPerPage, (page + 1) * itemsPerPage) */}
            {cartItems?.productList.map((item,index) => (
              <TableRow key={index}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedItems.includes(index)}
                    onChange={() => handleSelectItem(index)}
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
                    {/* <Avatar src={item.cover} alt={item.name} style={{ marginRight: '10px' }} /> */}
                    <Typography component="div" variant="body2">{item.name}<br /><small>{item.type_name}</small></Typography>
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
                  <div onClick={() => {}} className='cursor-pointer'>
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
