import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// eslint-disable-next-line react/prop-types
export default function MyRoute({ element, isClosed }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const prevPath = useSelector((state) => state.auth.prevPath);

  useEffect(() => {
    if (isClosed && !isLoggedIn) {
      navigate('/login', {
        state: { previousPath: location.pathname },
      });
    }
  }, [isClosed, isLoggedIn, location.pathname, navigate, prevPath]);
  return element;
}
