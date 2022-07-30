const string1 = window.location.hostname.includes("ismailisimba.github.io") ? "" : "";
const backendServer ={};
(async () => {
      
  const server = await import("./server.js");
    
    return {server};
  })().then(({server})=>{
    backendServer["cosmetics"] = new server.server();    
  });






export {cosmetics as cosmetics};

class cosmetics {
    
    constructor(){
        this.start = this.start;
        this.addPassVisiEvent = this.addPassVisiEvent;
        this.addPassVisiEvent = this.addPassVisiEvent;
        this.checkForm = this.checkForm;
        this.hailTheServerOnAllChannels = this.hailTheServerOnAllChannels;
    
        
    }

    start (){
        this.addPassVisiEvent();
        this.addPassSubEvent();
    }

    addPassVisiEvent () {
       const ele1 =  document.querySelectorAll(".passvisi")[0].querySelectorAll("img")[0];
       const ele2 =  document.querySelectorAll(".passvisi")[0].querySelectorAll("img")[1];
       const elemom = document.querySelectorAll(".passvisi")[0];
       const passIn = document.querySelectorAll("#uspass")[0];
       let countPassVisiEv = 1;

       ele1.style.display = "none";
       ele2.style.display = "block";
       passIn.setAttribute("type","password");

       elemom.addEventListener("click",()=>{
        if(countPassVisiEv===0){
            ele1.style.display = "none";
            ele2.style.display = "block";
            passIn.setAttribute("type","password");
            countPassVisiEv++;
        }else{
            ele1.style.display = "block";
            ele2.style.display = "none";
            passIn.setAttribute("type","text");
            countPassVisiEv--;
        }
       })
    }

    addPassSubEvent() {
        const butt = document.querySelectorAll(".submitlogtfl")[0];
        butt.addEventListener("click",this.checkForm);
    }

    checkForm(e){
            const usnum = document.getElementById("usnam").value;
            const uspass = document.getElementById("uspass").value;
            const mykeys = {"defkey":"0123pass",useKey:uspass};

            const passCheck = ()=>{
              var returnVal = false;
              if(uspass.length<6){
                alert("Password must be at least 6 charachters")
              }else {
                returnVal= true;
              }
              return returnVal;
             };
              
            if(usnum.length>1&&passCheck){
              

            var data ={"username":usnum,"pasData":uspass};
            data=JSON.stringify({data});
            //console.log(data);
            //var encrypted = encrypt(data,uspass);
            //console.log(encrypted);
            //console.log(decrypt(encrypted,uspass));


            backendServer.cosmetics.startFetch(data,"login",(r)=>{
              console.log(r);
            });

            }else{
              alert("Soemthing went wrong!")
            }
      
        

    }

    hailTheServerOnAllChannels(){

    }

}


// Code goes here
var keySize = 256;
var ivSize = 128;
var iterations = 100;

var message = JSON.stringify({"msg":"Hello World"});
var password = "Secret Password";


function encrypt (msg, pass) {
  var salt = CryptoJS.lib.WordArray.random(128/8);
  
  var key = CryptoJS.PBKDF2(pass, salt, {
      keySize: keySize/32,
      iterations: iterations
    });

  var iv = CryptoJS.lib.WordArray.random(128/8);
  
  var encrypted = CryptoJS.AES.encrypt(msg, key, { 
    iv: iv, 
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
    
  });
  
  // salt, iv will be hex 32 in length
  // append them to the ciphertext for use  in decryption
  var transitmessage = salt.toString()+ iv.toString() + encrypted.toString();
  return transitmessage;
}

function decrypt (transitmessage, pass) {
  var salt = CryptoJS.enc.Hex.parse(transitmessage.substr(0, 32));
  var iv = CryptoJS.enc.Hex.parse(transitmessage.substr(32, 32))
  var encrypted = transitmessage.substring(64);
  
  var key = CryptoJS.PBKDF2(pass, salt, {
      keySize: keySize/32,
      iterations: iterations
    });

  var decrypted = CryptoJS.AES.decrypt(encrypted, key, { 
    iv: iv, 
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
    
  })
  decrypted = decrypted.toString(CryptoJS.enc.Utf8);
  return decrypted;
}



