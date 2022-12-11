import Wrapper from '../assets/wrappers/SmallSidebar';
import { FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../features/user/userSlice';
import links from "../utils/links"
import NavLinks from '../components/NavLinks'
const SmallSidebar = () => {

  const toggle = () => dispatch(toggleSidebar())

  const { isSidebarOpen } = useSelector(store => store.user)
  const dispatch = useDispatch()

  return (
    <Wrapper>
      <div className={`sidebar-container ${isSidebarOpen ? "show-sidebar" : ""}`}>
        <div className='content'>
          <button className='close-btn' onClick={toggle}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggle} />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
