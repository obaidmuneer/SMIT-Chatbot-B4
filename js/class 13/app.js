// variable 
// we will need obj
// variable will go to array and we need index
// function > loop

const memberInput = document.querySelector("#member")
const container = document.querySelector("#container")

const membersData = []
// item = {
// name:"user ka nam",
// vote:user kay vote
// }




const loopHandler = () => {
    container.innerHTML = ""
    let i = 0
    for (let item of membersData) {
        container.innerHTML +=
            `
            <span>${item.name} vote: ${item.vote}</span>
            <button onclick="voteHandler(${i})" >Increase Vote</button>
            </br></br>
             `
        i = i + 1
    }
}

const voteHandler = (index) => {
    console.log(index);
    console.log(membersData[index]);
    membersData[index].vote += 1
    loopHandler()
}


const submitHandler = () => {
    console.log("I am submit handler");

    const member = {
        name: memberInput.value,
        vote: 0
    }
    membersData.push(member)

    console.log(memberInput.value);
    console.log(membersData);
    memberInput.value = ""
    loopHandler()
}

loopHandler()