import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

class WebSocketService {
    constructor() {
        this.socket = null;
        this.stompClient = null;
    }

    connect(onConnected, onDisconnected, onError) {
        this.socket = new SockJS('http://localhost:8080/api/ws'); // Your server WebSocket endpoint
        this.stompClient = Stomp.over(this.socket);

        this.stompClient.connect({}, frame => {
            onConnected();
        }, error => {
            onError(error);
        });

        this.socket.onclose = () => {
            onDisconnected();
        };
    }

    disconnect() {
        if (this.stompClient) {
            this.stompClient.disconnect(() => {
                console.log('Disconnected');
            });
        }
    }

    subscribe(destination, callback) {
        if (this.stompClient && this.stompClient.connected) {
            return this.stompClient.subscribe(destination, callback);
        }
        console.warn('WebSocket is not connected.');
    }

    sendMessage(destination, message) {
        if (this.stompClient && this.stompClient.connected) {
            this.stompClient.send(destination, {}, message);
        } else {
            console.warn('WebSocket is not connected.');
        }
    }
}

export const webSocketService = new WebSocketService();
