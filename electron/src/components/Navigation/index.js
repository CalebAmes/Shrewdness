import React,{ useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Image from '../../icons/gorilla.svg';
import { getGroup } from '../../store/groups'
import { getChannel } from '../../store/channels'
import { io } from 'socket.io-client';
import LoginFormModal from '../LoginFormModal';
import ProfileButton from './ProfileButton';
import '../../index.scss';
import './Navigation.scss';

const Navigation = (props) => {
  return (
    <>
      <nav className='NavBar'>
        <div className='NavBar-div'>
        </div>
      </nav>
          <div className='navItem'>
              <NavItem icon={<Image />}>
                <Dropdown />
              </NavItem>
          </div>
      <div className='pad'/>
    </>
  )
}

export function NavItem(props) {
  const [open, setOpen] = useState(false);
  
  useEffect(() => {

  }, [])
  
  const openFunc = () => {
    setOpen(!open);
  }

  return (
    <div className='nav-item'>
      <a href='#' className={ open && 'icon-button-flip' } onClick={openFunc}>
        { props.icon }
      </a>

      {open && props.children}
    </div>
  )
}

export function NavComment(props) {
  return (
    <div className='nav-comment nav-div'>
      <div>{props.icon}</div>
    </div>
  )
}

export function Dropdown({setAuthenticated}) {
  const dispatch = useDispatch();
  const groupsItems = useSelector((state) => state?.groups);
  const channelsItems = useSelector((state) => state?.channels)
  const user = useSelector((state) => state.session?.user)

  const [ activeMenu, setActiveMenu ] = useState('main');
  const [ menuHeight, setMenuHeight ] = useState(null);

  const groupsArray = Object.values(groupsItems);
  const channelsArray = Object.values(channelsItems);
  
  useEffect(() => {
    dispatch(getGroup());
    dispatch(getChannel());
  }, [dispatch])

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  const logoutUser = async (e) => {
    logout();
    setAuthenticated(false);
  };

  function DropdownItem(props) {
    return (
      <a href='#' 
        className='dropdown-item item' 
        onClick={()=> props.goToMenu && setActiveMenu(props.goToMenu)}
        >
            { props.children }
            <div>
              <span className='rightIcon'>{ props.rightIcon }</span>
              <span className='rightRightIcon'>{ props.rightRightIcon }</span>
            </div>
      </a>
    );
  }

  function DropdownChannel({ channels }) {
    return (
      <Link to={`/channels/${ channels.id }`} className='menu-item item'>
        <div className='icon-button'></div>
        {channels.name}
      </Link>
    )
  }

  function DropdownGroup({ groups }) {
    return (
      <div className='menu-item item'>
      <Link to={`/groups/${ groups.id }`}>
        <div className='icon-button'></div>
        { groups.name }
      </Link>
      </div>
    )
  }

  return (
    <div className='dropdown' style={{ height: menuHeight }}>
      <CSSTransition 
        in={ activeMenu === 'main' } 
        unmountOnExit
        timeout={ 500 }
        classNames='menu-primary'
        onEnter={ calcHeight }
        >
        <ul className='dd'>
          <div className='profileGrid'>
            <Link to={`/profile/${user?.id}`} 
              className='pGridItem profile' 
              id='profile'>
                Profile
            </Link>
            <Link to='/' 
              className='pGridItem logout' 
              // onClick={ }
              >
                Logout
            </Link>
          </div>
          <DropdownItem 
            rightRightIcon={<i class="fas fa-chevron-right"/>} goToMenu='groups'>
              Groups
          </DropdownItem>
  
            <Link className='dropdown-item item' to="/users">Users</Link>

          <div className='dropdown-item item' >
            <LoginFormModal />
          </div>
          <Link className='dropdown-item item' to="/signup">Sign Up</Link>
          <Link className='dropdown-item item' to="/groups">Groups</Link>
          <Link className='dropdown-item item' exact to="/">Home</Link>
          <div className='dropdown-item item' >
            <ProfileButton user={user} />
          </div>

        </ul>
      </CSSTransition>

      <CSSTransition 
        in={ activeMenu === 'groups' } 
        unmountOnExit
        timeout={ 500 }
        classNames='menu-secondary'
        >
        <ul className='dd'>
          <DropdownItem 
            rightRightIcon={<i class="fas fa-chevron-left"/>} 
            goToMenu='main'>
              ...back
          </DropdownItem>
          <DropdownItem 
            rightRightIcon={<i class="fas fa-chevron-right"/>}
            goToMenu='dms'>
              Direct Messages
            </DropdownItem>
        </ul>

      </CSSTransition>
      <CSSTransition 
        in={ activeMenu === 'dms' } 
        unmountOnExit
        timeout={ 500 }
        classNames='menu-secondary'
        >
        <ul className='dd'>
          <DropdownItem 
            rightRightIcon={<i class="fas fa-chevron-left"/>}
            goToMenu='main'>
              ...back
          </DropdownItem>
          <DropdownItem 
            rightIcon={<i class="fas fa-chevron-left"/>}
            rightRightIcon={<i class="fas fa-chevron-left"/>}
            goToMenu='main'>
              ....main
          </DropdownItem>
        </ul>
      </CSSTransition>
    </div>
  )
}

export default Navigation;
