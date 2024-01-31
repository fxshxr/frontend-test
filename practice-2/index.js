let tableWrapper = document.querySelector(".tableWrapper");

async function getResponse() {
  let res = await fetch("https://jsonplaceholder.typicode.com/posts");
  let data = await res.json();
  data = data.splice(0, 15);
  let dataKeys = Object.keys(data[0]);
  tableWrapper.innerHTML = `<table class="table"></table>`;
  let table = document.querySelector(".table");
  console.log(data);
  let tr = document.createElement("tr");
  tr.className = "tableHeader";
  for (keys in dataKeys) {
    tr.innerHTML += `
         <td class=${dataKeys[keys]} >${dataKeys[keys]}</td>
        `;
  }
  table.appendChild(tr);

  for (key in data) {
    table.innerHTML += `
            <tr>
            <td>${data[key].userId}</td>
            <td>${data[key].id}</td>
            <td>${data[key].title}</td>
            <td>${data[key].body}</td>
            </tr>
        `;
  }
}

getResponse();
