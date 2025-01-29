import { type } from "os";

// 返回的商品数据
export interface productsList{
    productList: productsInfo[];
    totalItems: number;
    currentPage: number;
    pageSize: number;
    categoryId:number;
}
// 商品基本信息
type productsInfo = {
    product_id: number;
    product_name: string;
    product_price: number;
    product_categoryId: number;
    description: string;
    product_cover:string;
};
// 商品详情页基本信息
export interface productDetail{
    product_id: number;
    product_name: string;
    product_price: number;
    product_img:pImg[];
    product_type:pType[];
    product_sold:number;
}
type pImg = {
    product_img_id:number;
    product_img_url:string;
}
type pType = {
    product_type_id:number;
    product_type_name:string;
}