import { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";
import { Box, Button, Modal, Typography } from "@mui/material";
import Todo from "./Todo";
import AddTodo from "./AddTodo";

const Todos = () => {
    const [limit, setLimit] = useLocalStorage('limits', 10)
    const [sortValue, setSortValue] = useLocalStorage('sort', '')
    const [todo, setTodo] = useState([])
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const sortOptions = ['completed', 'title']

    useEffect(() => {
        fetchData()
    }, [limit])

    const sortData = async (e) => {
        let value = e.target.value
        setSortValue(value)
        await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}&_sort=${value}&_order=asc`)
        .then((res) => res.json())
        .then((data) => {
            setTodo(data)
            // console.log(data);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const fetchData = async () => {
        await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}&_sort=${sortValue}&_order=asc`)
        .then((res) => res.json())
        .then((data) => {
            setTodo(data)
            console.log(data);  
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
    const onDelete = async (id) => {
        await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: "DELETE",
            })
            .then((res) => {
                if (res.status !== 200) {
                return;
                } else {
                setTodo(
                        todo.filter((e) => {
                        return e.id !== id;
                    })
                );
                }
            })
            .catch((err) => {
                console.log(err);
            });
        };

    const onEdit = async (id, title) => {
            await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: "PUT",
                headers: {"content-type":"application/json"},
                body: JSON.stringify({title})
            })
            .then((res) => res.json())
            .then((data) => console.log(data), fetchData())
        }

        const onAdd = async (title) => {
            await fetch("https://jsonplaceholder.typicode.com/todos", {
            method: "POST",
            body: JSON.stringify({
                title: title
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            })
            .then((res) => {
                if (res.status !== 201) {
                return;
                } else {
                return res.json();
                }
            })
            .then((data) => {
                setTodo((todo) => [...todo, data]);
            })
            .catch((err) => {
                console.log(err);
            });
        };
        
        const modalStyle = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
        };
    return (
        <div className="wrapper">
            <div className="new-sort">
                <div className="sort">
                    <Typography variant="h5">Sort by:</Typography>
                    <select 
                    value={sortValue}
                    onChange={sortData}
                    >
                        <option>Please Select Value</option>
                        {sortOptions.map((e, i) => (
                            <option value={e} key={i}>{e}</option>
                        ))}
                    </select>
                </div>
                <Button onClick={handleOpen} variant="contained">New Post</Button>
            </div>
            <div className="limit-btns">
                <Button onClick={() => {
                    setLimit(10)
                }} variant="contained">10</Button>
                <Button onClick={() => {
                    setLimit(20)
                }} variant="contained">20</Button>
                <Button onClick={() => {
                    setLimit(50)
                }} variant="contained">50</Button>
                <Button onClick={() =>  {
                    setLimit(100)
                }} variant="contained">100</Button>
                <Button onClick={() =>  {
                    setLimit(200)
                }} variant="contained">200</Button>
            </div>
            <div className="wrapper-items">
                {todo.map((e) => (
                    <Todo
                        key={e.id}
                        title={e.title}
                        id={e.id}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        completed={e.completed}
                    />
                ))}
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={modalStyle}>
                    <Typography margin={'10px 0'} id="modal-modal-title" variant="h5">
                        Add a new todo
                    </Typography>
                    <AddTodo onAdd={onAdd} />
                </Box>
            </Modal>
        </div>
    );
}

export default Todos;