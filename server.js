const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html for root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle 404 - redirect to home
app.use((req, res) => {
    res.redirect('/');
});

// Start server
app.listen(PORT, () => {
    console.log(`💕 Romantic New Year server running on port ${PORT}`);
    console.log(`🌐 Open http://localhost:${PORT} in your browser`);
});
