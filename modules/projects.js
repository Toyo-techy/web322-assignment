/********************************************************************************
*  WEB322 – Assignment 02
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Toyomfon Edem Akpan Student ID: 175368232 Date: 2025-06-01
*
********************************************************************************/
const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");

let projects = [];

// Initialize function to populate projects array
function initialize() {
    return new Promise((resolve, reject) => {
        try {
            projects = projectData.map(project => {
                const sector = sectorData.find(s => s.id === project.sector_id);
                return { ...project, sector: sector ? sector.sector_name : "Unknown" };
            });
            resolve();
        } catch (error) {
            reject("Error initializing project data.");
        }
    });
}

// Get all projects
function getAllProjects() {
    return new Promise((resolve, reject) => {
        projects.length ? resolve(projects) : reject("No project data available.");
    });
}

// Get a project by ID
function getProjectById(projectId) {
    return new Promise((resolve, reject) => {
        const project = projects.find(p => p.id === projectId);
        project ? resolve(project) : reject(`Project with ID ${projectId} not found.`);
    });
}

// Get projects by sector (case insensitive)
function getProjectsBySector(sector) {
    return new Promise((resolve, reject) => {
        const filteredProjects = projects.filter(p => p.sector.toLowerCase().includes(sector.toLowerCase()));
        filteredProjects.length ? resolve(filteredProjects) : reject(`No projects found for sector "${sector}".`);
    });
}

// Export functions as module
module.exports = { initialize, getAllProjects, getProjectById, getProjectsBySector };