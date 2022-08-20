const picCont = document.querySelectorAll(".editpics")[0];

      picCont.remove();
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
  stopAnime();
    document.body.querySelectorAll("section").forEach(ele=>ele.style.display="none");
    document.querySelectorAll(".sec1")[0].style.display = "flex";

  
}


const addVehicleMenuEventClicks = ()=>{
  document.querySelectorAll(".actchild").forEach((e)=>{
    e.addEventListener("click",(e)=>{
        document.querySelectorAll(".actchild").forEach(e=>{e.classList.remove("active")});
        e.target.classList.add("active");
      if(e.target.classList.contains("add")){
        const editPicsToRem = document.querySelectorAll(".editpics");
        editPicsToRem.forEach(e=>e.remove());
        removeCheckyListeners();
        document.querySelectorAll(".editpara")[0].style.visibility = "collapse";
        document.querySelectorAll(".editpicsmom")[0].style.display = "none";
        document.querySelectorAll(".carmain").forEach(e=>{e.style.display="none"});
        document.querySelectorAll(".sec3")[0].style.display="flex";
        document.querySelectorAll(".checky").forEach(e=>{e.style.display="none"});
        document.getElementById("delete").style.display = "none"
      }else if(e.target.classList.contains("view")){
        const editPicsToRem = document.querySelectorAll(".editpics");
        editPicsToRem.forEach(e=>e.remove());
        removeCheckyListeners();
        document.querySelectorAll(".editpara")[0].style.visibility = "collapse";
        document.querySelectorAll(".editpicsmom")[0].style.display = "none";
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
        const editPicsToRem = document.querySelectorAll(".editpics");
        editPicsToRem.forEach(e=>e.remove());
        document.querySelectorAll(".editpara")[0].style.visibility = "collapse";
        document.querySelectorAll(".editpicsmom")[0].style.display = "none";
        document.querySelectorAll(".carmain").forEach(e=>{e.style.display="block"});
        document.querySelectorAll(".checky").forEach(e=>{e.style.display="block"});
        removeCheckyListeners();
        addCheckyListeners();
        document.getElementById("delete").style.display = "block";
        document.querySelectorAll(".sec3")[0].style.display="none";
      }else{
        const editPicsToRem = document.querySelectorAll(".editpics");
        editPicsToRem.forEach(e=>e.remove());
        document.querySelectorAll(".editpara")[0].style.visibility = "collapse";
        document.querySelectorAll(".editpicsmom")[0].style.display = "none";
        console.log("false");
      }
     })
  })
}

const   fillCars = (e)=> {
  stopAnime();
  
  (async()=>{return e;})().then((cars)=>{
    
  if(cars.cookieStatus&&cars.cookieStatus==="none"){
    setStartStateOut();

  }else if(isEmpty(cars)){
    setStartStateOut();
  }else{
    const carContainer = document.querySelectorAll(".carmain")[0];
    const carContainerMom = document.querySelectorAll(".sec2")[0].querySelectorAll(".content")[0];
    document.querySelectorAll(".carmain").forEach(e=>e.remove());
    
    const carstoo=JSON.parse(cars);
    //console.log(carstoo);
    localVar["cars"] = [carstoo[0]];
    carstoo[0].forEach(car=>{
      if(car.Type1!=="promo"){
        const tempEle = carContainer.cloneNode(true)
        tempEle.querySelectorAll(".year")[0].innerText = car.YearOfMake;
        tempEle.querySelectorAll(".brand")[0].innerText = car.BrandType1;
        tempEle.querySelectorAll(".make")[0].innerText = car.Name1;
        tempEle.querySelectorAll(".price")[0].innerText = car.PriceTZS?car.PriceTZS:"xxx";
        tempEle.querySelectorAll(".prtype")[0].innerText = "TZS";
        tempEle.querySelectorAll(".checky")[0].id = car.tagsArray;
        tempEle.querySelectorAll(".checky")[0].classList.add(car.id);
        if(car.Picture1!==null&&car.Picture1!==undefined){
          //console.log("filled in pic");
          car.Picture1 = JSON.parse(car.Picture1);
          tempEle.querySelectorAll(".main")[0].src =`data:${car.Picture1.fileInfo.meme};base64,${car.Picture1.fileData}`;
        }else{
          getPictures(car);
          //console.log("didnt filled in pic");
        }
        carContainerMom.appendChild(tempEle);
      }
    });
    addVehicleMenuEventClicks();
    fillPromoPreview();
    checkForDeleted();
  }
  });
}




async function getPictures(car={"car":"isEmpty"}){
  //console.log(car);   
  await getMyCarPics(car.tagsArray).then((res)=>{
    const keys = Object.keys(res[0][0]["f0_"]);
    var counter = 1;
    keys.forEach(key=>{
      if(res[0][0]["f0_"][key]!==null&&res[0][0]["f0_"][key]!=="null"){
        //console.log(res);
        //console.log(localVar.cars);

        localVar.cars[0].forEach(v=>{
          //console.log(v.tagsArray===car.tagsArray);
          //console.log(v.tagsArray)
          //console.log(car.tagsArray)
          if(v.tagsArray===car.tagsArray){
            v["Picture"+counter] = res[0][0]["f0_"][key];
            counter++;
          }
        })
        //console.log(res[0][0]["f0_"][key]);
        try{
          res[0][0]["f0_"][key]=JSON.parse(res[0][0]["f0_"][key])
          
          const disimg = document.getElementById(car.tagsArray).parentNode.querySelectorAll(".main")[0];
          disimg.alt = res[0][0]["f0_"][key].fileInfo.ogname;
          disimg.src= `data:${res[0][0]["f0_"][key].fileInfo.meme};base64,${res[0][0]["f0_"][key].fileData}`;
          
        }catch{e=>{
          res[0][0]["f0_"][key]=res[0][0]["f0_"][key];
          console.log(e);
        }}
      }else{
       // console.log("no pics for this item...");
      }
    })
    counter = 1;
   })
    
}



async function getMyCarPics(para=""){
  //const reqString = "http://127.0.0.1:8080/tflcarspics?paraOne="+para;
  const reqString = "https://expressongoogle-jzam6yvx3q-ez.a.run.app/tflcarspics?paraOne="+para;

      
  
    var myRequest = new Request(reqString);
    
  
         
    const returnVal = await fetch(myRequest, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'omit', // include, *same-origin, omit
      headers: {
        //'Content-Type': 'text/txt'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    })
          .then(function(response) {
            if (!response.ok) {
              
              throw new Error("HTTP error, status = " + response.status);
              
            }
            
            return response.text();
          })
          .then(function(myBlob) {
            
            var cloudObject = JSON.parse(myBlob);
            //window.location.href = "./";
            return cloudObject;
            
          })
          .catch(function(error) {
            console.log(error.message);
          });
  
          
         // document.querySelectorAll(".mycolumns")[1].innerHTML = returnVal;
          return returnVal; 
  
      // tempDiv.innerHTML = Object.entries(localVar.values)[0][1][3] ;  
  }







const fillPromoPreview = ()=>{
  for(let i = 0; i< localVar.cars[0].length;i++){
    if(localVar.cars[0][i].Type1==="promo"&&localVar.cars[0][i].Picture1!==null&&localVar.cars[0][i].Picture1!==undefined){
      const pic = JSON.parse(localVar.cars[0][i].Picture1);
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
        document.querySelectorAll(".menu")[0].querySelectorAll(".listitem,.lastmenu,#lastmenu").forEach(item=>{
          item.addEventListener("click",e=>{
            if(!e.target.classList.contains("activemainmenu")&&e.target.classList.contains("vehi")){
              document.querySelectorAll(".promo")[0].classList.remove("activemainmenu");
              document.querySelectorAll(".vehi")[0].classList.add("activemainmenu");
              document.querySelectorAll(".menutoo")[0].style.display = "flex";
              document.querySelectorAll(".menutootoo")[0].style.display = "none";
              document.querySelectorAll(".carmain").forEach(car=>{car.style.display="block"});
              document.querySelectorAll(".sec4")[0].style.display = "none";
            }else if(!e.target.classList.contains("activemainmenu")&&e.target.classList.contains("promo")){
              document.querySelectorAll(".vehi")[0].classList.remove("activemainmenu");
              document.querySelectorAll(".promo")[0].classList.add("activemainmenu");
              document.querySelectorAll(".menutoo")[0].style.display = "none";
              document.querySelectorAll(".menutootoo")[0].style.display = "flex";
              document.querySelectorAll(".carmain").forEach(car=>{car.style.display="none"});
              document.querySelectorAll(".sec4")[0].style.display = "block";
            }else if(e.target.id==="lastmenu"||e.target.classList.contains("lastmenu")){
                //const menuCloser  =  document.querySelectorAll("#lastmenu,.lastmenu");
                const menuStyle = window.getComputedStyle(document.querySelectorAll(".menu")[0])
                .getPropertyValue("left");
                if(menuStyle==="0px"){
                  document.querySelectorAll(".menu")[0].style.left = "-27%";
                  document.querySelectorAll("#lastmenu")[0].style.transform = "rotate(180deg)";
                  document.querySelectorAll(".content")[0].style.transform = "translateX(-22%)";
                  pauseForTheseSeconds(369,()=>{document.querySelectorAll(".content")[0].style.width = "90%";});
                  
                }else{
                  document.querySelectorAll(".content")[0].style.transform = "translateX(0px)";
                  document.querySelectorAll(".menu")[0].style.left = "0px";
                  document.querySelectorAll("#lastmenu")[0].style.transform = "rotate(-180deg)";
                  pauseForTheseSeconds(369,()=>{document.querySelectorAll(".content")[0].style.width = "76%";});
                }
                console.log(menuStyle);
               
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
            
              startAnime();
            backendServer.cosmetics.startFetch(data,"login",(r)=>{
              const tempV = JSON.parse(r);
              console.log(tempV+"did is rrr....")
              if(tempV["1"]==="succ"){
                
              console.log("login is succesful...");
              setStartStateIn();
              }else{
                setStartStateOut();
                console.log("iran");
                console.log()
              }
            });

            }else{
              alert("Soemthing went wrong!")
            }
      
        

    }


    async checkForm2(e){
      document.querySelectorAll(".editpara")[0].style.visibility = "collapse";
      AnImEaction = "uploading car...";
      const type = document.getElementById("vehicletype").value;
      const maker = document.getElementById("maker").value;
      const model = document.getElementById("model").value;
      const date = document.getElementById("birthdate").value;
      const price = document.getElementById("price").value;
      const mileage = document.getElementById("mileage").value;
      const transmission = document.getElementById("transtypes").value;
      const pictures = document.getElementById("pictureuploads").files;
      //console.log(pictures);
      const ameneties = document.getElementById("ameneties").value;

      const myCarObj ={type,maker,model,date,price,mileage,transmission,pictures,ameneties};
      myCarObj.pictures = await bundleFilesForUpload(myCarObj.pictures);


        if(document.querySelectorAll(".add")[0].classList.contains("active")){
          console.log(myCarObj.pictures);
          startAnime();
            backendServer.cosmetics.startFetch(JSON.stringify(myCarObj),"tflcarupload",(r)=>{
            if(r["1"]==="succ");
            console.log("login is succesful...");
            //setStartStateIn();
            window.location.reload();
            })
            
          
        }else{
          const oldPics = document.querySelectorAll(".editpics");
          const idSpan = document.querySelectorAll(".thisformid");
            myCarObj["tagsArray"] = oldPics!==undefined&&oldPics[0].nodeType?oldPics[0].title:idSpan[0].id;
          console.log(oldPics);
          console.log(idSpan);
          if(oldPics&&oldPics[0].nodeType&&myCarObj.pictures.length<=0){
            myCarObj.pictures = [];
            oldPics.forEach(pic=>{
              const disPicObj = {fileInfo:{ogname:"",meme:""},fileData:""}
              const picArr = pic.src.split(";");
              disPicObj.fileInfo.meme = picArr[0].split(":")[1];
              disPicObj.fileInfo.ogname = pic.alt;
              disPicObj.fileData = picArr[1].split(",")[1];
              myCarObj.pictures.push(disPicObj);
            //console.log(picArr[0].split(":")[1]);
              
          })

          //startAnime();
          console.log("reuploaded pictures");
          console.log(myCarObj);
          backendServer.cosmetics.startFetch(JSON.stringify(myCarObj),"tflcaredit",(r)=>{
            if(r["1"]==="succ");
            console.log("login is succesful...");
            //setStartStateIn();
            //window.location.reload();
          })


          }else{
            //startAnime();
            console.log("new pictures");
            console.log(myCarObj);
            backendServer.cosmetics.startFetch(JSON.stringify(myCarObj),"tflcaredit",(r)=>{
              if(r["1"]==="succ");
              console.log("login is succesful...");
              //setStartStateIn();
              //window.location.reload();
            })        

          }
         

        }
      /*
        startAnime();
        backendServer.cosmetics.startFetch(JSON.stringify(myCarObj),"tflcarupload",(r)=>{
        if(r["1"]==="succ");
        console.log("login is succesful...");
        //setStartStateIn();
        window.location.reload();
      })
      */;
  

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
  document.querySelectorAll(".editpicsmom")[0].querySelectorAll(".editpics").forEach(e=>e.remove());
  for(let i = 0; i< localVar.cars[0].length;i++){
    if(localVar.cars[0][i].tagsArray===id){
      const tempArr = ["Picture1","Picture2","Picture3","Picture4","Picture5"];
     
      removeCheckyListeners();
      //console.log("true");
      document.querySelectorAll(".carmain").forEach(e=>{e.style.display="none"});
      document.querySelectorAll(".sec3")[0].style.display="flex";
      document.querySelectorAll(".checky").forEach(e=>{e.style.display="none"});
      document.getElementById("delete").style.display = "none";

      document.querySelectorAll(".editpicsmom")[0].style.display = "flex";
      tempArr.forEach(ele=>{
        if(localVar.cars[0][i][ele]!==undefined){
          const picObj = JSON.parse(localVar.cars[0][i][ele]);
          const newPic = picCont.cloneNode(true);
          newPic.alt = picObj.fileInfo.ogname;
          newPic.title = localVar.cars[0][i].tagsArray;
          document.querySelectorAll(".thisformid")[0].id = localVar.cars[0][i].tagsArray;
          newPic.src = `data:${picObj.fileInfo.meme};base64,${picObj.fileData}`;
          document.querySelectorAll(".editpicsmom")[0].appendChild(newPic);
          //console.log(newPic.src);
          //console.log(picObj.fileData);
        }else{
          console.log(ele+" is not available");
        }
    })
      
      document.querySelectorAll(".editpara")[0].style.visibility = "visible";
      
      
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
  startAnime();
  s.startFetch(JSON.stringify({}),"checklogin",(e2)=>{
    //console.log(e2);
    const e=JSON.parse(e2);
    
    
      if(e.cookieStatus==="none"){
        alert("Please Log In");
        setStartStateOut();
      }else if(e.cookieStatus==="found"){
        setStartStateIn();
      }else{
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

const pauseForTheseSeconds = (seconds=100,action=()=>{})=>{
  const thisTimeout = window.setTimeout(()=>{
      action();
      window.clearTimeout(thisTimeout);
  },seconds)
}