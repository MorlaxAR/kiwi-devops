const { readFileSync } = require("fs");
const { createServer } = require("http");
const { Server } = require("socket.io");

const createSocketioServer = () => {
  const httpServer = createServer((req, res) => {
    if (req.url !== "/") {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    const content = readFileSync(`${__dirname}/index.html`);
    const length = Buffer.byteLength(content);
  
    res.writeHead(200, {
      "Content-Type": "text/html",
      "Content-Length": length,
    });
    res.end(content);
  });
  
  const io = new Server(httpServer, {});
  
  io.on("connection", (socket) => {
    console.log(`connect ${socket.id}`);
  
    socket.on("disconnect", (reason) => {
      console.log(`disconnect ${socket.id} due to ${reason}`);
    });
  });

  return { httpServer, io };
}

exports.createSocketioServer = createSocketioServer;