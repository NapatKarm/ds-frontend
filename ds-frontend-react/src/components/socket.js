import { io } from 'socket.io-client';

const socket = io('https://localhost:4000/%27');
export default socket;