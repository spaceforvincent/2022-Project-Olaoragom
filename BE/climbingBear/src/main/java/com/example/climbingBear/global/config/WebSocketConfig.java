//package com.example.climbingBear.global.config;
//
//import org.springframework.boot.autoconfigure.websocket.servlet.WebSocketMessagingAutoConfiguration;
//import org.springframework.messaging.simp.config.MessageBrokerRegistry;
//import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
//import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
//
//public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
//    @Override
//    public void registerStompEndpoints(StompEndpointRegistry registry) {
//        // /example는 WebSocket 또는 SockJS Client가 웹소켓 핸드셰이크 커넥션을 생성할 경로이다.
//        registry.addEndpoint("/example").withSockJS();
//    }
//
//    @Override
//    public void configureMessageBroker(MessageBrokerRegistry config) {
//        // /test 경로로 시작하는 STOMP 메세지의 "destination" 헤더는 @Controller 객체의 @MessageMapping 메서드로 라우팅된다.
//        config.setApplicationDestinationPrefixes("/test");
//        // 내장된 메세지 브로커를 사용해 Client에게 Subscriptions, Broadcasting 기능을 제공한다.
//        // 또한 /topic, /queue로 시작하는 "destination" 헤더를 가진 메세지를 브로커로 라우팅한다.
//        config.enableSimpleBroker("/topic", "/queue");
//    }
//}
