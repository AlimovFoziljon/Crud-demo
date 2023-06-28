import React from 'react';
import { useState } from 'react';
import CommentIcon from '@mui/icons-material/Comment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Button, Checkbox, Typography, Box } from '@mui/material';
import Modal from '@mui/material/Modal';

const Post = ({id, name, username, title, body, onDelete, comments, onEdit}) => {

    const [commentToggle, setCommentToggle] = useState(false)
    const [bookmarkToggle, setBookmarkToggle] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [checked, setChecked] = useState(false)
    const handleDeleteOpen = () => setDeleteOpen(true);
    const handleEditOpen = () => setEditOpen(true);
    const handleDeleteClose = () => setDeleteOpen(false);
    const handleEditClose = () => setEditOpen(false);

    const handleDelete = () => {
        onDelete(id);
    }

    const handleEdit = () => {
        onEdit(id)
    }

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
        <div className="wrapper-item">
            <Typography variant="h4">{name}</Typography>
            <Typography variant="h5">{username}</Typography>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="h6">{body}</Typography>
        <div className="post-funcs">
            <Button
            onClick={() => {
                setCommentToggle(!commentToggle)
            }}
            sx={{
                color: commentToggle && '#fff',
                backgroundColor: commentToggle && '#1976d2',
                "&:hover": {backgroundColor: "#1976d2", color: '#fff' }
            }} variant={"outlined"}>
            <CommentIcon />
            </Button>
            <Button onClick={handleEditOpen} sx={{
                "&:hover": {
                    backgroundColor: "#ed6c02",
                    color: '#fff'
                }
            }} variant="outlined" color="warning">
            <EditIcon />
            </Button>
            <Button
            onClick={handleDeleteOpen}
            variant="outlined"
            sx={{
                color: "red",
                borderColor: "red",
                opacity: 0.7,
                "&:hover": {
                borderColor: "red",
                backgroundColor: 'red',
                color: '#fff',
                opacity: 1,
                },
            }}
            >
            <DeleteIcon />
            </Button>
            <Button onClick={() => setBookmarkToggle(!bookmarkToggle)} sx={{
                color: bookmarkToggle && '#fff',
                backgroundColor: bookmarkToggle && '#9c27b0',
                '&:hover':{
                    color: '#fff',
                    backgroundColor: '#9c27b0'
                }
            }} variant="outlined" color="secondary">
            <BookmarkBorderIcon />
            </Button>
            <Checkbox value={id} onChange={(e) => {
                setChecked(!checked)
                console.log(checked)
            }} color="primary" size="lg" variant="solid" checked={checked ? true : false}/>
        </div>
        <Modal
        open={deleteOpen}
        onClose={handleDeleteClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
            <Typography margin={'10px 0'} id="modal-modal-title" variant="h5">
                Do yo really want to delete this post?
            </Typography>
            <Button
            onClick={handleDelete}
            variant='contained'
            sx={{
                color: "#fff",
                opacity: 0.7,
                backgroundColor: 'red',
                "&:hover": {
                opacity: 1,
                backgroundColor: 'red'
                },
            }}
            >Delete</Button>
            </Box>
        </Modal>
        <Modal
        open={editOpen}
        onClose={handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
            <Typography margin={'10px 0'} id="modal-modal-title" variant="h5">
                Edit post
            </Typography>
            <input className='edit-input' type="text" placeholder='title'/>
            <Button onClick={handleEdit} variant='contained' color='warning' sx={{
                color: "#fff",
                opacity: 0.7,
                backgroundColor: '#ed6c02',
                "&:hover": {
                opacity: 1,
                backgroundColor: '#ed6c02'
                },
            }}>
                Edit
            </Button>
            </Box>
        </Modal>
        <div style={{
            display: commentToggle && 'flex'
        }} className="comments">
            {comments.map((e) => (
                <div key={e.id} className="comment">
                    <Typography variant='subtitle1'>Name: {e.name}</Typography>
                    <Typography variant='subtitle2'>Email: {e.email}</Typography>
                    <Typography variant='subtitle2'>Comment: {e.body}</Typography>
                </div>
            ))}
        </div>
        </div>
    )
}   

export default Post;
