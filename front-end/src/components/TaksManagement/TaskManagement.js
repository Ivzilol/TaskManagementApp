import {useUser} from "../../UserProvider/UserProvider";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import ajax from "../../Service/FetchService";
import NavBar from "../NavBar/NavBar";


const TaskManagement = () => {
    const user = useUser();
    const [tasks, setTasks] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        ajax(`/api/tasks/list`, "GET", user.jwt)
            .then(tasksData => {
                setTasks(tasksData)
            });
    },[user.jwt])

    function finishTask(id) {
        ajax(`/api/tasks/${id}`, "DELETE", user.jwt)
            .then(() => {
                refreshPage();
            });
    }

    function refreshPage() {
        window.location.reload();
    }

    // function getAllTask() {
    //     ajax('/api/tasks/download', "GET", user.jwt)
    //         .then(() => {
    //
    //         })
    // }


    return (
        <main className="tasks">
            <NavBar/>
            {tasks ? (
                <article className="tasks-container">
                    {tasks.map((task) => (
                        <div
                            className="tasks-container-items"
                            key={task.id}
                            id={task.id}
                        >
                            <h2 className="tasks-container-item"
                            > Task Title
                            </h2>
                            <h2>{task.title}</h2>
                            <p className="tasks-container-item"
                            > Task priority
                            </p>
                            <p>{task.priority}</p>
                            <p className="tasks-container-item"
                            >Task description
                            </p>
                            <p>{task.description}</p>
                            <p className="tasks-container-item"
                            >Start date
                            </p>
                            <p>{task.startDateTask}</p>
                            <p className="tasks-container-item"
                            >End date
                            </p>
                            <p>{task.endDateTask}</p>
                            <div className="tasks-container-item-button">
                                <button
                                    id="submit"
                                    type="button"
                                    onClick={() => {
                                        window.location.href = `/tasks/${task.id}`
                                    }}
                                >
                                    Edit Task
                                </button>
                                <button
                                    id="submit"
                                    type="button"
                                    onClick={() => finishTask(task.id)}
                                >
                                    Finish Task
                                </button>


                            </div>
                        </div>
                    ))}
                    <button
                        id="submit"
                        type="button"
                        onClick={() => {
                            window.location.href = "/tasks/download";
                        }}
                    >
                        Download Task
                    </button>
                </article>
            ) : (
                <article className="tasks-no-tasks">No have eny tasks</article>
            )}
        </main>
    )
}

export default TaskManagement;