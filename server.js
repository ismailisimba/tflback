export {server as server};
//const serverURL = "https://expressongoogle-jzam6yvx3q-ey.a.run.app/";
const serverURL = "http://127.0.0.1:8080"
//const paraOne = "test";
class server {
    
    constructor(){
        this.startFetch = fetchInfoWithFilter;
    
        
    }
}

const fetchInfoWithFilter = async (data = JSON.stringify({"def":"data"}),paraOne="paraOne",funcAfter = (val)=>{console.log("default func"+val)})=>{
    var myRequest = new Request(serverURL+"/"+paraOne);
    await fetch(myRequest,{
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'omit', // include, *same-origin, omit
        headers: {
          'Content-Type': 'text/txt'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: data // body data type must match "Content-Type" header
      }).then(response=>{
        if (!response.ok){
            throw new Error("HTTP error, status = " + response.status); 
          }
          return response.text();
      }).then(res=>{
        funcAfter(res);
      }).catch(e=>{
        console.log(e);
    })

}