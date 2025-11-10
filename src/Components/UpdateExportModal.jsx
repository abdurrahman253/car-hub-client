import React from 'react';

const UpdateExportModal = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-md">
                <h2 className="text-lg font-bold mb-2">Update Export Settings</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">File Format</label>
                        <select className="border rounded p-2 w-full">
                            <option value="csv">CSV</option>
                            <option value="xlsx">XLSX</option>
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button className="bg-blue-500 text-white py-1 px-4 rounded">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateExportModal;