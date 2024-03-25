
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

function Header() {
    return (
        <div>
            <span>Home</span>
            <span>Album</span>
            <span>Favorites</span>
        </div>
)
}

function Tip({ tipOfTheDay }) {
    return (
        <div>
            <p>{tipOfTheDay}</p>
        </div>
    )
}

const TIPOFTHEDAY = "Don't promise what you can't deliver."
const CHARACTERS = [{ name: "Glasses Morty", imageUri: "https://rickandmortyapi.com/api/character/avatar/143.jpeg" },
    { name: "Visor Rick", imageUri: "https://rickandmortyapi.com/api/character/avatar/487.jpeg" }]

export default function App() {
    return (
        <div>
            <Header></Header>
            {/*<Tip tipOfTheDay={TIPOFTHEDAY}></Tip>*/}
            <SearchBar></SearchBar>
            <Characters characters={CHARACTERS}></Characters>
        </div>
    )
};
