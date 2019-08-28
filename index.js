const http = require("http");

const token = '321d6a221f8926b5ec41ae89a3b2ae7b';
const url = 'http://api.travelpayouts.com/v2/prices/latest';
const port = 3000

http.get(
  url,
  {
      headers: {
      'x-access-token': token
      }
  },
  (res) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];
  
    let error;
    if (statusCode !== 200) {
      error = new Error('Request Failed.\n' +
                        `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error('Invalid content-type.\n' +
                        `Expected application/json but received ${contentType}`);
    }
    if (error) {
      console.error(error.message);
      // Consume response data to free up memory
      res.resume();
      return;
    }
  
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        console.log("raw data:", rawData);
        
        const parsedData = JSON.parse(rawData);
        console.log(parsedData);
      } catch (e) {
        console.error(e.message);
      }
    });
  }
  
).on('error', (e) => {
  console.error(`Got error: ${e.message}`);
});