import { io } from 'socket.io-client';

const socket = io('http://35.239.215.83:8000/');
export default socket;