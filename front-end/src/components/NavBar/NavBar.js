import {useUser} from "../../UserProvider/UserProvider";
import {useEffect, useState} from "react";
import jwt_decode from "jwt-decode";

const NavBar = () => {

    const user = useUser();
    const [authorities, setAuthorities] = useState(null);

    useEffect(() => {
        if (user && user.jwt) {
            const decodeJwt = jwt_decode(user.jwt);
            setAuthorities(decodeJwt.authorities);
        }
    }, [user]);

    return(
        <section className="nav">
            <article className="nav-home">
                <a href="/">Task Manager</a>
            </article>
            <div>
                {user && user.jwt ? (
                    <button
                        className="nav-button"
                        onClick={() => {
                            user.setJwt(null);
                            window.location.href = "/";
                        }}
                    >
                        Logout
                    </button>
                ) : window.location.href !== "/login" ? (
                    <button
                        className="nav-button"
                        onClick={() => {
                            window.location.href = "/login";
                        }}
                    >
                        Login
                    </button>
                ) : (
                    <></>
                )}
                {user && user.jwt ? (
                    <button
                        className="nav-button"
                        onClick={() => {
                            window.location.href = "/tasks";
                        }}
                    >
                        Create Task
                    </button>
                ) : (
                    <></>
                )}
                {user && user.jwt ? (
                    <button
                        className="nav-button"
                        onClick={() => {
                            window.location.href = "/tasks/list";
                        }}
                    >
                        My Tasks
                    </button>
                ) : (
                    <></>
                )}
                {user && user.jwt ? (
                    <button
                        className="nav-button"
                        onClick={() => {
                            window.location.href = "/users";
                        }}
                    >
                        User Details
                    </button>
                ) : (
                    <></>
                )}
            </div>
        </section>
    )
}

export default NavBar;