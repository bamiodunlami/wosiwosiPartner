try{function subscrber(){try{let e=$(".subscrber-details");for(let t=0;t<e.length;t++)$(e[t].children[8]).on("click",(()=>{$("#loading").removeClass("hidden"),$("#detailsBar").addClass("hidden");const i={email:e[t].children[3].innerHTML};fetch("/idetails",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)}).then((e=>e.json())).then((e=>{e&&setTimeout((()=>{$("#loading").addClass("hidden"),$("#fname").text(e.fname),$("#lname").text(e.lname),$("#email").text(e.email),$("#phone").text(e.phone),$("#address").text(`${e.address}, ${e.postcode}, ${e.country}`),$("#currency").text(e.currency),$("#interest").text(e.interest),$("#roiOption").text(e.roiOption),$("#rioTime").text(e.roiTime),$("#emailTag").val(e.email),$("#detailsBar").removeClass("hidden")}),1500)}))}))}catch(e){}}subscrber()}catch(e){}