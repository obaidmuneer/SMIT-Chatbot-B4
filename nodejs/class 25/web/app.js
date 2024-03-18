const baseUrl = "http://localhost:8080"
const container = document.querySelector(".container")
const author = document.querySelector("#name")
const content = document.querySelector("#content")
const title = document.querySelector("#title")

// {
//     "author": "hussain",
//     "title": "This is edited title 3",
//     "likes": 0,
//     "content": "This is my edited post 3",
//     "embeddings": [],
//     "_id": "65f7d6ff92b1f3a0f7f83a12",
//     "createdAt": "2024-03-18T05:54:07.390Z",
//     "updatedAt": "2024-03-18T05:54:07.390Z",
//     "__v": 0
//   }

const renderPosts = (data) => {
    container.innerHTML = ""
    for (const item of data) {
        console.log(item);
        container.innerHTML += `<div>
        <h1>${item.title}</h1>
        <h3>${item.content}</h3>
        <p>${item.author}</p>
        <button onclick="deleteData('${item._id}')" >Delete</button>
    </div>`
    }
}

const fetchData = async () => {
    const res = await fetch(baseUrl + "/post")
    const json = await res.json()
    console.log(json);
    const data = json.data
    renderPosts(data)
}

fetchData()

const postData = async () => {
    const body = {
        author: author.value,
        title: title.value,
        content: content.value,
    }
    const res = await fetch(baseUrl + "/post", {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(body)
    })
    const json = await res.json()
    console.log(json);
    fetchData()
}

const deleteData = async (id) => {
    console.log(id,"this is id");
    const res = await fetch(baseUrl + "/post/" + id, {
        method: "DELETE",
    })
    const json = await res.json()
    console.log(json);
    fetchData()
}