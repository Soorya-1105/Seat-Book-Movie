import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [userDeatils, setUserDetails] = useState([{name: "Soorya", password: "Soorya@1105"},{name: "Coder", password: "Coder@2023"}])
    const navigate = useNavigate();
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
    const userNameRef = useRef();
    const passwordRef = useRef();
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        userNameRef.current.focus()
    },[])

    const handleLogin = () => {
        // Empty field validations
        if (!username.trim() || !password.trim()) {
            setError('Please enter both username and password.');
            return;
        }
        let indexForUsername = userDeatils.findIndex((user) => user.name === username)
        if(indexForUsername < 0) {
            setError(
                `User doesn't exist`
            );
            return;
        }
        // Password validation
        //8 Characters --- One capital --- One small --- one number
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            setError(
                'Invalid password'
            );
            return;
        }
        let indexForUserPass = userDeatils.findIndex((user) => (user.name === username && user.password === password))
        if(indexForUserPass < 0) {
            setError(
                'Invalid password'
            );
            return;
        }
        setLoader(true)
        setTimeout(() => {
            setLoader(false)
            navigate('/seat-booking');
        }, 2000);
    };

    const handlePasswordVisibility = () => {
        if (password && type==='password'){
           setIcon(eye);
           setType('text')
        } else {
           setIcon(eyeOff)
           setType('password')
        }
    }

    const onEnterKeyDown = (e) => {
        if(e.keyCode === 13) {
            if(username) {
                passwordRef.current.focus();
            }
            else {
                setError('Enter Username')
            }
        }
    }

    return (
        <div>
            <div className = "login-header-content">ABC CINEMAS</div>
            <div className = "login-textBox-main-div">
                <div className = "login-content-text">Login to your account</div>
                <div className = "input-box-field">
                    <label className = "input-label">Username</label>
                    <input ref = {userNameRef} className = "login-input-box" type="text" value={username} onKeyDown = {(e) => {onEnterKeyDown(e)} } onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className = "input-box-field">
                    <label className = "input-label">Password</label>
                    <div>
                        <input ref = {passwordRef} className = "login-input-box" type={type} value={password} onKeyDown = {(e) => {e.keyCode === 13 && handleLogin()}} onChange={(e) => setPassword(e.target.value)}/>
                        <Icon class="absolute mr-10 eye-icon" icon={icon} size={18} onClick = {handlePasswordVisibility}/>
                    </div>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button className = "login-btn" onClick={handleLogin}>
                    {loader ? 
                        <div className="loader"></div> : 
                        "Login"}</button>
            </div>
        </div>
    );
};

export default LoginScreen;
