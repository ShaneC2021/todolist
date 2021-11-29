"use strict";

var form = document.getElementById("myForm");
form.addEventListener("submit", function (event) {
  var input = document.getElementById("item");
  input.value = "";
  event.preventDefault();
});
var arrayOfTodoList = [];

function addToList() {
  /* each to do item is an object which is saved in an array
     that array is then stringified and saved in local storage
    in order to restieve the array from storage. Storage "key"
    is used to retrieve the the stringified array which is then parsed
    into a newarray
  */
  var toDoItem = {
    index: "",
    item: document.getElementById("item").value
  };
  arrayOfTodoList.push(toDoItem);
  localStorage.setItem("array", JSON.stringify(arrayOfTodoList));
  var retrievedArray = localStorage.getItem("array");
  var newArray = JSON.parse(retrievedArray);
  loadTableData(newArray);
}

function loadTableData(array) {
  var tableBody = document.getElementById("tableData");
  var row = "";
  tableBody.innerHTML = "";

  for (var i = 0; i < array.length; i++) {
    var rank = i + 1;
    array[i].index = i; // gives each object an index to reference for  individual deletion

    arrayOfTodoList[i].index = i;
    row = "<tr>\n               <td>".concat(rank, "</td>\n               <td>").concat(array[i].item, "</td>\n               <td><i class=\"bi bi-trash m-1 garbage\" onclick=\"trash(").concat(array[i].index, ")\"></i></td>\n               <td>").concat(array[i].index, "</td>\n            </tr>");
    tableBody.innerHTML += row;
  }
} // pass in index of object in the array


function trash(index) {
  var tableBody = document.getElementById("tableData");
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
  var retrievedArray = localStorage.getItem("array");
  var newArray = JSON.parse(retrievedArray);
  updateIndex();
  loadTableData(newArray);
  console.log(arrayOfTodoList); // debuggin purposes

  console.log(newArray); //debuggin
}

function updateIndex() {
  for (var i = 0; i < arrayOfTodoList.length; i++) {
    arrayOfTodoList[i].index = i;
  }
}