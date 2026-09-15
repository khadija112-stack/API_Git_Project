const apiUrl = "https://jsonplaceholder.typicode.com/posts";

const postsContainer = document.getElementById("posts-container");

async function fetchPosts() {
    try {
        const response = await fetch(apiUrl);
        const posts = await response.json();

        displayPosts(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}

function displayPosts(posts) {
    postsContainer.innerHTML = "";

    posts.forEach(post => {

        const card = document.createElement("div");

        card.className = "post-card";

        card.setAttribute("data-post-id", post.id);

        card.innerHTML = `
            <h2>${post.title}</h2>

            <p>${post.body}</p>

            <div class="actions">
                <button class="edit-btn" onclick="editPost(${post.id})">
                    Edit
                </button>

                <button class="delete-btn" onclick="deletePost(${post.id})">
                    Delete
                </button>
            </div>
        `;

        postsContainer.appendChild(card);
    });
}

fetchPosts();

async function editPost(id) {
    const newTitle = prompt("Enter the new title:");

    if (!newTitle || newTitle.trim() === "") {
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: newTitle
            })
        });

        if (response.ok) {
            const updatedPost = await response.json();

            const card = document.querySelector(
                `.post-card[data-post-id="${id}"]`
            );

            if (card) {
                card.querySelector("h2").textContent = updatedPost.title;
            }

            // Update the post title without reloading the page
            alert("Post updated successfully!");
            console.log("Update completed for post:", id);
        }
    } catch (error) {
        console.error("Error updating post:", error);
    }
}

async function deletePost(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            const card = document.querySelector(
                `.post-card[data-post-id="${id}"]`
            );

            if (card) {
                card.remove();
            }

            alert("Post deleted successfully!");
        }
    } catch (error) {
        console.error("Error deleting post:", error);
    }
}