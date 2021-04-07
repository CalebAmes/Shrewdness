import React,{ useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ReactComponent as Image } from '../../icons/gorilla.svg'
import { getGroup } from '../../store/groups'
import { getChannel } from '../../store/channels'
import LoginFormModal from '../LoginFormModal';
import ProfileButton from './ProfileButton';
import '../../index.scss';
import './Navigation.scss';

const Navigation = (props) => {
  return (
    <>
      <div className='navItem'>
          <NavItem icon={<Image />}>
          </NavItem>
      </div>
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

      {open && 
        <Dropdown openFunc={openFunc} />
      }
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

export function Dropdown({openFunc}) {
  const dispatch = useDispatch();
  const groupsItems = useSelector((state) => state?.groups);
  const channelsItems = useSelector((state) => state?.channels)
  const user = useSelector((state) => state.session?.user)

  const [ groupId, setGroupId ] = useState(0)
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

  function DropdownItem(props) {
    const click = () => {
      if (props.group) setGroupId(props.group.id)
      props.goToMenu && setActiveMenu(props.goToMenu)
    }

    return (
      <a href='#' 
        className='dropdown-item item' 
        onClick={click}
        >
            { props.children }
            <div>
              <span className='rightIcon'>{ props.rightIcon }</span>
              <span className='rightRightIcon'>{ props.rightRightIcon }</span>
            </div>
      </a>
    );
  }

  function DropdownChannel() {
    return (
      <>
      {
        channelsArray.filter(channel => channel.groupId === groupId)
          .map(channel => (
            <Link className='dropdown-item item' to={`/chatRoom/${ channel.id }`}>{ channel.name }</Link>
          ))
      }
      </>
    )
  }

  function DropdownGroups() {
    return (
      <>
        {
          groupsArray.map((group) => (
            <DropdownItem 
              goToMenu='channels' 
              groupId={group.id} 
              rightRightIcon={<i class="fas fa-chevron-right"/>}
              group={group}
              >{group.name}</DropdownItem>
          ))
        }
      </>
    )
  }

  return (
    <>
      <div className='cardBackground' onClick={ openFunc }></div>
      <div className='dropdown' style={{ height: menuHeight }}>
        <CSSTransition 
          in={ activeMenu === 'main' } 
          unmountOnExit
          timeout={ 500 }
          classNames='menu-primary'
          onEnter={ calcHeight }
          >
          <ul className='dd'>
            <DropdownItem 
              rightRightIcon={<i class="fas fa-chevron-right"/>} goToMenu='groups'>
                Groups
            </DropdownItem>
    
              <Link className='dropdown-item item' to="/users">Users</Link>

            <div className='dropdown-item item' >
              <LoginFormModal user={user} />
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
              <DropdownGroups />
          </ul>

        </CSSTransition>
        <CSSTransition 
          in={ activeMenu === 'channels' } 
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
            <DropdownChannel />
          </ul>
        </CSSTransition>
      </div>
    </>
  )
}

export default Navigation;
