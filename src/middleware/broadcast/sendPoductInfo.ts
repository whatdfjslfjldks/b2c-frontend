const channel = new BroadcastChannel('productInfo');

export function sendProductInfo(type:string,msg:any){
    channel.postMessage({
        type,
        msg,
    });
}


export function listenProductInfo(callback:any){
    channel.addEventListener('message',(e)=>{
        callback&& callback(e.data);
    });
}



// sendProductInfo('newProduct', { id: 1, name: 'Product A', price: 100 });
// 监听消息
// listenProductInfo((data) => {
//     console.log('Received product info:', data);
//     if (data.type === 'newProduct') {
//         console.log('New product added:', data.msg);
//     }
// });
