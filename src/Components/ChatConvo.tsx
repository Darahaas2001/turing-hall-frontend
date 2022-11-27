import { connect } from 'react-redux';
import { chatType, mapStateToPropsInt } from '../Interface';
import Chat from './Chat';

interface prop {
	chat: any[];
}

const ChatConvo = (props: prop) => {
	let mappedChat = props.chat.map((chat: chatType) => {
		return (
			<Chat
				name={chat.name}
				message={chat.message}
				isUser={chat.isUser}
				isBot={chat.isBot}
			/>
		);
	});
	return (
		<div className="chat__conversation-board" id="convo">
			{mappedChat}
		</div>
	);
};

const mapStateToProps = (state: mapStateToPropsInt) => {
	return {
		chat: state.getChat,
	};
};
export default connect(mapStateToProps)(ChatConvo);
