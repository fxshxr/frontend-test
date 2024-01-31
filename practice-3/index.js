let tableWrapper = document.querySelector(".tableWrapper");
let search = document.querySelector(".search");
let searchBtn = document.querySelector(".searchBtn");

let userToggler,
  idToggler,
  titleToggler,
  bodyToggler = true;

async function getResponse() {
  let res = await fetch("https://jsonplaceholder.typicode.com/posts");
  let data = await res.json();
  return data;
}

function getData(dir = false, field = "id", search = "") {
  if (search.length >= 3) {
    getResponse()
      .then((data) => render(searchData(data, search)))
      .catch((err) => console.log(err));
  } else {
    getResponse()
      .then((data) => render(sortData(data, dir, field)))
      .catch((err) => console.log(err));
  }
}

let render = (data) => {
  let dataKeys = Object.keys(data[0]);
  tableWrapper.innerHTML = `<table class="table"></table>`;
  let table = document.querySelector(".table");
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

  let userIdBtn = document.querySelector(".userId");
  let idBtn = document.querySelector(".id");
  let titleBtn = document.querySelector(".title");
  let bodyBtn = document.querySelector(".body");

  userIdBtn.addEventListener("click", () => {
    getData(userToggler, "userId");
    userToggler = !userToggler;
  });
  idBtn.addEventListener("click", () => {
    getData(idToggler, "id");
    idToggler = !idToggler;
  });
  titleBtn.addEventListener("click", () => {
    getData(titleToggler, "title");
    titleToggler = !titleToggler;
  });
  bodyBtn.addEventListener("click", () => {
    getData(bodyToggler, "body");
    bodyToggler = !bodyToggler;
  });

  searchBtn.addEventListener("click", () => {
    let val = search.value.trim();
    if (val.length >= 3) {
      getData(true, "body", val);
    } else {
      getData();
    }
  });

  // search.addEventListener("input", () => {
  //   let val = search.value.trim();
  //   if (val.length >= 3) {
  //     getData(true, "body", val);
  //   } else {
  //     getData();
  //   }
  // });
};

let sortData = (data, direction, field) => {
  if (!direction) {
    data.sort((a, b) => (a[field] > b[field] ? 1 : -1));
  } else {
    data.sort((a, b) => (a[field] < b[field] ? 1 : -1));
  }
  return data;
};

let searchData = (data, val) => {
  let regex = new RegExp(val, "g");
  let filteredData = data.filter((obj) => regex.test(obj.body));
  return filteredData;
};

getData();
