import React from "react";
import { motion } from "framer-motion";

const ImportModal = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-base-content dark:bg-opacity-50">
            <div className="p-4 rounded shadow-md bg-base-100 dark:bg-base-100">
                <h2 className="mb-2 text-lg font-bold text-base-content dark:text-base-content">Import Products</h2>
                <input type="file" accept=".csv" className="mb-4" />
                <div className="flex justify-end">
                    <button className="px-4 py-1 bg-blue-500 rounded text-base-content">Import</button>
                </div>
            </div>
        </div>
    );
};

export default ImportModal;