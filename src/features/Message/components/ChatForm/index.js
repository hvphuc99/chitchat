import React from "react";
import { makeStyles, Box } from "@material-ui/core";
import ChatHeader from "../ChatHeader";
import ChatFooter from "../ChatFooter";
import ChatContent from "../ChatContent";
import { useDispatch, useSelector } from "react-redux";
import {
	addMessage,
	clearMessageList,
	setLoadingMessageList,
	setMessageList,
} from "features/Message/messageSlice";
import messageApi from "api/messageApi";
import { useEffect } from "react";
import userApi from "api/userApi";
import Loading from "components/Loading";
import * as typeMessages from "constants/typeMessage";
import useMedia from "services/mediaQuery";

const useStyles = (innerHeight) => makeStyles({
	root: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		height: "100%",
		marginLeft: "3px",
	},
	content: {
		flexGrow: "1",
		width: "100%",
		height: "calc(100% - 112px)",
		maxHeight: "calc(100% - 112px)",
		overflowY: "scroll",
		"&::-webkit-scrollbar": {
			width: "0.4em",
		},
		"&::-webkit-scrollbar-track": {
			boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
			webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
		},
		"&::-webkit-scrollbar-thumb": {
			backgroundColor: "transparent",
		},
		"& .Mui-selected": {
			backgroundColor: "#eff7fe",
			borderLeft: "4px solid #1c9dea",
		},
	},
	fullScreenRoot: {
		maxHeight: innerHeight,
	},
	chatFormFullScreenRoot: {
		position: "absolute",
		top: 0,
		left: 0,
		zIndex: 2,
		width: "100%",
		height: "100%",
		backgroundColor: "white",
	},
	chatFormFullScreen: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		height: "100%",
	}
});

function ChatForm(props) {
	const { mobileScreenSize } = useSelector((state) => state.screen);
	const classes = useStyles(mobileScreenSize)();

	const { isSmallSize, isGreaterSmallSize } = useMedia();

	const dispatch = useDispatch();
	const {
		currentGroupChatName,
		currentGroupChatId,
		loadingMessageList,
		currentGroupChatPicture,
		messageList,
	} = useSelector((state) => state.message);
	const { currentUserId } = useSelector((state) => state.user);

	const handleSendTextMessage = (values, { resetForm }) => {
		let { message } = values;
		message = message.trim();
		if (message === "") return;
		messageApi.sendMessage(
			currentUserId,
			currentGroupChatId,
			message,
			typeMessages.TEXT
		);
		const itemMessage = {
			senderId: currentUserId,
			timestamp: null,
			content: message,
			type: typeMessages.TEXT,
		};
		dispatch(addMessage(itemMessage));
		resetForm();
	};

	const handleSendPhoto = (url) => {
		messageApi.sendMessage(
			currentUserId,
			currentGroupChatId,
			url,
			typeMessages.PHOTO
		);
		const itemMessage = {
			senderId: currentUserId,
			timestamp: null,
			content: url,
			type: typeMessages.PHOTO,
		};
		dispatch(addMessage(itemMessage));
	};

	const handleSendOtherFile = (url) => {
		messageApi.sendMessage(
			currentUserId,
			currentGroupChatId,
			url,
			typeMessages.OTHER_FILE
		);
		const itemMessage = {
			senderId: currentUserId,
			timestamp: null,
			content: url,
			type: typeMessages.OTHER_FILE,
		};
		dispatch(addMessage(itemMessage));
	};

	useEffect(() => {
		messageApi.messageListListener(currentGroupChatId, (snapshot) => {
			if (!snapshot.val()) {
				dispatch(clearMessageList());
				dispatch(setLoadingMessageList(false));
				return;
			}
			const list = Object.values(snapshot.val());
			let newList = [];
			list.forEach((message, index) => {
				const { senderId } = message;
				userApi.getUserInfo(senderId).then((userInfo) => {
					const { firstName, lastName, picture } = userInfo;
					const name = firstName + " " + lastName;
					newList = newList.concat({
						name,
						picture,
						...message,
					});
					if (newList.length === list.length) {
						dispatch(
							setMessageList(
								newList.sort((firstMess, secondMess) => {
									return secondMess.timestamp > firstMess.timestamp ? -1 : 1;
								})
							)
						);
						dispatch(setLoadingMessageList(false));
					}
				});
			});
		});
	}, [loadingMessageList]);

	return (
		<>
			{isGreaterSmallSize && <Box className={classes.root}>
				<ChatHeader
					name={currentGroupChatName}
					avatar={currentGroupChatPicture}
					active={true}
				/>
				<div className={classes.content}>
					{loadingMessageList ? (
						<Loading />
					) : (
							<ChatContent messageList={messageList} />
						)}
				</div>
				<ChatFooter
					onSubmit={handleSendTextMessage}
					onSendPhoto={handleSendPhoto}
					onSendOtherFile={handleSendOtherFile}
				/>
			</Box>}

			{isSmallSize && (
				<div className={classes.fullScreenRoot}>
					<div className={classes.chatFormFullScreenRoot}>
						<Box className={classes.chatFormFullScreen}>
							<ChatHeader
								name={currentGroupChatName}
								avatar={currentGroupChatPicture}
								active={true}
							/>
							<div className={classes.content}>
								{loadingMessageList ? (
									<Loading />
								) : (
										<ChatContent messageList={messageList} />
									)}
							</div>
							<ChatFooter
								onSubmit={handleSendTextMessage}
								onSendPhoto={handleSendPhoto}
								onSendOtherFile={handleSendOtherFile}
							/>
						</Box>
					</div>
				</div>
			)}
		</>
	);
}

export default ChatForm;
