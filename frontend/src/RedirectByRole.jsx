import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from './Radux/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { getToken, isValidToken } from './Utility/authToken';

const RedirectByRole = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    const token = getToken();
    const tokenOk = isValidToken(token);

    // نسمح بإعادة التوجيه فقط إذا كنت على الصفحة الرئيسية أو صفحة تسجيل الدخول
    const isOnRootOrLogin = location.pathname === '/' || location.pathname === '/login';

    if (tokenOk && !user && isOnRootOrLogin) {
      dispatch(getProfile()).then((res) => {
        const role = res.payload?.user_type;
        if (role === 'admin') navigate('/admin');
        else if (role === 'tour_guide') navigate('/guide');
        else if (role === 'user') navigate('/');
      });
    }
  }, [dispatch, navigate, location.pathname, user]);

  return null;
};

export default RedirectByRole;
