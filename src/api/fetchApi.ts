
/**
 * 从api 服务器获取数据
 * @param path api路径
 * @param init 请求初始化内容
 */

export function fetchAPI(path: string | URL, init?: RequestInit) {
    // 检查 NEXT_PUBLIC_API_URL 是否定义
    if (typeof process.env.NEXT_PUBLIC_API_URL !== "string") {
        throw new Error("API_URL 未定义!");
    }

    // 根据当前环境构造服务器地址
    const host =
        process.env.NODE_ENV === "development"
            ? process.env.NEXT_PUBLIC_API_URL
            : process.env.NEXT_PUBLIC_API_URL;

    // 如果 init 存在且包含 headers，则合并 'ngrok-skip-browser-warning' 头
    const headers = {
        ...init?.headers, // 保留用户传入的请求头
        // 'ngrok-skip-browser-warning': 'true',
    };

    // 构造完整的请求路径
    const constructedPath = path instanceof URL ? path : host + path;

    // 发起网络请求并返回 Promise 对象
    return fetch(constructedPath, { ...init, headers }).catch((e) => {
        if (process.env.NODE_ENV === "development") {
            console.log("fetchAPI error: ", e);
        }
        return undefined;
    });
}
