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
type pImg = {
    img_id:number;
    img_url:string;
}
type pType = {
    product_type_id:number;
    product_type_name:string;
}