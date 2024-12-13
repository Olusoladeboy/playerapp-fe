import express from 'express';
import path from 'path';

const app = express();

// Serve static files from the build directory
const buildPath = path.join(path.resolve(), 'dist');
app.use(express.static(buildPath));

// Catch-all route to serve the index.html file for React routing
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

// Define the server port
const PORT = process.env.PORT || 3100;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
