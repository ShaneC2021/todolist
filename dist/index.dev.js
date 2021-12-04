"use strict";

var form = document.getElementById("myForm");
var arrayOfTodoList = [];
form.addEventListener("submit", function (event) {
  var input = document.getElementById("item");
  input.value = ""; // clears input field when to do item is submitted

  event.preventDefault();
});

function checkForKey() {
  var retrievedArray = JSON.parse(localStorage.getItem("array")); // gets data stored under the key "array"

  if (retrievedArray !== null) {
    arrayOfTodoList = retrievedArray; // gathers any stored data
  }
}
/* each to do item is an object which is saved in an array,
    that array is then stringified and saved in local storage
    in order to retrieve the array from storage. Storage "key"
    is used to retrieve the the stringified array which is then parsed
    into a newarray
  */


function addToList() {
  var toDoItem = {
    index: "",
    item: document.getElementById("item").value
  };
  arrayOfTodoList.push(toDoItem);

  for (var i = 0; i < arrayOfTodoList.length; i++) {
    arrayOfTodoList[i].index = i;
  }

  localStorage.setItem("array", JSON.stringify(arrayOfTodoList));
  retrievedArray = JSON.parse(localStorage.getItem("array"));
  arrayOfTodoList = retrievedArray;
  loadTableData(retrievedArray);
}

function loadTableData(array) {
  var tableBody = document.getElementById("tableData");
  var row = "";
  tableBody.innerHTML = "";

  for (var i = 0; i < array.length; i++) {
    var rank = i + 1;
    row = "<tr>\n               <td>".concat(rank, "</td>\n               <td>").concat(array[i].item, "</td>\n               <td><i class=\"bi bi-trash m-1 garbage\" onclick=\"trash(").concat(array[i].index, ")\"></i></td>\n               <td>").concat(array[i].index, "</td>\n            </tr>");
    tableBody.innerHTML += row;
  }
} // pass index of object in the array


function trash(index) {
  var tableBody = document.getElementById("tableData");
  tableBody.innerHTML = ""; //clear table body

  /* delete object at given index from Original array
     if array is empty after deletion of item 
     remove item from storage with given "key"
     save updated array in local storage
     update table based on new array
  */

  arrayOfTodoList.splice(index, 1);

  if (arrayOfTodoList.length === 0) {
    localStorage.removeItem("array");
    updateIndex();
    loadTableData(arrayOfTodoList);
  } else {
    updateIndex();
    localStorage.setItem("array", JSON.stringify(arrayOfTodoList));
    loadTableData(arrayOfTodoList);
    console.log(arrayOfTodoList); // debugging purposes
  }
} // this function was to help with debugging


function updateIndex() {
  for (var i = 0; i < arrayOfTodoList.length; i++) {
    arrayOfTodoList[i].index = i;
  }
}