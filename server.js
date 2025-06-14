/********************************************************************************
*  WEB322 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Toyomfon Edem Akpan Student ID: 175368232 Date: 2025-06-01
*
********************************************************************************/
const express = require("express");
const path = require("path");
const projectData = require("./modules/projects");

const app = express();

// Serve static files from the public directory
app.use(express.static('public'));
app.use(express.static('views'));

// Initialize project data before starting the server
projectData.initialize().then(() => {
    app.listen(3000, () => console.log("Server running on port 3000"));
}).catch(err => console.log(err));

// Route: Home - serve home.html file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/views/home.html'));
});

// Route: About - serve about.html file
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, '/views/about.html'));
});

// Route: Get all projects or projects by sector
app.get("/solutions/projects", (req, res) => {
    const sector = req.query.sector;
    
    if (sector) {
        // If sector query parameter is present, filter by sector
        projectData.getProjectsBySector(sector)
            .then(data => res.json(data))
            .catch(err => res.status(404).send(err));
    } else {
        // If no sector parameter, return all projects
        projectData.getAllProjects()
            .then(data => res.json(data))
            .catch(err => res.status(404).send(err));
    }
});

// Route: Get project by dynamic ID
app.get("/solutions/projects/:id", (req, res) => {
    const projectId = parseInt(req.params.id);
    
    projectData.getProjectById(projectId)
        .then(data => res.json(data))
        .catch(err => res.status(404).send(err));
});

// Custom 404 handler - must be last
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
});

module.exports = app;