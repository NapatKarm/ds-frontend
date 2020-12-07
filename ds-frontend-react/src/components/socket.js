import { io } from 'socket.io-client';

const socket = io('http://34.66.83.7:8000/');
export default socket;