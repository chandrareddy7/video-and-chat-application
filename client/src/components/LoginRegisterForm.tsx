import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import { useNavigate } from 'react-router-dom';

type User = {
  name?: string;
  userName: string;
  email: string;
  password: string;
};

const LoginRegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  const handleLogin = async (user: Omit<User, 'name'>) => {
    // Implement login logic here
    const {userName, email, password} = user;
    if(!userName || !email || !password){
      // TODO : Add a toast with message please fill all fields
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        },
      };
      const {data} = await axios.post('/api/user/login', {email, password, userName}, config);
      // TODO: ADD toast for login successful
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate('/home');
    } catch (error) {
      // TODO: Add a toast saying login failed and retry.
    }

  };

  const handleRegister = async (user: User) => {
    // Implement registration logic here
    const {name, userName, email, password} = user;
    if(!name || !userName || !email || !password){
      // TODO: Add a toast with message "Please fill all fields"
    }
    // Sending post request to backend
    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        },
      };
      const {data} = await axios.post('/api/user/register', {name, email, password, userName}, config);
      // TODO: ADD toast for registration successful
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate('/home');
    } catch (error) {
      // TODO: Add error message and toastify
    }
  };


  return (
    <div className="login-register-container">
      <div className="tab-buttons">
        <button
          className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => setActiveTab('login')}
        >
          LOGIN
        </button>
        <button
          className={`tab-button ${activeTab === 'register' ? 'active' : ''}`}
          onClick={() => setActiveTab('register')}
        >
          REGISTER
        </button>
      </div>

      {activeTab === 'login' ? 
        <LoginForm setActiveTab={setActiveTab} onLogin={handleLogin} /> : 
        <RegisterForm setActiveTab={setActiveTab} onRegister={handleRegister}/>
      }
    </div>
  );
};

interface LoginFormProps {
  setActiveTab: (tab: 'login' | 'register') => void;
  onLogin: (user: Omit<User, 'name'>) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ setActiveTab, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ userName: email, email, password });
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Sign in with:</h2>
      <div className="social-buttons">
        <button type="button" className="social-button"><FaGoogle /></button>
      </div>
      <p className="or-divider">or:</p>
      <input type="text" placeholder="Email or username" value={email} onChange={(e) => setEmail(e.target.value)}/>
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <div className="form-options">
        <label className="remember-me">
          <input type="checkbox" />
          <span>Remember me</span>
        </label>
        <a href="/forget-password" className="forgot-password">Forgot password?</a>
      </div>
      <button type="submit" className="submit-button">SIGN IN</button>
      <button type="button" className='submit-button guest' onClick={() => {setEmail("guest@gmail.com"); setPassword("Guest@123")}}>Get Guest Credentials</button>
      <p className="switch-form-link">
        Not a member? <a onClick={() => setActiveTab('register')}>Register</a>
      </p>
    </form>
  );
};

interface RegisterFormProps {
  setActiveTab: (tab: 'login' | 'register') => void;
  onRegister: (user: User) => void;
}


const RegisterForm: React.FC<RegisterFormProps> = ({ setActiveTab, onRegister }) => {

  const [name, setName] = useState('');
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === repeatPassword) {
      onRegister({ name, userName, email, password });
    } else {
      alert("Passwords don't match");
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Sign up with:</h2>
      <div className="social-buttons">
        <button type="button" className="social-button"><FaGoogle /></button>
      </div>
      <p className="or-divider">or:</p>
      <input type="text" placeholder="Name" value={name} 
        onChange={(e) => setName(e.target.value)}/>
        <input 
        type="text" 
        placeholder="Username" 
        value={userName} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <input type="email" placeholder="Email" value={email} 
        onChange={(e) => setEmail(e.target.value)}  />
      <input type="password" placeholder="Password"         value={password} 
        onChange={(e) => setPassword(e.target.value)} 
/>
      <input type="password" placeholder="Repeat password" value={repeatPassword} 
        onChange={(e) => setRepeatPassword(e.target.value)} 
/>
      <div className="form-options">
        <label className="terms-agreement">
          <input type="checkbox" />
          <span>I agree to the terms and conditions</span>
        </label>
      </div>
      <button type="submit" className="submit-button">REGISTER</button>
      <p className="switch-form-link">
        Already a member? <a onClick={() => setActiveTab('login')}>Login</a>
      </p>
    </form>
  );
};

export default LoginRegisterForm;