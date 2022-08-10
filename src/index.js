const serv = require("./server");

socketioServer = serv.createSocketioServer();
socketioServer.httpServer.listen(3000);
