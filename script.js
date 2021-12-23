let form = document.getElementById("myForm");

// prints data in local storage to UI on page load
document.addEventListener("DOMContentLoaded", () => {
  const fetchTodos = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then(function (response) {
        // handle success
        addToListFromApi(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  fetchTodos();
});

form.addEventListener("submit", function (event) {
  let input = document.getElementById("item");
  input.value = ""; // clears input field when to do item is submitted
  event.preventDefault();
});
/* each to do item is an object which is saved in an array,
    that array is then stringified and saved in local storage
    in order to retrieve the array from storage. Storage "key"
    is used to retrieve the the stringified array 
  */

function addToList() {
  let arrayOfTodoList = [];
  let retrievedArray = JSON.parse(localStorage.getItem("array")); // gets data stored under the key "array"

  if (retrievedArray !== null) {
    arrayOfTodoList = retrievedArray; // if storage is not empty this variable gets what is in local Storage which would be an array
  }

  let toDoItem = {
    index: "",
    title: document.getElementById("item").value,
  };

  // however if storage is empty arrayOfTodoList stores new data, upates index, then updates localStorage
  arrayOfTodoList.push(toDoItem);
  for (let i = 0; i < arrayOfTodoList.length; i++) {
    arrayOfTodoList[i].index = i;
  }
  localStorage.setItem("array", JSON.stringify(arrayOfTodoList));
  loadTableData(arrayOfTodoList);
}

function addToListFromApi(responseObject) {
  let arrayOfTodoList = [];
  let retrievedArray = JSON.parse(localStorage.getItem("array")); // gets data stored under the key "array"

  if (retrievedArray !== null) {
    arrayOfTodoList = retrievedArray; // if storage is not empty this variable gets what is in local Storage which would be an array of objects
    loadTableData(arrayOfTodoList);
  } else if (retrievedArray === null) {
    for (let i = 0; i < responseObject.data.length; i++) { // loads array with data from response object received from rest API
      responseObject.data[i].index = i;                   // gives data an index property
      arrayOfTodoList.push(responseObject.data[i]);
    }
  }
  localStorage.setItem("array", JSON.stringify(arrayOfTodoList));
  loadTableData(arrayOfTodoList);
}


function loadTableData(array) {
  let tableBody = document.getElementById("tableData");
  let row = "";

  tableBody.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    let rank = i + 1;
    row = `<tr>
               <td>${rank}</td>
               <td>${array[i].title}</td>
               <td><i class="bi bi-trash m-1 garbage" onclick="trash(${array[i].index})"></i></td>
           </tr>`;
    tableBody.innerHTML += row;
  }
}

// pass index of object in the array

function trash(index) {
  let tableBody = document.getElementById("tableData");
  let arrayOfTodoList = JSON.parse(localStorage.getItem("array"));
  tableBody.innerHTML = ""; //clear table body

  /* delete object at given index from parsed data
     if array is empty after deletion of item 
     remove item from storage with given "key" to update the localStorage
     update index of items in array
     update table based on new array
     if array is not empty  after deletion ,update index, update storage and update UI
*/
  arrayOfTodoList.splice(index, 1);
  if (arrayOfTodoList.length === 0) {
    localStorage.removeItem("array");
    loadTableData(arrayOfTodoList);
  } else {
    updateIndex(arrayOfTodoList);
    localStorage.setItem("array", JSON.stringify(arrayOfTodoList));
    loadTableData(arrayOfTodoList);
  }
}

function updateIndex(array) {
  for (let i = 0; i < array.length; i++) {
    array[i].index = i;
  }
}

// clears localstorage and clears table
function clearStorage() {
  let tableBody = document.getElementById("tableData");

  localStorage.clear();
  tableBody.innerHTML = "";
}
