import {useUser} from "../../UserProvider/UserProvider";
import {useEffect, useState} from "react";
import ajax from "../../Service/FetchService";
import NavBar from "../NavBar/NavBar";
import {CSVLink} from "react-csv";

const ExtractTasks = () => {

    const user = useUser();
    const [tasks, setTasks] = useState("");

    useEffect(() => {
        ajax(`/api/tasks/download`, "GET", user.jwt)
            .then(tasksData => {
                setTasks(tasksData);
            })

    }, [user.jwt])

    return(

        <section className="admin-users-container">
            <NavBar/>
            <h3 className="admin-users-container-title">List Users</h3>
            <hr/>
            <CSVLink data={tasks} >Export tasks</CSVLink>
            <div className="admin-users-container-header">
                <table className="admin-users-table">
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Priority</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                    </tr>
                    {tasks ? (
                        <>
                            {tasks.map(task => (
                                <tr id={task.id}>
                                    <td>{task.id}</td>
                                    <td>{task.title}</td>
                                    <td>{task.description}</td>
                                    <td>{task.priority}</td>
                                    <td>{task.startDateTask}</td>
                                    <td>{task.endDateTask}</td>
                                    <td className="admin-users-table-buttons">
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

export default ExtractTasks;