import { type } from "os";

// 展示商品基本信息
export type productsInfo = {
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
export type pImg = {
    img_id:number;
    img_url:string;
}
export type pType = {
    type_id:number;
    type_name:string;
}

// 展示秒杀商品基本信息
export type secKillInfo={
    sec_id: number; 
    sec_name: string;
    sec_cover: string; 
    sec_price: number; 
    sec_original_price: number; 
    sec_stock: number; 
    sec_sold: number; 
}