const sendButton = document.getElementById('send-btn');
const chatInput = document.querySelector('.chat-input');
const chatWindow = document.querySelector('.chat-window');

const baseUrl = "http://localhost:8080"

const sendData = async () => {
    const res = await fetch(`${baseUrl}/chatbot`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            msg: chatInput.value
        })
    })
    if (!res.ok) {
        throw new Error("Something went wrong")
    }
    const json = await res.json()
    console.log(json);
    const data = json.data
    chatWindow.innerHTML += `<br><span>${data.msg}</span>`
}

function myFunc() {
    console.log(chatInput.value);
    chatWindow.innerHTML += `<br><span>${chatInput.value}</span>`
    console.log("send btn is working");
    sendData()
    chatInput.value = ""
}

sendButton.addEventListener("click", myFunc);