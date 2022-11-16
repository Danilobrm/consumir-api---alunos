import React from 'react';
import {
  FaHome,
  FaSignInAlt,
  FaUserAlt,
  FaCircle,
  FaPowerOff,
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as actions from '../../store/modules/auth/actions';
import { Nav } from './styled';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const HandleLogout = (e) => {
    e.preventDefault();
    dispatch(actions.loginFailure({ navigate }));
  };

  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/register">
        <FaUserAlt size={24} />
      </Link>

      {isLoggedIn ? (
        <Link to="/logout">
          <FaPowerOff size={24} onClick={HandleLogout} />
        </Link>
      ) : (
        <Link to="/login">
          <FaSignInAlt size={24} />
        </Link>
      )}
      {isLoggedIn && (
        <FaCircle
          size={18}
          color="#66ff33"
          style={{
            position: 'absolute',
            right: '10%',
          }}
        />
      )}
    </Nav>
  );
}
