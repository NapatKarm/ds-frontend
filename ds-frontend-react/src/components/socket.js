import { io } from 'socket.io-client';

const socket = io('http://35.202.236.149:8000/');
export default socket;