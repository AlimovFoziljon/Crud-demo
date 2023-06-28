import { Button } from "@mui/material";

const AddPost = ({ onAdd }) => {

    const handleOnSubmit = (e) => {
        e.preventDefault();
        onAdd(e.target.body.value, e.target.title.value);
        e.target.title.value = "";
        e.target.body.value = "";
    }
    

    return (
        <div className="add-post">
            <form onSubmit={handleOnSubmit}>
                <input placeholder="Title" name="title" />
                <input placeholder="Body" name="body" />
                <Button type="submit" variant="contained" onSubmit={handleOnSubmit}>Add</Button>
            </form>
        </div>
    );
}

export default AddPost;