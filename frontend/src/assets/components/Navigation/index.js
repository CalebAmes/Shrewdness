import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ReactComponent as Image } from '../../icons/gorilla.svg';
import * as sessionActions from '../../store/session';
import { getGroup } from '../../store/groups';
import { getChannel } from '../../store/channels';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { main, darkmode, blue } from '../../index';
import '../../../index.scss';
import './Navigation.scss';

const Navigation = (props) => {
	return (
		<>
			<div className="navItem">
				<NavItem icon={<Image />}></NavItem>
			</div>
		</>
	);
};

export function NavItem(props) {
	const [open, setOpen] = useState(false);

	useEffect(() => {}, []);

	const openFunc = () => {
		setOpen(!open);
	};

	return (
		<div className="nav-item">
			<a href="#" className={open ? 'icon-button-flip' : undefined} onClick={openFunc}>
				{props.icon}
			</a>

			{open && <Dropdown openFunc={openFunc} />}
		</div>
	);
}

export function NavComment(props) {
	return (
		<div className="nav-comment nav-div">
			<div>{props.icon}</div>
		</div>
	);
}

export function Dropdown({ openFunc }) {
	const dispatch = useDispatch();
	const groupsItems = useSelector((state) => state?.groups);
	const channelsItems = useSelector((state) => state?.channels);
	const user = useSelector((state) => state.session?.user);

	const [groupId, setGroupId] = useState(0);
	const [activeMenu, setActiveMenu] = useState('main');
	const [menuHeight, setMenuHeight] = useState(null);

	const groupsArray = Object.values(groupsItems);
	const channelsArray = Object.values(channelsItems);

	useEffect(() => {
		dispatch(getGroup());
		dispatch(getChannel());
	}, [dispatch]);

	function calcHeight(el) {
		const height = el.offsetHeight;
		setMenuHeight(height);
	}

	const logout = (e) => {
		e.preventDefault();
		dispatch(sessionActions.logout());
	};

	function DropdownItem(props) {
		const click = () => {
			if (props.group) setGroupId(props.group.id);
			props.goToMenu && setActiveMenu(props.goToMenu);
		};

		return (
			<a href="#" className="dropdown-item item" onClick={click}>
				{props.children}
				<div>
					<span className="rightIcon">{props.rightIcon}</span>
					<span className="rightRightIcon">{props.rightRightIcon}</span>
				</div>
			</a>
		);
	}

	function DropdownChannel() {
		return (
			<>
				{channelsArray
					.filter((channel) => channel.groupId === groupId)
					.map((channel) => (
						<Link key={channel.id} className="dropdown-item item" to={`/chatRoom/${channel.id}`}>
							{channel.name}
						</Link>
					))}
			</>
		);
	}

	function DropdownGroups() {
		return (
			<>
				{groupsArray.map((group) => (
					<DropdownItem
						key={group.id}
						goToMenu="channels"
						groupId={group.id}
						rightRightIcon={<i className="fas fa-chevron-right" />}
						group={group}
					>
						{group.name}
					</DropdownItem>
				))}
			</>
		);
	}

	return (
		<>
			{user && (
				<>
					<div className="cardBackground" onClick={openFunc}></div>
					<div className="dropdown" style={{ height: menuHeight }}>
						<CSSTransition
							in={activeMenu === 'main'}
							unmountOnExit
							timeout={500}
							classNames="menu-primary"
							onEnter={calcHeight}
						>
							<ul className="dd">
								<p>Groups:</p>
								<DropdownGroups />
								<DropdownItem rightRightIcon={<i className="fas fa-sliders-h" />} goToMenu="themes">
									Themes
								</DropdownItem>
								<div className="dropdown-item item" onClick={logout}>
									Log Out
								</div>
							</ul>
						</CSSTransition>

						<CSSTransition
							in={activeMenu === 'themes'}
							unmountOnExit
							timeout={500}
							classNames="menu-secondary"
						>
							<ul className="dd">
								<DropdownItem rightRightIcon={<i className="fas fa-chevron-left" />} goToMenu="main">
									...back
								</DropdownItem>
								<div className="dropdown-item item" onClick={main}>
									Main
								</div>
								<div className="dropdown-item item" onClick={darkmode}>
									Dark Mode
								</div>
								<div className="dropdown-item item" onClick={blue}>
									Stylish
								</div>
							</ul>
						</CSSTransition>
						<CSSTransition
							in={activeMenu === 'channels'}
							unmountOnExit
							timeout={500}
							classNames="menu-secondary"
						>
							<ul className="dd">
								<p>Channels:</p>
								<DropdownChannel />
								<DropdownItem rightRightIcon={<i className="fas fa-chevron-left" />} goToMenu="main">
									...back
								</DropdownItem>
							</ul>
						</CSSTransition>
					</div>
				</>
			)}
			{!user && (
				<>
					<div className="cardBackground" onClick={openFunc}></div>
					<div className="dropdown" style={{ height: menuHeight }}>
						<ul className="dd">
							<div className="dropdown-item item">
								<LoginFormModal user={user} text={'Log In'} />
							</div>
							<div className="dropdown-item item">
								<SignupFormModal user={user} text={'Sign Up'} />
							</div>
						</ul>
					</div>
				</>
			)}
		</>
	);
}

export default Navigation;
