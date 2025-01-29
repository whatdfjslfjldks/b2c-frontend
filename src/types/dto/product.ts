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
