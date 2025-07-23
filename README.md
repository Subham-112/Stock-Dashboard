# Project Overview
This project is a full-stack web application that I built to enhance my understanding of web development and data visualization. My goal was to create an app that allows users to interact with dynamic data through both frontend and backend components. I followed a modular approach—first building out the backend with a focus on REST APIs, and then gradually connecting it with a responsive frontend interface.

# Thought Process & Approach
I started with designing the backend using Node.js, Express, and SQLite3 for data persistence. This setup offered a lightweight but effective server environment, perfect for quick prototyping and testing. After ensuring that the backend routes worked as expected, I moved on to the frontend, building it in React to maintain a component-based, dynamic UI. I integrated Plotly.js into the React app to display visually interactive charts and graphs, which enhanced the user experience and gave the data meaningful representation.

# Technologies Used
Frontend: React, Plotly.js
Backend: Node.js, Express.js
Database: SQLite3
Others: Axios, CORS, dotenv

# Challenges Faced
The biggest hurdle I faced was during the integration of Plotly with React. The library has multiple rendering modes and didn’t behave consistently across all components. Debugging chart updates and ensuring responsive rendering in various screen sizes took significant time and trial. Eventually, I resolved the issue by wrapping the Plotly charts in dedicated components and using useEffect hooks properly to manage state and data loading.
