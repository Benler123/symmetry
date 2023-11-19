import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import colors from '../resources/colors';
import logo from "../resources/symLogo.svg"
import loginImage from "../resources/loginGuy.svg"
import Footer from '../components/footer';

const Home = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const handleStart = () => {
        if( username === 'msteele') {
            navigate('/manager');
        } else {
            navigate(`/profile?username=${username}`);
        }
    };

    return (
        <div style={{
            height: "100vh",
            display: 'flex',
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: colors.backgroundColor
        }}>
            <div style={{ width: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <img
                style={{margin: "20px 0", maxWidth: "15%", height: "auto"}}
                src={logo}
                alt="Logo" 
            />
            <img
                style={{ margin: "50px 0", maxWidth: "10%", height: "auto"}}
                src={loginImage}
                alt="Logo" 
            />
            <input
                style={{
                    width: "12%",
                    height:"0.6%",
                    padding: "20px",
                    borderRadius: "20px",
                    backgroundColor:"transparent",
                    border:"3px solid #FFFFFF",
                    color:"#FFFFFF",
                    fontWeight:"bold",
                    outline:"none",
                    marginBottom:"20px"
                }}
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                style={{
                    width: "12%",
                    marginTop: "10px",
                    height:"0.6%",
                    marginBottom: "20px",
                    padding: "20px",
                    borderRadius: "20px",
                    outline:"none",
                    backgroundColor:"transparent",
                    border:"3px solid #FFFFFF",
                    fontWeight:"bold",
                    color:"#FFFFFF"
                }}
                type="password"
                placeholder="Password"
            />
            <button 
                style={{
                    padding: "15px", // Added padding
                    borderRadius: "20px", // Added border radius
                    backgroundColor:"transparent",
                    border:"3px solid #FFFFFF",
                    color:"#FFFFFF",
                    fontWeight:"bold",
                    marginTop:"10px",
                }}
                onClick={handleStart}
            >
                Sign In
            </button>
            </div>
            <Footer /> {/* Place Footer component here */}
        </div>
    );
};

export default Home;
