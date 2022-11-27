import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';

import { MouseEvent, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { addChat, userData } from '../Actions';
import { chatType, mapStateToPropsInt, user } from '../Interface';

interface prop {
	addChat: ActionCreatorWithPayload<chatType, 'ADD_CHAT'>;
	userData: ActionCreatorWithPayload<user, 'USER_DATA'>;
	socket: Socket;
	user: user;
}
const ConvoPanel = (props: prop) => {
	let [msg, setMsg] = useState('');
	props.socket.on('updateUserData', (data) => {
		let userObj = {
			name: 'Alice',
			id: data,
		};
		props.userData(userObj);
		window.sessionStorage.setItem('id', data);
	});
	useEffect(() => {
		props.socket.on('updateChat', (data: chatType) => {
			if (data.id === window.sessionStorage.getItem('id')) {
				let changedData = { ...data };
				changedData.isUser = true;

				props.addChat(changedData);
			} else {
				props.addChat(data);
			}
		});
		props.socket.on('botResp', (data) => {
			console.log('--------BOT DATA---------------');

			console.log(data);
			let msgObj = {
				name: 'Jason',
				message: data,
				isUser: false,
				isBot: true,
			};
			props.addChat(msgObj);
		});
	}, []);
	const buttonClickHandler = (_e: MouseEvent) => {
		let msgObj = {
			name: 'Jamie',
			message: msg,
			isUser: false,
			id: props.user.id,
		};
		props.socket.emit('msg', msgObj);
		//	props.addChat(Obj);
		return ((document.getElementById('inputEl') as HTMLInputElement).value =
			'');
	};

	return (
		<div className="chat__conversation-panel">
			<div className="chat__conversation-panel__container">
				<input
					id="inputEl"
					className="chat__conversation-panel__input panel-item"
					placeholder="Type a message..."
					onChange={(e) => setMsg(e.target.value)}
				/>
				<button
					className="chat__conversation-panel__button panel-item btn-icon send-message-button"
					onClick={(e) => buttonClickHandler(e)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
						data-reactid="1036"
					>
						<line x1="22" y1="2" x2="11" y2="13"></line>
						<polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
					</svg>
				</button>
			</div>
		</div>
	);
};
const mapStateToProps = (state: mapStateToPropsInt) => {
	console.log(state.user);
	return { chat: state.getChat, user: state.user };
};
export default connect(mapStateToProps, { addChat, userData })(ConvoPanel);
