import NavBar from "../NavBar/NavBar";

const Homepage = () => {

    return (
        <main className="homepage">
            <NavBar/>
            <h1 className="homepage-title">Welcome to your Task Manager!</h1>
            <h5 className="homepage-description">
                Welcome to your personal manager of your tasks, to use the application and navigate without having your
                schedule blocked, please log in with your account, if you do not have one please register to have
                access.
            </h5>
        </main>
    )
}

export default Homepage;