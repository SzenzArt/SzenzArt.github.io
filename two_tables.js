let keys = ["Name", "Phone", "Mobile", "Email","Address"];
let types = ["text", "tel", "tel", "email", "text"];

function addOneRow()
{ 
    let inputTable = document.getElementById("firstRow");
    let tableBody = document.createElement('tbody');
    let tr = document.createElement('tr');
    
    tableBody.appendChild(tr); 

    for (let j = 0; j < keys.length; j++)
    { 
      let td = document.createElement('td');
      let input = document.createElement('input');      
          input.className = "form-control";
          input.type = types[j];
          input.placeholder = keys[j];
          input.id = keys[j];
          input.name = keys[j];        
      td.appendChild(input);
      tr.appendChild(td);        
    }
    let btnGroup = createAddButton();
    tr.appendChild(btnGroup);
    // tBody.appendChild(tr);

    inputTable.appendChild(tableBody);
}

function addRows(telCards)
{ 
  let telTable = document.getElementById("telCardsTable");
  let tableBody = document.createElement('tbody');

  for ( let i=0; i<telCards.length; i++)
  {
    let tr = document.createElement('tr');
    tr.id = telCards[i]["id"];
    for ( let j = 0; j < keys.length; j++)
    { 
      let td = document.createElement('td');      
      let input = document.createElement('input');
          input.className = "form-control";
          input.type = types[j];        
          input.name = keys[j];        
          input.value = telCards[i][keys[j]];
      
      td.appendChild(input);
      tr.appendChild(td);        
    }
    let btnGroup = createButtonGrp();
    tr.appendChild(btnGroup);
    tableBody.appendChild(tr);  
  }
  telTable.appendChild(tableBody);
}
    
addOneRow();


let telCardsFromDB = [ {"Name" : "Peti", "Phone" : "", "Mobile" : "+36302244004", "Email": "zabo.peter.z@gmail.com", "Address":""} ,
                       {"Name" : "Dudi", "Phone" : "", "Mobile" : "+36209849954", "Email": "szabolcs.zabo@gmail.com", "Address":""}];




addRows (telCardsFromDB);

// "ADD" gomb létrehozása , beolvasás meghívása
function createAddButton () 
{
    let group = document.createElement("div");
    group.className = "btn btn-group";
    let  btn = document.createElement("Button");
    btn.className = "btn btn-primary";
    btn.innerHTML = '<i class="fa fa-plus-square" aria-hidden="true"></i>';    
    btn.addEventListener("click", function(){ readData ( btn.parentElement.parentElement.parentElement ); });
    group.appendChild(btn);

    let td = document.createElement("td");
    td.appendChild(group);
    
    return td;
}
// "REFRESH / DELETE" gomb létrehozása , beolvasás meghívása
function createButtonGrp () 
{
    let group = document.createElement("div");
    group.className = "btn btn-group";
    let  refreshBtn = document.createElement("Button");
    refreshBtn.className = "btn btn-primary";
    refreshBtn.innerHTML = '<i class="fa fa-refresh" aria-hidden="true"></i>';
    //    btn.addEventListener("click", function(){ readData ( btn.parentElement.parentElement.parentElement ); });
    let  deleteBtn = document.createElement("Button");
    deleteBtn.className = "btn btn-danger";
    deleteBtn.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
    //    btn.addEventListener("click", function(){ readData ( btn.parentElement.parentElement.parentElement ); });
    group.appendChild(refreshBtn);
    group.appendChild(deleteBtn);

    let td = document.createElement("td");
    td.appendChild(group);
    
    return td;
}

// Adatok kiolvasása, indexálás ADD gomb
function readData (tr)
{
    let inputs = tr.querySelectorAll("input");
    let data = {};
    for (let i = 0; i < inputs.length; i++) {
      
      //inputs[i].name.substr(0, inputs[i].name.length-tr.id.length)
      data[keys[i]] = inputs[i].value;
    }
    data["id"] = tr.id;
    
    putDataToServer (data);
}
function putDataToServer(dataToUpload)
 {
  delete dataToUpload.id;
  let fetchOptions = 
  {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(dataToUpload)
  };

  fetch(`http://localhost:3000/telCards`, fetchOptions).then(
      resp => resp.json(),
      err => console.error(err)
  );
}