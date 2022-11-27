export interface actions {
	type: string;
	payload: unknown;
}

export interface mapStateToPropsInt {
	getChat: any[];
	user: {
		name: string;
		id: string;
	};
}

export interface chatType {
	name: string;
	message: string;
	isUser: boolean;
	isBot?: boolean;
	id?: string;
}

export interface user {
	name: string;
	id: string;
}
