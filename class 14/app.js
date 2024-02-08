const container = document.querySelector(".container")

const getData = async () => {
  console.log(1);

  const result = await fetch("https://jsonplaceholder.typicode.com/todos")
  if (result.ok) {
    // console.log(result);
    const json = await result.json()
    // container.innerHTML += json[0].title + "<br>"
    // container.innerHTML += json[1].title + "<br>"
    // container.innerHTML += json[2].title + "<br>"
    // container.innerHTML += json[3].title + "<br>"
    // container.innerHTML += json[4].title + "<br>"
    // container.innerHTML += json[5].title + "<br>"
    for (const item of json) {
      // console.log(item);
      container.innerHTML += item.title + "<br>"
    }
    // console.log(json);
  }
  if (result.ok === false) {
    console.log("error occured");
  }

  console.log(3);
}
getData()
