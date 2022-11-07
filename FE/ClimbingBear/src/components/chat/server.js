import React, {useEffect, useState, useCallback} from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
// import WebSocket, { WebSocketServer } from 'ws';

// express 모듈 가져오기
const express = require('express');
// 할당
const app = express();

// http 모듈을 추출
const http = require('http');
// ws 모듈을 추출
const WebSocket = require('ws');
// 웹 서버 생성
const server = http.createServer(app);
// 웹소켓 서버 생성
const wss = new WebSocket.Server({server});
// wss 객체 상에서
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message, isBinary) {
    console.log(message.toString(), isBinary);
    // 소켓 서버에 성공적으로 연결된, 모든 클라이언트를 반복하고 
    // 각 클라이언트에 개별적으로 메시지를 보냄
    wss.clients.forEach(function each(client) {
      // 연결의 현재 상태가 open이면
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });
});

// 라우팅 설정부분
app.get('/', (req, res) => {
  // req, res http를 한번에 wrapping한 객체
  res.send('Hello World!');
});

// 웹 서버를 8080 포트로 실행
server.listen(8080, () => {
  console.log('Listening to port 8080');
});