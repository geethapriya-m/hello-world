import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavController, AlertController, ModalController, NavParams } from '@ionic/angular';
import { EmailValidationService } from 'src/app/services/email-validation.service';
import { AddNewEmployeeService } from 'src/app/services/manage-bid-schedule/add-new-employee/add-new-employee.service';
import { QualificationService } from 'src/app/services/manage-bid-schedule/qualification/qualification.service';
import { RoleService } from 'src/app/services/manage-bid-schedule/role/role.service';
import { PhoneVerificationService } from 'src/app/services/phone-verification/phone-verification.service';
import { RegistrationService } from 'src/app/services/registration.service';
import Swal from 'sweetalert2';
import { HeaderTitleService } from '../nav-bar-footer/header-title.service';
import straightlines_io_apis from 'src/app/json/apis.json';
import { EmailNotificationsService } from 'src/app/services/email-notifications/email-notifications.service';
@Component({
  selector: 'app-add-new-employee',
  templateUrl: './add-new-employee.component.html',
  styleUrls: ['./add-new-employee.component.scss'],
})
export class AddNewEmployeeComponent implements OnInit {
all_role
  addNewEmpForm: FormGroup;
  errorMsg: any;
emailValid
phoneValid
hidePassword=true
hideConfirmPassword=true
classId=0
confirmClassId=0
  emailMessage: any;
  phoneMessage: any;
  all_qualification
  checkRankValidation=false
  user_data: any;
  checkInitial=false;
  allEmployee=[];
  maximumRank=0;
  empData
  checkEmpEdit=false
  oldinitials
  title='Add New'
constructor(public navCtrl: NavController,
    private fb:FormBuilder,
    private addNewEmp:AddNewEmployeeService,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private register:RegistrationService,
    private headerTitleService: HeaderTitleService,
    private PV:PhoneVerificationService,
    private role_name:RoleService,
    public alertController: AlertController,
    private EmailNotificationsSer:EmailNotificationsService,
    private qualifiaction_name:QualificationService,
    private EV:EmailValidationService) {
      this.checkEmpEdit=navParams.get('edit')
      this.empData=navParams.get('data')

    }

  ngOnInit() {
    // this.headerTitleService.setTitle('Add New Employee');
    // this.headerTitleService.setDefaultHeader(false)
    // this.headerTitleService.setBackUrl(straightlines_io_apis.apis.setUp_bid_parameters);
    // this.headerTitleService.setForwardUrl(null);
    this.user_data=JSON.parse(sessionStorage.getItem('userData'))

    this.addNewEmpForm = this.fb.group({

      // phone:new FormControl('',Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10)])),
      firstname:new FormControl('',Validators.compose([Validators.required,Validators.minLength(2),Validators.maxLength(128)])),
      lastname:new FormControl('',Validators.compose([Validators.required,Validators.minLength(2),Validators.maxLength(128)])),
      qualification:new FormControl('Fully Qualified',Validators.compose([Validators.required])),
      employee_initial:new FormControl('',Validators.compose([Validators.required,Validators.minLength(2), Validators.pattern('^[_A-Za-z0-9]*$')])),
      role:new FormControl('Employee',Validators.compose([Validators.required])),
      rank:new FormControl({value: '', readonly: true},Validators.compose([Validators.required,Validators.min(1), Validators.pattern('^[0-9]*$')])),
      email:new FormControl('',Validators.compose([Validators.required,Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-+]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),Validators.minLength(6)])),
      vacationLeaveNumber: new FormControl('',Validators.compose([Validators.required, Validators.min(1), Validators.pattern('^[0-9]*$')]))

    })
    this.allRole()
    this.allQualification()

    if(this.checkEmpEdit==false){
      this.title='Add New'
      this.getRank()

    }else{
      this.addNewEmp.getEmpDataBasedOnEmpId(this.empData.empId).subscribe((res)=>{

        var temp
        temp=res
        var roleID
    if(temp.role==2){
      roleID='Employee'
    }else{
      roleID='Bid Manager'
    }
    this.title='Edit'
    this.oldinitials=temp.initials
      this.addNewEmpForm.controls.firstname.setValue(temp.fname)
      this.addNewEmpForm.controls.lastname.setValue(temp.lname)
      this.addNewEmpForm.controls.rank.setValue(temp.rank)
      this.addNewEmpForm.controls.employee_initial.setValue(temp.initials)
      this.addNewEmpForm.controls.vacationLeaveNumber.setValue(temp.vacation)
      this.addNewEmpForm.controls.email.setValue(temp.email)
      this.addNewEmpForm.controls.role.setValue(roleID)
      this.addNewEmpForm.controls.qualification.setValue(temp.qualification)
      },(err)=>{console.log(err)},()=>{})
    }

  }
  getRank(){
    this.addNewEmp.getAllEmployeeBasedOnUserId(this.user_data.id).subscribe(
      (res)=>{this.allEmployee=res
        this.allEmployee=this.allEmployee.sort((a, b) => a.rank - b.rank)
        var tempArr=[]
        for(var i=0;i<this.allEmployee.length;i++){
          tempArr.push(this.allEmployee[i].rank)
        }

      this.maximumRank = tempArr.reduce(function(a, b) {
        return Math.max(a, b);
    }, 0);
      this.addNewEmpForm.controls.rank.setValue(this.maximumRank+ + +1)
    },
      (err)=>{console.log(err)},()=>{})
  }
  checkRank(){
    var temp=this.addNewEmpForm.value.rank

    // if(Number(this.maximumRank)<Number(temp)){
    //   this.checkRankValidation=true
    // }else{
    //   this.checkRankValidation=false
    // }

  }
allRole(){
  this.role_name.getAllRole().subscribe(
     (response)=>{
      this.all_role=response
    // return this.all_role
    },
    (err)=>{console.log(err)},()=>{
      // this.ngOnInit()

      this.addEmpForm()
    })
}
allQualification(){
  this.qualifiaction_name.getAllQualification().subscribe(
    (res)=>{this.all_qualification=res
  },
    (err)=>{console.log(err)},()=>{
      // this.ngOnInit()

      this.addEmpForm()
    })
}
addEmpForm(){

}
  get firstname(){
    return this.addNewEmpForm.get('firstname')
  }

  get lastname(){
   return this.addNewEmpForm.get('lastname')
 }

 get email(){
   return this.addNewEmpForm.get('email')
 }

 get role(){
   return this.addNewEmpForm.get('role')
 }

 get qualification(){
   return this.addNewEmpForm.get('qualification')
 }
 get employee_initial(){
  return this.addNewEmpForm.get('employee_initial')
}
get rank(){
  return this.addNewEmpForm.get('rank')
}
 get vacationLeaveNumber(){
   return this.addNewEmpForm.get('vacationLeaveNumber')
 }
 update(data){
   var emailsent
   if(this.empData.emailsent==0){
    emailsent=0
   }else{
    emailsent=1
   }
   var roleID=2
    if(this.addNewEmpForm.value.role=='Employee'){
      roleID=2
    }else{
      roleID=1
    }
  var update_emp={
    "empid":this.empData.empId,
    "fname":this.addNewEmpForm.value.firstname,
    "lname":this.addNewEmpForm.value.lastname,
    "initials":String(this.addNewEmpForm.value.employee_initial).toUpperCase(),
    "rank":Number(this.addNewEmpForm.value.rank),
    "phone":0,
    "email":this.addNewEmpForm.value.email,
    "qualification":this.addNewEmpForm.value.qualification,
    "role":roleID,
    "managerid":this.user_data.id,
    "vacation":this.addNewEmpForm.value.vacationLeaveNumber,
    "emailsent":emailsent
  }

  this.addNewEmp.updateEmpBasedOnId(this.empData.empId,update_emp).subscribe(async (res)=>{
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Success',
      message: 'Updated Successfully!',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.modalCtrl.dismiss()
          }
        }
      ]
    });

    await alert.present();
  },async (err)=>{console.log(err);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      message: 'Please try again!',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.modalCtrl.dismiss()
          }
        }
      ]
    });

    await alert.present();},()=>{

  })
 }
  async onSubmit(data){

    var roleID=2
    if(this.addNewEmpForm.value.role=='Employee'){
      roleID=2
    }else{
      roleID=1
    }
    var new_emp={

      "fname":this.addNewEmpForm.value.firstname,
      "lname":this.addNewEmpForm.value.lastname,
      "initials":String(this.addNewEmpForm.value.employee_initial).toUpperCase(),
      "rank":Number(this.addNewEmpForm.value.rank),
      "phone":0,
      "email":this.addNewEmpForm.value.email,
      "qualification":this.addNewEmpForm.value.qualification,
      "role":roleID,
      "managerid":this.user_data.id,
      "vacation":this.addNewEmpForm.value.vacationLeaveNumber,
      "emailsent":0
    }

    this.addNewEmp.addNewEmployee(new_emp).subscribe(
      async (response)=>{

        this.EmailNotificationsSer.whenNewEmployeesAreAddedByTheBidManager(this.user_data.id).subscribe(async (res)=>{
          this.addNewEmpForm.reset()
          this.ngOnInit()
          const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Success',
            message: 'Added Successfully!',
            buttons: [
              {
                text: 'Ok',
                handler: async () => {

                  const alertC = await this.alertController.create({
                    cssClass: 'my-custom-class',
                    message: 'Do you want to add more Employees?',
                    buttons: [
                      {
                        text: 'No',
                        handler: () => {
                          this.modalCtrl.dismiss()
                          // this.navCtrl.navigateForward([straightlines_io_apis.apis.setUp_bid_parameters])
                        }
                      }, {
                        text: 'Yes',
                        role: 'cancel',
                        handler: () => {

                        }
                      }
                    ]
                  });

                  await alertC.present();
                }
              }
            ]
          });

          await alert.present();
        },async (err)=>{console.log(err);
          const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Error',
            message: 'Please try again!',
            buttons: [
              {
                text: 'Ok',
                handler: () => {
                  this.modalCtrl.dismiss()
                }
              }
            ]
          });

          await alert.present();},()=>{})


     },
     (err)=>{console.log(err)},()=>{
     })
  }
  checkInitialName(){
    var initial
    initial=this.addNewEmpForm.value.employee_initial
    if((this.oldinitials!=initial && initial!=null) ||( this.empData.empInitial!=initial && initial!=null)){
    this.addNewEmp.checkEmpIsExistOrNot(this.user_data.id,initial).subscribe(
      (response)=>{

       if(String(response['message'])=='Initials Exist')
       {this.checkInitial=true}
       else{
        this.checkInitial=false
       }
     // return this.all_role
     },
     (err)=>{console.log(err)},()=>{
       // this.ngOnInit()
     })
    }
  }
  initialName(){
    this.checkInitial=false
  }
  close(){
    this.modalCtrl.dismiss()
  }
}
