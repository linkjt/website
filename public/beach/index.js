var map = L.map('map').setView([41.90816971455176, -87.62531681996514], 15);
var pepleinfo = []
var popup = L.popup({ closeButton: false, maxWidth: 50, className: 'no-padding-popup',closeOnClick:false, autoClose:false});
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
function loadpins(){
fetch("https://freshbeets.dev/api/beach")
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => { 
      var pope = [];
      var currentDate = new Date().toISOString();
      console.log(currentDate)
      var popeindex = 0;
      data.forEach(thing => {
          thing.beachInfo.forEach(pin => {
    console.log(pin)
    console.log(pin.endtim)
    console.log(currentDate<pin.endtime)
    if(currentDate<pin.endtime){
    pepleinfo[popeindex] = {name: thing.name, image: thing.image, beachInfo: pin};
    pope[popeindex] =  L.popup({ closeButton: false, maxWidth: 50, className: 'no-padding-popup',closeOnClick:false,autoClose: false})
    .setLatLng([pin.lat,pin.long])
    .setContent("<div data-bs-toggle='modal' data-bs-target='#people' onclick='loadinfo(" + popeindex + ")'><div class='text-center'>" + thing.name + "</div><img src='../profilepics/" + thing.image + "' style='width: 100%;'></div>")
    .openOn(map);
    popeindex++;
    }
          });
    
});

  
})
  .catch(error => console.error('Error fetching data:', error));

}
function onMapClick(e){
    console.log("map clicked on");
    popup
        .setLatLng(e.latlng)
        
        .setContent("<img src='../default.jpg' style='width: 100%;'>")
        .openOn(map)
        
    var newCords = popup.getLatLng();
    console.log(newCords.lng);
    lat = document.getElementById("lat")
    long = document.getElementById("long")
    lat.value = newCords.lat;
    long.value = newCords.lng;
    document.getElementById("confbut").disabled = false;
}


function newPoint(){
map.on('click', onMapClick);
console.log("map on");
}

function loadinfo(index){
    nome = document.getElementById("pepname");
    descp = document.getElementById("pepdescp")
    tome = document.getElementById("peptime");
    brang = document.getElementById("pepbring")
    nome.innerHTML = pepleinfo[index].name;
    descp.innerHTML = pepleinfo[index].beachInfo.description;
    hrmin =  new Date(pepleinfo[index].beachInfo.starttime);
    const hours = hrmin.getHours();
    const minutes = hrmin.getMinutes();
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    tome.innerHTML = "Beach @ " + hours+":"+formattedMinutes;
    brang.innerHTML = "Looking For: " + pepleinfo[index].beachInfo.bring;
    console.log(pepleinfo[index].beachInfo.dur)
}


function confirmpoint(){
    map.off('click', onMapClick);
    document.getElementById("confbut").disabled = true;
    
}


const fileInput = document.getElementById('image');
fileInput.addEventListener('change', (event) => {
  const files = event.target.files;
  const selectedFile = files[0];
  const imgName = selectedFile.name;
  imgNameform = document.getElementById("imgName")
  console.log(imgName)
    imgNameform.value = imgName;
});

