import {useUser} from "../../UserProvider/UserProvider";
import {useState} from "react";
import ajax from "../../Service/FetchService";
import NavBar from "../NavBar/NavBar";
import {useNavigate} from "react-router-dom";

const UsersTasks = () => {

    const user = useUser();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const requestBody = {
        title: title,
        description: description,
        priority: priority,
        startDate: startDate,
        endDate: endDate
    }

    function createTask() {
        ajax('api/tasks', "POST", user.jwt, requestBody)
            .then((response) => {
                    navigate("/tasks/list")
            });
    }

    return (
        <main>
            <section className="tasks">
                <NavBar/>
                <article className="tasks-form">
                    <h1>Create task</h1>
                    <label form="title">Task Title</label>
                    <input
                        className="tasks-form-input-title"
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Task title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label form="description">Description</label>
                    <input
                        className="tasks-form-input-description"
                        type="text"
                        id="description"
                        name="description"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <label form="priority">Priority</label>
                    <select
                        className="tasks-form-input-priority"
                        id="priority"
                        name="priority"
                        placeholder="Priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="">Select Priority</option>
                        <option value="important">important</option>
                        <option value="average">average</option>
                        <option value="unimportant">unimportant</option>
                    </select>
                    <label form="startDate">Start Date Task</label>
                    <input
                        className="tasks-form-input-date"
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <label form="endDate">End Date Task</label>
                    <input
                        className="tasks-form-input-date"
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    <button
                        id="create-task"
                        type="button"
                        onClick={() => createTask()}
                    >
                        Create Task
                    </button>
                </article>
            </section>
        </main>
    )
}

export default UsersTasks;