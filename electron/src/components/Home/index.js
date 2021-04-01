import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const user = useSelector(state => state.session?.user)
  return (
    <>
      <h1>This is the home page</h1>
      { user &&
        <>
          <h2>{ user.username }</h2>
        </>
    }
    </>
  )
}

export default Home