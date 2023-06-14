import {useUser} from "../../UserProvider/UserProvider";
import {useEffect, useState} from "react";
import ajax from "../../Service/FetchService";
import NavBar from "../NavBar/NavBar";

const AdminUsers = () => {
    const user = useUser();
    const [users, setUsers] = useState("");

    useEffect(() => {
        ajax(`/api/users/admin`, "GET", user.jwt)
            .then(userData => {
                setUsers(userData);
            })

    }, [user.jwt])

    function refreshPage() {
        window.location.reload();
    }

    function deleteUser(id) {
        ajax(`/api/users/admin/${id}`, "DELETE", user.jwt)
            .then(() => {
                refreshPage()
            })
    }

    return (
        <section className="admin-users-container">
            <NavBar/>
            <h3 className="admin-users-container-title">List Users</h3>
            <hr/>
            <div className="admin-users-container-header">
                <table className="admin-users-table">
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                    {users ? (
                        <>
                            {users.map(user => (
                                <tr id={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td className="admin-users-table-buttons">
                                        <button className="delete-button"
                                                onClick={() => deleteUser(user.id)}
                                        >Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </>
                    ) : (
                        <></>
                    )}
                </table>
            </div>
        </section>
    )
}

export default AdminUsers;