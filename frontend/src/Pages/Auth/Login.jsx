import React, { useState } from 'react';
import styles from './auth.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../../Radux/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);
  const [isRegistering, setIsRegistering] = useState(false);

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleChange = (e, type) => {
    const { name, value } = e.target;
    if (type === 'login') {
      setLoginData(prev => ({ ...prev, [name]: value }));
    } else {
      setRegisterData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await dispatch(login(loginData));
    if (login.fulfilled.match(result)) {
      toast.success("Login successful!");
      navigate('/');
    } else {
      toast.error("Login failed. Check your credentials.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.password_confirmation) {
      toast.error("Passwords do not match");
      return;
    }

    const result = await dispatch(register(registerData));
    if (register.fulfilled.match(result)) {
      toast.success("Registration successful! Welcome 🎉");
      const user = result.payload;
      if (user?.user_type === 'admin') navigate('/admin');
      else if (user?.user_type === 'tour_guide') navigate('/guide');
      else navigate('/');
    } else {
      toast.error("Registration failed. Check your data.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className={styles.background}></div>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles["text-sci"]}>
            <h2>Welcome<br /><span>to our new website!</span></h2>
            <p>We're delighted to have you here. If you need any assistance, feel free to reach out!</p>
            <div className={styles["social-icons"]}>
              <a href="#"><i className='bx bxl-linkedin-square'></i></a>
              <a href="#"><i className='bx bxl-facebook'></i></a>
              <a href="#"><i className='bx bxl-instagram'></i></a>
              <a href="#"><i className='bx bxl-twitter'></i></a>
            </div>
          </div>
        </div>

        <div className={`${styles["logreg-box"]} ${isRegistering ? styles.active : ''}`}>
          {/* ===== Login Form ===== */}
          <div className={`${styles["form-box"]} ${styles.login}`}>
            <form onSubmit={handleLogin}>
              <h2>Sign In</h2>
              <div className={styles["input-box"]}>
                <span className={styles.icon}><i className='bx bxs-envelope'></i></span>
                <input id="login-email" type="email" name="email" value={loginData.email} onChange={(e) => handleChange(e, 'login')} required />
                <label htmlFor="login-email">Email</label>
              </div>
              <div className={styles["input-box"]}>
                <span className={styles.icon}><i className='bx bxs-lock-alt'></i></span>
                <input id="login-password" type="password" name="password" value={loginData.password} onChange={(e) => handleChange(e, 'login')} required />
                <label htmlFor="login-password">Password</label>
              </div>
              <div className={styles["login-register"]}>
                <p><Link to='/forgotPassword'>Don't Remember password ?</Link></p>
              </div>

              {error && <p className="text-danger mt-2">{error}</p>}

              <button type="submit" className={`${styles.btn} mt-3`} disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </button>

              <div className={styles["login-register"]}>
                <p>Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); setIsRegistering(true); }}>Sign Up</a></p>
              </div>
            </form>
          </div>

          {/* ===== Register Form ===== */}
          <div className={`${styles["form-box"]} ${styles.register}`}>
            <form onSubmit={handleRegister}>
              <h2>Sign Up</h2>
              <div className={styles["input-box"]}>
                <span className={styles.icon}><i className='bx bxs-user'></i></span>
                <input id="register-name" type="text" name="name" value={registerData.name} onChange={(e) => handleChange(e, 'register')} required />
                <label htmlFor="register-name">Name</label>
              </div>
              <div className={styles["input-box"]}>
                <span className={styles.icon}><i className='bx bxs-envelope'></i></span>
                <input id="register-email" type="email" name="email" value={registerData.email} onChange={(e) => handleChange(e, 'register')} required />
                <label htmlFor="register-email">Email</label>
              </div>
              <div className={styles["input-box"]}>
                <span className={styles.icon}><i className='bx bxs-lock-alt'></i></span>
                <input id="register-password" type="password" name="password" value={registerData.password} onChange={(e) => handleChange(e, 'register')} required />
                <label htmlFor="register-password">Password</label>
              </div>
              <div className={styles["input-box"]}>
                <span className={styles.icon}><i className='bx bxs-lock-alt'></i></span>
                <input id="register-confirm-password" type="password" name="password_confirmation" value={registerData.password_confirmation} onChange={(e) => handleChange(e, 'register')} required />
                <label htmlFor="register-confirm-password">Confirm Password</label>
              </div>

              {/* User type */}
              {/* <div className={styles["input-box"]}>
                <select
                  name="user_type"
                  value={registerData.user_type}
                  onChange={(e) => handleChange(e, 'register')}
                  className="form-select"
                  required
                >
                  <option value="user">User</option>
                  <option value="tour_guide">Tour Guide</option>
                  <option value="admin">Admin</option>
                </select>
              </div> */}

              {error && <p className="text-danger mt-2">{error}</p>}

              <button type="submit" className={styles.btn} disabled={loading}>
                {loading ? 'Signing up...' : 'Sign Up'}
              </button>

              <div className={styles["login-register"]}>
                <p>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setIsRegistering(false); }}>Sign In</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
