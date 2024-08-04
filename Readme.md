🎬 Movie Recommendation System
Overview
Welcome to the Movie Recommendation System! This project utilizes a diverse set of modern technologies to provide personalized movie recommendations. The stack includes robust backend services, a responsive frontend, and an intelligent machine learning model.

Tech Stack
Frontend
React: A JavaScript library for building user interfaces.
React Bootstrap: Combines Bootstrap's styling with React components for a responsive and modern design.
Backend
Node.js: A JavaScript runtime built on Chrome's V8 engine, enabling server-side execution of JavaScript.
Express: A minimal and flexible Node.js web application framework for building web and mobile applications.
Machine Learning API
Django: A high-level Python web framework that encourages rapid development and clean, pragmatic design.
NumPy: Fundamental package for scientific computing with Python, providing support for arrays.
Pandas: Data manipulation and analysis library for Python.
NLTK (Natural Language Toolkit): Suite of libraries for natural language processing in Python.
PorterStemmer: Tool within NLTK used for stemming words, reducing them to their base or root form.
Database
MongoDB: A NoSQL database known for its high performance, high availability, and easy scalability.
Development Tools and Libraries
Axios: Promise-based HTTP client for making requests from the browser and Node.js.
CORS: Middleware to enable Cross-Origin Resource Sharing.
Mongoose: ODM library for MongoDB and Node.js, providing a schema-based solution to model application data.
Workflow
User Interaction: Users interact with the application via a responsive React frontend, styled with React Bootstrap.
Data Request: The frontend sends an HTTP request to the Node.js backend using Axios.
Database Query: The backend queries the MongoDB database for the requested movie data.
Machine Learning API: If the movie is found, the backend calls a Django API, which processes the data using machine learning algorithms.
Recommendation Response: The Django API returns a list of recommended movies, which the backend then queries in the MongoDB database.
Data Presentation: The backend sends the recommendation data back to the frontend, which displays the results to the user.
Installation and Setup
Prerequisites
Node.js
MongoDB
Python and Django