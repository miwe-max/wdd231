import { fetchData } from "./utils.js"

let allProjects = []

// Populate projects
async function populateProjects() {
    try {
        allProjects = await fetchData("data/projects.json")
        displayProjects(allProjects)
    } catch (error) {
        console.error("Error fetching projects:", error)
    }
}

function displayProjects(projects) {
    const projectsGrid = document.getElementById("projects-grid")
    projectsGrid.innerHTML = ""

    projects.forEach((project) => {
        const projectCard = createProjectCard(project)
        projectsGrid.appendChild(projectCard)
    })
}

function createProjectCard(project) {
    const card = document.createElement("div")
    card.className = "project-card"
    card.dataset.category = project.category

    const img = document.createElement("img")
    img.src = project.image
    img.alt = project.title
    img.loading = "lazy"

    const title = document.createElement("h3")
    title.textContent = project.title

    const description = document.createElement("p")
    description.textContent = project.description

    const viewButton = document.createElement("button")
    viewButton.textContent = "View Details"
    viewButton.addEventListener("click", () => openProjectModal(project))

    card.appendChild(img)
    card.appendChild(title)
    card.appendChild(description)
    card.appendChild(viewButton)

    return card
}

// Filter projects
function setupProjectFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn")
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter
            filterProjects(filter)
            updateActiveFilter(button)
        })
    })
}

function filterProjects(filter) {
    const filteredProjects = filter === "all" ? allProjects : allProjects.filter((project) => project.category === filter)
    displayProjects(filteredProjects)
}

function updateActiveFilter(activeButton) {
    document.querySelectorAll(".filter-btn").forEach((button) => {
        button.classList.remove("active")
    })
    activeButton.classList.add("active")
}

// Project modal
function openProjectModal(project) {
    const modal = document.getElementById("project-modal")
    const modalTitle = document.getElementById("modal-title")
    const modalImage = document.getElementById("modal-image")
    const modalDescription = document.getElementById("modal-description")
    const modalTech = document.getElementById("modal-tech")
    const modalLink = document.getElementById("modal-link")

    modalTitle.textContent = project.title
    modalImage.src = project.image
    modalImage.alt = project.title
    modalDescription.textContent = project.description
    modalTech.textContent = `Technologies: ${project.technologies.join(", ")}`
    modalLink.href = project.link

    modal.style.display = "block"
}

function closeProjectModal() {
    const modal = document.getElementById("project-modal")
    modal.style.display = "none"
}

// Initialize projects page
function initProjectsPage() {
    populateProjects()
    setupProjectFilters()

    // Set up modal close button
    const closeButton = document.querySelector(".close")
    closeButton.addEventListener("click", closeProjectModal)

    // Close modal when clicking outside
    window.addEventListener("click", (event) => {
        const modal = document.getElementById("project-modal")
        if (event.target === modal) {
            closeProjectModal()
        }
    })

    // Handle hash navigation
    if (window.location.hash) {
        const projectId = Number.parseInt(window.location.hash.slice(1))
        const project = allProjects.find((p) => p.id === projectId)
        if (project) {
            setTimeout(() => openProjectModal(project), 500)
        }
    }
}

document.addEventListener("DOMContentLoaded", initProjectsPage)