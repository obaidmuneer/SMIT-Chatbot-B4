import express from "express"

const router = express.Router()
// localhost:8080/todos/:id


const todos = [
    { name: "obaid" },
    { name: "shezad" },
    { name: "hammad" }
]


router.get("/", (request, response) => {
    try {
        response.status(200).send({
            status: "success",
            message: "data fetched successfully.",
            data: todos
        })
    } catch (error) {
        console.log(error);
        response.status(500).send({
            status: "error",
            message: "Something went wrong."
        })
    }
})

router.post("/", (request, response) => {
    try {
        const body = request.body
        console.log(body, "this is body");
        console.log(body.name, "this is name");
        if (!body.name) {
            return response.status(400).send({
                status: "error",
                message: "missing required params.",
            })

            // throw new Error("missing required params")
        }
        todos.push({ name: body.name })

        response.status(200).send({
            status: "success",
            message: "data added successfully.",
            data: todos
        })
    } catch (error) {
        console.log(error, "this is error");
        response.status(500).send({
            status: "error",
            message: error.message
        })
    }
})


router.put("/:id", (request, response) => {
    try {
        const name = request.body.name
        const id = request.params.id
        console.log(id, "this is params");

        if (!name || !id) {
            return response.status(400).send({
                status: "error",
                message: "missing required params.",
            })
        }

        if (!todos[id]) {
            return response.status(400).send({
                status: "error",
                message: "item not found.",
            })
        }

        console.log(todos[id], "this is todo");

        todos[id] = { name: name }

        response.status(200).send({
            status: "success",
            message: "data updated successfully.",
            data: todos
        })
    } catch (error) {
        response.status(500).send({
            status: "error",
            message: error.message,
        })
    }
})

router.delete("/:id", (request, response) => {
    try {
        const id = request.params.id
        console.log(id, "this is params");

        if (!id) {
            return response.status(400).send({
                status: "error",
                message: "missing required params.",
            })
        }

        if (!todos[id]) {
            return response.status(400).send({
                status: "error",
                message: "item not found.",
            })
        }

        console.log(todos[id], "this is todo");

        todos.splice(id, 1)

        response.status(200).send({
            status: "success",
            message: "data deleted successfully.",
            data: todos
        })
    } catch (error) {
        response.status(500).send({
            status: "error",
            message: error.message,
        })
    }
})

export default router