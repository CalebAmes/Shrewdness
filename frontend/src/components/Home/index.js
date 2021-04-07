import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './home.scss'

const Home = () => {
  const user = useSelector(state => state.session?.user)

  if (user) return <Redirect to='/chatRoom/1' />;

  return (
    <>
      <div className='yourPlace'>
        <div className='yourText'>
          <h1>Your place to talk</h1>
          <h3>Whether you're part of a school club, gaming group, worldwide art community, or just a handful of friends that want to spend some time together, Discord makes it easy to talk every day and hang out more often.</h3>
        </div>
      </div>
    </>
  )
}

export default Home