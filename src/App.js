import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [jsonInput, setJsonInput] = useState(''); // State for JSON input
    const [response, setResponse] = useState(null); // State for storing API response
    const [selectedOptions, setSelectedOptions] = useState([]); // State for dropdown selections
    const [error, setError] = useState(null); // State for handling errors

    const handleSubmit = async () => {
        try {
            const parsedInput = JSON.parse(jsonInput); // Parse JSON input
            const res = await axios.post('https://your-backend-api.herokuapp.com/bfhl', parsedInput); // Replace with your API URL
            setResponse(res.data); // Set the API response to state
            setError(null); // Clear any previous errors
        } catch (err) {
            setError("Invalid JSON input or API error. Please check your input."); // Handle errors
            setResponse(null);
        }
    };

    const renderResponse = () => {
        if (!response) return null;

        const filteredResponse = {}; // Filtered response based on dropdown selection
        selectedOptions.forEach(option => {
            filteredResponse[option] = response[option];
        });

        return (
            <div>
                <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
            </div>
        );
    };

    return (
        <div className="App">
            <h1>BFHL Frontend</h1>
            <textarea
                rows="10"
                cols="50"
                placeholder='Enter JSON e.g. { "data": ["A","C","z"] }'
                value={jsonInput}
                onChange={e => setJsonInput(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>

            {error && <div style={{ color: 'red' }}>{error}</div>}

            {response && (
                <div>
                    <h2>Select Data to Display</h2>
                    <select
                        multiple
                        onChange={e => setSelectedOptions([...e.target.selectedOptions].map(option => option.value))}
                    >
                        <option value="numbers">Numbers</option>
                        <option value="alphabets">Alphabets</option>
                        <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
                    </select>
                    {renderResponse()}
                </div>
            )}
        </div>
    );
}

export default App;
