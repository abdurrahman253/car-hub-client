import React from 'react';

const Product = () => {
    return (
        <div className="border p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Product Title</h3>
            <p className="text-gray-600">Product description goes here.</p>
            <button className="mt-2 bg-blue-500 text-white py-1 px-4 rounded">Add to Cart</button>
        </div>
    );
};

export default Product;