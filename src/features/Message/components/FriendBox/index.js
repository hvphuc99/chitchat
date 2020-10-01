import React from "react";
import PropTypes from "prop-types";
import {
	makeStyles,
	Button,
	withStyles,
	Menu,
	MenuItem,
	ListItemText,
	Icon,
	Box
} from "@material-ui/core";
import Avatar from "../Avatar";
import { useState } from "react";

FriendBox.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	avatar: PropTypes.string.isRequired,
	handleUnfriend: PropTypes.func,
	handleClickUser: PropTypes.func,
};

FriendBox.defaultProps = {
	handleUnfriend: null,
	handleClickUser: null,
};

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

const useStyles = makeStyles({
	root: {
		display: "flex",
		justifyContent: "space-between",
		width: "100%",
	},
	leftSide: {
		display: "flex",
		alignItems: "center",
	},
	midSide: {
		flexGrow: "1",
		display: "flex",
		flexDirection: "column",
		maxWidth: "calc(100% - 100px)",
		"& h5": {
			fontSize: "15px",
			fontWeight: "700",
			textTransform: "none",
			color: "#223645",
			margin: "0px 0px 10px 10px",
			"&:hover": {
				textDecoration: "underline",
				cursor: "pointer",
			},
		},
	},
	rightSide: {
		display: "flex",
		alignItems: "center",
		"& .MuiButton-label": {
			fontSize: "11px",
		},
	},
	menuItem: {
		padding: "0px 10px",
	},
	itemTextContainer: {
		"& .MuiTypography-body1": {
			fontSize: "12px",
			marginLeft: "5px",
		},
	},
	friendButton: {
		borderRadius: 5,
	}
});

function FriendBox(props) {
	const classes = useStyles();
	const { id, name, picture, handleUnfriend, handleClickUser } = props;
	const [showUnfriend, setShowUnfriend] = useState(null);

	const onClickUnfriend = () => {
		handleUnfriend(id);
	};

	const onClickUser = () => {
		handleClickUser(id, name, picture);
	};

	const handleClickFriendOption = (event) => {
		setShowUnfriend(event.currentTarget);
	};

	const closeFriendOption = () => {
		setShowUnfriend(null);
	};

	return (
		<Box className={classes.root}>
			<div className={classes.leftSide}>
				<Avatar
					src={picture}
					active={true}
					onClick={onClickUser}
					cursorHover={true}
				/>
			</div>
			<div className={classes.midSide}>
				<h5 onClick={onClickUser}>{name}</h5>
			</div>
			<div className={classes.rightSide}>
				<Button
					className={classes.friendButton}
					size="small"
					variant="contained"
					fullWidth
					onClick={handleClickFriendOption}
					startIcon={
						<Icon
							className="fas fa-user-check"
							style={{
								width: "fit-content",
								color: "#1c9dea",
								fontSize: "10px",
							}}
						/>
					}
				>
					Friends
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
								fontSize: "12px",
							}}
						/>
						<ListItemText primary="Unfriend" className={classes.itemTextContainer} />
					</MenuItem>
				</StyledMenu>
			</div>
		</Box>
	);
}

export default FriendBox;
