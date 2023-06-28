import { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";
import { Button, Typography } from "@mui/material";
import Album from "./Album";

const Albums = () => {
    const [limit, setLimit] = useLocalStorage('limits', 10)
    const [album, setAlbum] = useState([])
    const [sortValue, setSortValue] = useLocalStorage('sort', '')

    const sortOptions = ['id', 'title']

    useEffect(() => {
        fetchData()
    }, [limit])

    const sortData = async (e) => {
        let value = e.target.value
        setSortValue(value)
        await fetch(`https://jsonplaceholder.typicode.com/albums?_limit=${limit}&_sort=${value}&_order=asc`)
        .then((res) => res.json())
        .then((data) => {
            setAlbum(data)
            // console.log(data);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const fetchData = async () => {
        await fetch(`https://jsonplaceholder.typicode.com/albums?_limit=${limit}&_sort=${sortValue}&_order=asc`)
        .then((res) => res.json())
        .then((data) => {
            setAlbum(data)
            console.log(data);  
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const onDelete = async (id) => {
        await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
            method: "DELETE",
            })
            .then((res) => {
                if (res.status !== 200) {
                return;
                } else {
                setAlbum(
                        album.filter((e) => {
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
            await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
                method: "PUT",
                headers: {"content-type":"application/json"},
                body: JSON.stringify(
                    {
                        title: title,
                    }
                )
            })
            .then((res) => res.json())
            .then((data) => console.log(data))
        }
    return (
        <div className="wrapper">
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
                {album.map(e => (
                        <Album
                            key={e.id}
                            id={e.id}
                            title={e.title}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />
                    ))} 
            </div>
        </div>
    );
}

export default Albums;