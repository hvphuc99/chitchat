import React from "react";
import {
	Badge,
	BottomNavigation,
	BottomNavigationAction,
	Icon,
	makeStyles,
} from "@material-ui/core";
import { IconButton as LogoButton } from "@material-ui/core";
import logo from "assets/images/logo.png";
import IconButton from "components/IconButton";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeToken, removeCurrentUserId } from "app/userSlice";
import userApi from "api/userApi";
import { setNotify } from "app/notifySlice";
import { setSelectedOption, resetMessage } from "features/Message/messageSlice";
import * as options from "constants/index";
import useMedia from "services/mediaQuery";

const useStyles = makeStyles({
	root: {
		display: "flex",
		flexDirection: "column",
		height: "100%",
		borderRight: "1px solid #eff1f2",
		padding: "15px 0px",
		"& .navigateBarHeader": {
			display: "flex",
			justifyContent: "center",
			borderBottom: "1px solid #eff1f2",
			paddingBottom: "20px",
			"& img": {
				width: 40,
				height: 40,
			},
			"& .MuiIconButton-root": {
				padding: 0,
			},
		},
		"& .navigateBarContent": {
			display: "flex",
			alignContent: "space-between",
			flexWrap: "wrap",
			flexGrow: "1",
			padding: "30px 0px 0px 0px",
			"& .navigateBarBody": {
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				width: "100%",
				"& .navigateIcon": {
					width: "100%",
					maxWidth: "45px",
					marginBottom: "40px",
					"& button": {
						width: 40,
						height: 40,
					},
				},
			},
			"& .navigateBarFooter": {
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				width: "100%",
				"& .navigateIcon": {
					maxWidth: "45px",
					marginTop: "40px",
					"& button": {
						width: "100%",
					},
				},
			},
		},
	},
	bottomNavigationRoot: {
		width: "100%",
		"& .MuiBottomNavigationAction-root": {
			maxWidth: "none",
		}
	},
});

function NavigateBar(props) {
	const classes = useStyles();

	const { isGreaterSmallSize, isSmallSize } = useMedia();

	const history = useHistory();
	const { selectedOption } = useSelector((state) => state.message);
	const dispatch = useDispatch();
	const { numberOfFriendRequest } = props;

	const handleClickLogout = () => {
		userApi
			.logout()
			.then((res) => {
				dispatch(removeToken());
				dispatch(removeCurrentUserId());
				dispatch(resetMessage());
				dispatch(
					setNotify({
						type: "success",
						message: res,
					})
				);
				history.push("/login");
			})
			.catch((err) => {
				dispatch(
					setNotify({
						type: "error",
						message: err,
					})
				);
			});
	};

	const handleClickLogoButton = () => {
		dispatch(resetMessage());
		history.push("/");
	};

	const handleClickListItem = (event, option) => {
		dispatch(setSelectedOption(option));
	};

	return (
		<>
			{isGreaterSmallSize && (
				<div className={classes.root}>
					<div className="navigateBarHeader">
						<LogoButton onClick={handleClickLogoButton}>
							<img src={logo} alt="logo" />
						</LogoButton>
					</div>

					<div className="navigateBarContent">
						<div className="navigateBarBody">
							<div className="navigateIcon">
								<IconButton
									icon="fas fa-comment-dots"
									iconColor="#223645"
									backgroundColor="#eff1f2"
									backgroundColorHover="#D3D8DB"
									message="All messages"
									selected={selectedOption === options.ALL_MESSAGES_OPTION}
									onClick={(event) =>
										handleClickListItem(event, options.ALL_MESSAGES_OPTION)
									}
								/>
							</div>

							<div className="navigateIcon">
								<IconButton
									icon="fas fa-user-friends"
									iconColor="#223645"
									backgroundColor="#eff1f2"
									backgroundColorHover="#D3D8DB"
									message="Friends"
									selected={selectedOption === options.FRIENDS_OPTION}
									onClick={(event) =>
										handleClickListItem(event, options.FRIENDS_OPTION)
									}
								/>
							</div>

							<div className="navigateIcon">
								<IconButton
									icon="fas fa-user-plus"
									iconColor="#223645"
									backgroundColor="#eff1f2"
									backgroundColorHover="#D3D8DB"
									message="Friend requests"
									badgeContent={numberOfFriendRequest}
									selected={selectedOption === options.FRIEND_REQUESTS_OPTION}
									onClick={(event) =>
										handleClickListItem(event, options.FRIEND_REQUESTS_OPTION)
									}
								/>
							</div>
						</div>

						<div className="navigateBarFooter">
							<div className="navigateIcon">
								<IconButton
									icon="fas fa-user-edit"
									iconColor="#223645"
									backgroundColor="#eff1f2"
									backgroundColorHover="#D3D8DB"
									message="Profile"
									selected={selectedOption === options.PROFILE_OPTION}
									onClick={(event) =>
										handleClickListItem(event, options.PROFILE_OPTION)
									}
								/>
							</div>

							<div className="navigateIcon">
								<IconButton
									icon="fas fa-sign-out-alt"
									iconColor="#223645"
									backgroundColor="#eff1f2"
									backgroundColorHover="#D3D8DB"
									message="Log out"
									onClick={handleClickLogout}
								/>
							</div>
						</div>
					</div>
				</div>
			)}

			{isSmallSize && (
				<BottomNavigation
					value={selectedOption}
					onChange={(event, newValue) => {
						dispatch(setSelectedOption(newValue));
					}}
					showLabels
					className={classes.bottomNavigationRoot}
				>
					<BottomNavigationAction
						label="All messages"
						value={options.ALL_MESSAGES_OPTION}
						icon={
							<Icon
								className="fas fa-comment-dots"
								style={{
									width: "fit-content",
									color: "inherit",
									fontSize: "20px",
								}}
							/>
						}
					/>
					<BottomNavigationAction
						label="Friends"
						value={options.FRIENDS_OPTION}
						icon={
							<Icon
								className="fas fa-user-friends"
								style={{
									width: "fit-content",
									color: "inherit",
									fontSize: "20px",
								}}
							/>
						}
					/>

					<BottomNavigationAction
						label="Requests"
						value={options.FRIEND_REQUESTS_OPTION}
						icon={
							<Badge badgeContent={numberOfFriendRequest} color="error">
								<Icon
									className="fas fa-user-plus"
									style={{
										width: "fit-content",
										color: "inherit",
										fontSize: "20px",
									}}
								/>
							</Badge>
						}
					/>
				</BottomNavigation>
			)}
		</>
	);
}

export default NavigateBar;
