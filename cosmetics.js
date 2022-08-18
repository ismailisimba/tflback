const string1 = window.location.hostname.includes("ismailisimba.github.io") ? "" : "";
let AnImEaction = "idle...";
const backendServer = {};
backendServer["cosmetics"] = await (async () => {
      
  const server = await import("./server.js");
    
    return {server};
  })().then(({server})=>{
    let cosmetics = new server.server();
    return cosmetics;    
  });





const setStartStateOut = ()=>{
  
    document.body.querySelectorAll("section").forEach(ele=>ele.style.display="none");
    document.querySelectorAll(".sec1")[0].style.display = "flex";

  
}


const addVehicleMenuEventClicks = ()=>{
  //console.log("gg");
  document.querySelectorAll(".actchild").forEach((e)=>{
    e.addEventListener("click",(e)=>{
      //console.log(e.target.classList);
      if(e.target.classList.contains("add")){
        removeCheckyListeners();
        //console.log("true");
        document.querySelectorAll(".carmain").forEach(e=>{e.style.display="none"});
        document.querySelectorAll(".sec3")[0].style.display="flex";
        document.querySelectorAll(".checky").forEach(e=>{e.style.display="none"});
        document.getElementById("delete").style.display = "none"
      }else if(e.target.classList.contains("view")){
        removeCheckyListeners();
        document.querySelectorAll(".carmain").forEach(e=>{e.style.display="block"});
        document.querySelectorAll(".sec3")[0].style.display="none";
        document.querySelectorAll(".checky").forEach(e=>{e.style.display="none"});
        document.getElementById("delete").style.display = "none"
      }else if(e.target.classList.contains("edit")){
        alert("Click the Car You Want To Edit");
        document.querySelectorAll(".carmain").forEach(e=>{e.style.display="block"});
        document.querySelectorAll(".sec3")[0].style.display="none";
        document.querySelectorAll(".checky").forEach(e=>{e.style.display="none"});
        document.getElementById("delete").style.display = "none";
        removeCheckyListeners();
        addEditeventListeners();
      }else if(e.target.classList.contains("delete")){
        document.querySelectorAll(".carmain").forEach(e=>{e.style.display="block"});
        document.querySelectorAll(".checky").forEach(e=>{e.style.display="block"});
        removeCheckyListeners();
        addCheckyListeners();
        document.getElementById("delete").style.display = "block";
        document.querySelectorAll(".sec3")[0].style.display="none";
      }else{
        console.log("false");
      }
     })
  })
}

const   fillCars = (e)=> {
  stopAnime();
  //const cars = JSON.parse(e);
  (async()=>{return await JSON.parse(e)})().then((cars)=>{
    //console.log(cars);
    
  if(cars.cookieStatus&&cars.cookieStatus==="none"){
    checkLogin(backendServer.cosmetics);

  }else if(isEmpty(cars)){
    checkLogin(backendServer.cosmetics);
  }else if(cars){
    const carContainer = document.querySelectorAll(".carmain")[0];
    const carContainerMom = document.querySelectorAll(".sec2")[0].querySelectorAll(".content")[0];
    document.querySelectorAll(".carmain").forEach(e=>e.remove());
    const carstoo=JSON.parse(cars);
    //console.log(carstoo.rows[0]);
    localVar["cars"] = [carstoo.rows[0]];
    carstoo.rows[0].forEach(car=>{
      if(car.Type1!=="promo"){
        const tempEle = carContainer.cloneNode(true)
        tempEle.querySelectorAll(".year")[0].innerText = car.YearOfMake;
        tempEle.querySelectorAll(".brand")[0].innerText = car.BrandType1;
        tempEle.querySelectorAll(".make")[0].innerText = car.Name1;
        tempEle.querySelectorAll(".price")[0].innerText = car.PriceTZS?car.PriceTZS:"xxx";
        tempEle.querySelectorAll(".prtype")[0].innerText = "TZS";
        tempEle.querySelectorAll(".checky")[0].id = car.tagsArray;
        tempEle.querySelectorAll(".checky")[0].classList.add(car.id);
        car.Picture1 = JSON.parse(car.Picture1);
        if(car.Picture1!==null){
          tempEle.querySelectorAll(".main")[0].src =`data:${car.Picture1.fileInfo.meme};base64,${car.Picture1.fileData}`;
        }
        carContainerMom.appendChild(tempEle);
      }
    });
    addVehicleMenuEventClicks();
    fillPromoPreview();
    checkForDeleted();

  }else{
    checkLogin(backendServer.cosmetics);
  }
  });
}


const fillPromoPreview = ()=>{
  for(let i = 0; i< localVar.cars[0].length;i++){
    if(localVar.cars[0][i].Type1==="promo"){
      const pic =  JSON.parse(localVar.cars[0][i].Picture1);
      document.querySelectorAll(".previewofpromo")[0].querySelectorAll("h1")[0].innerText = localVar.cars[0][i].Name1;
      document.querySelectorAll(".previewofpromo")[0].querySelectorAll("p")[0].innerText = localVar.cars[0][i].BrandType1;
      document.querySelectorAll(".previewofpromo")[0].querySelectorAll("img")[0].src =`data:${pic.fileInfo.meme};base64,${pic.fileData}`;
      //`data:${meme};base64,${cloudBlob}`
      break;
    }
  }

}

export {cosmetics as cosmetics};

class cosmetics {
    
    constructor(){
        this.start = this.start;
        this.addPassVisiEvent = this.addPassVisiEvent;
        this.addDelSubEvent = this.addDelSubEvent;
        this.addPassVisiEvent = this.addPassVisiEvent;
        this.checkForm = this.checkForm;
        this.setStartStateIn = setStartStateIn;
        this.setStartStateOut = setStartStateOut;
        this.checkLogin = checkLogin;
        this.fillCars = fillCars;
        this.checkForm2 = this.checkForm2;
        this.checkForm3 = this.checkForm3;
        this.checkForm4 = this.checkForm4;
        this.addCarSubEvent = this.addCarSubEvent;
        this.addleftMenuEvents = this.addleftMenuEvents;
        this.startAnime = startAnime;
        this.stopAnime = stopAnime;
        //this.addFileCheck = this.addFileCheck;

    
        
    }

    start (){
        this.addPassVisiEvent();
        this.addPassSubEvent();
        this.addCarSubEvent();
        this.addDelSubEvent();
        this.addleftMenuEvents();
        this.addLogoutEvent();
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

    addLogoutEvent() {
      document.getElementById("logout").addEventListener("click",(e)=>{
        AnImEaction = "logout";
        startAnime();
        backendServer.cosmetics.startFetch(JSON.stringify({}),"logout",(r)=>{
          if(r["1"]==="succ");
          alert("logout is succesful!");
          setStartStateOut();
        });
      })
    }

    addleftMenuEvents (){
        document.querySelectorAll(".menu")[0].querySelectorAll(".listitem").forEach(item=>{
          item.addEventListener("click",e=>{
            if(!e.target.classList.contains("activemainmenu")&&e.target.classList.contains("vehi")){
              document.querySelectorAll(".promo")[0].classList.remove("activemainmenu");
              document.querySelectorAll(".vehi")[0].classList.add("activemainmenu");
              //console.log("vehi");
              document.querySelectorAll(".menutoo")[0].style.display = "flex";
              document.querySelectorAll(".menutootoo")[0].style.display = "none";
              document.querySelectorAll(".carmain").forEach(car=>{car.style.display="block"});
              document.querySelectorAll(".sec4")[0].style.display = "none";
            }else if(!e.target.classList.contains("activemainmenu")&&e.target.classList.contains("promo")){
              document.querySelectorAll(".vehi")[0].classList.remove("activemainmenu");
              document.querySelectorAll(".promo")[0].classList.add("activemainmenu");
              //console.log("promo");
              document.querySelectorAll(".menutoo")[0].style.display = "none";
              document.querySelectorAll(".menutootoo")[0].style.display = "flex";
              document.querySelectorAll(".carmain").forEach(car=>{car.style.display="none"});
              document.querySelectorAll(".sec4")[0].style.display = "block";
            }
          })
        })

    }

    addPassSubEvent() {
        const butt = document.querySelectorAll(".submitlogtfl")[0];
        butt.addEventListener("click",this.checkForm);
        document.querySelectorAll("#submitpromo")[0].addEventListener("click",this.checkForm4);
    }

    addDelSubEvent() {
      const butt = document.querySelectorAll(".deletebutt")[0];
      butt.addEventListener("click",this.checkForm3);
  }

    addCarSubEvent() {
      const butt = document.querySelectorAll("#carsubmit")[0];
      butt.addEventListener("click",this.checkForm2);
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
            AnImEaction = "login";
            stopAnime();
              startAnime();
            backendServer.cosmetics.startFetch(data,"login",(r)=>{
              if(r["1"]==="succ");
              console.log("login is succesful...");
              setStartStateIn();
            });

            }else{
              alert("Soemthing went wrong!")
            }
      
        

    }


    async checkForm2(e){
      startAnime();
      AnImEaction = "uploading car...";
      const type = document.getElementById("vehicletype").value;
      const maker = document.getElementById("maker").value;
      const model = document.getElementById("model").value;
      const date = document.getElementById("birthdate").value;
      const price = document.getElementById("price").value;
      const mileage = document.getElementById("mileage").value;
      const transmission = document.getElementById("transtypes").value;
      const pictures = document.getElementById("pictureuploads").files;
      console.log(pictures);
      const ameneties = document.getElementById("ameneties").value;

      const myCarObj ={type,maker,model,date,price,mileage,transmission,pictures,ameneties};
      myCarObj.pictures = await bundleFilesForUpload(myCarObj.pictures);

      backendServer.cosmetics.startFetch(JSON.stringify(myCarObj),"tflcarupload",(r)=>{
        if(r["1"]==="succ");
        console.log("login is succesful...");
        //setStartStateIn();
        window.location.reload();
      });
  

    }

    async checkForm3(e){
      startAnime();
      AnImEaction = "deleting ...";
      const selected = document.querySelectorAll(".checked");
      const obj = {};
      var counter = 0;
      selected.forEach(e=>{
        obj[`${counter}`]=e.id;
        counter++;
      })

      console.log(JSON.stringify({obj}));
      backendServer.cosmetics.startFetch(JSON.stringify(obj),"deletetflcar",(r)=>{
        if(r["1"]==="succ"){
          console.log("login is succesful...");
          //setStartStateIn();
          window.location.reload();
        }
      });
      
    }


    async checkForm4(e){
      AnImEaction = "updating promo...";
      startAnime();
      const promotit = document.getElementById("promotit").value;
      const promoword = document.getElementById("promoword").value;
      const promopic = document.getElementById("promopic").files[0];
      const obj = {promotit,promoword,promopic};
      //console.log(obj);
      obj.promopic = await bundleFilesForUpload([obj.promopic]);
      obj.promopic = obj.promopic[0];

      console.log(JSON.stringify(obj));
      backendServer.cosmetics.startFetch(JSON.stringify(obj),"updatepromo",(r)=>{
        if(r["1"]==="succ"){
          console.log("login is succesful...");
          //setStartStateIn();
          window.location.reload();
        }
      });
   
      
    }


}


const addCheckyListeners = ()=>{
  document.querySelectorAll(".carmain").forEach(ele=>{
    ele.addEventListener("click",deleClicksAdded);
  })
};

const addEditeventListeners = ()=>{
  document.querySelectorAll(".carmain").forEach(ele=>{
    ele.addEventListener("click",addEditClicks)
  })
}

const addEditClicks = (e)=>{
  e.stopPropagation();
  const id = e.target.parentNode.querySelectorAll(".checky")[0].id;
  //console.log(localVar.cars[0][0]);
  for(let i = 0; i< localVar.cars[0].length;i++){
    if(localVar.cars[0][i].tagsArray===id){
      console.log(localVar.cars[0][i]);
      removeCheckyListeners();
      //console.log("true");
      document.querySelectorAll(".carmain").forEach(e=>{e.style.display="none"});
      document.querySelectorAll(".sec3")[0].style.display="flex";
      document.querySelectorAll(".checky").forEach(e=>{e.style.display="none"});
      document.getElementById("delete").style.display = "none";

      document.querySelectorAll("#vehicletype")[0].value = localVar.cars[0][i].Type1;
      document.querySelectorAll("#maker")[0].value = localVar.cars[0][i].BrandType1;
      document.querySelectorAll("#model")[0].value = localVar.cars[0][i].Name1;
      document.querySelectorAll("#birthdate")[0].value = localVar.cars[0][i].YearOfMake;
      document.querySelectorAll("#price")[0].value = localVar.cars[0][i].PriceTZS;
      document.querySelectorAll("#mileage")[0].value = localVar.cars[0][i].Mileage;
      document.querySelectorAll("#transtypes")[0].value = localVar.cars[0][i].TransmissionType;
      document.querySelectorAll("#ameneties")[0].value = localVar.cars[0][i].AmenetiesArray;
      break
    }
  }
}


const removeCheckyListeners = ()=>{
  document.querySelectorAll(".carmain").forEach(ele=>{
    ele.removeEventListener("click",deleClicksAdded);
    ele.removeEventListener("click",addEditClicks);
  })
};


const deleClicksAdded = (e)=>{
  e.stopPropagation();
  if(e.target.parentNode.querySelectorAll(".checky")[0].classList.contains("checked")){
    e.target.parentNode.querySelectorAll(".checky")[0].src = "./icons/checkbox.png";
    e.target.parentNode.querySelectorAll(".checky")[0].classList.remove("checked")
  }else{
    e.target.parentNode.querySelectorAll(".checky")[0].src = "./icons/checkbox-select.png";
    e.target.parentNode.querySelectorAll(".checky")[0].classList.add("checked")
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


const checkLogin = async(s)=>{
  AnImEaction = "loging in...";
  stopAnime();
  startAnime();
  s.startFetch(JSON.stringify({}),"checklogin",(e)=>{
    e=JSON.parse(e);
    
      if(e.cookieStatus==="none"){
        stopAnime();
        alert("Please Log In");
        setStartStateOut();
      }else if(e.cookieStatus==="found"){
        //stopAnime();
        setStartStateIn();
      }else{
        stopAnime();
        alert("Please Log In");
        setStartStateOut();
      }
 
    //console.log(e);
  });
  return "";
};

const isEmpty= (obj)=> {
  for(var prop in obj) {
    if(Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}


const checkForDeleted = ()=>{
  document.querySelectorAll(".carmain").forEach(e=>{
    e.querySelectorAll("img").forEach(img=>{
      img.classList.forEach(c=>{
        if(c==="deleted"){
          //console.log(img.parentNode.childNodes[1]);
          img.parentNode.childNodes[1].src = "./icons/deleted.png";
        }
      });
    })
  })
}


const bundleFilesForUpload = async (fileList)=>{
  
  let filesDataObj = [];
  let copy = {fileInfo:{"ogname":"","meme":""},fileData:""};
  

  for(let i = 0 ; i < fileList.length ; i++){
    let tempObj = JSON.parse(JSON.stringify(copy));
    let file = fileList[i];

      tempObj.fileInfo.ogname = file.name;
      tempObj.fileInfo.meme = file.type;
      tempObj.fileData = await readFile(file).then((file)=>{
        file =  btoa(file);
        return file;
      }).then((file)=>{
        return file;
      })
      filesDataObj.push(tempObj);
    }
  return filesDataObj;
}

const readFile = async (file)=>{

  const toBinaryString = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

let parsedFile = null;
parsedFile =  await toBinaryString(file);

  return parsedFile;
}


const  setStartStateIn = ()=>{
  document.body.querySelectorAll("section").forEach(ele=>ele.style.display="none");
  document.querySelectorAll(".sec2")[0].style.display = "flex";
  stopAnime();
  AnImEaction = "Getting files";
  startAnime();
  backendServer.cosmetics.startFetch(JSON.stringify({"hello":"there"}),"cars/all",(e)=>{fillCars(e)})

}



const startAnime = ()=>{
  const box = document.querySelectorAll(".loading")[0];
  const textbox = box.querySelectorAll("span")[0];
  box.style.display = "flex";
  textbox.innerText = AnImEaction;
}



const stopAnime = ()=>{
  const box = document.querySelectorAll(".loading")[0];
  const textbox = box.querySelectorAll("span")[0];
  box.style.display = "none";
  textbox.innerText = "idle";
}