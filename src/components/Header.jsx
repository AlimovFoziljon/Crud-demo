import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <Typography variant="subtitle1"><NavLink className={({isActive}) => isActive ? 'active-link' : ''} to={'/'}>Posts</NavLink></Typography>
            <Typography variant="subtitle1"><NavLink className={({isActive}) => isActive ? 'active-link' : ''} to={'/albums'}>Albums</NavLink></Typography>
            <Typography variant="subtitle1"><NavLink className={({isActive}) => isActive ? 'active-link' : ''} to={'/todos'}>Todos</NavLink></Typography>
        </header>
    );
}

export default Header;