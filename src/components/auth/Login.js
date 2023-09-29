import React, { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../../managers/AuthManager"
import logo from './NexaDev.png';
import ButtonComponent from "../ButtonComponent.js";
import { GoogleLogin } from 'react-google-login';
import '../../index.css';

import "./Auth.css"


export const Login = () => {
    const username = useRef()
    const password = useRef()
    const invalidDialog = useRef()
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        const user = {
            username: username.current.value,
            password: password.current.value
        }
        loginUser(user)
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    localStorage.setItem("lu_token", res.token)
                    navigate("/posts")
                }
                else {
                    invalidDialog.current.showModal()
                }
            })
    }
    const responseGoogle = async (response) => {
        if (!response.tokenId) {
            console.error("Google response:", response);
            return;
        }
    
        const token = response.tokenId;  // Google's token
    
        const res = await fetch("http://localhost:8000/google-login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({token: token}),
        });
    
        if (!res.ok) {
            console.error("Error from backend while trying to authenticate with Google", await res.text());
            return;
        }
    
        const data = await res.json();
        if (data && data.token) {
            // Use data.token (your Django token) for further authenticated requests
            localStorage.setItem("your_django_token_key", data.token);
        } else {
            console.error("Error logging in with Google");
        }
    }
    
    
    
    

    return (
        <><div class="background">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div><main className="container--login">
                <dialog className="dialog dialog--auth" ref={invalidDialog}>
                    <div>Username or password was not valid.</div>
                    <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
                </dialog>
                <section>
                    <form id="myLoginForm" className="form--login" onSubmit={handleLogin}>
                        <img src={logo} alt="NexaDev" className="login-logo" />
                        <fieldset style={{ textAlign: "center", marginTop: "10px" }}>
                        
                        <GoogleLogin
                        clientId="807043030534-ssqlb6rge701v7aisge3n2uj8lqs42k3.apps.googleusercontent.com" // You'll get this from Google Developer Console
                        buttonText="Sign in with Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                        <div className="d-flex align-items-center my-3">
                    <hr className="flex-grow-1 border-dark"/>
                    <div className="px-3 text-center font-weight-bold text-uppercase h5">Or</div>
                    <hr className="flex-grow-1 border-dark"/>
                    </div>


                        <fieldset>
                            <label htmlFor="inputUsername">  </label>
                            <input ref={username} type="username" id="username" className="form-control" placeholder="Username" required autoFocus />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="inputPassword">  </label>
                            <input ref={password} type="password" id="password" className="form-control" placeholder="Password" required />
                        </fieldset>
                        <fieldset style={{
                            textAlign: "center"
                        }}>
                            <ButtonComponent label="Sign In" className="btn-dark purple" type="submit" />
                        </fieldset>

                    
                <section className="link--register">
                    <div>Don't have an account? <Link className="btn-purple-text" to="/register">Sign Up</Link></div>
                </section>
                </fieldset>
                    </form>
                </section>
            </main></>
    )
}
