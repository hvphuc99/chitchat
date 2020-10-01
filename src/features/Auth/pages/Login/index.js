import { Box, Container, makeStyles } from "@material-ui/core";

import AuthHeader from "features/Auth/components/AuthHeader";
import AuthNavigation from "features/Auth/components/AuthNavigation";
import LoginForm from "features/Auth/components/LoginForm";
import MediaLogo from "features/Auth/components/MediaLogo";
import React from "react";
import { useHistory } from "react-router-dom";
import userApi from "api/userApi";
import { useDispatch } from "react-redux";
import { setToken, setCurrentUserId } from "app/userSlice";
import { setNotify } from "app/notifySlice";
import { useState } from "react";
import useMedia from "services/mediaQuery";

const useStyles = makeStyles({
	root: {
		height: "100%",
		padding: "40px 0px",
	},
	loginForm: {
		position: "relative",
		backgroundColor: "white",
		padding: "50px",
	},
	loginSmallRoot: {
		textAlign: "center",
		height: "100%",
		width: "100%",
		backgroundColor: "white",
		padding: "0px 24px",
		"& .MuiFormControl-marginNormal": {
			margin: "5px 0px 10px 0px",
		},
	},
});

const initialValues = {
	email: "",
	password: "",
};

function Login() {
	const classes = useStyles();

	const { isSmallSize, isGreaterSmallSize } = useMedia();

	const history = useHistory();
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	const handleSubmit = (values) => {
		setLoading(true);
		const { email, password } = values;
		userApi
			.login(email, password)
			.then((user) => {
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
				setLoading(false);
				dispatch(
					setNotify({
						type: "error",
						message: "Email or password is incorrect",
					})
				);
			});
	};

	return (
		<>
			{isGreaterSmallSize && (
				<Box display="flex" justifyContent="center" className={classes.root}>
					<Container maxWidth="sm">
						<Box display="flex" justifyContent="center">
							<AuthNavigation />
						</Box>
						<div className={classes.loginForm}>
							<AuthHeader />
							<LoginForm
								initialValues={initialValues}
								handleSubmit={handleSubmit}
								loading={loading}
							/>
							<MediaLogo />
						</div>
					</Container>
				</Box>
			)}

			{isSmallSize && (
				<Box className={classes.loginSmallRoot}>
					<Box display="flex" justifyContent="center">
						<AuthNavigation />
					</Box>
					<AuthHeader />
					<LoginForm
						initialValues={initialValues}
						handleSubmit={handleSubmit}
						loading={loading}
					/>
					<MediaLogo />
				</Box>
			)}
		</>
	);
}

export default Login;
