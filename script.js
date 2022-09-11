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
    if(window.performance.getEntries()[0].type==="reload"){cosmetic.checkLogin(serve);}
  
  });
  
  

  