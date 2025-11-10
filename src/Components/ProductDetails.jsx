import React from 'react';

const ProductDetails = () => {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-2">Product Title</h2>
            <p className="text-gray-700 mb-4">Detailed description of the product goes here.</p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded">Add to Cart</button>
        </div>
    );
};

export default ProductDetails;