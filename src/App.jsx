import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Posts from "./components/Posts";
import './styles/App.css'
import Albums from "./components/Albums";
import AlbumsView from "./components/AlbumsView";
import Todos from "./components/Todos";

const App = () => {

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/albumsview/:id" element={<AlbumsView />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
    </div>
  );
}

export default App;
