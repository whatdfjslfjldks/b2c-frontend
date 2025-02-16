// 展示商品基本信息
 export type productsInfo = {
    id: number;
    name: string;
    description: string;
    pImg: PImg[];
    // pType: PType[];
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

// // 商品类型信息
// export type PType = {
//     type_name: string;
// };



export type productsInfo2 = {
    id: number;
    name: string;
    description: string;
    pImg: PImg[];
    // pType: PPType[];
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

// 商品类型信息
// export type PPType = {
//     type_id: number;
//     type_name: string;
// };

