import NavBar from "../NavBar/NavBar";
import {useUser} from "../../UserProvider/UserProvider";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ajax from "../../Service/FetchService";

const EditTask = () => {

    const user = useUser();
    const {taskId} = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState({
        title: "",
        description: "",
        priority: "",
        startDate: "",
        endDate: ""
    });

    useEffect(() => {
        ajax(`/api/tasks/${taskId}`, "GET", user.jwt)
            .then(responseTask => {
                setTask(responseTask);
            })
    }, [user.jwt]);

    function saveTask() {
        persist();
        navigate("/tasks/list");
    }

    function updateTask(prop, value) {
        const newTask = {...task}
        newTask[prop] = value;
        setTask(newTask);
    }

    function persist() {
        ajax(`/api/tasks/${taskId}`, "PUT", user.jwt, task)
            .then(taskData => {
                setTask(taskData);
            })
    }


    return (

        <main>
            <NavBar/>
            <section className="edit-task">
                {task ? (
                    <article className="edit-task-container">
                        <h5>Task for edit</h5>
                        <input
                            className="tasks-form-input-title"
                            onChange={(e) => updateTask("title", e.target.value)}
                            defaultValue={task.title}
                            name="title"
                            id="title"
                            type="text"
                        />
                        <input
                            className="tasks-form-input-description"
                            onChange={(e) => updateTask("description", e.target.value)}
                            defaultValue={task.description}
                            name="description"
                            id="description"
                            type="text"
                        />
                        <div className="edit-task-button">
                            <button
                                type="submit"
                                onClick={() => saveTask()}
                            >
                                Edit Task
                            </button>
                        </div>
                    </article>
                ) : (
                    <></>
                )}

            </section>
        </main>
    )
}

export default EditTask