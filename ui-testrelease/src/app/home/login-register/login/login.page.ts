import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { WorkLoadService } from 'src/app/services/work-load.service';
import straightlines_io_apis from 'src/app/json/apis.json';
import workloadData from 'src/app/json/work-load-data.json';
import requiredWorkForce from 'src/app/json/required-workforce.json'
import { LoginService } from 'src/app/services/login.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import Swal from 'sweetalert2';
import { StraightlinesIoVideoPage } from 'src/app/home/straightlines-io-video/straightlines-io-video.page';
import { EmailValidationService } from 'src/app/services/email-validation.service';
import { ForgotPasswordService } from 'src/app/services/forgot-password.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  reqWorkForce=requiredWorkForce
  worData=workloadData
  t
  hidePassword=true
  classId=0
  checked : boolean = true;
  invalid_email_password=false
  valueforngif=true;
  allShift: any;
  errorMsg: any;
  default_work_load_data=workloadData
  work_load_data
  allShiftData
  shiftLen
    allll=[]as any
    sh_startTime
    shift_name
    convertTimetoString
    allShiftName=[] as any
  test1: { sh_name: any; };
  arrangeShiftdefintionG=[];
  arrangeShiftdefintionL=[];
  safeURL
  isKeyboardHide=true;
  user_data
  videoUrl = 'assets/video/straughtlines-io.mp4'
  loginForm:FormGroup
  saveusername: FormGroup;
  invalid_username_password=false
  userDetails: any;
  inputEmail: any;
  emailValid: boolean;
  forgotPasswordEmail: any;
  forgotPasswordEmailValid: boolean;
  url_token: any;
  emailMessage: any
  constructor(public route:Router,public navCtrl: NavController,
    public shiftDefSer:WorkLoadService,
    public modalCtrl: ModalController,
    private loginSer:LoginService,
    private EV:EmailValidationService,
    private FP:ForgotPasswordService,
    private cd: ChangeDetectorRef,
    public fb:FormBuilder,
     private _sanitizer: DomSanitizer) {
      this.safeURL = this.videoUrl;
// this.initializeApp()

  }
//   ionViewDidEnter(){
//  this.ngOnInit()
// }
ionViewWillEnter(){
  this.ngOnInit()
}
  ngOnInit() {
    const loginData=JSON.parse(localStorage.getItem('userLoginData'))
    if(loginData!==null){

      if(loginData.saveUser==true){

      this.loginForm = this.fb.group({
        username:new FormControl(loginData.username,Validators.compose([Validators.required])),
        password:new FormControl('',Validators.compose([Validators.required])),
        remberMe:new FormControl(true)

      })
      this.cd.detectChanges();
    this.saveusername=this.fb.group({
      checkBox:[true]
    })
  }else{
    this.loginForm = this.fb.group({
      username:new FormControl('',Validators.compose([Validators.required])),
      password:new FormControl('',Validators.compose([Validators.required])),
      remberMe:new FormControl(false)
    })
    this.saveusername=this.fb.group({
      checkBox:[false]
    })
  }
    }
    else{
      this.loginForm = this.fb.group({
        username:new FormControl('',Validators.compose([Validators.required])),
        password:new FormControl('',Validators.compose([Validators.required])),
        remberMe:new FormControl(false)
      })
      this.saveusername=this.fb.group({
        checkBox:[false]
      })
    }




  }
  get username(){
    return this.loginForm.get('username')
  }


 get password(){
   return this.loginForm.get('password')
 }
  signUp(){

    this.navCtrl.navigateForward(straightlines_io_apis.apis.register_api);
  }
  passwordChange(){
    this.invalid_email_password=false
  }
  usernameFocusOut(){


    var getUserData={"username":this.loginForm.value.username}
    this.EV.emailValidator(getUserData).subscribe(
      (response)=>{
        this.emailMessage=response

       if(String(this.emailMessage.message)==="It's a new Email!"){

         return  this.emailValid=true
       }else if(String(this.emailMessage.message)==="Email Exists!" ){
         return  this.emailValid=false
       }
     })
    // this.loginSer.getUserAllDetails(getUserData).subscribe(
    //   async (response)=>{

    //     return this.userDetails=response
    //       },
    //         (error: any)=>{this.errorMsg=error
    //         console.log(this.errorMsg)},
    //         ()=>{
    //         }
    //         );

  }
  signIn(){
    localStorage.removeItem('myBiddingData')
              var isChecked = this.loginForm.value.remberMe
              // if(isChecked){


                var userData={'saveUser':isChecked,'username':this.loginForm.value.username}
          var loginData={'username':this.loginForm.value.username,'password':this.loginForm.value.password}

          var getUserData={"username":this.loginForm.value.username}

          this.loginSer.getUserAllDetails(getUserData).subscribe(
            (response)=>{

              this.userDetails=response

              if(this.userDetails.enabled==true){

                this.loginSer.checkUserRoleBidManager(getUserData.username).subscribe((res)=>{

                  //Bid Manager
                  if(res.length>0){
                    this.loginSer.registerNewUser(loginData).subscribe(
                      async (response)=>{

                        localStorage.setItem('userLoginData',JSON.stringify(userData))
                        if(response!==null){
                          this.bidManager(response)
                        }else{
                          this.invalid_email_password=true

                        }
                      },
                      (error: any)=>{this.errorMsg=error;
                        if(this.errorMsg!=null){    this.invalid_email_password=true}
                      },
                      async () => {})
                  }
                  //Employee
                  else{
                    this.loginSer.checkUserRoleEmployee(getUserData.username).subscribe((res)=>{

                      var tempRes
                      tempRes=res
                      if(res.length>0){
                      this.loginSer.registerNewUser(loginData).subscribe(
                        async (response)=>{
                          var temp
                          temp=response

                          var tempObj={
                            "accessToken":temp.accessToken ,
                            "id": tempRes[0].managerid,
                            "initials":tempRes[0].initials,
                            "phone": temp.phone ,
                            "tokenType": temp.tokenType ,
                            "empid":tempRes[0].empid,
                            "username": temp.username ,
                            "verificationCode": temp.verificationCode,
                            "fname": tempRes[0].fname,
                            "lname": tempRes[0].lname
                          }

                          sessionStorage.setItem('userData',JSON.stringify(tempObj))
                          localStorage.setItem('userLoginData',JSON.stringify(userData))
                            if(response!==null){

                                sessionStorage.setItem('_token',JSON.stringify(response['accessToken']))
                                this.navCtrl.navigateForward(straightlines_io_apis.apis.employee_home)
                          }else{
                            this.invalid_email_password=true

                          }
                        },
                        (error: any)=>{this.errorMsg=error;
                          if(this.errorMsg!=null){    this.invalid_email_password=true}
                        },
                        async () => {})
                      }
                    },(err)=>{console.log(err)},()=>{})
                  }
                },(err)=>{console.log(err)},()=>{})


            }else{

              Swal.fire({

                title: 'Error!',
                html: 'Your Email address could not be verified! Please check your email and verfiy your account.',
                icon: 'error',
                inputLabel:'Resend verification link',
                inputPlaceholder: 'Enter your email address',
                input: 'email',
                inputAttributes: {
                  autocapitalize: 'off'
                },
                showCancelButton: true,
                showConfirmButton:true,
                imageHeight:'200px',
                heightAuto:false,
                confirmButtonText: 'Send',
                confirmButtonColor:'#ff6700',
                preConfirm: (d) => {
                  this.inputEmail=d
                    }
              }).then((result) => {
                  if (result.isConfirmed) {
                          this.EV.emailVerification(this.inputEmail).subscribe(
                            (res)=>{

                            },(error)=>{
                              // console.log(error)
                            },
                            async ()=>{

                            })
                  }
              })
            }
          },
     (error: any)=>{this.errorMsg=error
     console.log(this.errorMsg)},
     ()=>{
     }
     );
  }
  bidManager(response){
      localStorage.setItem('userData',JSON.stringify(response))
      sessionStorage.setItem('token',JSON.stringify(response['accessToken']))
      localStorage.setItem('PWP-PSO',JSON.stringify({"PWP":["EVE","EVE","DAY","DAY","MID"],"PSO":["1500","1300","0700","0600","2300"]}))
      this.user_data={"user_id":JSON.stringify(response['id']),"email":JSON.stringify(response['username'])}
      if(response){
        this.shiftDefSer.getAllShiftDefinition(this.user_data.user_id).subscribe(
          (res)=>{
            this.allShift=res;
            var user_all_shift=[]
            for(var i=0;i<this.allShift.length;i++){
              if(Number(this.allShift[i].userid)==Number(this.user_data.user_id)){
                user_all_shift.push(this.allShift[i])
              }
            }
            localStorage.setItem('allShift',JSON.stringify(user_all_shift))
            this.allShiftdata()
          },
        (error: any)=>{this.errorMsg=error
          this.allDefaultShiftdata()
      },
        ()=>{

        }
        );
    }




  }


  verfiyEmail(){

  }
  async video(){
      window.open('http://www.youtube.com/watch?v=dqFhUgBugKE', '_self', 'location=yes')
    }
focusIn(){


  if(/Android/i.test(navigator.userAgent)){
    if(navigator.platform!=='Win32' && navigator.platform!=='Win16'){
  this.valueforngif=false}}
   this.t=navigator.platform
}
focusOut(){
  if(/Android/i.test(navigator.userAgent)){
    if(navigator.platform!=='Win32' && navigator.platform!=='Win16'){
  this.valueforngif=true}}
}
saveUsername(){
  console.log()
   var isChecked = this.saveusername.value.checkBox
   if(!isChecked){
      var userData={'saveUser':!isChecked,'username':this.loginForm.value.username}
      localStorage.setItem('userLoginData',JSON.stringify(userData))
     }else{
      const userData={'saveUser':!isChecked,'username':""}
      localStorage.setItem('userLoginData',JSON.stringify(userData))
     }
  }

   start() {
    this.navCtrl.navigateForward(straightlines_io_apis.apis.dashboard)
  }

tokenforresetPassword

  passwordReset() {
        Swal.fire({
          title:'Reset your password',
          html:"Enter your user account's verified email address and we will send you a verification link.",
          // inputLabel: 'Your email address',
          inputPlaceholder: 'Enter your email address',
          input: 'email',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          showConfirmButton:true,
          imageHeight:'200px',
          heightAuto:false,
          confirmButtonText: 'Send',
          confirmButtonColor:'#ff6700',
          preConfirm: (emailID) => {
            this.forgotPasswordEmail=emailID
              }
        }).then((result) => {
            if (result.isConfirmed) {
              this.EV.emailValidator({'username':this.forgotPasswordEmail}).subscribe(
                async (response)=>{

                  if(response!==null){
                    this.forgotPasswordEmailValid=true
                    this.FP.emailVerificationForForgotPassword(this.forgotPasswordEmail).subscribe((res)=>{

                    },(err)=>{},
                      async ()=>{
                      })
                  }else{
                    this.forgotPasswordEmailValid=false
                  }
                })
            }
        })
  }
  onClickFeedback(){
    // this.navCtrl.navigateForward('feedback')
    window.open('mailto:feedback@mercuriusinc.com?subject=Feedback: Straightlines.io');
  }
allShiftdata() {

  this.allll=[]
  this.allShiftData=  JSON.parse(localStorage.getItem('allShift'))

  this.test1={"sh_name":null}
  localStorage.setItem('newSHiftDefinition',JSON.stringify(this.test1))
this.work_load_data=[]
for(var i=0;i<this.default_work_load_data.length;i++){
  this.work_load_data.push(this.default_work_load_data[i])
}

  if(this.allShiftData!=null){
  for(var i=0;i<this.allShiftData.length;i++){
    this.convertTimetoString=Array.from(this.allShiftData[i].sh_starttime)
    this.sh_startTime=this.convertTimetoString[0]+this.convertTimetoString[1]+this.convertTimetoString[3]+this.convertTimetoString[4]
      this.shift_name=this.allShiftData[i].sh_name
       this.work_load_data.push(
        {"id": 9+i,
        "startTime": this.sh_startTime,

        "Sun": "0",
        "Mon": "0",
        "Tue": "0",
        "Wed": "0",
        "Thu": "0",
        "Fri": "0",
        "Sat": "0",
        "shiftName":this.shift_name,
        "shiftCategory":this.allShiftData[i].sh_category_id,
        "shift_created_by":this.allShiftData[i].sh_created_by,
        "sh_include_exclude":this.allShiftData[i].sh_include_exclude
       })
    }
  }
  this.arrangeShiftdefintionG=[]
  this.arrangeShiftdefintionL=[]
  for(var i=0;i<this.work_load_data.length;i++){
      if(Number(this.work_load_data[i].startTime)>2200){
  this.arrangeShiftdefintionG.push(this.work_load_data[i])
      }else if(Number(this.work_load_data[i].startTime)<=2200){
        this.arrangeShiftdefintionL.push(this.work_load_data[i])
      }
    }
    this.arrangeShiftdefintionG.sort((a,b) => a.startTime.localeCompare(b.startTime));
    this.arrangeShiftdefintionL.sort((a,b) => a.startTime.localeCompare(b.startTime));


    this.work_load_data=[]
    // this.work_load_data.push(this.arrangeShiftdefintionG)
    for(var i=0;i<this.arrangeShiftdefintionG.length;i++){
      this.work_load_data.push(this.arrangeShiftdefintionG[i])
    }
    for(var i=0;i<this.arrangeShiftdefintionL.length;i++){
      this.work_load_data.push(this.arrangeShiftdefintionL[i])
    }

    for(var i=0;i<this.work_load_data.length;i++){


      // this.shift_name=this.allShiftData[i].sh_name
      if(this.work_load_data[i].shiftName!=null){
          // this.allShiftName.push({"shift_name":this.work_load_data[i].shiftName,"startTime": this.work_load_data[i].startTime,"shiftPattern": 'M'+ this.work_load_data[i].startTime})
        if( Number(this.work_load_data[i].startTime)>2200 ||  Number(this.work_load_data[i].startTime)<600){
          this.allShiftName.push({"id":i+1,"shift_name":this.work_load_data[i].shiftName,"startTime": this.work_load_data[i].startTime,"shiftPattern": 'M'+ this.work_load_data[i].startTime})
        }
        else if( Number(this.work_load_data[i].startTime)>500 &&  Number(this.work_load_data[i].startTime)<1300){
          this.allShiftName.push({"id":i+1,"shift_name":this.work_load_data[i].shiftName,"startTime": this.work_load_data[i].startTime,"shiftPattern": 'D'+ this.work_load_data[i].startTime})
        }
        else if( Number(this.work_load_data[i].startTime)>1200 &&  Number(this.work_load_data[i].startTime)<2300){
          this.allShiftName.push({"id":i+1,"shift_name":this.work_load_data[i].shiftName,"startTime": this.work_load_data[i].startTime,"shiftPattern": 'E'+ this.work_load_data[i].startTime})
        }

      }
    }



    localStorage.setItem('allShiftRequiredData',JSON.stringify(this.work_load_data))
    localStorage.setItem('updatedallShiftRequiredData',JSON.stringify(this.work_load_data))
    localStorage.setItem('outliers',JSON.stringify([]))
    this.loginForm.reset()
  this.navCtrl.navigateForward([straightlines_io_apis.apis.dashboard])
}
allDefaultShiftdata() {

  this.allll=[]
  this.allShiftData=  JSON.parse(localStorage.getItem('allShift'))

  this.test1={"sh_name":null}
  localStorage.setItem('newSHiftDefinition',JSON.stringify(this.test1))
this.work_load_data=[]
for(var i=0;i<this.default_work_load_data.length;i++){
  this.work_load_data.push(this.default_work_load_data[i])
}


  this.arrangeShiftdefintionG=[]
  this.arrangeShiftdefintionL=[]
  for(var i=0;i<this.work_load_data.length;i++){
      if(Number(this.work_load_data[i].startTime)>2200){
  this.arrangeShiftdefintionG.push(this.work_load_data[i])
      }else if(Number(this.work_load_data[i].startTime)<=2200){
        this.arrangeShiftdefintionL.push(this.work_load_data[i])
      }
    }
    this.arrangeShiftdefintionG.sort((a,b) => a.startTime.localeCompare(b.startTime));
    this.arrangeShiftdefintionL.sort((a,b) => a.startTime.localeCompare(b.startTime));


    this.work_load_data=[]
    // this.work_load_data.push(this.arrangeShiftdefintionG)
    for(var i=0;i<this.arrangeShiftdefintionG.length;i++){
      this.work_load_data.push(this.arrangeShiftdefintionG[i])
    }
    for(var i=0;i<this.arrangeShiftdefintionL.length;i++){
      this.work_load_data.push(this.arrangeShiftdefintionL[i])
    }

    for(var i=0;i<this.work_load_data.length;i++){


      // this.shift_name=this.allShiftData[i].sh_name
      if(this.work_load_data[i].shiftName!=null){
          // this.allShiftName.push({"shift_name":this.work_load_data[i].shiftName,"startTime": this.work_load_data[i].startTime,"shiftPattern": 'M'+ this.work_load_data[i].startTime})
        if( Number(this.work_load_data[i].startTime)>2200 ||  Number(this.work_load_data[i].startTime)<600){
          this.allShiftName.push({"id":i+1,"shift_name":this.work_load_data[i].shiftName,"startTime": this.work_load_data[i].startTime,"shiftPattern": 'M'+ this.work_load_data[i].startTime})
        }
        else if( Number(this.work_load_data[i].startTime)>500 &&  Number(this.work_load_data[i].startTime)<1300){
          this.allShiftName.push({"id":i+1,"shift_name":this.work_load_data[i].shiftName,"startTime": this.work_load_data[i].startTime,"shiftPattern": 'D'+ this.work_load_data[i].startTime})
        }
        else if( Number(this.work_load_data[i].startTime)>1200 &&  Number(this.work_load_data[i].startTime)<2300){
          this.allShiftName.push({"id":i+1,"shift_name":this.work_load_data[i].shiftName,"startTime": this.work_load_data[i].startTime,"shiftPattern": 'E'+ this.work_load_data[i].startTime})
        }

      }
    }




    localStorage.setItem('allShiftRequiredData',JSON.stringify(this.work_load_data))
    localStorage.setItem('updatedallShiftRequiredData',JSON.stringify(this.work_load_data))
    localStorage.setItem('outliers',JSON.stringify([]))
    this.loginForm.reset()
  this.navCtrl.navigateForward(straightlines_io_apis.apis.dashboard)
}
passWord(){
  if(this.hidePassword==true){
   return  this.hidePassword=false,this.classId=1
  }else{
    return this.hidePassword=true,this.classId=0
  }

}
passWordClass(cId){
  if(0==cId ) {
    return 'password app-font-primary-color  border-2px-solid form-control ion-no-margin ion-no-padding';
  }else if(0!=cId ){
    return 'app-font-primary-color border-2px-solid form-control ion-no-margin ion-no-padding';
  }

}
}
