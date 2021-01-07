import './App.scss';
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Auth from "./components/Auth/Auth";

const login = true;
function App() {
    return (
        <div>
            <Header/>
            {login ? <Auth/> : <Main/>}
        </div>
    );
}

export default App;
