// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const {redisClient} = require('./redis');
const app = require('./app');
const httpServer = app.server;
const io = app.io;
const PORT = 3000;

// Start server
httpServer.listen(PORT, () =>
  console.log(`Listening on port ${PORT}`)
);

// Clean up resources on shutdown
process.on('SIGTERM', () => {
  console.log("Received SIGTERM");
  redisClient.quit();
  process.exit(0);
});

module.exports = {httpServer, io};
