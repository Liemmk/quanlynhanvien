function Staff(id, name, email, pass, workDay, basicSalary, position, hourWork){
    this.id = id;
    this.name = name;
    this.email = email;
    this.pass = pass;
    this.workDay = workDay;
    this.basicSalary = basicSalary;
    this.position = position;
    this.hourWork = hourWork;


    this.totalSalary = function(){
        if (this.position ==="Boss"){
            return this.totalSalary = (this.basicSalary * 3) ;
        }
        else if (this.position ==="Manager" ){
            return  this.totalSalary = (this.basicSalary * 2);
        }
        else {
            return  this.totalSalary = this.basicSalary;
        }
    };

    this.type = function(){
        if (this.hourWork >= 192){
            return this.type ="Nhân viên xuất sắc";
        }
        else if (this.hourWork >= 176){
            return  this.type ="Nhân viên giỏi";
        }
        else if (this.hourWork >= 160){
            return this.type ="Nhân viên khá";
        }
        else {
            return  this.type ="Nhân viên trung bình";
        }
    };
};