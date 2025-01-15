import React from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import './SearchBar.css';

    // SearchBar component
    // Author: @gulIbrahimi
    const SearchBar = ({ searchInput, setSearchInput, search }) => {
    return (
        <div className="search-container">
        <InputGroup className="search-bar">
            <FormControl
            className="search-input"
            placeholder="Search for artists..."
            type="input"
            value={searchInput}
            onKeyDown={event => {
                if (event.key === "Enter") {
                search();
                }
            }}
            onChange={event => setSearchInput(event.target.value)}
            />
            <Button className="search-button" onClick={search}>
            🎶 Search
            </Button>
        </InputGroup>
        </div>
    );
    };

    export default SearchBar;
