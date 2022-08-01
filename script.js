const string1 = window.location.hostname.includes("ismailisimba.github.io") ? "" : "";
const localVar = {};
(async () => {
      
    
      const cosmet = await import(string1+"./cosmetics.js");
      //const theme = await import(string1+"/js/themes.js");
      const server = await import(string1+"./server.js");
    
    return {cosmet,server};
  })().then(({cosmet,server})=>{
    const cosmetic = new cosmet.cosmetics();
    const serve = new server.server();
    cosmetic.start();
    serve.startFetch({},"checklogin",(r)=>{
      const status = JSON.parse(r).cookieStatus;
      if(status==="found"){
        cosmetic.setStartStateIn();
      }else{
        alert("Please log in!");
        cosmetic.setStartStateOut();
      }
    });
    
  });

