import './App.css';
import {Route, Routes} from "react-router-dom";
import {useUser} from "./UserProvider/UserProvider";
import {useEffect, useState} from "react";
import jwt_decode from 'jwt-decode'
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Homepage from "./components/Homepage/Homepage";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import UsersTasks from "./components/UsersTasks/UsersTasks";
import TaskManagement from "./components/TaksManagement/TaskManagement";
import EditTask from "./components/EditTask/EditTask";
import AdminUsers from "./components/Users/AdminUsers";
import UserDetails from "./components/UserDetails/UserDetails";
import ExtractTasks from "./components/TaksManagement/ExtractTasks";

function App() {

    const user = useUser();
    const [roles, setRoles] = useState(getRolesFromJWT());
    useEffect(() => {
        setRoles(getRolesFromJWT())
    }, [user.jwt])

    function getRolesFromJWT() {
        if (user.jwt) {
            const decodeJwt = jwt_decode(user.jwt);
            return decodeJwt.authorities;
        }
        return [];
    }

    return (
        <Routes>
            <Route path="/tasks" element={
                roles.find((role) => role === 'user') ? (
                    <PrivateRoute>
                        <UsersTasks/>
                    </PrivateRoute>
                ) : (
                    <main>За да видите ваши задачи, моля влезте във Вашия акаунт</main>
                )
            }>
            </Route>
            <Route path="/" element={<Homepage/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/tasks/list" element={<TaskManagement/>}></Route>
            <Route path="/tasks/:taskId" element={<EditTask/>}></Route>
            <Route path="/users"
                   element={
                       roles.find((role) => role === 'admin')
                           ?
                           <PrivateRoute>
                               <AdminUsers/>
                           </PrivateRoute>
                           :
                           <PrivateRoute>
                               <UserDetails/>
                           </PrivateRoute>
                   }
            />
            <Route path="/tasks/download" element={<ExtractTasks/>}></Route>
        </Routes>
    );
}

export default App;
