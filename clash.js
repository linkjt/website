const express = require('express');
const router = express.Router();
const fs = require('fs'); // For JSON file reading and writing
const path = require('path')


const ClashPath = path.join(__dirname,'data','clash.json')

const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjY4ODRmYWZkLTIwNWQtNDE3My05M2VlLWI5OWUwZWNkMjNiMSIsImlhdCI6MTc2MDk2Nzc5MCwic3ViIjoiZGV2ZWxvcGVyL2IwODQ1NGE4LTIyMmYtZjUyMi1lMmU5LTRiNDExMDA1NmNlOCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIyMDUuMTc4Ljg3Ljg2Il0sInR5cGUiOiJjbGllbnQifV19.iA36rCJW6K1NCbuOPKKteA5sEu1YgxVcvlAoQSQ3JAq4bqN2NT-2RO0naRdqjYj2QdZ61L9JTi2hBc1ycR8BwA'; 
const API_URL = 'https://api.clashroyale.com/v1';

async function getJohn() {
  try {
    const endpoint = `${API_URL}/players/%232GVVL2UY0`;
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    fs.writeFile(ClashPath, JSON.stringify(data, null, 2), (writeErr) => {
        if (writeErr) {
            console.error("Error writing train data:", parseError);
        }
      });

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
getJohn();
setInterval(getJohn, 60*60*12*1000); 

