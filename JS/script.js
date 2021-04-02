//geting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todolist = document.querySelector(".todolist");
const deleteAllBtn =document.querySelector(".footer button");
inputBox.onkeyup = ()=>{
    let userData = inputBox.value; //getting user input value
    if(userData.trim()!=0)//if user input value aren't only spaces
    {
        addBtn.classList.add("active"); //active the add button
    }
    else {
        addBtn.classList.remove("active"); //unactive the add button
    }
}
showTasks();
//inserting user entered values in local storage & getting from local storage
addBtn.onclick  = ()=>{
  let userData=inputBox.value; //getting user entered value
  let getLocalStorage=localStorage.getItem("New Todo"); //getting local Storage
  if(getLocalStorage==null)
  {
      listArr = []; //creating blank array
    }
    else
    {
        listArr=JSON.parse(getLocalStorage);//transforming json string into a js object
    }
listArr.push(userData); //pushing or adding user data
localStorage.setItem("New Todo",JSON.stringify(listArr));//transforming js object into a jason string
showTasks();
}

function showTasks(){
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    if(getLocalStorage == null) //if storge is null 
    {
        listArr= []; //creating blank array
    }
    else{
        listArr=JSON.parse(getLocalStorage); //transforming json string into js object
    }
    const pendingNumb=document.querySelector(".pendingNumb");
    pendingNumb.textContent=listArr.length; //passing the length value
    if(listArr.length>0){
        deleteAllBtn.classList.add("active");
    }
    else {
        deleteAllBtn.classList.remove("active");
    }
    let newLiTag = '';
    listArr.forEach((element,index) => {
        newLiTag +=`<li> ${element} <span onclick= "deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`;
    });
    todolist.innerHTML = newLiTag; //adding new li tag inside ul tag
    inputBox.value=""//once task added leave the input field blank
}
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr=JSON.parse(getLocalStorage);
    listArr.splice(index,1); //remove the particular index
    //after remove the li again update the local storage
    localStorage.setItem("New Todo",JSON.stringify(listArr));//transforming js object into a jason string
    showTasks(); //calling Show Task function
}
//delete all task function
deleteAllBtn.onclick = ()=>{
    listArr=[];
    localStorage.setItem("New Todo",JSON.stringify(listArr));//transforming js object into a jason string
    showTasks(); //calling Show Task function
}