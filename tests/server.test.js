const serv = require("../src/server");
const Client = require("socket.io-client");
const supertest = require('supertest');

describe("socket.io web server tests", () => {
  let socketioServer, httpServer, io, request;

  beforeAll((done) => {
    socketioServer = serv.createSocketioServer();
    httpServer = socketioServer.httpServer;
    io = socketioServer.io;
    request = supertest(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test("socket.io client / server connection should work", (done) => {
    serverSocket.on("hi", (cb) => {
      cb("hola");
    });
    clientSocket.emit("hi", (arg) => {
      expect(arg).toBe("hola");
      done();
    });
  });

  test("HTTP Server should return 200", async() => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});