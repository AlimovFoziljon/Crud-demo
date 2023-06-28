import { Button } from "@mui/material";

const AddTodo = ({ onAdd }) => {

    const handleOnSubmit = (e) => {
        e.preventDefault();
        onAdd(e.target.title.value);
        e.target.title.value = "";
    }

    return (
        <div className="add-post">
            <form onSubmit={handleOnSubmit}>
                <input placeholder="Title" name="title" />
                <Button type="submit" variant="contained" onSubmit={handleOnSubmit}>Add</Button>
            </form>
        </div>
    );
}

export default AddTodo;