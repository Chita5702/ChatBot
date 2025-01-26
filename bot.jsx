import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const Chatbot = () => {
    const [query, setQuery] = useState("");
    const [response, setResponse] = useState("");

    const handleQuerySubmit = async () => {
        try {
            const res = await axios.post("http://localhost:8000/query", { query });
            setResponse(res.data.response || res.data.message);
        } catch (error) {
            setResponse("An error occurred: " + error.message);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>
                AI-Powered Chatbot
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                    label="Enter your query"
                    variant="outlined"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleQuerySubmit}>
                    Submit
                </Button>
                {response && (
                    <Box mt={2} p={2} border={1} borderRadius={2} borderColor="grey.300">
                        <Typography>{response}</Typography>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default Chatbot;