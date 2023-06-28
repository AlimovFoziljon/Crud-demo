import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Modal, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";


const AlbumsView = () => {
    const [photo, setPhoto] = useState([])
    const [modalOpen, setModalOpen] = useState(false);
    const {id} = useParams()

    useEffect(() => {
        const fetchData=  async () => {
            await fetch(`https://jsonplaceholder.typicode.com/albums/${id}/photos?_limit=10`)
                .then((res) => res.json())
                .then((data) => {
                    setPhoto(data)
                    console.log();
                })
        }
        fetchData()
    }, [])

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handleModalClose = () => setModalOpen(false);
    const handleModalOpen = () => {
        setModalOpen(true);
    }

    return (
        <div className="wrapper">
            <Button variant="contained"><Link style={{textDecoration: 'none', color: '#fff'}} to={'/albums'}>To back</Link></Button>
            <div className="wrapper-items">
                {photo.map((e) => (
                    <Card onClick={handleModalOpen} key={e.id} sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image={e.thumbnailUrl}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                            {e.title}
                            </Typography>
                        </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </div>
            <Modal
            open={modalOpen}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
            <CardMedia
                component="img"
                height="600"
                image={photo[id]?.url}
            />
            </Box>
        </Modal>
        </div>
    );
}

export default AlbumsView;