import { io } from 'socket.io-client';

const socket = io('http://35.232.65.228:8000/');
export default socket;