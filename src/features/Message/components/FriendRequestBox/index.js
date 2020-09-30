import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Button, Box } from "@material-ui/core";
import Avatar from "../Avatar";
import { formatTime } from "utils";

FriendRequestBox.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	avatar: PropTypes.string.isRequired,
	timestamp: PropTypes.string.isRequired,
	handleConfirmRequest: PropTypes.func,
	handleDeleteRequest: PropTypes.func,
};

FriendRequestBox.defaultProps = {
	handleConfirmRequest: null,
	handleDeleteRequest: null,
};

const useStyles = makeStyles({
	// root: {
	//   display: "flex",
	//   alignItems: "center",
	//   marginBottom: "2px",
	// },
	// content: {
	//   display: "flex",
	//   flexDirection: "column",
	//   alignItems: "flex-start",
	// },
	// buttonContainer: {
	//   display: "flex",
	//   justifyContent: "center",
	//   width: "100%",
	//   "& .delete-button": {
	//     color: "#1C1F22",
	//     backgroundColor: "#D8DADF",
	//     marginLeft: "10px",
	//     "& .MuiButton-label": {
	//       fontSize: "11px",
	//     },
	//   },
	//   "& .confirm-button": {
	//     backgroundColor: "#1c9dea",
	//     color: "white",
	//     marginLeft: "16px",
	//     "& .MuiButton-label": {
	//       fontSize: "11px",
	//     },
	//   },
	// },
	// header: {
	//   display: "flex",
	//   width: "100%",
	//   justifyContent: "space-between",
	//   alignItems: "center",
	//   marginBottom: "10px",
	//   "& h5": {
	//     fontSize: "15px",
	//     fontWeight: "700",
	//     textTransform: "none",
	//     color: "#223645",
	//     margin: "0px 0px 0px 16px",
	//   },
	//   "& h6": {
	//     fontSize: "11px",
	//     fontWeight: "400",
	//     color: "#647589",
	//     margin: "0px 0px 0px 0px",
	//     height: "fit-content",
	//   },
	// },
	// avatarContainer: {
	//   display: "flex",
	//   justifyContent: "center",
	// },
	root: {
		display: "flex",
		justifyContent: "space-between",
		width: "100%",
	},
	leftSide: {
		display: "flex",
		alignItems: "center",
	},
	rightSide: {
		flexGrow: "1",
		display: "flex",
		flexDirection: "column",
		maxWidth: "calc(100% - 50px)",
	},
	buttonContainer: {
		display: "flex",
		width: "100%",
		"& .confirm-button": {
			backgroundColor: "#1c9dea",
			color: "white",
			borderRadius: "5px",
			"& .MuiButton-label": {
				fontSize: "11px",
			},
		},
		"& .delete-button": {
			color: "#1C1F22",
			backgroundColor: "#D8DADF",
			marginLeft: "5px",
			borderRadius: "5px",
			"& .MuiButton-label": {
				fontSize: "11px",
			},
		},
	},
	header: {
		display: "flex",
		width: "100%",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: "10px",
		"& h5": {
			fontSize: "15px",
			fontWeight: "700",
			textTransform: "none",
			color: "#223645",
			margin: 0,
		},
		"& h6": {
			fontSize: "11px",
			fontWeight: "400",
			color: "#647589",
			margin: "0px 0px 0px 0px",
			height: "fit-content",
		},
	},
});

function FriendRequestBox(props) {
	const classes = useStyles();
	const {
		id,
		name,
		avatar,
		timestamp,
		handleConfirmRequest,
		handleDeleteRequest,
	} = props;

	const onClickConfirm = () => {
		handleConfirmRequest(id);
	};

	const onClickDelete = () => {
		handleDeleteRequest(id);
	};

	return (
		<Box className={classes.root}>
			<div className={classes.leftSide}>
				<Avatar src={avatar} />
			</div>
			<div className={classes.rightSide}>
				<div className={classes.header}>
					<h5>{name}</h5>
					<h6>{formatTime(timestamp)}</h6>
				</div>
				<div className={classes.buttonContainer}>
					<Button
						className="confirm-button"
						size="small"
						variant="contained"
						fullWidth
						onClick={onClickConfirm}
					>
						Confirm
          </Button>
					<Button
						className="delete-button"
						size="small"
						variant="contained"
						fullWidth
						onClick={onClickDelete}
					>
						Delete
          </Button>
				</div>
			</div>
		</Box>
	);
}

export default FriendRequestBox;
