


export default function SearchBar({setQuery}) {
    return (
        <input className="bg-gray-200 mt-14 h-10 w-96 px-3 rounded-lg" onChange={(e) => setQuery(e.target.value)}
               placeholder="Recherche..."/>
    )
}