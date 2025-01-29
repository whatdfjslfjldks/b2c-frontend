// 封装fetchApi的返回结构
export interface APIResponse {
    code: number;
    msg: string;
    data?: any; // 可选的返回数据字段
 }
  