import {useUser} from "../../UserProvider/UserProvider";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Form} from "react-bootstrap";
import NavBar from "../NavBar/NavBar";

const Login = () => {
    const user = useUser();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    useEffect(() => {
        if (user.jwt) navigate("/tasks/list")
    }, [navigate, user]);


    // const  baseUrl = require('dotenv').config(process.env.REACT_APP_BASE_URL);
    function sendLoginRequest() {
        const requestBody = {
            "username": username,
            "password": password,
        };
        fetch(`api/auth/login`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody)
        })
            .then((response) => {
                if (response.status === 200)
                    return Promise.all([response.json(), response.headers])
                else return Promise.reject("Invalid login attempt")
            })
            .then(([body, headers]) => {
                user.setJwt(headers.get("Authorization"))
            }).catch((message) => {
            alert(message)
        });
    }


    return (
        <main className="login">
            <NavBar/>
            <section
                className="login-container"
                id="login-users"
            >
                <article className="login-container-items">
                    <div className="login-container-item"
                    >
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label className="login-container-item">Username</Form.Label>
                            <Form.Control
                                className="input-user"
                                type="text"
                                placeholder="John Doe"
                                size="lg"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>
                    </div>
                </article>
                <article className="login-container-items">
                    <div className="login-container-item"
                    >
                        <Form.Group className="login-container-item" controlId="password">
                            <Form.Label className="fs-4">Password</Form.Label>
                            <Form.Control
                                className="input-user"
                                type="password"
                                placeholder="Password"
                                size="lg"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                    </div>
                </article>
                <article className="login-container-items">
                    <div className="login-container-item-buttons"
                    >
                        <button
                            id="submit"
                            type="button"

                            onClick={() => sendLoginRequest()}
                        >
                            Login
                        </button>
                        <button
                            id="submit"
                            type="button"
                            onClick={() => {
                                navigate("/register")
                            }}
                        >
                            Register
                        </button>
                    </div>
                </article>
            </section>
        </main>
    );
}

export default Login;