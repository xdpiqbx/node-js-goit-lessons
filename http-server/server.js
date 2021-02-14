const http = require('http')
const fs = require('fs').promises
const url = require('url')
const path = require('path')
const querystring = require('querystring')

const contentType = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
}

//http://user:password@host.com:80/path/src/?name=john&age=30#hash

http
  .createServer(async (req, res) => {
    const { pathname } = url.parse(req.url)
    let filename = pathname.substring(1)
    
    // if (pathname === '/') {
    //   filename = 'index.html'
    // }

    switch(pathname){
      case "/":
        filename = 'index.html'
        break
      case "/contact":
        filename = 'contact.html'
        break
      case "/blog":
        filename = 'blog.html'
        break
      default:
        // filename = 'index.html'
        break
    }

    if(pathname === '/contact' && req.method === 'POST'){
      const body = []
      req.on('data', (chunk) => {
        body.push(chunk)
      })
      req.on('end', async () => {
        const parseBody = decodeURIComponent(Buffer.concat(body).toString())
        console.log(parseBody);
        const parseObj = querystring.parse(parseBody)
        await fs.writeFile('message.json', JSON.stringify(parseObj, null, 2))
      })
      res.on('error', () => {})
      res.statusCode = 302
      res.setHeader('Location', '/contact')
      return res.end()
    }

    const type = contentType[path.extname(filename)]

    if (type.includes('image')) {
      try{
        const img = await fs.readFile(filename)
        res.writeHead(200, { 'Content-Type': type })
        res.write(img, 'hex')
        res.end()
      }catch(error){
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end()
      }
    } else {
      try{
        const content = await fs.readFile(filename, 'utf8')
        res.writeHead(200, { 'Content-Type': type })
        res.write(content)
        res.end()
      }catch(error){
        if(!type || type === 'text/html'){
          const content = await fs.readFile('404.html', 'utf8')
          res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
          res.write(content)
        }else{
          res.writeHead(404, { 'Content-Type': 'text/plain' })
        }
        res.end()
      }
    }
  })
  .listen(3000, () => console.log('Listen server on port 3000'))
  //Node.js конец 44 минуты Модуль1. Занятие 2 