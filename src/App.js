import * as React from "react";
import {
    createBrowserRouter, Link, Outlet,
    RouterProvider,
} from "react-router-dom";
import {useState, useEffect, createContext, useContext} from "react";

const AppContext = createContext();


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
                    <Character id={character.id} name={character.name} imageUri={character.image} />
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

function Favorites() {
    return (
        <div>
            <SearchBar />
            <FavoriteCharacters />
        </div>
    );
}

function FavoriteCharacters() {
    const [favoriteCharacters, setFavoriteCharacters] = useState([]);
    const { favorites, setFavorites} = useContext(AppContext);

    const apiUrl = "https://rickandmortyapi.com/api/character/" + favorites.join(",");
    console.log(apiUrl)

    useEffect(() => {
        fetch(apiUrl, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setFavoriteCharacters(data)
                } else {
                    const updatedFavoriteCharacters = [data];
                    setFavoriteCharacters(updatedFavoriteCharacters);
                }
            })
            .catch((error) => console.log(error));
    }, []);


    return (
        <div>
            {favoriteCharacters ? (
                favoriteCharacters.map((character) => (
                    <Character id={character.id} name={character.name} imageUri={character.image} />
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}



function Character({ id, name, imageUri: imgUri}) {
    const { favorites, setFavorites} = useContext(AppContext);

    const isFavorite = favorites.includes(id);

    const handleCheckboxChange = () => {
        if (isFavorite) {
            // Remove the character from favorites
            const updatedFavorites = favorites.filter(favorite => favorite !== id);
            setFavorites(updatedFavorites);
        } else {
            // Add the character to favorites
            const updatedFavorites = [...favorites, id];
            setFavorites(updatedFavorites);
        }
    };

    return (
        <div>
            <img src={imgUri} alt="Character"/>
            <p>{name}</p>
            <form>
                <input
                    type="checkbox"
                    checked={isFavorite}
                    onChange={handleCheckboxChange}
                />
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

            {tip ? (
                <p>{tip}</p>)
             : (
                <p>Loading...</p>
            )}
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
                element: <Favorites />,
            },
        ],
    },
])

export default function App() {
    const [favorites, setFavorites] = useState([1]);

    return (
        <AppContext.Provider value={{ favorites: favorites, setFavorites: setFavorites }}>
            <RouterProvider router={router} />
        </AppContext.Provider>
    );
};
