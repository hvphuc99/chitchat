import React from "react";
import PropTypes from "prop-types";
import {
	makeStyles,
	Avatar,
	Button,
	Icon,
	withStyles,
	Menu,
	MenuItem,
	ListItemText,
	Box,
} from "@material-ui/core";
import { useState } from "react";
import * as options from "constants/index";

SearchResult.propTypes = {
	userId: PropTypes.string,
	firstName: PropTypes.string,
	lastName: PropTypes.string,
	picture: PropTypes.string,
	currentOption: PropTypes.string,
	self: PropTypes.bool,
	handleClickAddFriend: PropTypes.func,
	handleClickCancelRequest: PropTypes.func,
	handleClickAcceptRequest: PropTypes.func,
	handleClickUser: PropTypes.func,
	handleUnfriend: PropTypes.func,
};

SearchResult.defaultProps = {
	userId: "",
	firstName: "",
	lastName: "",
	picture: "",
	currentOption: "",
	self: false,
	handleClickAddFriend: null,
	handleClickCancelRequest: null,
	handleClickAcceptRequest: null,
	handleClickUser: null,
	handleUnfriend: null,
};

const useStyles = makeStyles({
	root: {
		display: "flex",
		justifyContent: "space-between",
		width: "100%",
		marginBottom: 15,
	},
	leftSide: {
		display: "flex",
		alignItems: "center",
	},
	midSide: {
		flexGrow: "1",
		display: "flex",
		flexDirection: "column",
		"& h5": {
			fontSize: "15px",
			fontWeight: "700",
			textTransform: "none",
			color: "#223645",
			margin: "0px 0px 0px 16px",
		},
	},
	rightSide: {
		display: "flex",
		alignItems: "center",
	},
	optionButton: {
		color: "#1C1F22",
		backgroundColor: "#D8DADF",
		marginLeft: "20px",
		borderRadius: "5px",
		"& .MuiButton-label": {
			fontSize: "11px",
		}
	},
	name: {
		"&:hover": {
			textDecoration: "underline",
			cursor: "pointer",
		},
	},
	avatar: {
		"&:hover": {
			cursor: "pointer",
		},
	},
	menuItem: {
		padding: "0px 10px",
	},
	itemText: {
		marginLeft: "5px",
	},
});

const StyledMenu = withStyles({
	paper: {
		border: "1px solid #d3d4d5",
	},
})((props) => (
	<Menu
		elevation={0}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: "bottom",
			horizontal: "center",
		}}
		transformOrigin={{
			vertical: "top",
			horizontal: "center",
		}}
		{...props}
	/>
));

function SearchResult(props) {
	const classes = useStyles();
	const {
		userId,
		firstName,
		lastName,
		picture,
		self,
		currentOption,
		handleClickAddFriend,
		handleClickCancelRequest,
		handleClickAcceptRequest,
		handleClickUser,
		handleUnfriend,
	} = props;
	const [option, setOption] = useState(currentOption);
	const [showUnfriend, setShowUnfriend] = useState(null);

	const handleClickFriendOption = (event) => {
		setShowUnfriend(event.currentTarget);
	};

	const closeFriendOption = () => {
		setShowUnfriend(null);
	};

	const onClickUnfriend = () => {
		handleUnfriend(userId);
		setOption(options.ADD_FRIEND_OPTION);
	};

	const renderAddFriendOption = () => {
		const content = "Add Friend";
		const icon = (
			<Icon
				className="fas fa-user-plus"
				style={{ width: "fit-content", color: "#1c9dea", fontSize: "11px" }}
			/>
		);
		const onClick = () => {
			handleClickAddFriend(userId);
			setOption(options.CANCEL_REQUEST_OPTION);
		};
		return (
			<Button
				variant="contained"
				size="small"
				startIcon={icon}
				className={classes.optionButton}
				onClick={onClick}
			>
				{content}
			</Button>
		);
	};

	const renderCancelRequestOption = () => {
		const content = "Cancel Request";
		const icon = (
			<Icon
				className="fas fa-user-times"
				style={{ width: "fit-content", color: "#1c9dea", fontSize: "11px" }}
			/>
		);
		const onClick = () => {
			handleClickCancelRequest(userId);
			setOption(options.ADD_FRIEND_OPTION);
		};
		return (
			<Button
				variant="contained"
				size="small"
				startIcon={icon}
				className={classes.optionButton}
				onClick={onClick}
			>
				{content}
			</Button>
		);
	};

	const renderFriendsOption = () => {
		const content = "Friends";
		const icon = (
			<Icon
				className="fas fa-user-check"
				style={{ width: "fit-content", color: "#1c9dea", fontSize: "11px" }}
			/>
		);
		return (
			<>
				<Button
					variant="contained"
					size="small"
					startIcon={icon}
					className={classes.optionButton}
					onClick={handleClickFriendOption}
				>
					{content}
				</Button>
				<StyledMenu
					anchorEl={showUnfriend}
					keepMounted
					open={Boolean(showUnfriend)}
					onClose={closeFriendOption}
				>
					<MenuItem onClick={onClickUnfriend} className={classes.menuItem}>
						<Icon
							className="fas fa-user-times"
							style={{
								width: "fit-content",
								color: "#1c9dea",
								fontSize: "11px",
							}}
						/>
						<ListItemText primary="Unfriend" className={classes.itemText} />
					</MenuItem>
				</StyledMenu>
			</>
		);
	};

	const renderAcceptRequestOption = () => {
		const content = "Accept Request";
		const icon = (
			<Icon
				className="fas fa-user-plus"
				style={{ width: "fit-content", color: "#1c9dea", fontSize: "11px" }}
			/>
		);
		const onClick = () => {
			handleClickAcceptRequest(userId);
			setOption(options.FRIENDS_OPTION);
		};
		return (
			<Button
				variant="contained"
				size="small"
				startIcon={icon}
				className={classes.optionButton}
				onClick={onClick}
			>
				{content}
			</Button>
		);
	};

	const renderOption = () => {
		if (self) return;
		if (option === options.ADD_FRIEND_OPTION) return renderAddFriendOption();
		if (option === options.FRIENDS_OPTION) return renderFriendsOption();
		if (option === options.CANCEL_REQUEST_OPTION)
			return renderCancelRequestOption();
		if (option === options.ACCEPT_REQUEST_OPTION)
			return renderAcceptRequestOption();
	};

	const onClickResult = () => {
		const name = firstName + " " + lastName;
		handleClickUser(userId, name, picture);
	};

	return (
		<Box className={classes.root}>
			<div className={classes.leftSide}>
				<Avatar
					className={classes.avatar}
					src={picture}
					onClick={onClickResult}
				/>
			</div>
			<div className={classes.midSide}>
				<h5 className={classes.name} onClick={onClickResult}>
					{firstName + " " + lastName}
				</h5>
			</div>
			<div className={classes.rightSide}>
				{renderOption()}
			</div>
		</Box>
	);
}

export default SearchResult;
