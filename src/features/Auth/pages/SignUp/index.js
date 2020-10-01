import { Box, Container, makeStyles } from "@material-ui/core";

import AuthHeader from "features/Auth/components/AuthHeader";
import AuthNavigation from "features/Auth/components/AuthNavigation";
import MediaLogo from "features/Auth/components/MediaLogo";
import React from "react";
import SignUpForm from "features/Auth/components/SignUpForm";
import userApi from "api/userApi";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { setNotify } from "app/notifySlice";
import useMedia from "services/mediaQuery";

const useStyles = innerHeight => makeStyles({
	root: {
		height: "100vh",
		padding: "40px 0px",
	},
	signUpForm: {
		position: "relative",
		backgroundColor: "white",
		padding: "50px",
	},
	signUpSmallRoot: {
		textAlign: "center",
		height: innerHeight,
		width: "100%",
		backgroundColor: "white",
		padding: "0px 24px",
		"& .MuiFormControl-marginNormal": {
			margin: "5px 0px 10px 0px",
		},
	},
});

const initialValues = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

function SignUp() {
	const classes = useStyles(window.innerHeight)();

	const { isSmallSize, isGreaterSmallSize } = useMedia();

	const dispatch = useDispatch();
	const history = useHistory();
	const [loading, setLoading] = useState(false);

	const handleSubmit = (values) => {
		const { firstName, lastName, email, password, confirmPassword } = values;
		setLoading(true);
		userApi
			.signUp(firstName, lastName, email, password, confirmPassword)
			.then(() => {
				dispatch(
					setNotify({
						type: "success",
						message: "Verify your email address",
					})
				);
				history.push("/login");
			})
			.catch((err) => {
				console.log(err);
				dispatch(
					setNotify({
						type: "error",
						message: err,
					})
				);
				setLoading(false);
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
						<div className={classes.signUpForm}>
							<AuthHeader />
							<SignUpForm
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
				<Box className={classes.signUpSmallRoot}>
					<Box display="flex" justifyContent="center">
						<AuthNavigation />
					</Box>
					<AuthHeader />
					<SignUpForm
						initialValues={initialValues}
						handleSubmit={handleSubmit}
						loading={loading}
					/>
					{/* <MediaLogo /> */}
				</Box>
			)}
		</>
	);
}

export default SignUp;
