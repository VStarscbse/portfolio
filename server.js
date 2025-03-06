const express = require('express');
const ngrok = require('ngrok');
const path = require('path');
const app = express();

// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    
    try {
        // Configure ngrok with your auth token
        await ngrok.authtoken('2sNMXbNaBvl7Scv1gnybpXNlB7h_2bs6HJCXC7N8bDK51wSrB');
        
        // Start ngrok
        const url = await ngrok.connect({
            addr: PORT,
            authtoken: '2sNMXbNaBvl7Scv1gnybpXNlB7h_2bs6HJCXC7N8bDK51wSrB'
        });
        
        console.log('Your website is now accessible at:', url);
        console.log('Note: This URL will change each time you restart the server');
    } catch (error) {
        console.error('Error starting ngrok:', error);
    }
}); 