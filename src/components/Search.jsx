import searchImg from '../assets/search.png';

const Search = ({searchTerm, setSearchTerm}) => {
    return (
        <div className="search">
            <div>
                <img src={searchImg} alt="search"/>
                <input type="text" placeholder="Search through thousands of movies" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>
        </div>
    )
}

export default Search