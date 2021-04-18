import React from 'react';

const UserCard = ({ user, closeCard, height }) => {
	const styles = {
		transform: `translateY(-${height}px)`,
	};
	return (
		<>
			<div className="cardBackground" onClick={closeCard}></div>
			<div className="userCard" style={styles}>
				<div className="topCard">
					<img src={user.avatar} className="cardImg" />
					<h2 className="cardText">{user.username}</h2>
				</div>
				<div className="bottomCard">
					<div className="bioDiv">
						<h1>Biography:</h1>
						<h2 className="bio">{user.bio}</h2>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserCard;
