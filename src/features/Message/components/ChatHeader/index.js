import React, { useState } from "react";
import PropTypes from "prop-types";
import {
	makeStyles,
	Box,
	Slide,
	Dialog,
	DialogContent,
} from "@material-ui/core";
import Avatar from "../Avatar";
import IconButton from "components/IconButton";
import ComingSoon from "components/ComingSoon";
import useMedia from "services/mediaQuery";
import { useDispatch } from "react-redux";
import { setCurrentGroupChatId, setShowChatForm } from "features/Message/messageSlice";

ChatHeader.propTypes = {
	name: PropTypes.string.isRequired,
	avatar: PropTypes.string.isRequired,
	active: PropTypes.bool,
};

ChatHeader.defaultProps = {
	active: false,
};

const useStyles = makeStyles({
	root: {
		display: "flex",
		justifyContent: "space-between",
		padding: "5px 15px 5px 15px",
		width: "100%",
		backgroundColor: "white",
		borderBottom: "1px solid #eff1f2",
	},
	leftSide: {
		display: "flex",
		alignItems: "center",
		"& h5": {
			fontSize: "15px",
			fontWeight: "700",
			textTransform: "none",
			color: "#223645",
			margin: "0px 0px 5px 16px",
		},
		"& h6": {
			fontSize: "11px",
			fontWeight: "400",
			textTransform: "none",
			color: "#647589",
			margin: "5px 0px 5px 16px",
		},
		"& .online": {
			color: "#3fcc35",
		},
	},
	rightSide: {
		display: "flex",
		justifyContent: "center",
		"& .icon": {
			marginLeft: "10px",
		},
	},
	dialog: {
		"& .MuiDialog-paper": {
			position: "absolute",
			width: "40%",
		},
		"& .MuiDialog-paperWidthSm": {
			maxWidth: "none",
		},
	},
	backButton: {
		marginRight: 10,
		"& button": {
			padding: 0,
		},
	},
});

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="down" ref={ref} {...props} />;
});

function ChatHeader(props) {
	const classes = useStyles();

	const { isSmallSize } = useMedia();

	const { name, avatar, active } = props;
	const [showDialog, setShowDialog] = useState(false);
	const dispatch = useDispatch();

	const handleClickOpenDialog = () => {
		setShowDialog(true);
	};

	const handleClickCloseDialog = () => {
		setShowDialog(false);
	};

	const handleClickBack = () => {
		dispatch(setCurrentGroupChatId(""));
		dispatch(setShowChatForm(false));
	};

	return (
		<Box className={classes.root}>
			<div className={classes.leftSide}>
				{isSmallSize && <div className={classes.backButton}>
					<IconButton
						icon="fas fa-arrow-left"
						iconColor="#223645"
						backgroundColor="white"
						onClick={handleClickBack}
					/>
				</div>}
				<Avatar src={avatar} active={active} />
				<span>
					<h5>{name}</h5>
					{/* {active ? <h6 className="online">Online</h6> : <h6>Offline</h6>} */}
				</span>
			</div>
			<div className={classes.rightSide}>
				<div className="icon">
					<IconButton
						icon="fas fa-phone-alt"
						iconColor="#223645"
						backgroundColor="#eff1f2"
						backgroundColorHover="#D3D8DB"
						message="Voice Call"
						onClick={handleClickOpenDialog}
					/>
				</div>
				<div className="icon">
					<IconButton
						icon="fas fa-video"
						iconColor="#223645"
						backgroundColor="#eff1f2"
						backgroundColorHover="#D3D8DB"
						message="Video Chat"
						onClick={handleClickOpenDialog}
					/>
				</div>
			</div>
			<Dialog
				className={classes.dialog}
				open={showDialog}
				TransitionComponent={Transition}
				onClose={handleClickCloseDialog}
			>
				<DialogContent>
					<ComingSoon />
				</DialogContent>
			</Dialog>
		</Box>
	);
}

export default ChatHeader;
