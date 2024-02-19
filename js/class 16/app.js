let username = document.querySelector('#username')
let email = document.querySelector('#email')
let password = document.querySelector('#password')
let login_password = document.querySelector('#login_password')
let login_username = document.querySelector('#login_username')
let users = [
    {
        "name": "saylani-genai",
        "email": "hammad@gmail.com",
        "password": "123"
    }
]


const userCreater = () => {
    console.log(123);
    let user = {
        name: username.value,
        email: email.value,
        password: password.value
    }
    console.log(user)
    users.push(user)
    console.log(users);
}

const userChecker = () => {
    console.log(login_username.value);
    // const isLoggedIn = users.some(user => user.name == login_username.value)
    // const isUserData = users.find(user => user.name == login_username.value)
    const isUserData = users.find((user, i) => {
        return user.name == login_username.value
    })
    // console.log(isUserData);
    if (isUserData) {
        alert(`welcome ${isUserData.name}`)
    }
}


const es6OneLiner = (num, num2) => num > 1 ? "welcome" : "not welcome"

console.log(es6OneLiner(0, 0));


const es6NotLiner = (num) => {
    return num
}

// const sum = (num_1,num_2) => {
//     return num_1 + num_2
// }
// const total = sum(10,10)
// console.log(total);

const nums = [1, 2, 3, 4]
const updatedArray = nums.map((n) => {
    return n
})

console.log(updatedArray);