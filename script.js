const string1 = window.location.hostname.includes("ismailisimba.github.io") ? "" : "";
(async () => {
      
    
      const cosmet = await import(string1+"./cosmetics.js");
      //const theme = await import(string1+"/js/themes.js");
      const server = await import(string1+"./server.js");
    
    return {cosmet,server};
  })().then(({cosmet,server})=>{
    const cosmetic = new cosmet.cosmetics();
    const backendServer = new server.server();
    backendServer.startFetch({"holla":"you"},"login",(r)=>{
      console.log(r);
    });
    cosmetic.start();
    
  });

