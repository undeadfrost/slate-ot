const http = require('http');
const ShareDB = require('sharedb');
const WebSocket = require('ws');
const express = require('express');
const WebSocketJSONStream = require('@teamwork/websocket-json-stream');
const slateType = require('../lib/type');

ShareDB.types.register(slateType.type);

const backend = new ShareDB();
createDoc(startServer);

function createDoc(callback) {
  const connection = backend.connect();
  const doc = connection.get('examples', 'richText');
  doc.fetch((err) => {
    if (err) throw err;
    if (doc.type === null) {
      console.log('Creating document');
      doc.create(
        [
          {
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    text: 'A line of text!',
                    marks: [],
                  },
                ],
              },
            ],
          }
        ],
        'slate-ot-type',
        callback
      );
      console.log('Doc.data in server');
      return;
    }
    callback();
  })
}

function startServer() {
  const app = express();
  const server = http.createServer(app);

  const wss = new WebSocket.Server({ server: server });
  wss.on('connection', function (ws) {
    const stream = new WebSocketJSONStream(ws);
    backend.listen(stream);
  });

  server.listen(9000);
  console.log('Listening on http://localhost:9000');
}
