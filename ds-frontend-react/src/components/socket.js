import { io } from 'socket.io-client';

const socket = io('http://34.71.125.120:8000/');
export default socket;