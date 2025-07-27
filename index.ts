import http from 'node:http';
const server = http.createServer();
const port = 3500;
server.listen(port, () => console.log('listening on port ' + port));
server.on("request", (req, res) => {
  res.statusCode = 200;
  const tokens = req.url.split("/");
  let response:string = ""
  switch(tokens[1]) {
    case "add": response = tokens[2] + tokens[3]; break;
    case "sub": response = (+tokens[2] - +tokens[3]).toString(); break;
    case "div": response = (+tokens[2] / +tokens[3]).toString(); break;
    case "mul": response = (+tokens[2] * +tokens[3]).toString(); break;
  }
  res.write(response);
  res.end();
  
})
