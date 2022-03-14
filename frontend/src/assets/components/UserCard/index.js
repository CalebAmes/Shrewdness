import React from 'react';

const UserCard = ({ user, closeCard }) => {
	const avatarStyle = {
		background:'url('+user.avatar+') center center',
		backgroundSize: 'cover',
		height: '175px',
		width: '200px',
	}

	return (
		<div className="cardContainer">
			<div className="cardBackground" onClick={closeCard}></div>
			<div className="userCard">
				<div className="leftCard" 
					style={avatarStyle}>
				</div>
				<div className="rightCard">
						<h2 className="cardText">{user.username}</h2>
					<div className="bioDiv">
						<h3 className="bio">{user.bio}</h3>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserCard;
