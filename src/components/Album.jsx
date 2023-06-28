import React from 'react';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Button, Checkbox, Typography, Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import {useNavigate } from 'react-router-dom';


const Album = ({id, onDelete, onEdit, title}) => {
    const navigate = useNavigate()
    const [bookmarkToggle, setBookmarkToggle] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [checked, setChecked] = useState(false)
    const handleDeleteOpen = () => setDeleteOpen(true);
    const handleEditOpen = () => setEditOpen(true);
    const handleDeleteClose = () => setDeleteOpen(false);
    const handleEditClose = () => setEditOpen(false);

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

    const handleDelete = () => {
        onDelete(id);
    }

    const handleEdit = () => {
        onEdit(id)
    }


    const navigateTo = () => navigate(`/albumsview/${id}`)

    return (
        <div className="wrapper-item">
        <Typography sx={{
            textDecoration: 'underline',
            cursor: 'pointer',
            transition: 'all .3s',
            '&:hover': {
                color: '#1976d2'
            }
        }} onClick={navigateTo} variant="h6">{title}</Typography>
        <div className="post-funcs">
            <Button
            onClick={handleEditOpen}
            sx={{
                "&:hover": {
                backgroundColor: "#ed6c02",
                color: "#fff",
                },
            }}
            variant="outlined"
            color="warning"
            >
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
                backgroundColor: "red",
                color: "#fff",
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
            <Checkbox
            value={id}
            onChange={(e) => {
                setChecked(!checked);
                console.log(checked);
            }}
            color="primary"
            size="lg"
            variant="solid"
            checked={checked ? true : false}
            />
        </div>
        <Modal
            open={deleteOpen}
            onClose={handleDeleteClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
            <Typography margin={"10px 0"} id="modal-modal-title" variant="h5">
                Do yo really want to delete this album?
            </Typography>
            <Button
                onClick={handleDelete}
                variant="contained"
                sx={{
                color: "#fff",
                opacity: 0.7,
                backgroundColor: "red",
                "&:hover": {
                    opacity: 1,
                    backgroundColor: "red",
                },
                }}
            >
                Delete
            </Button>
            </Box>
        </Modal>
        <Modal
            open={editOpen}
            onClose={handleEditClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
            <Typography margin={"10px 0"} id="modal-modal-title" variant="h5">
                Edit Album
            </Typography>
            <input className='edit-input' type="text" placeholder='title'/>
            <Button
                onClick={handleEdit}
                variant="contained"
                color="warning"
                sx={{
                color: "#fff",
                opacity: 0.7,
                backgroundColor: "#ed6c02",
                "&:hover": {
                    opacity: 1,
                    backgroundColor: "#ed6c02",
                },
                }}
            >
                Edit
            </Button>
            </Box>
        </Modal>
        </div>
    );
};

export default Album;
