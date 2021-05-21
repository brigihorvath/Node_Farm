const fs = require('fs');
const http = require('http');
const { URL, URLSearchParams } = require('url');

const replaceTemplates = require('./modules/replaceTemplate');

////////////////
///TEMPLATES
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);

//////////////////
///API data
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

//////////////////////
///SERVER
const server = http.createServer((req, res) => {
  const idURL = new URL(req.url, 'http://127.0.0.1:8000');
  const pathName = idURL.pathname;

  //Overview
  if (pathName === '/' || pathName === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const cards = dataObj.map((el) => replaceTemplates(el, tempCard)).join('');
    const overView = tempOverview.replace(/{%PRODUCTCARDS%}/, cards);
    res.end(overView);

    //Product
  } else if (pathName === '/product') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const productObj = dataObj[idURL.searchParams.get('id')];
    console.log(productObj);

    const output = replaceTemplates(productObj, tempProduct);
    res.end(output);
  } else if (pathName === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(data);
    //Not found
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello',
    });
    res.end('Page Not Found');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('The server is listening on port 8000');
});
