
/**
 * 从api 服务器获取数据
 * @param path api路径
 * @param init 请求初始化内容
 */

export function fetchAPI(path: string | URL, init?: RequestInit, timeout: number = 5000) {
    // 检查 NEXT_PUBLIC_API_URL 是否定义
    if (typeof process.env.NEXT_PUBLIC_API_URL !== "string") {
        throw new Error("API_URL 未定义!");
    }

    // 根据当前环境构造服务器地址
    const host =
        process.env.NODE_ENV === "development"
            ? process.env.NEXT_PUBLIC_API_URL
            : ""; // 暂无

    // 如果 init 存在且包含 headers
    const headers = {
        ...init?.headers, // 保留用户传入的请求头
        // 'ngrok-skip-browser-warning': 'true', ngrok请求头，跳过检查
    };

    // 构造完整的请求路径
    const constructedPath = path instanceof URL ? path : host + path;

    const controller = new AbortController();
    const signal = controller.signal;

    // 设置超时
    const timeoutId = setTimeout(() => {
        controller.abort(); // 在超时后中止请求
    }, timeout);

    return fetch(constructedPath, { ...init, headers, signal })
        .then((response) => {
            clearTimeout(timeoutId); // 请求成功，清除超时
            return response.json(); // 解析 JSON 响应
        })
        .catch((e) => {
            clearTimeout(timeoutId); // 清除超时
            if (e.name === "AbortError") {
                // 处理超时错误
                return {
                    code: 408,
                    msg: "请求超时，请检查您的网络连接！",
                };
            }

            if (process.env.NODE_ENV === "development") {
                console.log("fetchAPI error: ", e);
            }

            // 默认返回网络连接错误
            return {
                code: 408,
                msg: "请检查您的网络连接！",
            };
        });
}

