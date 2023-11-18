import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import colors from '../resources/colors';
import logo from "../resources/SymmetryLogo.png"

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
            justifyContent: "center",
            backgroundColor: colors.backgroundColor
        }}>
            <img
                style={{ margin: "20px 0", maxWidth: "20%", height: "auto"}}
                src={logo}
                alt="Logo" 
            />
            <h1 style={{color: "#FFFFFF" }}
            >Strategic Alignment for DevOps</h1>
            <input
                style={{
                    width: "30%",
                    padding: "20px",
                    borderRadius: "10px",
                }}
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                style={{
                    width: "30%",
                    marginTop: "10px",
                    marginBottom: "20px",
                    padding: "20px",
                    borderRadius: "10px",
                }}
                type="password"
                placeholder="Password"
            />
            <button 
                style={{
                    padding: "15px", // Added padding
                    borderRadius: "10px", // Added border radius
                }}
                onClick={handleStart}
            >
                Log in
            </button>
        </div>
    );
};

export default Home;
