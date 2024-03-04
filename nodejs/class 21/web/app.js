const container = document.querySelector(".container")

const baseUrl = "http://localhost:8080"

let todos = []

const fetchData = async () => {
    const res = await fetch(`${baseUrl}/todos`, {
        method: "GET"
    })
    const json = await res.json()
    console.log(json);
    todos = json.data
    return json.data

}

const renderTodos = async () => {
    container.innerHTML = ""
    await fetchData()
    for (const todo of todos) {
        container.innerHTML += todo.name + "<br>"
    }
}
renderTodos()


const postData = async () => {
    const body = {
        name: "hussain"
    }
    const res = await fetch(`${baseUrl}/todos`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const json = await res.json()
    console.log(json);
    renderTodos()
}