// 主页商品模块导航栏
export const menuItemsHomePage = [
    { id: 1, label: '猜你喜欢', icon: '/images/like.png' },
    { id: 2, label: '运动户外', icon: '/images/sport.png' },
    { id: 3, label: '馋嘴零食', icon: '/images/food.png' },
    { id: 4, label: '潮电数码', icon: '/images/phone.png' },
    { id: 5, label: '服饰时尚', icon: '/images/clothes.png' },
    { id: 6, label: '家装建材', icon: '/images/chatou.png' },
    { id: 7, label: '办公文具', icon: '/images/work.png' },
];
// 主页导航栏
export const menuKeyTopSec: { [key: string]: number } = {
    productClassify: 1,   // 产品分类
    flashSale: 2,          // 限时秒杀
    preSale: 3,            // 限时预售
    newsList: 4,           // 新闻列表
    aboutUs: 5,            // 关于我们
  };
// 商品分类界面导航栏
export const menuItemsClassify = [
    { id: 1, label: "运动户外" },
    { id: 2, label: "馋嘴零食" },
    { id: 3, label: "潮电数码" },
    { id: 4, label: "服饰时尚" },
    { id: 5, label: "家装建材" },
    { id: 6, label: "办公文具" },
    { id: 7, label: "家居生活" },
    { id: 8, label: "健康美容" },
    { id: 9, label: "母婴用品" },
    { id: 10, label: "书籍音像" },
  ];
// 商品分类界面筛选栏
export const shaixuanClassify = [
    { id: 1, label: "默认" },
    { id: 2, label: "价格" },
    { id: 3, label: "上架时间" },
];
// 新闻列表导航栏
export const menuNewsList = [
    { id: 1, label: "全部" },
    { id: 2, label: "购物心得" },
    { id: 3, label: "消费文化" },
    { id: 4, label: "品牌资讯" },
  ];
// 限时秒杀时间段场次
export const secKillTime = [
  {id: 1, label: "00:00"},
  {id: 2, label: "08:00"},
  {id: 3, label: "10:00"},
  {id: 4, label: "12:00"},
  {id: 5, label: "14:00"},
  {id: 6, label: "18:00"},
  {id: 7, label: "20:00"},
]

enum OrderStatus {
  Pending = 0,       // 待处理（初始状态）
  Paid = 1,          // 已支付
  Completed = 2,     // 已完成
  Shipped = 3,       // 已发货
  Delivered = 4,     // 已送达
  Cancelled = 5,     // 已取消
  PaymentFailed = 6, // 支付失败
  Refunded = 7,      // 已退款
}

// 订单状态
export const statusDescriptions: { [key:number]: string } = {
  [OrderStatus.Pending]: "待付款",
  [OrderStatus.Paid]: "待发货",
  [OrderStatus.Completed]: "已完成",
  [OrderStatus.Shipped]: "待收货",
  [OrderStatus.Delivered]: "已送达",
  [OrderStatus.Cancelled]: "已取消",
  [OrderStatus.PaymentFailed]: "支付失败",
  [OrderStatus.Refunded]: "已退款",
};

// 支付方式
enum PaymentMethod {
  Alipay = 0,
  WechatPay = 1,
  CashOnDelivery = 2,
}
export const paymentMethodDescriptions: { [key:number]: string } = {
  [PaymentMethod.Alipay]: "支付宝",
  [PaymentMethod.WechatPay]: "微信支付",
  [PaymentMethod.CashOnDelivery]: "货到付款",
};

// 支付状态
enum PaymentStatus {
  Unpaid = 0,
  Paid = 1,
  // Refunded = 2,
}
export const paymentStatusDescriptions: { [key:number]: string } = {
  [PaymentStatus.Unpaid]: "未支付",
  [PaymentStatus.Paid]: "已支付",
  // [PaymentStatus.Refunded]: "已退款",
};