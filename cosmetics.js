const picCont = document.querySelectorAll(".editpics")[0];
const serverURL = "https://expressongoogle-jzam6yvx3q-ez.a.run.app/"
//const serverURL = "http://127.0.0.1:8080/";
//const serverURL = "https://tflgroup.co.tz/";
      picCont.remove();
let AnImEaction = "idle";
var dragSrcEl;
const backendServer = {};
backendServer["cosmetics"] = await (async () => {
      
  const server = await import("./server.js");
    
    return {server};
  })().then(({server})=>{
    let cosmetics = new server.server();
    return cosmetics;    
  });

const temp = {};
  


const setStartStateOut = ()=>{
  stopAnime();
    document.body.querySelectorAll("section").forEach(ele=>ele.style.display="none");
    document.querySelectorAll(".sec1")[0].style.display = "flex";

  
}


const addVehicleMenuEventClicks = ()=>{
  addNewPicEditingFuncs();
  document.querySelectorAll("#clearpics")[0].addEventListener("click",(e)=>{
    e.preventDefault();
    e.stopPropagation();
    document.querySelectorAll(".editpics2").forEach(e=>{e.remove()});
  })
  document.querySelectorAll(".actchild").forEach((e)=>{
    e.addEventListener("click",(e)=>{

        document.querySelectorAll(".actchild").forEach(e=>{e.classList.remove("active")});
        document.querySelectorAll(".editpics2").forEach(e=>{e.remove()});
        e.target.classList.add("active");
      if(e.target.classList.contains("add")){
        const editPicsToRem = document.querySelectorAll(".editpics");
        editPicsToRem.forEach(e=>e.remove());
        removeCheckyListeners();
        document.querySelectorAll(".editpara")[0].style.visibility = "collapse";
        document.querySelectorAll(".editpicsmom")[0].style.display = "flex";
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
    const promo = document.querySelectorAll(".previewofpromo")[0];
    promo.remove();
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
        tempEle.querySelectorAll(".mile")[0].innerText = commaSep(car.Mileage)+" km";
        tempEle.querySelectorAll(".price")[0].innerText = commaSep(car.PriceTZS);
        tempEle.querySelectorAll(".prtype")[0].innerText = "TZS";
        tempEle.querySelectorAll(".checky")[0].id = car.tagsArray;
        tempEle.querySelectorAll(".checky")[0].classList.add(car.id);
        carContainerMom.appendChild(tempEle);
        if(car.Picture1!==null&&car.Picture1!==undefined){
          //console.log("filled in pic");
          car.Picture1 = JSON.parse(car.Picture1);
          tempEle.querySelectorAll(".main")[0].src =`data:${car.Picture1.fileInfo.meme};base64,${car.Picture1.fileData}`;
        }else{
          //getPictures(car);
          const picobj = JSON.parse(car.newPics);
          if(picobj!==null&&picobj!==undefined&&picobj.arr[0]){
            const picurl = picobj.arr[0].url;
            const picname = picobj.arr[0].ogname;
            const disimg = document.getElementById(car.tagsArray).parentNode.querySelectorAll(".main")[0];
            disimg.alt = picname;
            disimg.src= `${picurl}`;
          }else{
            console.log("no pics for this car/slot.")
          }
          //console.log("didnt filled in pic");
        }
      }else if(car.Type1==="promo"){
        fillPromoPreview(car,promo);
      }
    });
    addVehicleMenuEventClicks();
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




function commaSep (n="1000000"){
  n = n.toString();
  n = reverse(n);
  var newStr = "";
  for(let i=n.length-1;i>=0;i--){
    if((i+1)%3===0&&i!==n.length-1){
      newStr = newStr+","+n[i];
    }else{
      newStr = newStr+n[i];
    }
  }
  //newStr = reverse(newStr);
  //console.log(newStr);
  return newStr;
}

function reverse(s){
  return s.split("").reverse().join("");
}


async function getMyCarPics(para=""){
  
    var myRequest = new Request(serverURL+"tflcarspics?paraOne="+para);
    
  
         
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


  







const fillPromoPreview = (p,promo)=>{
  const ele = promo.cloneNode(true);
  //console.log(p);

  if(p.id==="published"){
    ele.querySelectorAll(".onprom")[0].src = `./icons/on.png`;
  }else{
    ele.querySelectorAll(".onprom")[0].src = `./icons/off.png`;
  }
  
      //const pic = JSON.parse(p[0][0].Picture1);
      //console.log(localVar.cars[0][i]);
      ele.querySelectorAll("h1")[0].innerText = p.Name1
      ele.querySelectorAll("p")[0].innerText = p.BrandType1
      ele.querySelectorAll("img")[0].src = p.newPics;
      //document.querySelectorAll(".previewofpromo")[0].querySelectorAll("h1")[0].innerText = localVar.cars[0][i].Name1;
      //document.querySelectorAll(".previewofpromo")[0].querySelectorAll("p")[0].innerText = localVar.cars[0][i].BrandType1;
      //document.querySelectorAll(".previewofpromo")[0].querySelectorAll("img")[0].src =``;
      //`data:${meme};base64,${cloudBlob}`

      ele.querySelectorAll(".delprom")[0].addEventListener("click",(e)=>{
        //console.log(p);
        startAnime();

        backendServer.cosmetics.startFetch(JSON.stringify(p),"delpromo",(r)=>{
          if(r["1"]==="succ"){
            console.log("login is succesful...");
            //setStartStateIn();
            window.location.reload();
          }else{
            pauseForTheseSeconds(2694,()=>{
              window.location.reload();
            })
          }})
      })


      ele.querySelectorAll(".onprom")[0].addEventListener("click",(e)=>{
        //console.log(p);
        startAnime();

        backendServer.cosmetics.startFetch(JSON.stringify(p),"publprom",(r)=>{
          if(r["1"]==="succ"){
            console.log("login is succesful...");
            //setStartStateIn();
            window.location.reload();
          }else{
            pauseForTheseSeconds(2694,()=>{
              window.location.reload();
            })
          }})
      })

      

      document.querySelectorAll(".sec4")[0].insertBefore(ele, document.querySelectorAll(".promoform")[0]);
    
    

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
              document.querySelectorAll(".menutoo")[0].querySelectorAll(".view")[0].click();
              document.querySelectorAll(".menutootoo")[0].style.display = "none";
              document.querySelectorAll(".carmain").forEach(car=>{car.style.display="block"});
              document.querySelectorAll(".sec4")[0].style.display = "none";
              //document.querySelectorAll(".sec3")[0].style.display = "block";
            }else if(!e.target.classList.contains("activemainmenu")&&e.target.classList.contains("promo")){
              document.querySelectorAll(".vehi")[0].classList.remove("activemainmenu");
              document.querySelectorAll(".promo")[0].classList.add("activemainmenu");
              document.querySelectorAll(".menutoo")[0].style.display = "none";
              document.querySelectorAll(".menutootoo")[0].style.display = "flex";
              document.querySelectorAll(".carmain").forEach(car=>{car.style.display="none"});
              document.querySelectorAll(".sec4")[0].style.display = "block";
              document.querySelectorAll(".sec3")[0].style.display = "none";
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
              console.log({"goes":"brrr",tempV})
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
      AnImEaction = "uploading car";
      const type = document.getElementById("vehicletype").value;
      const maker = document.getElementById("maker").value;
      const model = document.getElementById("model").value;
      const date = document.getElementById("birthdate").value;
      const price = document.getElementById("price").value;
      const mileage = document.getElementById("mileage").value;
      const transmission = document.getElementById("transtypes").value;
      const pictures = document.querySelectorAll(".editpics");
      const ameneties = document.getElementById("ameneties").value;
   
      const formData = new FormData();
      formData.append('type', type);
      formData.append('maker', maker);
      formData.append('model', model);
      formData.append('date', date);
      formData.append('price', price);
      formData.append('mileage', mileage);
      formData.append('transmission', transmission);
      formData.append('ameneties', ameneties);
      var counter = 0;
      pictures.forEach(p=>{
        //var uintArray = Base64Binary.decode(base64_string);  
        //var byteArray = Base64Binary.decodeArrayBuffer(base64_string); 
        var style = p.currentStyle || window.getComputedStyle(p, false);
        var url = style.backgroundImage.slice(4, -1).replace(/["']/g, "");
        //var byteArray = Base64Binary.decode(url);
        //byteArray = JSON.stringify({byteArray});  
        
        //console.log(url);
        var name = p.dataset.ogname;
        formData.append("image"+counter,name);
        formData.append("imageData"+counter,url);
        formData.append("imageMeme"+counter,p.dataset.meme);
        counter++;

      });


          if(document.querySelectorAll(".add")[0].classList.contains("active")){
            formData.append("tagsArray","init");
            startAnime();
            backendServer.cosmetics.startFetch(formData,"tflcarupload",(r)=>{
              if(r["1"]==="succ"){
                console.log("login is succesful...");
                //setStartStateIn();
                window.location.reload();
              }else{
                pauseForTheseSeconds(2694,()=>{
                  window.location.reload();
                })
              }
            });

          }else{
            formData.append("tagsArray",document.querySelectorAll(".thisformid")[0].id);
            startAnime();
            backendServer.cosmetics.startFetch(formData,"tflcaredit",(r)=>{
              if(r["1"]==="succ"){
                console.log("login is succesful...");
                //setStartStateIn();
                window.location.reload();
              }else{
                pauseForTheseSeconds(2694,()=>{
                  window.location.reload();
                })
              }
            });

          }

      //const myCarObj ={type,maker,model,date,price,mileage,transmission,pictures,ameneties};
      //myCarObj.pictures = await bundleFilesForUpload(myCarObj.pictures);
      
    }

    async checkForm3(e){
      startAnime();
      AnImEaction = "deleting";
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
        }else{
          pauseForTheseSeconds(2694,()=>{
            window.location.reload();
          })
        }
      });
      
    }


    async checkForm4(e){
      AnImEaction = "updating promo";
      startAnime();
      const promotit = document.getElementById("promotit").value;
      const promoword = document.getElementById("promoword").value;
      const promopic = document.getElementById("promopic").files[0];
      const promomeme = document.getElementById("promopic").files[0].type;
      const proname = document.getElementById("promopic").files[0].name;
      const obj = {promotit,promoword,promomeme,proname};
      obj.promopic = await readFileToo(promopic);

      console.log(JSON.stringify(obj));
      backendServer.cosmetics.startFetch(JSON.stringify(obj),"updatepromo",(r)=>{
        if(r["1"]==="succ"){
          console.log("login is succesful...");
          //setStartStateIn();
          window.location.reload();
        }else{
          pauseForTheseSeconds(2694,()=>{
            window.location.reload();
          })
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
      
      const picobj = JSON.parse(localVar.cars[0][i].newPics);
      document.querySelectorAll(".carmain").forEach(e=>{e.style.display="none"});
      document.querySelectorAll(".sec3")[0].style.display="flex";
      document.querySelectorAll(".checky").forEach(e=>{e.style.display="none"});
      document.getElementById("delete").style.display = "none";

      document.querySelectorAll(".editpicsmom")[0].style.display = "flex";


      if(picobj!==null){
      const tempArr = picobj.arr;
      removeCheckyListeners();
      console.log(picobj);
      tempArr.forEach(ele=>{
        if(localVar.cars[0][i].newPics!==null&&localVar.cars[0][i].newPics.length>1){
          const picObj = picobj;
          const j = tempArr.indexOf(ele);
          console.log(j);
          console.log(picObj);
          const newPic = picCont.cloneNode(true);
          const newPicmo = document.createElement("div");
          newPic.alt = picObj.arr[j].ogname;
          newPic.setAttribute("data-ogname",picObj.arr[j].ogname);
          newPic.setAttribute("data-meme",picObj.arr[j].contentType);
          newPicmo.setAttribute("draggable",true);
          newPicmo.className = "editpics2";
          newPicmo.appendChild(newPic);
          addDragy(newPicmo);
          newPic.title = localVar.cars[0][i].tagsArray;
          newPic.style.backgroundImage = `url(${picObj.arr[j].url})`;
          document.querySelectorAll(".editpicsmom")[0].appendChild(newPicmo);
          localVar["temppics1"] = document.querySelectorAll(".editpicsmom")[0].childNodes;
          //console.log(newPic.src);
          //console.log(picObj.fileData);
        }else{
          console.log(ele+" is not available");
        }
    })}

      document.querySelectorAll(".thisformid")[0].id = localVar.cars[0][i].tagsArray;
      
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
  AnImEaction = "loging in";
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


const addNewPicEditingFuncs = async () => {
  const pictures = document.querySelectorAll("#pictureuploads")[0];
  pictures.addEventListener("input",async (e)=>{

    const finalpics = [];
        

    const files = Array.from(e.target.files);

    for(let i = 0 ; i < files.length ; i++){
      let tempObj = {};
      let file = files[i];
  
        tempObj["fileName"] = file.name;
        tempObj["fileMeme"] = file.type;
        tempObj["fileData"] = await readFileToo(file).then((file)=>{
          file =  file;
          return file;
        }).then((file)=>{
          return file;
        })
        finalpics.push(tempObj);
      }
    
   const momEdit = document.querySelectorAll(".editpicsmom")[0];
   if((momEdit.querySelectorAll(".editpics").length)>9){
      alert("Maximum Number of Pictures Allowed is 6. Select Files Again Without Exceeding Limit.");
      e.target.value = "";
      momEdit.querySelectorAll("img").forEach(im=>im.remove());
      document.querySelectorAll(".menutoo")[0].querySelectorAll(".view")[0].click();
   }else{
    insertFormPics(momEdit,finalpics).then(()=>{
      localVar["temppics1"] = momEdit.childNodes;
    }).then(()=>{
      const imgs = document.querySelectorAll(".editpicsmom")[0].querySelectorAll(".editpics").forEach(pic=>{
      })
    });
   }

  })
}



const readFileToo = async (file)=>{

  const toBinaryString = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

let parsedFile = null;
parsedFile =  await toBinaryString(file);

  return parsedFile;
}


const insertFormPics = async (mom,pics)=>{
  await pics.forEach(pic=>{
    const nuimg = document.createElement("div");
    const nuimmom = document.createElement("div");
    nuimg.className = "editpics";
    //put meme n ogname
    nuimg.setAttribute("data-ogname",pic.fileName);
    nuimg.setAttribute("data-meme",pic.fileMeme);
    nuimmom.setAttribute("draggable",true);
    nuimmom.className = "editpics2";
    nuimmom.appendChild(nuimg);
    addDragy(nuimmom);
    nuimg.style.backgroundImage = `url(${pic.fileData})`;
    mom.appendChild(nuimmom);
  })
}


const addDragy = (element) => {
  
  function handleDragStart(e) {
    this.style.opacity = '0.4';
    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);
  }

  function handleDragEnd(e) {
    this.style.opacity = '1';
    e.target.style.opacity = "1";
    this.classList.remove('over');
  }

  function handleDragOver(e) {
    e.preventDefault();
    return false;
  }

  function handleDragEnter(e) {
    this.classList.add('over');
  }

  function handleDragLeave(e) {
    this.classList.remove('over');
  }

  function handleDrop(e) {
    e.stopPropagation(); // stops the browser from redirecting.
    if (dragSrcEl !== this) {
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
      this.innerHTML = this.querySelectorAll(".editpics")[0].outerHTML;
      dragSrcEl.style.opacity = "1";
      this.querySelectorAll("div").forEach(d=>d.style.opacity = "1") 
      this.querySelectorAll(".editpics")[0].style.opacity = "1";
      console.log("drag n drop is working as deisgned...");
    }else{
      console.log("drag n drop is having issues...");
    }
    return false;
  }

    element.addEventListener('dragstart', handleDragStart);
    element.addEventListener('dragover', handleDragOver);
    element.addEventListener('dragenter', handleDragEnter);
    element.addEventListener('dragleave', handleDragLeave);
    element.addEventListener('dragend', handleDragEnd);
    element.addEventListener('drop', handleDrop);

};




var Base64Binary = {
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	
	/* will return a  Uint8Array type */
	decodeArrayBuffer: function(input) {
		var bytes = (input.length/4) * 3;
		var ab = new ArrayBuffer(bytes);
		this.decode(input, ab);
		
		return ab;
	},

	removePaddingChars: function(input){
		var lkey = this._keyStr.indexOf(input.charAt(input.length - 1));
		if(lkey == 64){
			return input.substring(0,input.length - 1);
		}
		return input;
	},

	decode: function (input, arrayBuffer) {
		//get last chars to see if are valid
		input = this.removePaddingChars(input);
		input = this.removePaddingChars(input);

		var bytes = parseInt((input.length / 4) * 3, 10);
		
		var uarray;
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		var j = 0;
		
		if (arrayBuffer)
			uarray = new Uint8Array(arrayBuffer);
		else
			uarray = new Uint8Array(bytes);
		
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		
		for (i=0; i<bytes; i+=3) {	
			//get the 3 octects in 4 ascii chars
			enc1 = this._keyStr.indexOf(input.charAt(j++));
			enc2 = this._keyStr.indexOf(input.charAt(j++));
			enc3 = this._keyStr.indexOf(input.charAt(j++));
			enc4 = this._keyStr.indexOf(input.charAt(j++));
	
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
	
			uarray[i] = chr1;			
			if (enc3 != 64) uarray[i+1] = chr2;
			if (enc4 != 64) uarray[i+2] = chr3;
		}
	
		return uarray;	
	}
}