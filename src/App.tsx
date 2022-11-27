import { io } from 'socket.io-client';

import ChatConvo from './Components/ChatConvo';
import ConvoPanel from './Components/ConvoPanel';
const socket = io('http://hp-24g025in:8000/', {
	withCredentials: true,
	extraHeaders: {
		'my-custom-header': 'abcd',
	},
});

function App() {
	return (
		<div className="--dark-theme" id="chat">
			<ChatConvo />
			<ConvoPanel socket={socket} />
		</div>
	);
}

export default App;
