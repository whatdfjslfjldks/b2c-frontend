const channel = new BroadcastChannel('messager');

export function sendMsg(type:string,msg:any){
    console.log('sendMsg',type,msg);
    channel.postMessage({
        type,
        msg,
    });
}


export function listenMsg(callback:any){
    channel.addEventListener('message',(e)=>{
        callback&& callback(e.data);
    });
}