import { useEffect, useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import useLocalStorage from "use-local-storage";
import Post from "./Post";
import AddPost from "./AddPost";


const Posts = () => {
    const [post, setPost] = useState([])
    const [user, setUser] = useState([])
    const [comment, setComment] = useState([])
    const [limit, setLimit] = useLocalStorage('limits', 10)
    const [sortValue, setSortValue] = useLocalStorage('sort', '')
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const sortOptions = ['title', 'id', 'body']

    useEffect(() => {
        fetchData()
    }, [limit])

    const fetchData = async () => {
        await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_sort=${sortValue}&_order=asc`)
        .then((res) => res.json())
        .then((data) => {
            setPost(data)
            console.log(data);  
        })
        .catch((err) => {
            console.log(err);
        })

        fetch(`https://jsonplaceholder.typicode.com/users`)
        .then((res) => res.json())
        .then((data) => {
            setUser(data)
            // console.log(data);
        })

        fetch(`https://jsonplaceholder.typicode.com/comments?_limit=10`)
        .then((res) => res.json())
        .then((data) => {
            setComment(data)
            // console.log(data);
        })
    }

    const sortData = async (e) => {
        let value = e.target.value
        setSortValue(value)
        await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_sort=${value}&_order=asc`)
        .then((res) => res.json())
        .then((data) => {
            setPost(data)
            // console.log(data);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    const onDelete = async (id) => {
        await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: "DELETE",
            })
            .then((res) => {
                if (res.status !== 200) {
                return;
                } else {
                setPost(
                        post.filter((e) => {
                        return e.id !== id;
                    })
                );
                }
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

    const onAdd = async (body, title) => {
        await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
            title: title,
            body: body,
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
            setPost((post) => [...post, data]);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    const onEdit = async (id, title, body) => {
        await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: "PUT",
            headers: {"content-type":"application/json"},
            body: JSON.stringify(
                {
                    title: title,
                    body: body
                }
            )
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
    }
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
            </div>
            <div className="wrapper-items">
                {post.map(e => (
                    <Post 
                        id={e.id}
                        key={e.id}
                        name={user[e?.userId]?.name}
                        username={user[e?.userId]?.username}
                        title={e.title}
                        body={e.body}
                        onDelete={onDelete}
                        comments={comment}
                        onEdit={onEdit}
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
                        Add a new post
                    </Typography>
                    <AddPost onAdd={onAdd} />
                </Box>
            </Modal>
        </div>
    );
}

export default Posts;