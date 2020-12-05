import { io } from 'socket.io-client';

const socket = io('http://34.69.41.196:8000/');
export default socket;