import * as React from "react";
import {
    createBrowserRouter, Link, Outlet,
    RouterProvider,
} from "react-router-dom";
import {useState, useEffect, createContext, useContext} from "react";

const AppContext = createContext();


function Album() {
    const [filterText, setFilterText] = useState("");

    return (
        <div>
            <SearchBar filterText={filterText} onFilterTextChange={setFilterText} />
            <Characters filterText={filterText}/>
        </div>
    );
}

function Characters({filterText}) {
    const url = filterText? "https://rickandmortyapi.com/api/character?name=" + filterText : "https://rickandmortyapi.com/api/character";
    console.log(url)

    const [characters, setCharacters] = useState(null);
    useEffect(() => {
        fetch(url, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                setCharacters(data.results);
            })
            .catch((error) => console.log(error));
    }, [filterText]);


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

function SearchBar({filterText, onFilterTextChange}) {
    return (
        <form>
            <input type="text" placeholder="Search..." value={filterText} onChange={(e) => onFilterTextChange(e.target.value)}/>
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
        <div className='navbar flex'>
            <Link to='/' className='mr-4'>
                <h1 className="text-3xl font-bold">Home</h1>
            </Link>
            <Link to={'/album'} className='mr-4'>
                <h1 className="text-3xl font-bold">Album</h1>
            </Link>
            <Link to={'/favorites'}>
                <h1 className="text-3xl font-bold">Favorites</h1>
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
    const [favorites, setFavorites] = useState([]);

    return (
        <AppContext.Provider value={{ favorites: favorites, setFavorites: setFavorites }}>
            <RouterProvider router={router} />
        </AppContext.Provider>
    );
};
