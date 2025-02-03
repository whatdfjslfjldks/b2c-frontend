// 展示商品基本信息
 export type productsInfo = {
    id: number;
    name: string;
    description: string;
    pImg: PImg[];
    pType: PType[];
    price: number;
    original_price: number;
    stock: number;
    sold: number;
    create_time: string;
    category_id: number;
    kind_id: number;
    start_time: string;
    duration: string;
    session_id: number;
};
// 图片信息
export type PImg = {
    img_url: string;
};

// 商品类型信息
export type PType = {
    type_name: string;
};










// int32 id = 1;
// string name = 2;
// double price = 3;
// double original_price = 4;
// int32 category_id = 5;
// int32 kind_id = 6;
// string description = 7;
// int32 sold = 8;
// int32 stock = 9;
// string start_time = 10;
// string duration = 11;
// int32 session_id = 12;
// repeated PImg product_img = 13;
// repeated PType product_type = 14;


 

// 展示秒杀商品基本信息
// export type secKillInfo={
//     sec_id: number; 
//     sec_name: string;
//     sec_cover: string; 
//     sec_price: number; 
//     sec_original_price: number; 
//     sec_stock: number; 
//     sec_sold: number; 
//     progressWidth:number; // 已售进度条长度
// }