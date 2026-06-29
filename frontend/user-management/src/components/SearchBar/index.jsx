import {useState} from "react";

import {FaSearch} from "react-icons/fa"

import "./index.css"

const SearchBar = ({search, setSearch}) => {
    return(
        <div className="search-card">
            <FaSearch/>
            <input type="search" placeholder="Search by name, username and email" className="input-box" value={search} onChange={(e) => setSearch(e.target.value)}/>
        </div>
    )
}

export default SearchBar