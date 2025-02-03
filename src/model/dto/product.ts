// 返回的普通商品列表数据
export interface productsList{
    totalItems: number;
    currentPage: number;
    pageSize: number;
    categoryId:number;
    productList: productsInfo[];
}
// 商品基本信息
type productsInfo = {
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
type PImg = {
    img_url: string;
};

// 商品类型信息
type PType = {
    type_name: string;
};



