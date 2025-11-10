import React from 'react';

const SearchBar = () => {
    return (
        <div className="p-4">
            <input
                type="text"
                placeholder="Search products..."
                className="border rounded p-2 w-full"
            />
        </div>
    );
};

export default SearchBar;