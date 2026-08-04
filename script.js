const titleInput = document.querySelector("#titleInput");
const contentText = document.querySelector("#contentText");
const addBtn = document.querySelector(".addBtn");
const clearBtn = document.querySelector(".clearBtn");
const showCount = document.querySelector(".showCount");
const blogsDisplay = document.querySelector(".blogsDisplay");

let blogs = [];

addBtn.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const content = contentText.value.trim();
  const currentDate = new Date().toLocaleString([], {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  if (title === "" || content === "") {
    alert("Please fill all the fields!");
    return;
  }

  const newPost = {
    title: title,
    currentDate: currentDate,
    content: content,
  };
  blogs.push(newPost);

  saveToLocal();
  displayPosts();
  titleInput.value = "";
  contentText.value = "";
});

clearBtn.addEventListener("click", () => {
  titleInput.value = "";
  contentText.value = "";
});

function displayPosts() {
  showCount.textContent = `${blogs.length} ${blogs.length === 1 ? "post" : "posts"}`;
  blogsDisplay.innerHTML = "";

  blogs.forEach((post, index) => {
    const newBlog = document.createElement("div");
    newBlog.className = "newBlog";
    const blogTitle = document.createElement("h3");
    blogTitle.textContent = post.title;
    const blogDate = document.createElement("p");
    blogDate.textContent = post.currentDate;
    const blogP = document.createElement("p");
    blogP.textContent = post.content;
    const buttonsDiv = document.createElement("div");
    buttonsDiv.className = "buttonsDiv";
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "editBtn";
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "deleteBtn";

    let isEditing = false;
    editBtn.addEventListener("click", () => {
      if (!isEditing) {
        isEditing = true;
        editBtn.textContent = "Save";
        editBtn.classList.add("saveBtn");

        blogTitle.innerHTML = `<input type = "text" id="editTitle-${index}" value="${post.title}">`;
        blogP.innerHTML = `<textarea id="editContent-${index}"> ${post.content}</textarea>`;
      } else {
        //edit needed
        const updatedTitle = document
          .getElementById(`editTitle-${index}`)
          .value.trim();
        const updatedContent = document
          .getElementById(`editContent-${index}`)
          .value.trim();

        if (updatedTitle === "" || updatedContent === "") {
          alert("Fields cannot be empty!");
          return;
        }

        blogs[index].title = updatedTitle;
        blogs[index].content = updatedContent;

        saveToLocal();
        displayPosts();
      }
    });

    deleteBtn.addEventListener("click", () => {
      blogs.splice(index, 1);
      saveToLocal();
      displayPosts();
    });

    buttonsDiv.appendChild(editBtn);
    buttonsDiv.appendChild(deleteBtn);
    newBlog.appendChild(blogTitle);
    newBlog.appendChild(blogDate);
    newBlog.appendChild(blogP);
    newBlog.appendChild(buttonsDiv);

    blogsDisplay.appendChild(newBlog);
  });
}

function saveToLocal() {
  localStorage.setItem("blogs", JSON.stringify(blogs));
}

function getFromLocal() {
  let savedBlogs = localStorage.getItem("blogs");
  if (savedBlogs) {
    return JSON.parse(savedBlogs);
  }
  return [];
}

blogs = getFromLocal();
displayPosts();
