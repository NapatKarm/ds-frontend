import { io } from 'socket.io-client';

const socket = io('http://35.239.70.1:8000/');
export default socket;