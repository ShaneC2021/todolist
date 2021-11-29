let form = document.getElementById("myForm");

form.addEventListener("submit", function (event) {
 
  let input = document.getElementById("item");
  input.value="";
  event.preventDefault();

});

let arrayOfTodoList = [];

function addToList() {
  /* each to do item is an object which is saved in an array
     that array is then stringified and saved in local storage
    in order to restieve the array from storage. Storage "key"
    is used to retrieve the the stringified array which is then parsed
    into a newarray
  */
  let toDoItem = {
    index: "",
    item: document.getElementById("item").value,
  };

  arrayOfTodoList.push(toDoItem);
  localStorage.setItem("array", JSON.stringify(arrayOfTodoList));
  let retrievedArray = localStorage.getItem("array");
  let newArray = JSON.parse(retrievedArray);
  loadTableData(newArray);
}

function loadTableData(array) {
  let tableBody = document.getElementById("tableData");
  let row = "";
  tableBody.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    let rank = i + 1;
    array[i].index = i; // gives each object an index to reference for  individual deletion
    arrayOfTodoList[i].index = i;
    row = `<tr>
               <td>${rank}</td>
               <td>${array[i].item}</td>
               <td><i class="bi bi-trash m-1 garbage" onclick="trash(${array[i].index})"></i></td>
               <td>${array[i].index}</td>
            </tr>`;

    tableBody.innerHTML += row;
  }
}

// pass in index of object in the array

function trash(index) {
  let tableBody = document.getElementById("tableData");
  tableBody.innerHTML = ""; //clear table body

  /* delete object at given index from Original array
     clear local storage
     save updated array in local storage
     retrieve data from local storage 
     update table based on new array
*/
  arrayOfTodoList.splice(index, 1);
  localStorage.clear(); //localStorage is cleared
  localStorage.setItem("array", JSON.stringify(arrayOfTodoList));
  let retrievedArray = localStorage.getItem("array");
  let newArray = JSON.parse(retrievedArray);
  updateIndex();
  loadTableData(newArray);

  console.log(arrayOfTodoList);  // debuggin purposes
  console.log(newArray);         //debuggin
}

function updateIndex() {
  for (let i = 0; i < arrayOfTodoList.length; i++) {
    arrayOfTodoList[i].index = i;
  }
}
