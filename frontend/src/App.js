import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import * as sessionActions from './assets/store/session';
import Navigation from './assets/components/Navigation';
import Splash from './assets/views/Splash';
import ChatRoom from './assets/views/ChatRoom';
import { getChannelMessages } from './assets/store/channelMessages';
import { getChannel } from './assets/store/channels';
import { getDirectMessages } from './assets/store/directMessages';
import { getGroup } from './assets/store/groups';
import { getNotification } from './assets/store/notifications';
import { getUserGroup } from './assets/store/userGroups';
import { getUsers } from './assets/store/users';

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
		dispatch(getChannelMessages());
		dispatch(getChannel());
		dispatch(getDirectMessages());
		dispatch(getGroup());
		dispatch(getNotification());
		dispatch(getUserGroup());
		dispatch(getUsers());
	}, [dispatch]);

	return (
		<>
			<Navigation isLoaded={isLoaded} />
			{isLoaded && (
				<>
					<Switch>
						<Route path="/chatRoom/:id">
							<ChatRoom />
						</Route>
						<Route path="/" exact>
							<Splash />
						</Route>
					</Switch>
				</>
			)}
		</>
	);
}

export default App;
