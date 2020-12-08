import { io } from 'socket.io-client';

const socket = io('http://35.226.86.221:8000/');
export default socket;