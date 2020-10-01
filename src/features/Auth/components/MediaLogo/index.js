import { makeStyles } from "@material-ui/core";

import React from "react";
import IconButton from "components/IconButton";
import userApi from "api/userApi";
import { useDispatch } from "react-redux";
import { setCurrentUserId, setToken } from "app/userSlice";
import { Link, useHistory } from "react-router-dom";
import { setNotify } from "app/notifySlice";
import useMedia from "services/mediaQuery";

const useStyles = makeStyles({
	root: {
		position: "absolute",
		left: "-25px",
		top: "50%",
		transform: "translateY(-50%)",
	},
	iconBtn: {
		marginBottom: "15px",
	},
	loginWithGoogleContainer: {
		marginTop: 40,
	},
	loginWithGoogle: {
		color: "black",
		fontSize: "1rem",
	},
});

function MediaLogo(props) {
	const classes = useStyles();

	const { isSmallSize, isGreaterSmallSize } = useMedia();

	const dispatch = useDispatch();
	const history = useHistory();

	const handleClickLoginWithGoogle = () => {
		userApi.loginWithGoogle().then((user) => {
			const { id, token } = user;
			dispatch(setCurrentUserId(id));
			dispatch(setToken(token));
			history.push("/");
			dispatch(
				setNotify({
					type: "success",
					message: "Login successful",
				})
			);
		})
			.catch((err) => {
				console.log(err);
			})
	};

	const handleClickLoginWithFacebook = () => {
		userApi.loginWithFacebook().then((token) => console.log(token));
	};

	return (
		<>
			{isGreaterSmallSize && (
				<div className={classes.root}>
					<div className={classes.iconBtn}>
						<IconButton
							icon="fa fa-google"
							iconColor="white"
							backgroundColor="#ff4e2b"
							backgroundColorHover="#F73F37"
							message="Sign in with Google"
							onClick={handleClickLoginWithGoogle}
						/>
					</div>
					{/* <div className={classes.iconBtn}>
					<IconButton
						icon="fa fa-facebook"
						iconColor="white"
						backgroundColor="#2D67CE"
						backgroundColorHover="#2D67CE"
						message="Sign in with Facebook"
						onClick={handleClickLoginWithFacebook}
					/>
				</div> */}
				</div>
			)}

			{isSmallSize && (
				<div className={classes.loginWithGoogleContainer}>
					<Link className={classes.loginWithGoogle} href="#" onClick={handleClickLoginWithGoogle}>
						Sign in with Google
					</Link>
				</div>
			)}
		</>
	);
}

export default MediaLogo;
