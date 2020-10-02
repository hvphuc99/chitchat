import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";

import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import useMedia from "services/mediaQuery";

const useStyles = makeStyles({
	root: {
		width: "50%",
		padding: "23px",
		marginBottom: "30px",
		backgroundColor: "white",
		borderRadius: "10px",
		"& button.MuiButton-root": {
			fontSize: "revert",
		},
		"& .normal-button": {
			backgroundColor: "#E2F0FC",
			color: "#1c9dea",
		},
		"& .selected": {
			backgroundColor: "#1c9dea",
			color: "white",
		},
	},
	authNavigationSmallRoot: {
		width: "100%",
		margin: "40px 0px 20px 0px",
	},
	authText: {
		color: "#1c9dea",
	},
});

function AuthNavigation(props) {
	const classes = useStyles();

	const { isSmallSize, isGreaterSmallSize } = useMedia();

	const history = useHistory();
	const [selectedIndex, setSelectedIndex] = useState(null);

	const handleClickLoginButton = () => {
		history.push("/login");
	};

	const handleClickSignUpButton = () => {
		history.push("/sign-up");
	};

	useEffect(() => {
		switch (history.location.pathname) {
			case "/login":
				setSelectedIndex(0);
				break;
			case "/sign-up":
				setSelectedIndex(1);
				break;
			default:
				setSelectedIndex(null);
		}
	}, [history.location.pathname]);

	return (
		<>
			{isGreaterSmallSize && (
				<Grid container spacing={3} className={classes.root}>
					<Grid item xs={12} sm={6}>
						<Button
							className={selectedIndex === 0 ? "navigateLoginBtn normal-button selected" : "navigateLoginBtn normal-button"}
							size="medium"
							variant="contained"
							fullWidth
							onClick={handleClickLoginButton}
						>
							Login
					</Button>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Button
							className={selectedIndex === 1 ? "navigateSignUpBtn normal-button selected" : "navigateSignUpBtn normal-button"}
							size="medium"
							variant="contained"
							fullWidth
							onClick={handleClickSignUpButton}
						>
							Sign up
					</Button>
					</Grid>
				</Grid>
			)}

			{isSmallSize && (
				<Box display="flex" justifyContent="center" className={classes.authNavigationSmallRoot}>
					{selectedIndex === 0 && (
						<Typography className={classes.authText} variant="subtitle1" onClick={handleClickSignUpButton}>
							Don't have an account? Sign up
						</Typography>
					)}

					{selectedIndex === 1 && (
						<Typography className={classes.authText} variant="subtitle1" onClick={handleClickLoginButton}>
							Already have an account? Login
						</Typography>
					)}

					{selectedIndex === null && (
						<Typography className={classes.authText} variant="subtitle1" onClick={handleClickLoginButton}>
							Back to login
						</Typography>
					)}
				</Box>
			)}
		</>
	);
}

export default AuthNavigation;
