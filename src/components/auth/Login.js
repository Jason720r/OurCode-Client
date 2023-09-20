import React, { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../../managers/AuthManager"
import logo from './NexaDev.png';
import ButtonComponent from "../ButtonComponent.js";
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
                    <form className="form--login" onSubmit={handleLogin}>
                        <img src={logo} alt="NexaDev" className="login-logo" />




                        <fieldset>
                            <label htmlFor="inputUsername"> Username </label>
                            <input ref={username} type="username" id="username" className="form-control" placeholder="Username" required autoFocus />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="inputPassword"> Password </label>
                            <input ref={password} type="password" id="password" className="form-control" placeholder="Password" required />
                        </fieldset>
                        <fieldset style={{
                            textAlign: "center"
                        }}>
                            <ButtonComponent label="Sign In" variant="primary" type="submit" />
                        </fieldset>
                    </form>
                </section>
                <section className="link--register">
                    <Link to="/register">Not a member yet?</Link>
                </section>
            </main></>
    )
}
