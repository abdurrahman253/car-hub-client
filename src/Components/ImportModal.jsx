import React from 'react';

const ImportModal = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-md">
                <h2 className="text-lg font-bold mb-2">Import Products</h2>
                <input type="file" accept=".csv" className="mb-4" />
                <div className="flex justify-end">
                    <button className="bg-blue-500 text-white py-1 px-4 rounded">Import</button>
                </div>
            </div>
        </div>
    );
};

export default ImportModal;