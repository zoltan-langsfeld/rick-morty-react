import * as React from "react";
import {
    createBrowserRouter, Link, Outlet,
    RouterProvider,
} from "react-router-dom";


function Album() {
    return (
        <div>
            <SearchBar />
            <Characters characters={CHARACTERS} />
        </div>
    );
}

function Characters({ characters }) {
    return (
        <div>
            {characters.map((character) => (
                <Character name={character.name} imageUri={character.imageUri} />
            ))}
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

function Tip({ tipOfTheDay }) {
    return (
        <div>
            <p>{tipOfTheDay}</p>
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

const TIPOFTHEDAY = "Don't promise what you can't deliver."
const CHARACTERS = [{ name: "Glasses Morty", imageUri: "https://rickandmortyapi.com/api/character/avatar/143.jpeg" },
    { name: "Visor Rick", imageUri: "https://rickandmortyapi.com/api/character/avatar/487.jpeg" }]


const router = createBrowserRouter([
    {
        path: '/',
        element: <PageLayout />,
        children: [
            {
                path: '/',
                element: <Tip tipOfTheDay={TIPOFTHEDAY}/>,
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
