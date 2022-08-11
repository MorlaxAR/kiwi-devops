const app = require("../src/app");
const Client = require("socket.io-client");
const {redisClient} = require('../src/redis');
const supertest = require('supertest');

describe("socket.io web server tests", () => {
  let httpServer, io, request;

  beforeAll((done) => {
    httpServer = app.server;
    io = app.io;
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
    httpServer.close();
    redisClient.quit();
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