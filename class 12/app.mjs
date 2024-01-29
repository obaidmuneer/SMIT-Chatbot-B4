const baseUrl = "https://jsonplaceholder.typicode.com"

// axios({
//   method: 'get',
//   url: `${baseUrl}/users`,
// }).then((res) => {
//   console.log(res);
// }).catch((err) => {
//   console.log(err);
// })

const wait = (ms) => {
  return new Promise((resolve, reject) => {
    if (ms > 2000) {
      setTimeout(() => {
        reject(ms)
      }, ms);
    } else {
      setTimeout(() => {
        resolve(2)
      }, ms);
    }
  })
}

const getData = async () => {
  const data = await axios({
    method: 'get',
    url: `${baseUrl}/users`,
  })
  return data
}

try {
  console.log(1);
  // const data = await wait(3000)
  // console.log(data);
  const data = await axios({
    method: 'get',
    url: `${baseUrl}/users`,
  })
  console.log(data);
  console.log(3);
} catch (err) {
  console.log(err, "this is err");
}