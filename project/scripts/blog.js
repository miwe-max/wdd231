let blogPosts = []

async function fetchBlogPosts() {
    try {
        const response = await fetch("data/blog-posts.json")
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
    } catch (error) {
        console.error("Could not fetch blog posts:", error)
        return []
    }
}

function createBlogPostElement(post) {
    const article = document.createElement("article")
    article.className = "blog-post"

    const title = document.createElement("h2")
    title.textContent = post.title

    const date = document.createElement("p")
    date.className = "post-date"
    date.textContent = new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })

    const excerpt = document.createElement("p")
    excerpt.className = "post-excerpt"
    excerpt.textContent = post.excerpt

    const readMore = document.createElement("button")
    readMore.textContent = "Read More"
    readMore.className = "button"
    readMore.addEventListener("click", () => displayFullPost(post))

    article.appendChild(title)
    article.appendChild(date)
    article.appendChild(excerpt)
    article.appendChild(readMore)

    return article
}

function displayFullPost(post) {
    const blogPosts = document.getElementById("blog-posts")
    const fullPost = document.getElementById("full-post")
    const postTitle = document.getElementById("post-title")
    const postDate = document.getElementById("post-date")
    const postContent = document.getElementById("post-content")

    blogPosts.classList.add("hidden")
    fullPost.classList.remove("hidden")

    postTitle.textContent = post.title
    postDate.textContent = new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })
    postContent.innerHTML = post.content

    window.scrollTo(0, 0)
}

function setupBackButton() {
    const backButton = document.getElementById("back-to-posts")
    backButton.addEventListener("click", () => {
        document.getElementById("blog-posts").classList.remove("hidden")
        document.getElementById("full-post").classList.add("hidden")
    })
}

async function populateBlogPosts() {
    blogPosts = await fetchBlogPosts()
    const blogPostsSection = document.getElementById("blog-posts")

    if (blogPosts.length === 0) {
        blogPostsSection.innerHTML = "<p>Unable to load blog posts at this time. Please try again later.</p>"
        return
    }

    blogPosts.forEach((post) => {
        const postElement = createBlogPostElement(post)
        blogPostsSection.appendChild(postElement)
    })
}

document.addEventListener("DOMContentLoaded", () => {
    populateBlogPosts()
    setupBackButton()
})