1. `http.Server`继承自`net.Server`,`net.Server`继承自`EventEmitter`
2. 访问原生请求体内容
```
createServer((req,res) => {
    if(req.method === 'POST') {
        let data = ""
        req.on('data',chunk => data += chunk)
        req.end('end',() => {
            const requestData = JSON.parse(data)
        })
    }
})
```