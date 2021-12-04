"use strict";

var form = document.getElementById("myForm"); // prints data in local storage to UI on page load

window.addEventListener("load", function () {
  var retrievedArray = JSON.parse(localStorage.getItem("array"));

  if (retrievedArray !== null) {
    loadTableData(retrievedArray);
    localStorage.setItem("array", JSON.stringify(retrievedArray));
  }
});
form.addEventListener("submit", function (event) {
  var input = document.getElementById("item");
  input.value = ""; // clears input field when to do item is submitted

  event.preventDefault();
});
/* each to do item is an object which is saved in an array,
    that array is then stringified and saved in local storage
    in order to retrieve the array from storage. Storage "key"
    is used to retrieve the the stringified array which is then parsed
    into a newarray
  */

function addToList() {
  var arrayOfTodoList = [];
  var retrievedArray = JSON.parse(localStorage.getItem("array")); // gets data stored under the key "array"

  if (retrievedArray !== null) {
    arrayOfTodoList = retrievedArray; // if storage is not empty this variable gets what is in local Storage which would be an array
  }

  var toDoItem = {
    index: "",
    item: document.getElementById("item").value
  }; // however if storage is empty arrayOfTodoList stores new data, upates index, then updates localStorage

  arrayOfTodoList.push(toDoItem);

  for (var i = 0; i < arrayOfTodoList.length; i++) {
    arrayOfTodoList[i].index = i;
  }

  localStorage.setItem("array", JSON.stringify(arrayOfTodoList));
  loadTableData(arrayOfTodoList);
}

function loadTableData(array) {
  var tableBody = document.getElementById("tableData");
  var row = "";
  tableBody.innerHTML = "";

  for (var i = 0; i < array.length; i++) {
    var rank = i + 1;
    row = "<tr>\n               <td>".concat(rank, "</td>\n               <td>").concat(array[i].item, "</td>\n               <td><i class=\"bi bi-trash m-1 garbage\" onclick=\"trash(").concat(array[i].index, ")\"></i></td>\n           </tr>");
    tableBody.innerHTML += row;
  }
} // pass index of object in the array


function trash(index) {
  var tableBody = document.getElementById("tableData");
  var arrayOfTodoList = JSON.parse(localStorage.getItem("array"));
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
    updateIndex(arrayOfTodoList);
    loadTableData(arrayOfTodoList);
  } else {
    updateIndex(arrayOfTodoList);
    localStorage.setItem("array", JSON.stringify(arrayOfTodoList));
    loadTableData(arrayOfTodoList);
  }
}

function updateIndex(array) {
  for (var i = 0; i < array.length; i++) {
    array[i].index = i;
  }
}