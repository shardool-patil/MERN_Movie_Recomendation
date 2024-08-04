// Import required modules
const express = require('express'); // Express framework for building web servers
const axios = require('axios'); // Axios library for making HTTP requests
const mongoose = require('mongoose'); // Mongoose for MongoDB interactions
const cors = require('cors'); // Middleware for enabling Cross-Origin Resource Sharing

// Initialize the Express application
const app = express();
const port = 3050; // Define the port number on which the server will listen

// Import the Movie model for MongoDB operations
const Movie = require('./models/Movie');

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Connect to MongoDB database named 'cinemas' on localhost
mongoose.connect('mongodb://127.0.0.1:27017/cinemas', {
    useNewUrlParser: true, // Use the new URL parser to avoid deprecation warnings
    useUnifiedTopology: true // Use the new server discovery and monitoring engine
});

// Get the connection instance
const db = mongoose.connection;

// Log an error message if there is a connection error
db.on('error', console.error.bind(console, 'connection error:'));

// Log a success message when the connection is established
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define a route to handle GET requests to '/api/movies/:movieName'
app.get('/api/movies/:movieName', async (req, res) => {
    const { movieName } = req.params; // Extract the movie name from the URL parameters

    try {
        console.log(`Searching for movie: ${movieName}`); // Log the movie name being searched

        // Find a movie in the MongoDB database that matches the given title
        const movie = await Movie.findOne({ title: movieName });

        // If no movie is found, send a 404 response with an error message
        if (!movie) {
            console.log(`Movie not found: ${movieName}`);
            return res.status(404).json({ error: 'Movie not found' });
        }

        console.log(`Movie found: ${movie.title} with ID: ${movie.id}`); // Log the found movie details

        // Make an HTTP request to a Django API to get recommended movies based on the found movie's ID
        const djangoResponse = await axios.get(`http://127.0.0.1:8000/api/recommended/${movie.id}/`);

        // Extract recommended movie IDs from the Django API response
        const recommendedMovieIds = djangoResponse.data.recommended_movies;

        // Find the recommended movies in the MongoDB database using the recommended movie IDs
        const recommendedMovies = await Movie.find({ id: { $in: recommendedMovieIds } });

        // Send the list of recommended movies as the JSON response
        res.json(recommendedMovies);
    } catch (error) {
        console.error(`An error occurred: ${error.message}`); // Log any errors that occur

        // Check if the error is a 404 from the Django API and send an appropriate response
        if (error.response && error.response.status === 404) {
            res.status(404).json({ error: 'Recommended movies not found in the Django API.' });
        } else {
            // For other errors, send a 500 response with a generic error message
            res.status(500).json({ error: 'An error occurred while fetching recommended movies.' });
        }
    }
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});



