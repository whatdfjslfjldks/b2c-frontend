'use client'
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Checkbox, TablePagination, Typography, Box, Grid, Avatar } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Delete } from '@mui/icons-material';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  description: string;
  imageUrl: string;
}

const CartTable: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: '商品 A', price: 100, quantity: 2, description: '这是商品A的描述', imageUrl: 'https://via.placeholder.com/50' },
    { id: 2, name: '商品 B', price: 200, quantity: 1, description: '这是商品B的描述', imageUrl: 'https://via.placeholder.com/50' },
    { id: 3, name: '商品 C', price: 150, quantity: 3, description: '这是商品C的描述', imageUrl: 'https://via.placeholder.com/50' },
    { id: 4, name: '商品 D', price: 120, quantity: 1, description: '这是商品D的描述', imageUrl: 'https://via.placeholder.com/50' },
    { id: 5, name: '商品 E', price: 180, quantity: 2, description: '这是商品E的描述', imageUrl: 'https://via.placeholder.com/50' },
    { id: 6, name: '商品 F', price: 250, quantity: 1, description: '这是商品F的描述', imageUrl: 'https://via.placeholder.com/50' },
    { id: 7, name: '商品 G', price: 300, quantity: 3, description: '这是商品G的描述', imageUrl: 'https://via.placeholder.com/50' },
    { id: 8, name: '商品 H', price: 160, quantity: 1, description: '这是商品H的描述', imageUrl: 'https://via.placeholder.com/50' },
    { id: 9, name: '商品 I', price: 110, quantity: 4, description: '这是商品I的描述', imageUrl: 'https://via.placeholder.com/50' },
    { id: 10, name: '商品 J', price: 220, quantity: 2, description: '这是商品J的描述', imageUrl: 'https://via.placeholder.com/50' },
  ]);
  const [page, setPage] = useState(0); // 当前页码
  const [selectedItems, setSelectedItems] = useState<number[]>([]); // 选中的商品id
  const itemsPerPage = 5; // 每页显示的商品数

  // 处理数量变化
  const handleQuantityChange = (id: number, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // 处理分页变更
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

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
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map(item => item.id));
    }
  };

  // 计算选中的商品合计
  const calculateTotal = () => {
    return cartItems
      .filter(item => selectedItems.includes(item.id))
      .reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // 处理去结算
  const handleCheckout = () => {
    const selectedCartItems = cartItems.filter(item => selectedItems.includes(item.id));
    console.log('用户选择了以下商品：');
    selectedCartItems.forEach(item => {
      console.log(`${item.name} - 数量: ${item.quantity} - 总价: ${item.price * item.quantity}`);
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedItems.length === cartItems.length}
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
            {cartItems.slice(page * itemsPerPage, (page + 1) * itemsPerPage).map(item => (
              <TableRow key={item.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                    inputProps={{ 'aria-label': `选择 ${item.name}` }}
                  />
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Avatar src={item.imageUrl} alt={item.name} style={{ marginRight: '10px' }} />
                    <Typography variant="body2">{item.name}<br/><small>{item.description}</small></Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">{item.price}</TableCell>
                <TableCell align="center">
                  <Box display="inline-flex" alignItems="center">
                    <Button
                      variant="outlined"
                      size="small"
                      style={{ padding: '4px 10px' }}
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </Button>
                    <Typography  sx={{
                        fontSize: 16,
                        color:'#282828',
                        margin: '0 8px'
                    }}>&yen;{item.quantity}</Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      style={{ padding: '4px 10px' }}
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </Box>
                </TableCell>
                <TableCell sx={{
                    fontSize: 16,
                    color:'#e93323',
                }} align="center">&yen;{item.price * item.quantity}</TableCell>
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

      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={cartItems.length}
        rowsPerPage={itemsPerPage}
        page={page}
        onPageChange={handleChangePage}
        style={{ marginBottom: '20px' }}
      />

      <Grid container alignItems="center" justifyContent={'flex-end'}>
        <Grid item>
          <Typography sx={{
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
