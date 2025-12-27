
function updateTime() { 
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        const dates = now.toDateString();
        document.getElementById('time').innerText = timeString+" "+dates; } 
        updateTime();
    setInterval(updateTime, 1000); 
// proxy to get around cors protocal, it cool fr fr
const proxyUrl = 'https://corsproxy.io/?key=98122491&url=';
const targetUrl = 'https://www.transitchicago.com/api/1.0/routes.aspx?routeid=red&outputType=JSON';


async function paytonupdates(){
fetch("https://freshbeets.dev/api/transit")
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => { 

      const parser = new DOMParser();
     
    const xmlDoc = parser.parseFromString(data[20], "text/xml");
    
     const update = document.getElementById('update');
     update.innerHTML = "";
     const items = xmlDoc.querySelectorAll("item");
  for (let i = 0; i < 4; i++) {
    const title = items[i].querySelector("title").textContent;
    const description = items[i].querySelector("description").textContent.replace(/\t/g, "").replace(/\n/g, "");
    const date = new Date();
    const compareDate = new Date(description);
    
    
    const updateElement = document.createElement('div');
    const slashformat = (date.getMonth() + 1) +  "/" + date.getDate() + "/" + date.getFullYear();
    const slashformattmrw = (date.getMonth() + 1) +  "/" + (date.getDate()+1) + "/" + date.getFullYear();
    if(slashformat==description){
      updateElement.innerText = "Today" + " : " + title;
    } else if(slashformattmrw==description){
        updateElement.innerText = "Tommorow" + " : " + title;
    }    else{
        updateElement.innerText = description + " : " + title;
    }
    update.appendChild(updateElement);
    
    
  }
      
})
  .catch(error => console.error('Error fetching data:', error));
}

paytonupdates()
setInterval(paytonupdates, 1000*60); 


// get the redline time

async function redlinetime(){
fetch("https://freshbeets.dev/api/transit")
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => { 
    const incoming = data[0].ctatt.eta; 
    const allRedDiv = document.getElementById('Allred'); 
    allRedDiv.innerHTML = '';
    const allRedHDiv = document.getElementById('How'); 
    allRedHDiv.innerHTML = '';
    incoming.forEach(thing => {
        const currentTime = new Date();
        const arrival = new Date(thing.arrT);
        // Before I learned dates i parsed the string manually
        //const arrival = parseInt(thing.arrT.toString().slice(14,16),10)+parseInt(thing.arrT.toString().slice(11,13),10)*60
        const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
        const timeDifference = Math.round((arrival - currentTime) / 60000);
        if(timeDifference>5 && timeDifference<21){
        let maybeS = ""
        if(timeDifference!=1){
        maybeS = "s"
        }
        let trainInfo = `Due in ${timeDifference} minute` + maybeS;
        if(timeDifference==0){
        trainInfo = `Due now`;
        }
        const trainInfoElement = document.createElement('div'); 
        trainInfoElement.innerText = trainInfo;
        if(thing.destNm=='Howard'){
            allRedHDiv.appendChild(trainInfoElement);
        } else{
            allRedDiv.appendChild(trainInfoElement);
        }
        }
    })
})
  .catch(error => console.error('Error fetching data:', error));
}
// Pings every ten seconds, edit the second num plz
redlinetime()
setInterval(redlinetime, 1000*60); 
// brown line time
async function brnlinetime(){

fetch("https://freshbeets.dev/api/transit")
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => { 
    const incoming = data[1].ctatt.eta; 
    const loopDiv = document.getElementById('Looop'); 
    loopDiv.innerHTML = '';
    const kimDiv = document.getElementById('Kim'); 
    kimDiv.innerHTML = '';
    incoming.forEach(thing => {
        const currentTime = new Date();
        const arrival = new Date(thing.arrT);
        //const arrival = parseInt(thing.arrT.toString().slice(14,16),10)+parseInt(thing.arrT.toString().slice(11,13),10)*60
        const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
        const timeDifference = Math.round((arrival - currentTime) / 60000);
        if(timeDifference>5 && timeDifference<21){
        let maybeS = ""
        if(timeDifference!=1){
        maybeS = "s"
        }
        let trainInfo = `Due in ${timeDifference} minute` + maybeS;
        if(timeDifference==0){
        trainInfo = `Due now`;
        }
        const trainInfoElement = document.createElement('div'); 
        trainInfoElement.innerText = trainInfo;
        if(thing.destNm=='Kimball' || thing.destNm=='Linden'){
            kimDiv.appendChild(trainInfoElement);
        } else if(thing.destNm=='Loop'){
            loopDiv.appendChild(trainInfoElement);
        }
        }
    })
})
  .catch(error => console.error('Error fetching data:', error));
}
brnlinetime()
setInterval(brnlinetime, 1000*60); 

// Sus date is a function that I made that parses the date format for buses, becuases it isn't in a traditional format that JS uses
function SusDate(dateString) {
    const year = parseInt(dateString.slice(0, 4));
    const month = parseInt(dateString.slice(4, 6)) - 1; 
    const day = parseInt(dateString.slice(6, 8));
    const hour = parseInt(dateString.slice(9, 11));
    const minute = parseInt(dateString.slice(12, 14));
    return new Date(year, month, day, hour, minute);
}
// 70 bus
async function bus70time(){
/* TO THE HOOOOOOOOD */
// Each bus has its own individual page, they aren't both in the same page lik the trains
fetch("https://freshbeets.dev/api/transit")
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => { 
    const incoming = data[2]['bustime-response'].prd; 
    const hoodDiv = document.getElementById('hood'); 
    hoodDiv.innerHTML = '';
    incoming.forEach(thing => {
        const currentTime = new Date();
        const arrival = SusDate(thing.prdtm);
        //const arrival = parseInt(thing.arrT.toString().slice(14,16),10)+parseInt(thing.arrT.toString().slice(11,13),10)*60
        const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
        const timeDifference = Math.round((arrival - currentTime) / 60000);
        if(timeDifference>5 && timeDifference<21){
        let maybeS = ""
        if(timeDifference!=1){
        maybeS = "s"
        }
       let busInfo = `Due in ${timeDifference} minute` + maybeS;
        if(timeDifference==0){
        busInfo = `Due now`;
        }
        const busInfoElement = document.createElement('div'); 
        busInfoElement.innerText = busInfo;
        hoodDiv.appendChild(busInfoElement);
        }
    })
})
  .catch(error => console.error('Error fetching data:', error));


  /* TO ZA WATA*/
  // Other one, this is the api for the going east
  fetch("https://freshbeets.dev/api/transit")
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => { 
    const incoming = data[14]['bustime-response'].prd; 
    const wataDiv = document.getElementById('water'); 
    wataDiv.innerHTML = '';
    incoming.forEach(thing => {
        const currentTime = new Date();
        const arrival = SusDate(thing.prdtm);
        //const arrival = parseInt(thing.arrT.toString().slice(14,16),10)+parseInt(thing.arrT.toString().slice(11,13),10)*60
        const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
        const timeDifference = Math.round((arrival - currentTime) / 60000);
        if(timeDifference>5 && timeDifference<21){
        let maybeS = ""
        if(timeDifference!=1){
        maybeS = "s"
        }
        let busInfo = `Due in ${timeDifference} minute` + maybeS;
        if(timeDifference==0){
        busInfo = `Due now`;
        }
        const busInfoElement = document.createElement('div'); 
        busInfoElement.innerText = busInfo;
        wataDiv.appendChild(busInfoElement);
        }
    })
})
  .catch(error => console.error('Error fetching data:', error));
}
bus70time()
setInterval(bus70time, 1000*60); 
//22 clark bus
async function bus22time(){
/* TO KingV */
// api for southbound
fetch("https://freshbeets.dev/api/transit")
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => { 
    const incoming = data[3]['bustime-response'].prd; 
    const kingDiv = document.getElementById('kingV'); 
    kingDiv.innerHTML = '';
    incoming.forEach(thing => {
        const currentTime = new Date();
        const arrival = SusDate(thing.prdtm);
        //const arrival = parseInt(thing.arrT.toString().slice(14,16),10)+parseInt(thing.arrT.toString().slice(11,13),10)*60
        const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
        const timeDifference = Math.round((arrival - currentTime) / 60000);
        if(timeDifference>5 && timeDifference<21){
        let maybeS = ""
        if(timeDifference!=1){
        maybeS = "s"
        }
        let busInfo = `Due in ${timeDifference} minute` + maybeS;
        if(timeDifference==0){
        busInfo = `Due now`;
        }
        const busInfoElement = document.createElement('div'); 
        busInfoElement.innerText = busInfo;
        kingDiv.appendChild(busInfoElement);
        }
    })
})
  .catch(error => console.error('Error fetching data:', error));

  fetch("https://freshbeets.dev/api/transit")
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => { 
    const incoming = data[15]['bustime-response'].prd; 
    const northDiv = document.getElementById('north'); 
    northDiv.innerHTML = '';
    incoming.forEach(thing => {
        const currentTime = new Date();
        const arrival = SusDate(thing.prdtm);
        //const arrival = parseInt(thing.arrT.toString().slice(14,16),10)+parseInt(thing.arrT.toString().slice(11,13),10)*60
        const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
        const timeDifference = Math.round((arrival - currentTime) / 60000);
        if(timeDifference>5 && timeDifference<21){
        let maybeS = ""
        if(timeDifference!=1){
        maybeS = "s"
        }
        let busInfo = `Due in ${timeDifference} minute` + maybeS;
        if(timeDifference==0){
        busInfo = `Due now`;
        }
        const busInfoElement = document.createElement('div'); 
        busInfoElement.innerText = busInfo;
        northDiv.appendChild(busInfoElement);
        }
    })
})
  .catch(error => console.error('Error fetching data:', error));

}
bus22time()
setInterval(bus22time, 2000*60);

async function bus66time(){
/* TO KingV */
// api for southbound
fetch("https://freshbeets.dev/api/transit")
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => { 
    const incoming = data[16]['bustime-response'].prd; 
    const kingDiv = document.getElementById('brownwest'); 
    kingDiv.innerHTML = '';
    incoming.forEach(thing => {
        const currentTime = new Date();
        const arrival = SusDate(thing.prdtm);
        //const arrival = parseInt(thing.arrT.toString().slice(14,16),10)+parseInt(thing.arrT.toString().slice(11,13),10)*60
        const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
        const timeDifference = Math.round((arrival - currentTime) / 60000);
        if(timeDifference>5 && timeDifference<21){
        let maybeS = ""
        if(timeDifference!=1){
        maybeS = "s"
        }
        let busInfo = `Due in ${timeDifference} minute` + maybeS;
        if(timeDifference==0){
        busInfo = `Due now`;
        }
        const busInfoElement = document.createElement('div'); 
        busInfoElement.innerText = busInfo;
        kingDiv.appendChild(busInfoElement);
        }
    })
})
  .catch(error => console.error('Error fetching data:', error));

  fetch("https://freshbeets.dev/api/transit")
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => { 
    const incoming = data[17]['bustime-response'].prd; 
    const northDiv = document.getElementById('browneast'); 
    northDiv.innerHTML = '';
    incoming.forEach(thing => {
        const currentTime = new Date();
        const arrival = SusDate(thing.prdtm);
        //const arrival = parseInt(thing.arrT.toString().slice(14,16),10)+parseInt(thing.arrT.toString().slice(11,13),10)*60
        const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
        const timeDifference = Math.round((arrival - currentTime) / 60000);
        if(timeDifference>5 && timeDifference<21){
        let maybeS = ""
        if(timeDifference!=1){
        maybeS = "s"
        }
        let busInfo = `Due in ${timeDifference} minute` + maybeS;
        if(timeDifference==0){
        busInfo = `Due now`;
        }
        const busInfoElement = document.createElement('div'); 
        busInfoElement.innerText = busInfo;
        northDiv.appendChild(busInfoElement);
        }
    })
})
  .catch(error => console.error('Error fetching data:', error));

}
bus66time()
setInterval(bus66time, 2000*60);
// CTA wide problems, you don't need a CTA transit key for this one
async function Majorlert() { 
fetch("https://freshbeets.dev/api/transit")
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => { 
    const alerts = data[4].CTAAlerts.Alert;
    const panixDiv = document.getElementById('panix'); 
    let uhoh = false; 
    alerts.forEach(alert => { 
        if (alert.MajorAlert === '1') {
          uhoh==true;
            const head = `${alert.Headline}`;
            const short = `${alert.ShortDescription}`;
            panixDiv.innerHTML='MAJOR ALERT: '+head+'\n'+short+'\n';
        }
    })
if(!uhoh){
  panixDiv.innerHTML='';
}
  })
  .catch(error => console.error('Error fetching data:', error));
}
Majorlert()
setInterval(Majorlert, 5000*60); 



async function redstatus(){
fetch("https://freshbeets.dev/api/transit")
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const routeInfo = `${data[5].CTARoutes.RouteInfo.RouteStatus}`;
    const ulDiv = document.getElementById('ul'); 
    const reddetDiv = document.getElementById('reddet');
    ulDiv.innerHTML = '';

    if(routeInfo!='Normal Service'){
        fetch(encodeURIComponent('https://freshbeets.dev/api/transit'))
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const detail = `${data[6].CTAAlerts.Alert[0].ShortDescription}`;
    reddetDiv.innerHTML = '<b>Important: </b>'+detail;

})
    }

    ulDiv.innerHTML = routeInfo;
})
  .catch(error => console.error('Error fetching data:', error));
}
redstatus()
setInterval(redstatus, 3000*60);

async function clarkstatus(){
fetch("https://freshbeets.dev/api/transit")
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const routeInfo = `${data[7].CTARoutes.RouteInfo.RouteStatus}`;
    const clDiv = document.getElementById('22stat'); 
    const cldetDiv = document.getElementById('22det');
    cldetDiv.innerHTML = '';

    if(routeInfo!='Normal Service'){
        fetch("https://freshbeets.dev/api/transit")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const detail = `${data[8].CTAAlerts.Alert[0].ShortDescription}`;
    cldetDiv.innerHTML = '<b>Important: </b>'+detail;

})
    }

    clDiv.innerHTML = routeInfo;
})
  .catch(error => console.error('Error fetching data:', error));
}
clarkstatus()
setInterval(clarkstatus, 3000*60);

async function status66(){
fetch("https://freshbeets.dev/api/transit")
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const routeInfo = `${data[18].CTARoutes.RouteInfo.RouteStatus}`;
    const Div70 = document.getElementById('66stat'); 
    const Div70det = document.getElementById('66det');
    Div70det.innerHTML = '';

    if(routeInfo!='Normal Service'){
        fetch("https://freshbeets.dev/api/transit")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const detail = `${data[19].CTAAlerts.Alert[0].ShortDescription}`;
    Div70det.innerHTML = '<b>Important: </b>'+detail;

})
    }

    Div70.innerHTML = routeInfo;
})
  .catch(error => console.error('Error fetching data:', error));
}
status66()
setInterval(status66, 3000*60);

async function status70(){
fetch("https://freshbeets.dev/api/transit")
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const routeInfo = `${data[9].CTARoutes.RouteInfo.RouteStatus}`;
    const Div70 = document.getElementById('70stat'); 
    const Div70det = document.getElementById('70det');
    Div70det.innerHTML = '';

    if(routeInfo!='Normal Service'){
        fetch("https://freshbeets.dev/api/transit")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const detail = `${data[10].CTAAlerts.Alert[0].ShortDescription}`;
    Div70det.innerHTML = '<b>Important: </b>'+detail;

})
    }

    Div70.innerHTML = routeInfo;
})
  .catch(error => console.error('Error fetching data:', error));
}
status70()
setInterval(status70, 3000*60);

async function brownstatus(){
fetch("https://freshbeets.dev/api/transit")
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const routeInfo = `${data[11].CTARoutes.RouteInfo.RouteStatus}`;
    const brnDiv = document.getElementById('brownstat'); 
    const browndetDiv = document.getElementById('browndet');
    brnDiv.innerHTML = '';

    if(routeInfo!='Normal Service'){
        fetch("https://freshbeets.dev/api/transit")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const detail = `${data[12].CTAAlerts.Alert[0].ShortDescription}`;
    browndetDiv.innerHTML = '<b>Important: </b>'+detail;

})
    }

    brnDiv.innerHTML = routeInfo;
})
  .catch(error => console.error('Error fetching data:', error));
}
brownstatus()
setInterval(brownstatus, 3000*60); 


async function weather(){
fetch("https://freshbeets.dev/api/transit")
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const temps = data[13].hourly.temperature_2m;
    const pp = data[13].hourly.precipitation_probability[1];
    const ppi = data[13].hourly.precipitation[1];
    const ctempDiv = document.getElementById('ctemp'); 
    const ptempDiv = document.getElementById('ptemp');
    const prepiDiv = document.getElementById('prepi');
    ctempDiv.innerHTML = '';
    ctempDiv.innerHTML = 'Current Temperature: ' + temps[0] + 'F';
    prepiDiv.innerHTML = '';
    prepiDiv.innerHTML = "Percent Chance of Rain: " + pp+"% ";
    ptempDiv.innerHTML = '';
    ptempDiv.innerHTML = "Expected Temperature in 1 hr: " + temps[1] + 'F';

})
  .catch(error => console.error('Error fetching data:', error));
}
weather()
setInterval(weather,7000*60);
