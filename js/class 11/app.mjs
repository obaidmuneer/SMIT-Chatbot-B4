
// const student_1 = {
//   name: "Asad",
//   roll: 123,
//   obtainedMarks: 80
// }

// const student_2 = {
//   name: "Qasim",
//   roll: 456,
//   obtainedMarks: 60
// }

// const student_3 = {
//   name: "Ali",
//   roll: 789,
//   obtainedMarks: 90
// }

// const students = [student_1, student_2, student_3]

// console.log(students);

// for (const std of students) {
//   console.log(std);
//   console.log(std.name);
// }


// const student_1 = {
//   name: "Asad",
//   "roll": 123,
//   "obtained Marks": 80,
//   courses: ["web n mobile", "ai n chatbot", "ds", "dsa"],
//   otherDetails:{
//     phone:123456789,

//   },
//   calc: function () {
//     console.log(this.name);
//   }
// }



// const n = "otherDeatail"
// student_1.calc()

// console.log(student_1[n]);
// console.log(student_1.n);
// console.log(student_1);
// console.log(student_1.courses[0]);
// console.log(student_1.otherDetails?.phone);

const name = "hussain"

const student = {
  name: name,
  "roll": 123,
  "obtained Marks": 80,
}

// // console.log(student.obtained Marks);
// console.log(student["obtained Marks"]);
// console.log(name);
// console.log("name" in student);
// console.log(student.hasOwnProperty("name"));


// student.roll = ""
// console.log(student.roll);
// delete student.roll
// console.log(student);



const container = document.querySelector(".container")
const todoElem = document.querySelector(".todo")
let arr = []
const arrOfObj = []

const renderElements = () => {
  container.innerHTML = ""
  const todoList = localStorage.getItem("todo") || "[]"
  const parsedTodo = JSON.parse(todoList)
  arr = parsedTodo
  arr.map((item, i) => {
    console.log(item, i);
    container.innerHTML += `<span>${item}</span> 
        <button onclick="deleteHandler(${i})" >Delete</button><br>
        `
  })
}

window.addHandler = () => {
  let todoVal = todoElem.value
  arr.push(todoVal)
  localStorage.setItem("todo", JSON.stringify(arr))
  renderElements()
  const obj = {
    name: todoElem.value,
    vote: 0
  }
  arrOfObj.push(obj)
  console.log(arrOfObj);
  todoElem.value = ""
}

window.deleteHandler = (i) => {
  arr.splice(i, 1)
  console.log(arr);
  localStorage.setItem("todo", JSON.stringify(arr))
  renderElements()
}

renderElements()

// const arr2 = ["obaid", "hussain"]
// localStorage.setItem("todo", JSON.stringify(arr2))
// const db = localStorage.getItem("todo")
// console.log(typeof db);
// console.log(JSON.parse(db));


