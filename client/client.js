const publicVapidKey =
  "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";

  if ("serviceWorker" in navigator){
    send().catch(error=>console.error(error));
  }

  async function send(){
    console.log("service worker registration");
    const register = await navigator.serviceWorker.register('/sw.js', {
        scope:"/"
    });
    console.log("service worker registered");  

    console.log("push registration");
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly:true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    })
    console.log("push registered");

    console.log("push sending");
    await fetch('/subscribe', {
        method:"POST",
        body:JSON.stringify(subscription),
        headers:{
            'content-type':"application/json"
        }
    })
    console.log("push sent");
}

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }