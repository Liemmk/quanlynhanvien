var staffList = [];

var createStaff = function () {
   // var isFormValid = validate();

   // if (!isFormValid) return;

    var id = document.getElementById("tknv").value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var pass = document.getElementById("password").value;
    var workDay = document.getElementById("datepicker").value;
    var basicSalary = +document.getElementById("luongCB").value;
    var position = document.getElementById("chucvu").value;
    var hourWork = +document.getElementById("gioLam").value;

    var newStaff = new Staff(
        id,
        name,
        email,
        pass,
        workDay,
        basicSalary,
        position,
        hourWork,
     );
     staffList.push(newStaff);
     
     renderStaff();
     saveData();
};

var getStaff = function(id){
    var index = findById(id);
    if (index === -1){
       alert("Nhân viên không tồn tại!");
       return;
    }
    var foundStaff = staffList[index];

    document.getElementById("tknv").value=foundStaff.id;
    document.getElementById("name").value=foundStaff.name;
    document.getElementById("email").value=foundStaff.email;
    document.getElementById("password").value=foundStaff.pass;
    document.getElementById("datepicker").value=foundStaff.workDay;
    document.getElementById("luongCB").value=foundStaff.basicSalary;
    document.getElementById("chucvu").value=foundStaff.position;
    document.getElementById("gioLam").value=foundStaff.hourWork;
 
    //document.getElementById("btnCreate").style.display = "none";
    //document.getElementById("btnUpdate").style.display = "inline-block";
 
   //document.getElementById("txtMaSV").disable = true;
 };

 var updateStaff = function () {
   var id = document.getElementById("tknv").value;
   var name = document.getElementById("name").value;
   var email = document.getElementById("email").value;
   var pass = document.getElementById("password").value;
   var position = document.getElementById("chucvu").value;
   var workDay = document.getElementById("datepicker").value;
   var basicSalary = +document.getElementById("luongCB").value;
   var hourWork = +document.getElementById("gioLam").value;
 
   var index = findById(id);
   
   if (index === -1) {
     alert("Nhân viên không tồn tại!");
     return;
   }
 
   var foundStaff = staffList[index];

   foundStaff.name = name;
   foundStaff.email = email;
   foundStaff.pass = pass;
   foundStaff.workDay = workDay;
   foundStaff.basicSalary = basicSalary;
   foundStaff.position = position;
   foundStaff.hourWork = hourWork;
 
   renderStaff();
   saveData();
 };

 var renderStaff = function(data){
   data = data || staffList;

    var dataHTML = "";
    for(var i = 0; i < data.length; i++){
       dataHTML += `<tr>
          <td>${data[i].id}</td>
          <td>${data[i].name}</td>
          <td>${data[i].email}</td>
          <td>${data[i].workDay}</td>
          <td>${data[i].position}</td>
          <td>${data[i].totalSalary()}</td>
          <td>${data[i].type()}</td>
          <td>
             <button class = "btn btn-danger" onclick = "deleteStaff('${data[i].id}')">Xóa</button>
             
          </td>
       </tr>`;
    }
    document.getElementById("tableDanhSach").innerHTML = dataHTML;
 };

 var findById = function(id){
    for(i = 0; i < staffList.length; i++){
       if(staffList[i].id === id){
          return i;
       }
    }
    return -1;
 };

 var saveData = function(){
    var staffListJSON = JSON.stringify(staffList);
    localStorage.setItem("list", staffListJSON);
 };


 var deleteStaff = function (id) {
    var index = findById(id);
    if (index === -1) {
      alert("Nhân viên không tồn tại!");
      return;
    }
    staffList.splice(index, 1);
    renderStaff();
    saveData();
  };

var getData = function (){
   var staffListJSON = localStorage.getItem("list");
   if(staffListJSON){
      staffList = mapData( JSON.parse(staffListJSON) );
      renderStaff();
   }
};

var mapData = function (dataFromLocal){
   var data = [];
   for(var i = 0; i < dataFromLocal.length; i++){
         var currentStaff = dataFromLocal[i];
         var mappedaaStaff = new Staff(
            currentStaff.id, 
            currentStaff.name, 
            currentStaff.email,
            currentStaff.pass,
            currentStaff.workDay,
            currentStaff.basicSalary,
            currentStaff.position,
            currentStaff.hourWork,
         );
      data.push(mappedaaStaff);
   }
   return data;
};
getData();


var validate = function () {
   var id = document.getElementById("tknv").value;
   var name = document.getElementById("name").value;
   var email = document.getElementById("email").value;
   var pass = document.getElementById("password").value;
   var basicSalary = +document.getElementById("luongCB").value;
   var position = document.getElementById("chucvu").value;
   var hourWork = +document.getElementById("gioLam").value;
   
   var namePattern = /^[A-z]+/g;
   var emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
   var salaryPattern = /^([1-9]\d{6}|[1]\d{7}|20{7})$/g;
   var hourPattern = /^([8]\d{1}|[9]\d{1}|[1]\d{2}|20{2})$/g;
   
 
   var isValid = true;
 
   isValid &= require(id, "tbTKNV") && length(id, "tbTKNV", 4, 6);
   isValid &= require(name, "tbTen") && pattern(name, "tbTen", namePattern);
   isValid &= require(email, "tbEmail") && pattern(email, "tbEmail", emailPattern);
   isValid &= require(pass, "tbMatKhau") && length(pass, "tbMatKhau", 6, 10);
   isValid &= require(basicSalary, "tbLuongCB") && pattern(pass, "tbLuongCB", salaryPattern);
   isValid &= require(position, "tbChucVu");
   isValid &= require(hourWork, "tbGiolam") && pattern(pass, "tbGiolam", hourPattern);
   return isValid;
};
 
var require = function (val, noteId, message) {
   if (!val) {
     document.getElementById(noteId).innerHTML =
       message || "* Trường này không để trống";
     return false;
   }
   document.getElementById(noteId).innerHTML = "";
   return true;
};
 



var length = function (val, noteId, min, max) {
   if (val.length < min || val.length > max) {
     document.getElementById(noteId).innerHTML = `* Độ dài phải từ ${min} tới ${max} kí tự.`;
     return false;
   }
   document.getElementById(noteId).innerHTML = "";
   return true;
};

var pattern = function (val, noteId, regex) {
   var valId = regex.test(val);
 
   if (!valId) {
     document.getElementById(noteId).innerHTML = "* Không đúng định dạng";
     return false;
   }
   document.getElementById(noteId).innerHTML = "";
   return true;
};