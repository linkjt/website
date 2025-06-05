const express = require('express');
const router = express.Router();
const fs = require('fs'); // For JSON file reading and writing
const path = require('path')

const transitPath = path.join(__dirname,'data','transit.json')
let posts = [];

// updates the time to the time id

// proxy to get around cors protocal, it cool fr fr
const proxyUrl = 'https://corsproxy.io/?key=98122491&url=';
const targetUrl = 'https://www.transitchicago.com/api/1.0/routes.aspx?routeid=red&outputType=JSON';
// get the redline time
function redlinetime(){
const proxyUrl = 'https://corsproxy.io/?key=98122491&url=';
fetch('https://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=7d904ff669714dbaa659ef9959e91344&outputType=JSON&mapid=40630')
.then(response => {
if (!response.ok) {
throw new Error('Network response was not ok');
}
return response.json();
})
.then(data => { 
    posts[0] = data;
})
.catch(error => console.error('Error fetching data:', error));
}
redlinetime()
setInterval(redlinetime, 2000*60)
// Pings every ten seconds, edit the second num plz

// brown line time
function brnlinetime(){

const proxyUrl = 'https://corsproxy.io/?key=98122491&url=';
fetch(proxyUrl + encodeURIComponent('https://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=7d904ff669714dbaa659ef9959e91344&outputType=JSON&mapid=40710'))
.then(response => {
if (!response.ok) {
throw new Error('Network response was not ok');
}
return response.json();
})
.then(data => { 
    posts[1] = data;
})
.catch(error => console.error('Error fetching data:', error));
}
brnlinetime()
setInterval(brnlinetime, 2000*60)

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
function bus70time(){
const proxyUrl = 'https://corsproxy.io/?key=98122491&url=';
/* TO THE HOOOOOOOOD */
// Each bus has its own individual page, they aren't both in the same page lik the trains
fetch(proxyUrl + encodeURIComponent('http://www.ctabustracker.com/bustime/api/v2/getpredictions?format=json&key=MDfcJRVTfSFJ4JXfXja9Jn75k&stpid=15676'))
.then(response => {
if (!response.ok) {
throw new Error('Network response was not ok');
}
return response.json();
})
.then(data => { 
    posts[2] = data;
})
.catch(error => console.error('Error fetching data:', error));


/* TO ZA WATA*/
// Other one, this is the api for the going east
fetch(proxyUrl + encodeURIComponent('http://www.ctabustracker.com/bustime/api/v2/getpredictions?format=json&key=MDfcJRVTfSFJ4JXfXja9Jn75k&stpid=2033'))
.then(response => {
if (!response.ok) {
throw new Error('Network response was not ok');
}
return response.json();
})
.then(data => { 
    posts[14] = data;
})
.catch(error => console.error('Error fetching data:', error));
}
bus70time()
setInterval(bus70time, 5000*60)

//22 clark bus
function bus22time(){
const proxyUrl = 'https://corsproxy.io/?key=98122491&url=';
/* TO KingV */
// api for southbound
fetch(proxyUrl + encodeURIComponent('http://www.ctabustracker.com/bustime/api/v2/getpredictions?format=json&key=MDfcJRVTfSFJ4JXfXja9Jn75k&stpid=1853'))
.then(response => {
if (!response.ok) {
throw new Error('Network response was not ok');
}
return response.json();
})
.then(data => { 
    posts[3] = data;
})
.catch(error => console.error('Error fetching data:', error));

// none went north, I could re include, might in a bit

fetch(proxyUrl + encodeURIComponent('http://www.ctabustracker.com/bustime/api/v2/getpredictions?format=json&key=MDfcJRVTfSFJ4JXfXja9Jn75k&stpid=1898'))
.then(response => {
if (!response.ok) {
throw new Error('Network response was not ok');
}
return response.json();
})
.then(data => { 
posts[15] = data;
})
.catch(error => console.error('Error fetching data:', error));

}
bus22time()
setInterval(bus22time, 2000*60);

//66 chicago
function bus66time(){
const proxyUrl = 'https://corsproxy.io/?key=98122491&url=';
/* TO KingV */
// api for southbound
fetch(proxyUrl + encodeURIComponent('http://www.ctabustracker.com/bustime/api/v2/getpredictions?format=json&key=MDfcJRVTfSFJ4JXfXja9Jn75k&stpid=606'))
.then(response => {
if (!response.ok) {
throw new Error('Network response was not ok');
}
return response.json();
})
.then(data => { 
    posts[16] = data;
})
.catch(error => console.error('Error fetching data:', error));

// none went north, I could re include, might in a bit

fetch(proxyUrl + encodeURIComponent('http://www.ctabustracker.com/bustime/api/v2/getpredictions?format=json&key=MDfcJRVTfSFJ4JXfXja9Jn75k&stpid=572'))
.then(response => {
if (!response.ok) {
throw new Error('Network response was not ok');
}
return response.json();
})
.then(data => { 
posts[17] = data;
})
.catch(error => console.error('Error fetching data:', error));

}
bus66time()
setInterval(bus66time, 2000*60);

// CTA wide problems, you don't need a CTA transit key for this one
function Majorlert() { 
const proxyUrl = 'https://corsproxy.io/?key=98122491&url=';
fetch(proxyUrl + encodeURIComponent('https://www.transitchicago.com/api/1.0/alerts.aspx?activeonly=TRUE&outputType=JSON'))
.then(response => {
if (!response.ok) {
throw new Error('Network response was not ok');
}
return response.json();
})
.then(data => { 
    posts[4] = data;
})
.catch(error => console.error('Error fetching data:', error));
}
Majorlert()
setInterval(Majorlert, 5000*60)


function redstatus(){
fetch(proxyUrl + encodeURIComponent(targetUrl))
.then(response => {
if (!response.ok) {
throw new Error('Network response was not ok');
}
return response.json();
})
.then(data => {
const routeInfo = `${data.CTARoutes.RouteInfo.RouteStatus}`;
posts[5] = data;

if(routeInfo!='Normal Service'){
  fetch(proxyUrl + encodeURIComponent('https://www.transitchicago.com/api/1.0/alerts.aspx?outputType=JSON&activeonly=TRUE&routeid=Red&recentdays=1'))
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
}
return response.json();
})
.then(data => {
    posts[6] = data;

})
}
})
.catch(error => console.error('Error fetching data:', error));
}
redstatus()
setInterval(redstatus, 5000*60)

function clarkstatus(){
fetch(proxyUrl + encodeURIComponent("https://www.transitchicago.com/api/1.0/routes.aspx?routeid=22&outputType=JSON"))
.then(response => {
if (!response.ok) {
throw new Error('Network response was not ok');
}
return response.json();
})
.then(data => {
const routeInfo = `${data.CTARoutes.RouteInfo.RouteStatus}`;
posts[7] = data;

if(routeInfo!='Normal Service'){
  fetch(proxyUrl + encodeURIComponent('https://www.transitchicago.com/api/1.0/alerts.aspx?outputType=JSON&activeonly=TRUE&routeid=22&recentdays=1'))
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
}
return response.json();
})
.then(data => {
    posts[8] = data;

})
}


})
.catch(error => console.error('Error fetching data:', error));
}
clarkstatus()
setInterval(clarkstatus, 5000*60)

function status66(){
fetch(proxyUrl + encodeURIComponent("https://www.transitchicago.com/api/1.0/routes.aspx?routeid=66&outputType=JSON"))
.then(response => {
if (!response.ok) {
throw new Error('Network response was not ok');
}
return response.json();
})
.then(data => {
const routeInfo = `${data.CTARoutes.RouteInfo.RouteStatus}`;
posts[18] = data;

if(routeInfo!='Normal Service'){
  fetch(proxyUrl + encodeURIComponent('https://www.transitchicago.com/api/1.0/alerts.aspx?outputType=JSON&activeonly=TRUE&routeid=66&recentdays=1'))
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
}
return response.json();
})
.then(data => {
    posts[19] = data;

})
}


})
.catch(error => console.error('Error fetching data:', error));
}
status66()
setInterval(status66, 5000*60)

function status70(){
fetch(proxyUrl + encodeURIComponent("https://www.transitchicago.com/api/1.0/routes.aspx?routeid=70&outputType=JSON"))
.then(response => {
if (!response.ok) {
throw new Error('Network response was not ok');
}
return response.json();
})
.then(data => {
const routeInfo = `${data.CTARoutes.RouteInfo.RouteStatus}`;
posts[9] = data;

if(routeInfo!='Normal Service'){
  fetch(proxyUrl + encodeURIComponent('https://www.transitchicago.com/api/1.0/alerts.aspx?outputType=JSON&activeonly=TRUE&routeid=70&recentdays=1'))
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
}
return response.json();
})
.then(data => {
    posts[10] = data;

})
}


})
.catch(error => console.error('Error fetching data:', error));
}
status70()
setInterval(status70, 5000*60)

function brownstatus(){
fetch(proxyUrl + encodeURIComponent('https://www.transitchicago.com/api/1.0/routes.aspx?routeid=brn&outputType=JSON'))
.then(response => {
if (!response.ok) {
throw new Error('Network response was not ok');
}
return response.json();
})
.then(data => {
const routeInfo = `${data.CTARoutes.RouteInfo.RouteStatus}`;
posts[11] = data;

if(routeInfo!='Normal Service'){
  fetch(proxyUrl + encodeURIComponent('https://www.transitchicago.com/api/1.0/alerts.aspx?outputType=JSON&activeonly=TRUE&routeid=Brn&recentdays=1'))
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
}
return response.json();
})
.then(data => {
    posts[12] = data;

})
}

})
.catch(error => console.error('Error fetching data:', error));
}
brownstatus()
setInterval(brownstatus, 5000*60)

function weather(){
fetch("https://api.open-meteo.com/v1/forecast?latitude=41.85&longitude=-87.65&hourly=temperature_2m,precipitation_probability,precipitation&temperature_unit=fahrenheit")
.then(response => {
if (!response.ok) {
throw new Error('Network response was not ok');
}
return response.json();
})
.then(data => {
    posts[13] = data;
})
.catch(error => console.error('Error fetching data:', error));
}
weather()
setInterval(weather, 5000*60)

function paytonupdates(){
 fetch("https://www.wpcp.org/apps/events/events_rss.jsp?id=0")
     .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text;
  })
  .then(data => {
    posts[20] = data;
})
.catch(error => console.error('Error fetching data:', error));


}
paytonupdates()
setInterval(paytonupdates, 1000*60); 



setInterval(function() {
    fs.writeFile(transitPath, JSON.stringify(posts, null, 2), (writeErr) => { // Writing to file
        if (writeErr) {
            console.error("Error writing train data:", parseError);
        }
      });
}, 1000*30);