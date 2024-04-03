import * as React from "react";
import {
    createBrowserRouter, Link, Outlet,
    RouterProvider,
} from "react-router-dom";
import {useState, useEffect} from "react";


function Album() {
    return (
        <div>
            <SearchBar />
            <Characters />
        </div>
    );
}

function Characters() {
    const [characters, setCharacters] = useState(null);
    useEffect(() => {
        fetch("https://rickandmortyapi.com/api/character", {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                setCharacters(data.results);
            })
            .catch((error) => console.log(error));
    }, []);


    return (
        <div>
            {characters ? (
                characters.map((character) => (
                    <Character name={character.name} imageUri={character.image} />
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

function Character({ name, imageUri: imgUri}) {
    return (
        <div>
            <img src={imgUri} alt="Character"/>
            <p>{name}</p>
            <form>
                <input type="checkbox" />
            </form>
        </div>
    );
}

function SearchBar() {
    return (
        <form>
            <input type="text" placeholder="Search..." />
        </form>
    );
}

function Tip() {
    const [tip, setTip] = useState(null);
    useEffect(() => {
        fetch("https://api.adviceslip.com/advice", {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                setTip(data.slip.advice);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div>
            <p>{tip}</p>
        </div>
    )
}

function PageLayout() {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}

const Header = () => {
    return (
        <div className='navbar'>
            <Link to='/'>
                <h1>Home</h1>
            </Link>
            <Link to={'/album'}>
                <h1>Album</h1>
            </Link>
            <Link to={'/favorites'}>
                <h1>Favorites</h1>
            </Link>
        </div>
    )
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <PageLayout />,
        children: [
            {
                path: '/',
                element: <Tip/>,
            },
            {
                path: '/album',
                element: <Album />,
            },
            {
                path: '/favorites',
                element: <Album />,
            },
        ],
    },
])

export default function App() {
    return <RouterProvider router={router} />;
};
