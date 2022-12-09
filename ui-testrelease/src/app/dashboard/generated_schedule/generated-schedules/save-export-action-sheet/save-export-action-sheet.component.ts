import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController, LoadingController, ModalController, NavController, NavParams, PopoverController } from '@ionic/angular';
import { HeaderTitleService } from 'src/app/dashboard/nav-bar-footer/header-title.service';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { SaveScheduleComponent } from '../save-schedule/save-schedule.component';
@Component({
  selector: 'app-save-export-action-sheet',
  templateUrl: './save-export-action-sheet.component.html',
  styleUrls: ['./save-export-action-sheet.component.scss'],
})
export class SaveExportActionSheetComponent implements OnInit {
  scheduleShift
  fileName= 'Schedule Data.xlsx';
  defscheduleShift
  deletedShiftLines
  shiftline_schedule_name
  allShiftDataWithIncludeExclude
  user_data
  edit_schedule_id
  defReqVsGeneData
 ReqVsGeneData
 _nextId
 rdosArr
    chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    _chars
    rowCount=0
    defrdosArr=[]
  reqvsgenDefDataShiftTime=[];reqvsgenDefDataSun=[];reqvsgenDefDataMon=[];reqvsgenDefDataTue=[];reqvsgenDefDataWed=[];reqvsgenDefDataThu=[];reqvsgenDefDataFri=[];reqvsgenDefDataSat=[]
  reqvsgenDataShiftTime=[];reqvsgenDataSun=[];reqvsgenDataMon=[];reqvsgenDataTue=[];reqvsgenDataWed=[];reqvsgenDataThu=[];reqvsgenDataFri=[];reqvsgenDataSat=[]
  constructor(
    public modalCtrl: ModalController,
              private route:Router,
              public alertCtrl: AlertController,
              public loadingController: LoadingController,
              public popoverController: PopoverController,
              private headerTitleService: HeaderTitleService,
              private router: ActivatedRoute,public navParams: NavParams,
              public navCtrl: NavController,
              private cdref: ChangeDetectorRef,
              public actionsheetCtrl: ActionSheetController,
  ) {
    this.scheduleShift=navParams.get('scheduleShift')
    this.defscheduleShift=navParams.get('defscheduleShift')
    this.defReqVsGeneData=navParams.get('defReqVsGeneData')
    this.ReqVsGeneData=navParams.get('ReqVsGeneData')
    this.reqvsgenDefDataShiftTime=navParams.get('reqvsgenDefDataShiftTime')
    this.reqvsgenDefDataSun=navParams.get('reqvsgenDefDataSun')
    this.reqvsgenDefDataMon=navParams.get('reqvsgenDefDataMon')
    this.reqvsgenDefDataTue=navParams.get('reqvsgenDefDataTue')
    this.reqvsgenDefDataWed=navParams.get('reqvsgenDefDataWed')
    this.reqvsgenDefDataThu=navParams.get('reqvsgenDefDataThu')
    this.reqvsgenDefDataFri=navParams.get('reqvsgenDefDataFri')
    this.reqvsgenDefDataSat=navParams.get('reqvsgenDefDataSat')
    this.reqvsgenDataShiftTime=navParams.get('reqvsgenDataShiftTime')
    this.reqvsgenDataSun=navParams.get('reqvsgenDataSun')
    this.reqvsgenDataMon=navParams.get('reqvsgenDataMon')
    this.reqvsgenDataTue=navParams.get('reqvsgenDataTue')
    this.reqvsgenDataWed=navParams.get('reqvsgenDataWed')
    this.reqvsgenDataThu=navParams.get('reqvsgenDataThu')
    this.reqvsgenDataFri=navParams.get('reqvsgenDataFri')
    this.reqvsgenDataSat=navParams.get('reqvsgenDataSat')
    this.rdosArr=navParams.get('rdosArr')
    this.defrdosArr=navParams.get('defrdosArr')
   }

  ngOnInit() {
    this.user_data=JSON.parse(sessionStorage.getItem('userData'))
    this.allShiftDataWithIncludeExclude=JSON.parse(localStorage.getItem('updatedallShiftRequiredData'))
  }
  close(){
    this.modalCtrl.dismiss()
  }
  convertRDOtoShiftDefintion(rdo,shiftlength){
    if(String(rdo)=='X' || String(rdo)=='x'){
      return rdo
    }
    else{
      for(var i=0;i<this.allShiftDataWithIncludeExclude.length;i++){
        if(Number(shiftlength)==9){
          if(String(this.allShiftDataWithIncludeExclude[i].shiftName)==String(rdo.split('-')[0]) && Number(rdo.split('-')[1])==Number(this.allShiftDataWithIncludeExclude[i].shift_duration)){
            return String(this.allShiftDataWithIncludeExclude[i].startTime)
          }
        }else{
          if(String(this.allShiftDataWithIncludeExclude[i].shiftName)==String(rdo) && Number(shiftlength)==Number(this.allShiftDataWithIncludeExclude[i].shift_duration)){
            return String(this.allShiftDataWithIncludeExclude[i].startTime)
          }
        }
      }

    }
  }
  async saveInDataBase(){
    var saveDuplicateSchedule=[]
  const modal = await this.modalCtrl.create({
    component: SaveScheduleComponent,
    cssClass: 'saveSchedule',
    componentProps: { saveSchedule:this.scheduleShift,schedule:[]},
    swipeToClose:true
  });
  this.modalCtrl.dismiss()
  return await modal.present();
}
next() {
  const r = [];
  for (const char of this._nextId) {
    r.unshift(this._chars[char]);
  }
  this._increment();
  return r.join('');
}

_increment() {
  for (let i = 0; i < this._nextId.length; i++) {
    const val = ++this._nextId[i];
    if (val >= this._chars.length) {
      this._nextId[i] = 0;
    } else {
      return;
    }
  }
  this._nextId.push(0);
}

*[Symbol.iterator]() {
  while (true) {
    yield this.next();
  }
}
async export() {
let loading = await this.loadingController.create({
  cssClass: 'custom-loading',
  spinner:'bubbles',
  message: 'Please Wait...',
  duration: 10000,

});
await loading.present();
    const workbook = new Workbook();
//Customized Schedule

const header = ['Id','Shiftline Name','Duration', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu','Fri','Sat','Pattern'];
var temp
var tempMonth
var allData=[]
const worksheet = workbook.addWorksheet('Customized Schedule');
// const customized_header = ['Id', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu','Fri','Sat','Pattern'];
// const customized_headerRow = worksheet.addRow(header);
this.rowCount=1
        this._chars = this.chars;
        this._nextId = [0];
        temp=this.next()
        const compDST=worksheet.getCell(temp+this.rowCount);
        compDST.value="Shiftline Schedule"
        compDST.alignment={ vertical: 'middle',horizontal: 'center'   }
        compDST.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'d1d1e0'}};
        compDST.border = {right: {style:'thin'},bottom: {style:'thin'},top: {style:'thin'},left: {style:'thin'},}
        compDST.font = {bold: true,  size: 22};

        var end
        for(var i=1;i<header.length;i++){
          end=this.next()
        }
        this.rowCount=this.rowCount+ + +3
        worksheet.mergeCells(temp+1+':'+end+this.rowCount);
        this.rowCount++
        this._chars = this.chars;
        this._nextId = [0];
          for(var i=0;i<header.length;i++){
            temp=this.next()
            const compT=worksheet.getCell(temp+this.rowCount);
            compT.value=header[i]
            compT.alignment={ vertical: 'middle',horizontal: 'center'   }
            compT.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'d1d1e0'}};
            compT.font = {bold: true};

            compT.border = {top: {style:'thin'},};
            if(i==(header.length+ - +1)){
              compT.border = {right: {style:'thin'},};
            }
          }
          // this.rowCount++

        this._chars = this.chars;
        this._nextId = [0];
        var tempValue
        for(var i=0;i<this.scheduleShift.length;i++){
          if(i>0){

            if(this.scheduleShift[i-1].shiftname!==this.scheduleShift[i].shiftname){
              this.rowCount++
            }
          }
          this.rowCount++
          this._chars = this.chars;
          this._nextId = [0];
          if(Number(this.scheduleShift[i].shiftdurationc)==9){

            allData=[Number(this.scheduleShift[i].id)+ + +1,this.scheduleShift[i].SL+(Number(this.scheduleShift[i].seq)+ + +1),Number(this.scheduleShift[i].shiftdurationc),this.scheduleShift[i].Sun,this.scheduleShift[i].Mon,this.scheduleShift[i].Tue,this.scheduleShift[i].Wed,this.scheduleShift[i].Thu,this.scheduleShift[i].Fri,this.scheduleShift[i].Sat,this.scheduleShift[i].Sunshift2,this.scheduleShift[i].Monshift2,this.scheduleShift[i].Tueshift2,this.scheduleShift[i].Wedshift2,this.scheduleShift[i].Thushift2,this.scheduleShift[i].Frishift2,this.scheduleShift[i].Satshift2,this.scheduleShift[i].Pattern]
          }else{
            allData=[Number(this.scheduleShift[i].id)+ + +1,this.scheduleShift[i].SL+(Number(this.scheduleShift[i].seq)+ + +1),Number(this.scheduleShift[i].shiftdurationc),this.scheduleShift[i].Sun,this.scheduleShift[i].Mon,this.scheduleShift[i].Tue,this.scheduleShift[i].Wed,this.scheduleShift[i].Thu,this.scheduleShift[i].Fri,this.scheduleShift[i].Sat,this.scheduleShift[i].Pattern]
          }
            for(var j=0;j<allData.length;j++){

              if(Number(this.scheduleShift[i].shiftdurationc)==9){
                if(j==10){
                  this._chars = this.chars;
                  this._nextId = [3];
                  this.rowCount++
                }
              }
              temp=this.next()
              const compData=worksheet.getCell(temp+this.rowCount);
              if(Number(this.scheduleShift[i].shiftdurationc)==9){
                if(j==0 || j==1 || j==2){
                  worksheet.mergeCells(temp+this.rowCount+':'+temp+(this.rowCount+ + +1));
                  }
                  if((j+ + +1)==allData.length){
                    worksheet.mergeCells(temp+this.rowCount+':'+temp+(this.rowCount+ - +1));
                  }
              }

              if(j!=0 && j!=1 && j!=2){
                if( allData.length!=(j+ + +1) ){
                  tempValue=String(this.convertRDOtoShiftDefintion(allData[j],this.scheduleShift[i].shiftdurationc))
                }else{
                  tempValue=String(allData[j])
                }

              }else{
                tempValue=String(allData[j])
              }

              if(tempValue=='X' || tempValue=='x'){
              }
              if(this.scheduleShift[i].BMLRule==true){
                compData.font={color: {argb: "37F40B"}};
              }
              if(this.scheduleShift[i].BMLRule==false){
                compData.font={color: {argb: "FF0000"}};
              }
              if(j==1){
                const idCol = worksheet.getColumn(temp);
                idCol.width = 15;
                if(this.scheduleShift[i].SL=='SS' ||this.scheduleShift[i].SL=='SS-A' || this.scheduleShift[i]?.SL  == 'FSS' || this.scheduleShift[i]?.SL  == 'FSS-A'){
                  compData.font={color: {argb: "1EC29D"},bold: true};
                }else if(this.scheduleShift[i].SL=='SM' ||this.scheduleShift[i].SL=='SM-A' || this.scheduleShift[i]?.SL  == 'SMS' || this.scheduleShift[i]?.SL  == 'SMS-A'){
                  compData.font={color: {argb: "FBB053"},bold: true};
                }else if(this.scheduleShift[i].SL=='MT' ||this.scheduleShift[i].SL=='MT-A' || this.scheduleShift[i]?.SL  == 'SMT' || this.scheduleShift[i]?.SL  == 'SMT-A'){
                  compData.font={color: {argb: "F5696C"},bold: true};
                }else if(this.scheduleShift[i].SL=='TW' ||this.scheduleShift[i].SL=='TW-A' || this.scheduleShift[i]?.SL  == 'MTW' || this.scheduleShift[i]?.SL  == 'MTW-A'){
                  compData.font={color: {argb: "9A5FA5"},bold: true};
                }else if(this.scheduleShift[i]?.SL  == 'WT' || this.scheduleShift[i]?.SL  == 'WT-A' || this.scheduleShift[i]?.SL  == 'WTh' || this.scheduleShift[i]?.SL  == 'WTh-A' ||this.scheduleShift[i]?.SL  == 'TWT' || this.scheduleShift[i]?.SL  == 'TWT-A'||this.scheduleShift[i]?.SL  == 'TWTh' || this.scheduleShift[i]?.SL  == 'TWTh-A'){
                  compData.font={color: {argb: "6160CE"},bold: true};
                }else if(this.scheduleShift[i]?.SL  == 'TF' || this.scheduleShift[i]?.SL  == 'TF-A' || this.scheduleShift[i]?.SL  == 'ThF' || this.scheduleShift[i]?.SL  == 'ThF-A' ||this.scheduleShift[i]?.SL  == 'WTF' || this.scheduleShift[i]?.SL  == 'WTF-A'||this.scheduleShift[i]?.SL  == 'WThF' || this.scheduleShift[i]?.SL  == 'WThF-A'){
                  compData.font={color: {argb: "0084FE"},bold: true};
                }else if(this.scheduleShift[i].SL=='FS' ||this.scheduleShift[i].SL=='FS-A' || this.scheduleShift[i]?.SL  == 'TFS' || this.scheduleShift[i]?.SL  == 'TFS-A'||this.scheduleShift[i]?.SL  == 'ThFS' || this.scheduleShift[i]?.SL  == 'ThFS-A'){
                  compData.font={color: {argb: "5AC8FA"},bold: true};
                }else{
                  compData.font={color: {argb: "000000"},bold: true};
                }
              }
              if(Number(this.scheduleShift[i].shiftdurationc)==9){
                if(j==0 || j==1 || j==2){
                  compData.value=tempValue
                }
                else if((j+ + +1)==allData.length){
                  compData.value=tempValue
                }else{
                  if(tempValue=='X'){
                    compData.value=tempValue
                  }else{
                    if(allData[j]!=null && allData[j]!=undefined && allData[j]!='' && allData[j]!='X'){
                      compData.value= {
                        'richText': [
                          {'text': tempValue},
                          {'font': {'vertAlign': 'superscript'},'text': allData[j].split('-')[1]+'hr'},
                        ]
                      };
                    }else{
                      compData.value=tempValue
                    }

                  }
                }
              }
              else{
                compData.value=tempValue
              }
              compData.alignment={ vertical: 'middle', horizontal: 'center' };
              if(i==0 && j==0){
                compData.border = {left: {style:'thin'},top: {style:'thin'}};
              }
               if(i==0 && j!=0 && j<10){
                compData.border = {top: {style:'thin'}};
              }

               if( j==(allData.length+ - +1)){
                compData.border = {right: {style:'thin'}};
              }
              if(i==0 &&  j==(allData.length+ - +1)){
                compData.border = {top: {style:'thin'},right: {style:'thin'}};
              }
              if(Number(this.scheduleShift[i].shiftdurationc)==9){
                if( i==(this.scheduleShift.length+ - +1) && (j==0 || j==1 || j==2 || j>9)){
                  compData.border = {bottom: {style:'thin'}};
                }
              }else{
                if( i==(this.scheduleShift.length+ - +1)){
                  compData.border = {bottom: {style:'thin'}};
                }
              }
              if(allData.length==(j+ + +1)){
                compData.border = {right: {style:'thin'}};
                const idCol = worksheet.getColumn(temp);
                idCol.width = 18;
              }
              if(allData.length==(j+ + +1) && i==0){
                compData.border = {right: {style:'thin'},top: {style:'thin'},};
                const idCol = worksheet.getColumn(temp);
                idCol.width = 18;
              }

              if( i==(this.scheduleShift.length+ - +1) &&  j==(allData.length+ - +1)){
                const idCol = worksheet.getColumn(temp);
                idCol.width = 18;
                compData.border = {right: {style:'thin'},bottom: {style:'thin'},};
              }

            }
        }
        this.rowCount=1
        var temp3,temp4
        temp=this.next()
      var tempColumnName

      temp=this.next()
      temp3=temp
        const customized_total_shit_line_label = worksheet.getCell(temp+this.rowCount);
        customized_total_shit_line_label.value = "Total Shift Lines";
        customized_total_shit_line_label.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'d1d1e0'}};
        customized_total_shit_line_label.alignment={ vertical: 'middle', horizontal: 'center' };
        customized_total_shit_line_label.font = {bold: true};
        var temp2=this.next()
        temp4=temp2
        customized_total_shit_line_label.border = {top: {style:'thin'},right: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}};
        worksheet.mergeCells(temp+this.rowCount+':'+temp2+this.rowCount);
        this.rowCount++
          const  customized_total_shit_line = worksheet.getCell(temp+this.rowCount);
        customized_total_shit_line.alignment={ vertical: 'middle', horizontal: 'center' };
        customized_total_shit_line.value = this.scheduleShift.length;
        customized_total_shit_line.border = {top: {style:'thin'},right: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}};
          worksheet.mergeCells(temp+this.rowCount+':'+temp2+this.rowCount);




      this.rowCount++;this.rowCount++
      var allRDOdata=[]
        for(var s=0;s<this.rdosArr.length;s++){

          allRDOdata=[this.rdosArr[s].rdo,this.rdosArr[s].count]
          if(s==0){
            const rvsgDatad1=worksheet.getCell(temp+this.rowCount);
            rvsgDatad1.value='RDOs'
            const rvsgDatad2=worksheet.getCell(temp2+this.rowCount);
              rvsgDatad2.value='Total'
              rvsgDatad1.font = {bold: true};
              rvsgDatad2.font = {bold: true};
              rvsgDatad1.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'d1d1e0'}};
              rvsgDatad2.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'d1d1e0'}};
              rvsgDatad1.alignment={ vertical: 'middle', horizontal: 'center' };
              rvsgDatad2.alignment={ vertical: 'middle', horizontal: 'center' };
              rvsgDatad1.border = {top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}};
              rvsgDatad2.border = {top: {style:'thin'},right: {style:'thin'},bottom: {style:'thin'}};
          }
          this.rowCount++
            const rvsgData1=worksheet.getCell(temp+this.rowCount);
            rvsgData1.value=this.rdosArr[s].rdo
            const rvsgData2=worksheet.getCell(temp2+this.rowCount);
              rvsgData2.value=this.rdosArr[s].count
              rvsgData1.alignment={ vertical: 'middle', horizontal: 'center' };
              rvsgData2.alignment={ vertical: 'middle', horizontal: 'center' };
                rvsgData1.border = {left: {style:'thin'}};
                rvsgData2.border =  {right: {style:'thin'}};
                if(this.rdosArr[s].rdo=='SS' ||this.rdosArr[s].rdo=='SS-A' || this.rdosArr[s].rdo  == 'FSS' || this.rdosArr[s].rdo  == 'FSS-A'){
                  // rvsgData1.font={color: {argb: "1EC29D"},bold: true};
                  rvsgData1.font={color: {argb: "FFFFFF"},bold: true};
                  rvsgData1.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'1EC29D'}};
                }else if(this.rdosArr[s].rdo=='SM' ||this.rdosArr[s].rdo=='SM-A' || this.rdosArr[s].rdo  == 'SMS' || this.rdosArr[s].rdo  == 'SMS-A'){
                  // rvsgData1.font={color: {argb: "FBB053"},bold: true};
                  rvsgData1.font={color: {argb: "FFFFFF"},bold: true};
                  rvsgData1.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'FBB053'}};
                }else if(this.rdosArr[s].rdo=='MT' ||this.rdosArr[s].rdo=='MT-A' || this.rdosArr[s].rdo  == 'SMT' || this.rdosArr[s].rdo  == 'SMT-A'){
                  // rvsgData1.font={color: {argb: "F5696C"},bold: true};
                  rvsgData1.font={color: {argb: "FFFFFF"},bold: true};
                  rvsgData1.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'F5696C'}};
                }else if(this.rdosArr[s].rdo=='TW' ||this.rdosArr[s].rdo=='TW-A' || this.rdosArr[s].rdo  == 'MTW' || this.rdosArr[s].rdo  == 'MTW-A'){
                  // rvsgData1.font={color: {argb: "9A5FA5"},bold: true};
                  rvsgData1.font={color: {argb: "FFFFFF"},bold: true};
                  rvsgData1.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'9A5FA5'}};
                }else if(this.rdosArr[s].rdo  == 'WT' || this.rdosArr[s].rdo  == 'WT-A' || this.rdosArr[s].rdo  == 'WTh' || this.rdosArr[s].rdo  == 'WTh-A' ||this.rdosArr[s].rdo  == 'TWT' || this.rdosArr[s].rdo  == 'TWT-A'||this.rdosArr[s].rdo  == 'TWTh' || this.rdosArr[s].rdo  == 'TWTh-A'){
                  // rvsgData1.font={color: {argb: "6160CE"},bold: true};
                  rvsgData1.font={color: {argb: "FFFFFF"},bold: true};
                  rvsgData1.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'6160CE'}};
                }else if(this.rdosArr[s].rdo  == 'TF' || this.rdosArr[s].rdo  == 'TF-A' || this.rdosArr[s].rdo  == 'ThF' || this.rdosArr[s].rdo  == 'ThF-A' ||this.rdosArr[s].rdo  == 'WTF' || this.rdosArr[s].rdo  == 'WTF-A'||this.rdosArr[s].rdo  == 'WThF' || this.rdosArr[s].rdo  == 'WThF-A'){
                  // rvsgData1.font={color: {argb: "0084FE"},bold: true};
                  rvsgData1.font={color: {argb: "FFFFFF"},bold: true};
                  rvsgData1.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'0084FE'}};
                }else if(this.rdosArr[s].rdo=='FS' ||this.rdosArr[s].rdo=='FS-A' || this.rdosArr[s].rdo  == 'TFS' || this.rdosArr[s].rdo  == 'TFS-A'||this.rdosArr[s].rdo  == 'ThFS' || this.rdosArr[s].rdo  == 'ThFS-A'){
                  // rvsgData1.font={color: {argb: "5AC8FA"},bold: true};
                  rvsgData1.font={color: {argb: "FFFFFF"},bold: true};
                  rvsgData1.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'5AC8FA'}};
                }else{
                  rvsgData1.font={color: {argb: "FFFFFF"},bold: true};
                  rvsgData1.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'000000'}};
                }
              if(s==0){
                rvsgData1.border = {top: {style:'thin'},left: {style:'thin'}};
                rvsgData2.border = {top: {style:'thin'},right: {style:'thin'}};
              }
              if(s+ + +1==this.rdosArr.length){
                rvsgData1.border = {bottom: {style:'thin'},left: {style:'thin'}};
                rvsgData2.border = {bottom: {style:'thin'},right: {style:'thin'}};
              }


        }
        var tempBLRule=temp2
        this.rowCount=1
        tempBLRule=this.next()
        tempColumnName=tempBLRule
        tempBLRule=this.next()
        temp=tempBLRule

        const customized_BLRule_label_color_red = worksheet.getCell(tempBLRule+this.rowCount);
      customized_BLRule_label_color_red.value = '';
      customized_BLRule_label_color_red.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'FF0000'}};
      customized_BLRule_label_color_red.alignment={ vertical: 'middle', horizontal: 'center' };
      customized_BLRule_label_color_red.font = {bold: true};
      customized_BLRule_label_color_red.border = {top: {style:'thin'},left: {style:'thin'}};
        this.rowCount++
      const customized_BLRule_label_color_green = worksheet.getCell(tempBLRule+this.rowCount);
      customized_BLRule_label_color_green.value = '';
      customized_BLRule_label_color_green.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'37F40B'}};
      customized_BLRule_label_color_green.alignment={ vertical: 'middle', horizontal: 'center' };
      customized_BLRule_label_color_green.font = {bold: true};
      customized_BLRule_label_color_green.border = {bottom: {style:'thin'},left: {style:'thin'}};


      tempBLRule=this.next()

      this.rowCount=1
      const customized_BLRule_label_false = worksheet.getCell(tempBLRule+this.rowCount);
      customized_BLRule_label_false.value = 'Business rules not met';
      customized_BLRule_label_false.alignment={ vertical: 'middle', horizontal: 'center' };
      customized_BLRule_label_false.font = {bold: true};
      customized_BLRule_label_false.border = {top: {style:'thin'},right: {style:'thin'}};
      var mtempBLRule=this.next();mtempBLRule=this.next();mtempBLRule=this.next()
      worksheet.mergeCells(tempBLRule+this.rowCount+':'+mtempBLRule+this.rowCount);
      this.rowCount++
      const customized_BLRule_label_true = worksheet.getCell(tempBLRule+this.rowCount);
      customized_BLRule_label_true.value = 'Business rules met';
      customized_BLRule_label_true.alignment={ vertical: 'middle', horizontal: 'center' };
      customized_BLRule_label_true.font = {bold: true};
      customized_BLRule_label_true.border = {bottom: {style:'thin'},right: {style:'thin'}};
      worksheet.mergeCells(tempBLRule+this.rowCount+':'+mtempBLRule+this.rowCount);
          this.rowCount++
          this.rowCount++
          const  customized_required_vs_generated_title=worksheet.getCell(temp+this.rowCount)
        customized_required_vs_generated_title.alignment={ vertical: 'middle', horizontal: 'center' };
        customized_required_vs_generated_title.value="Required vs System Generated Workforce (Shift Category)"
        customized_required_vs_generated_title.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'d1d1e0'}};
        customized_required_vs_generated_title.font = {bold: true};
        // for(var i=0;i<6;i++){
        //   temp2=this.next()
        // }
        for(var i=0;i<3;i++){
          mtempBLRule=this.next()
        }
        worksheet.mergeCells(temp+this.rowCount+':'+mtempBLRule+this.rowCount);

            for(var s=0;s<this.ReqVsGeneData.length;s++){
              this.rowCount++
              this._chars = this.chars.split(tempColumnName)[1]
              this._nextId=[0]
              for(var t=0;t<this.ReqVsGeneData[s].length;t++){
                temp2=this.next()

                  const rvsgData=worksheet.getCell(temp2+this.rowCount);
                  rvsgData.value=this.ReqVsGeneData[s][t]
                  if(s==0){
                    rvsgData.font = {bold: true};
                    rvsgData.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'d1d1e0'}};
                  }
                  rvsgData.alignment={ vertical: 'middle', horizontal: 'center' };
                  if(t==0){
                    rvsgData.border = {left: {style:'thin'}};
                  }
                  if(s==0 && t==0){
                    rvsgData.border = {left: {style:'thin'},top: {style:'thin'}};
                  }
                  if(s==0 && t!=0){
                    rvsgData.border = {top: {style:'thin'}};
                  }
                  if(t==(this.ReqVsGeneData[s].length+ - +1)){
                    rvsgData.border = {right: {style:'thin'}};
                  }
                  if(s==0 &&  t==(this.ReqVsGeneData[s].length+ - +1)){
                    rvsgData.border = {top: {style:'thin'},right: {style:'thin'}};
                  }
                  if( s==(this.ReqVsGeneData.length+ - +1)){
                    rvsgData.border = {bottom: {style:'thin'}};
                  }

                  if(s==(this.ReqVsGeneData.length+ - +1) && t==0){
                    rvsgData.border = {left: {style:'thin'},bottom: {style:'thin'}};
                  }
                  if( t==(this.ReqVsGeneData[s].length+ - +1) &&  s==(this.ReqVsGeneData.length+ - +1)){
                    rvsgData.border = {right: {style:'thin'},bottom: {style:'thin'},};
                  }
              }
            }

            this.rowCount++
            this.rowCount++
            this._chars = this.chars.split(tempColumnName)[1]
            this._nextId=[0]
        const  customized_required_title=worksheet.getCell(temp+this.rowCount)
        customized_required_title.alignment={ vertical: 'middle', horizontal: 'center' };
        customized_required_title.value="Required Workforce vs System Generated Workforce (Shift Time)"
        customized_required_title.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'d1d1e0'}};
        customized_required_title.font = {bold: true};
        for(var i=0;i<10;i++){
          temp2=this.next()
        }
        worksheet.mergeCells(temp+this.rowCount+':'+temp2+this.rowCount);
        for(var i=0;i<this.reqvsgenDataShiftTime.length;i++){
          this.rowCount++
          this._chars = this.chars.split(tempColumnName)[1]
          this._nextId=[0]
          var ccheckDisable=false
          if(this.reqvsgenDataSun[i]=='0/0' && this.reqvsgenDataMon[i]=='0/0' && this.reqvsgenDataTue[i]=='0/0' && this.reqvsgenDataWed[i]=='0/0' && this.reqvsgenDataThu[i]=='0/0' && this.reqvsgenDataFri[i]=='0/0' && this.reqvsgenDataSat[i]=='0/0'){
            ccheckDisable=true
          }else{
            ccheckDisable=false
          }
          // this.reqvsgenDataShiftTime.push({"shift_start":"Shifts","shift_length":"Duration","shift_name":"Shift Name"})
          allData=[this.reqvsgenDataShiftTime[i].shift_start,this.reqvsgenDataShiftTime[i].shift_length,this.reqvsgenDataShiftTime[i].shift_name,this.reqvsgenDataSun[i],this.reqvsgenDataMon[i],this.reqvsgenDataTue[i],this.reqvsgenDataWed[i],this.reqvsgenDataThu[i],this.reqvsgenDataFri[i],this.reqvsgenDataSat[i]]
            for(var j=0;j<allData.length;j++){
              temp2=this.next()
              if(j==2){
                const idCol = worksheet.getColumn(temp2);
                idCol.width = 15;
              }
              const compData=worksheet.getCell(temp2+this.rowCount);
                tempValue=String(allData[j])
              compData.value=tempValue
              compData.alignment={ vertical: 'middle', horizontal: 'center' };
              if(i==0){
                compData.font = {bold: true};
                compData.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'d1d1e0'}};
              }
              if(j==0){
                compData.border = {left: {style:'thin'}};
              }
              if(i==0 && j==0){
                compData.border = {left: {style:'thin'},top: {style:'thin'}};
              }
               if(i==0 && j!=0 && j<10){
                compData.border = {top: {style:'thin'}};
              }

               if( j==(allData.length+ - +1)){
                compData.border = {right: {style:'thin'}};
              }

              if(i==0 &&  j==(allData.length+ - +1)){
                compData.border = {top: {style:'thin'},right: {style:'thin'}};
              }
              if( i==(this.reqvsgenDataShiftTime.length+ - +1)){
                compData.border = {bottom: {style:'thin'}};
              }
              if( i==(this.reqvsgenDataShiftTime.length+ - +1) &&  j==(allData.length+ - +1)){
                compData.border = {right: {style:'thin'},bottom: {style:'thin'},};
              }

              if(i==(this.reqvsgenDataShiftTime.length+ - +1) && j==0){
                compData.border = {left: {style:'thin'},bottom: {style:'thin'}};
              }
              if(ccheckDisable==true ){
                compData.font={color: {argb: "696969"}};
              }
            }
        }

// Default

            const def_worksheet = workbook.addWorksheet('System Generated Schedule');
// const customized_header = ['Id', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu','Fri','Sat','Pattern'];

// const customized_headerRow = worksheet.addRow(header);

this.rowCount=1
        this._chars = this.chars;
        this._nextId = [0];
        temp=this.next()
        const compST=def_worksheet.getCell(temp+this.rowCount);
        compST.value="Shiftline Schedule"
        compST.alignment={ vertical: 'middle',horizontal: 'center'   }
        compST.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'d1d1e0'}};
        compST.border = {right: {style:'thin'},bottom: {style:'thin'},top: {style:'thin'},left: {style:'thin'},}
        compST.font = {bold: true,  size: 22};

        var end
        for(var i=1;i<header.length;i++){
          end=this.next()
        }
        this.rowCount=this.rowCount+ + +3
        def_worksheet.mergeCells(temp+1+':'+end+this.rowCount);
        this.rowCount++
        this._chars = this.chars;
        this._nextId = [0];
          for(var i=0;i<header.length;i++){
            temp=this.next()
            const compT=def_worksheet.getCell(temp+this.rowCount);
            compT.value=header[i]
            compT.alignment={ vertical: 'middle',horizontal: 'center'   }
            compT.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'d1d1e0'}};
            compT.font = {bold: true};

            compT.border = {top: {style:'thin'},};
            if(i==(header.length+ - +1)){
              compT.border = {right: {style:'thin'},};
            }
          }

        this._chars = this.chars;
        this._nextId = [0];
        var tempValue

        for(var i=0;i<this.defscheduleShift.length;i++){
          if(i>0){

            if(this.defscheduleShift[i-1].shiftname!==this.defscheduleShift[i].shiftname){
              this.rowCount++
            }
          }
          this.rowCount++
          this._chars = this.chars;
          this._nextId = [0];

            allData=[Number(this.defscheduleShift[i].id)+ + +1,this.defscheduleShift[i].SL+(Number(this.defscheduleShift[i].seq)+ + +1),this.defscheduleShift[i].shiftdurationc,this.defscheduleShift[i].Sun,this.defscheduleShift[i].Mon,this.defscheduleShift[i].Tue,this.defscheduleShift[i].Wed,this.defscheduleShift[i].Thu,this.defscheduleShift[i].Fri,this.defscheduleShift[i].Sat,this.defscheduleShift[i].Pattern]
            for(var j=0;j<allData.length;j++){
              temp=this.next()
              const defcompData=def_worksheet.getCell(temp+this.rowCount);

              if(j!=0 && j!=1 && j!=2){
                if( allData.length!=(j+ + +1)){
                  tempValue=String(this.convertRDOtoShiftDefintion(allData[j],this.defscheduleShift[i].shiftdurationc))
                }else{
                  tempValue=String(allData[j])
                }

              }else{
                tempValue=String(allData[j])
              }
              if(tempValue=='X' || tempValue=='x'){
              }
              if(this.defscheduleShift[i].BMLRule==true){
                defcompData.font={color: {argb: "37F40B"}};
              }
              if(this.defscheduleShift[i].BMLRule==false){
                defcompData.font={color: {argb: "FF0000"}};
              }
              if(j==1){
                const idCol = def_worksheet.getColumn(temp);
                idCol.width = 15;
                if(this.defscheduleShift[i].SL=='SS' ||this.defscheduleShift[i].SL=='SS-A' || this.defscheduleShift[i]?.SL  == 'FSS' || this.defscheduleShift[i]?.SL  == 'FSS-A'){
                  defcompData.font={color: {argb: "1EC29D"},bold: true};
                }else if(this.defscheduleShift[i].SL=='SM' ||this.defscheduleShift[i].SL=='SM-A' || this.defscheduleShift[i]?.SL  == 'SMS' || this.defscheduleShift[i]?.SL  == 'SMS-A'){
                  defcompData.font={color: {argb: "FBB053"},bold: true};
                }else if(this.defscheduleShift[i].SL=='MT' ||this.defscheduleShift[i].SL=='MT-A' || this.defscheduleShift[i]?.SL  == 'SMT' || this.defscheduleShift[i]?.SL  == 'SMT-A'){
                  defcompData.font={color: {argb: "F5696C"},bold: true};
                }else if(this.defscheduleShift[i].SL=='TW' ||this.defscheduleShift[i].SL=='TW-A' || this.defscheduleShift[i]?.SL  == 'MTW' || this.defscheduleShift[i]?.SL  == 'MTW-A'){
                  defcompData.font={color: {argb: "9A5FA5"},bold: true};
                }else if(this.defscheduleShift[i]?.SL  == 'WT' || this.defscheduleShift[i]?.SL  == 'WT-A' || this.defscheduleShift[i]?.SL  == 'WTh' || this.defscheduleShift[i]?.SL  == 'WTh-A' ||this.defscheduleShift[i]?.SL  == 'TWT' || this.defscheduleShift[i]?.SL  == 'TWT-A'||this.defscheduleShift[i]?.SL  == 'TWTh' || this.defscheduleShift[i]?.SL  == 'TWTh-A'){
                  defcompData.font={color: {argb: "6160CE"},bold: true};
                }else if(this.defscheduleShift[i]?.SL  == 'TF' || this.defscheduleShift[i]?.SL  == 'TF-A' || this.defscheduleShift[i]?.SL  == 'ThF' || this.defscheduleShift[i]?.SL  == 'ThF-A' ||this.defscheduleShift[i]?.SL  == 'WTF' || this.defscheduleShift[i]?.SL  == 'WTF-A'||this.defscheduleShift[i]?.SL  == 'WThF' || this.defscheduleShift[i]?.SL  == 'WThF-A'){
                  defcompData.font={color: {argb: "0084FE"},bold: true};
                }else if(this.defscheduleShift[i].SL=='FS' ||this.defscheduleShift[i].SL=='FS-A' || this.defscheduleShift[i]?.SL  == 'TFS' || this.defscheduleShift[i]?.SL  == 'TFS-A'||this.defscheduleShift[i]?.SL  == 'ThFS' || this.defscheduleShift[i]?.SL  == 'ThFS-A'){
                  defcompData.font={color: {argb: "5AC8FA"},bold: true};
                }else{
                  defcompData.font={color: {argb: "000000"},bold: true};
                }
              }
              if(Number(this.defscheduleShift[i].shiftdurationc)==9){
                if(j==0 || j==1 || j==2){
                  defcompData.value=tempValue
                }
                else if((j+ + +1)==allData.length){
                  defcompData.value=tempValue
                }else{
                  if(tempValue=='X'){
                    defcompData.value=tempValue
                  }else{
                    if(allData[j]!=null && allData[j]!=undefined && allData[j]!='' && allData[j]!='X'){
                      defcompData.value= {
                        'richText': [
                          {'text': tempValue},
                          {'font': {'vertAlign': 'superscript'},'text': allData[j].split('-')[1]+'hr'},
                        ]
                      };
                    }else{
                      defcompData.value=tempValue
                    }

                  }
                }
              }
              else{
                defcompData.value=tempValue
              }

              defcompData.alignment={ vertical: 'middle', horizontal: 'center' };
              if(i==0 && j==0){
                defcompData.border = {left: {style:'thin'},top: {style:'thin'}};
              }
               if(i==0 && j!=0){
                defcompData.border = {top: {style:'thin'}};
              }

               if( j==(allData.length+ - +1)){
                defcompData.border = {right: {style:'thin'}};
              }
              if(i==0 &&  j==(allData.length+ - +1)){
                defcompData.border = {top: {style:'thin'},right: {style:'thin'}};
              }
              if( i==(this.defscheduleShift.length+ - +1)){
                defcompData.border = {bottom: {style:'thin'}};
              }
              if( i==(this.defscheduleShift.length+ - +1) &&  j==(allData.length+ - +1)){
                defcompData.border = {right: {style:'thin'},bottom: {style:'thin'},};
              }
              if(Number(this.defscheduleShift[i].shiftdurationc)==9){
                if( i==(this.defscheduleShift.length+ - +1) && (j==0 || j==1 || j==2 || j>9)){
                  defcompData.border = {bottom: {style:'thin'}};
                }
              }else{
                if( i==(this.defscheduleShift.length+ - +1)){
                  defcompData.border = {bottom: {style:'thin'}};
                }
              }
              if(allData.length==(j+ + +1)){
                defcompData.border = {right: {style:'thin'}};
                const idCol = def_worksheet.getColumn(temp);
                idCol.width = 18;
              }
              if(allData.length==(j+ + +1) && i==0){
                defcompData.border = {right: {style:'thin'},top: {style:'thin'},};
                const idCol = def_worksheet.getColumn(temp);
                idCol.width = 18;
              }
              if( i==(this.defscheduleShift.length+ - +1) &&  j==(allData.length+ - +1)){
                const idCol = def_worksheet.getColumn(temp);
                idCol.width = 18;
                defcompData.border = {right: {style:'thin'},bottom: {style:'thin'},};
              }
            }
        }

      this.rowCount=1
      var temp3,temp4
      temp=this.next()
      var tempColumnName
      temp=this.next()
      temp3=temp

        const def_customized_total_shit_line_label = def_worksheet.getCell(temp+this.rowCount);
        def_customized_total_shit_line_label.value = "Total Shift Lines";
        def_customized_total_shit_line_label.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'d1d1e0'}};
        def_customized_total_shit_line_label.alignment={ vertical: 'middle', horizontal: 'center' };
        def_customized_total_shit_line_label.font = {bold: true};
        var temp2=this.next()
        def_customized_total_shit_line_label.border = {top: {style:'thin'},right: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}};
        def_worksheet.mergeCells(temp+this.rowCount+':'+temp2+this.rowCount);
      this.rowCount++
          const  def_customized_total_shit_line = def_worksheet.getCell(temp+this.rowCount);
          def_customized_total_shit_line.alignment={ vertical: 'middle', horizontal: 'center' };
          def_customized_total_shit_line.value = this.defscheduleShift.length;
          def_customized_total_shit_line.border = {top: {style:'thin'},right: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}};
          def_worksheet.mergeCells(temp+this.rowCount+':'+temp2+this.rowCount);

          this.rowCount++;this.rowCount++
          var allRDOdata=[]
            for(var s=0;s<this.defrdosArr.length;s++){

              if(s==0){
                const rvsgDatad1=def_worksheet.getCell(temp+this.rowCount);
                rvsgDatad1.value='RDOs'
                const rvsgDatad2=def_worksheet.getCell(temp2+this.rowCount);
                  rvsgDatad2.value='Total'
                  rvsgDatad1.font = {bold: true};
                  rvsgDatad2.font = {bold: true};
                  rvsgDatad1.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'d1d1e0'}};
                  rvsgDatad2.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'d1d1e0'}};
                  rvsgDatad1.alignment={ vertical: 'middle', horizontal: 'center' };
                  rvsgDatad2.alignment={ vertical: 'middle', horizontal: 'center' };
                  rvsgDatad1.border = {top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}};
                  rvsgDatad2.border = {top: {style:'thin'},right: {style:'thin'},bottom: {style:'thin'}};

              }
              this.rowCount++
                const rvsgData1=def_worksheet.getCell(temp+this.rowCount);
                rvsgData1.value=this.defrdosArr[s].rdo
                const rvsgData2=def_worksheet.getCell(temp2+this.rowCount);
                  rvsgData2.value=this.defrdosArr[s].count
                  if(this.defrdosArr[s].rdo=='SS' ||this.defrdosArr[s].rdo=='SS-A' || this.defrdosArr[s].rdo  == 'FSS' || this.defrdosArr[s].rdo  == 'FSS-A'){
                    // rvsgData1.font={color: {argb: "1EC29D"},bold: true};
                    rvsgData1.font={color: {argb: "FFFFFF"},bold: true};
                    rvsgData1.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'1EC29D'}};
                  }else if(this.defrdosArr[s].rdo=='SM' ||this.defrdosArr[s].rdo=='SM-A' || this.defrdosArr[s].rdo  == 'SMS' || this.defrdosArr[s].rdo  == 'SMS-A'){
                    // rvsgData1.font={color: {argb: "FBB053"},bold: true};
                    rvsgData1.font={color: {argb: "FFFFFF"},bold: true};
                    rvsgData1.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'FBB053'}};
                  }else if(this.defrdosArr[s].rdo=='MT' ||this.defrdosArr[s].rdo=='MT-A' || this.defrdosArr[s].rdo  == 'SMT' || this.defrdosArr[s].rdo  == 'SMT-A'){
                    // rvsgData1.font={color: {argb: "F5696C"},bold: true};
                    rvsgData1.font={color: {argb: "FFFFFF"},bold: true};
                    rvsgData1.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'F5696C'}};
                  }else if(this.defrdosArr[s].rdo=='TW' ||this.defrdosArr[s].rdo=='TW-A' || this.defrdosArr[s].rdo  == 'MTW' || this.defrdosArr[s].rdo  == 'MTW-A'){
                    // rvsgData1.font={color: {argb: "9A5FA5"},bold: true};
                    rvsgData1.font={color: {argb: "FFFFFF"},bold: true};
                    rvsgData1.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'9A5FA5'}};
                  }else if(this.defrdosArr[s].rdo  == 'WT' || this.defrdosArr[s].rdo  == 'WT-A' || this.defrdosArr[s].rdo  == 'WTh' || this.defrdosArr[s].rdo  == 'WTh-A' ||this.defrdosArr[s].rdo  == 'TWT' || this.defrdosArr[s].rdo  == 'TWT-A'||this.defrdosArr[s].rdo  == 'TWTh' || this.defrdosArr[s].rdo  == 'TWTh-A'){
                    // rvsgData1.font={color: {argb: "6160CE"},bold: true};
                    rvsgData1.font={color: {argb: "FFFFFF"},bold: true};
                    rvsgData1.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'6160CE'}};
                  }else if(this.defrdosArr[s].rdo  == 'TF' || this.defrdosArr[s].rdo  == 'TF-A' || this.defrdosArr[s].rdo  == 'ThF' || this.defrdosArr[s].rdo  == 'ThF-A' ||this.defrdosArr[s].rdo  == 'WTF' || this.defrdosArr[s].rdo  == 'WTF-A'||this.defrdosArr[s].rdo  == 'WThF' || this.defrdosArr[s].rdo  == 'WThF-A'){
                    // rvsgData1.font={color: {argb: "0084FE"},bold: true};
                    rvsgData1.font={color: {argb: "FFFFFF"},bold: true};
                    rvsgData1.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'0084FE'}};
                  }else if(this.defrdosArr[s].rdo=='FS' ||this.defrdosArr[s].rdo=='FS-A' || this.defrdosArr[s].rdo  == 'TFS' || this.defrdosArr[s].rdo  == 'TFS-A'||this.defrdosArr[s].rdo  == 'ThFS' || this.defrdosArr[s].rdo  == 'ThFS-A'){
                    // rvsgData1.font={color: {argb: "5AC8FA"},bold: true};
                    rvsgData1.font={color: {argb: "FFFFFF"},bold: true};
                    rvsgData1.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'5AC8FA'}};
                  }else{
                    rvsgData1.font={color: {argb: "FFFFFF"},bold: true};
                    rvsgData1.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'000000'}};
                  }
                  rvsgData1.alignment={ vertical: 'middle', horizontal: 'center' };
                  rvsgData2.alignment={ vertical: 'middle', horizontal: 'center' };
                    rvsgData1.border = {left: {style:'thin'}};
                    rvsgData2.border =  {right: {style:'thin'}};
                  if(s==0){
                    rvsgData1.border = {top: {style:'thin'},left: {style:'thin'}};
                    rvsgData2.border = {top: {style:'thin'},right: {style:'thin'}};
                  }
                  if(s+ + +1==this.defrdosArr.length){
                    rvsgData1.border = {bottom: {style:'thin'},left: {style:'thin'}};
                    rvsgData2.border = {bottom: {style:'thin'},right: {style:'thin'}};
                  }


            }
            var tempBLRule=temp2
            this.rowCount=3
            tempBLRule=this.next()
            tempColumnName=tempBLRule
            tempBLRule=this.next()
            temp=tempBLRule

          this.rowCount++
          const  def_customized_required_vs_generated_title=def_worksheet.getCell(temp+this.rowCount)
          def_customized_required_vs_generated_title.alignment={ vertical: 'middle', horizontal: 'center' };
          def_customized_required_vs_generated_title.value="Required vs System Generated Workforce (Shift Category)"
          def_customized_required_vs_generated_title.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'d1d1e0'}};
          def_customized_required_vs_generated_title.font = {bold: true};
        for(var i=0;i<7;i++){
          temp2=this.next()
        }
        def_worksheet.mergeCells(temp+this.rowCount+':'+temp2+this.rowCount);

            for(var s=0;s<this.defReqVsGeneData.length;s++){
              this.rowCount++
              this._chars = this.chars.split(tempColumnName)[1]
              this._nextId=[0]
              for(var t=0;t<this.defReqVsGeneData[s].length;t++){
                temp2=this.next()
                  const def_rvsgData=def_worksheet.getCell(temp2+this.rowCount);
                  def_rvsgData.value=this.defReqVsGeneData[s][t]
                  if(s==0){
                    def_rvsgData.font = {bold: true};
                    def_rvsgData.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'d1d1e0'}};
                  }
                  def_rvsgData.alignment={ vertical: 'middle', horizontal: 'center' };
                  if(t==0){
                    def_rvsgData.border = {left: {style:'thin'}};
                  }
                  if(s==0 && t==0){
                    def_rvsgData.border = {left: {style:'thin'},top: {style:'thin'}};
                  }
                  if(s==0 && t!=0){
                    def_rvsgData.border = {top: {style:'thin'}};
                  }
                  if(t==(this.defReqVsGeneData[s].length+ - +1)){
                    def_rvsgData.border = {right: {style:'thin'}};
                  }
                  if(s==0 &&  t==(this.defReqVsGeneData[s].length+ - +1)){
                    def_rvsgData.border = {top: {style:'thin'},right: {style:'thin'}};
                  }
                  if( s==(this.defReqVsGeneData.length+ - +1)){
                    def_rvsgData.border = {bottom: {style:'thin'}};
                  }

                  if(s==(this.defReqVsGeneData.length+ - +1) && t==0){
                    def_rvsgData.border = {left: {style:'thin'},bottom: {style:'thin'}};
                  }
                  if( t==(this.defReqVsGeneData[s].length+ - +1) &&  s==(this.defReqVsGeneData.length+ - +1)){
                    def_rvsgData.border = {right: {style:'thin'},bottom: {style:'thin'},};
                  }
              }
            }

            this.rowCount++
            this.rowCount++
            this._chars = this.chars.split(tempColumnName)[1]
            this._nextId=[0]
        const  def_customized_required_title=def_worksheet.getCell(temp+this.rowCount)
        def_customized_required_title.alignment={ vertical: 'middle', horizontal: 'center' };
        def_customized_required_title.value="Required Workforce vs System Generated Workforce (Shift Time)"
        def_customized_required_title.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'d1d1e0'}};
        def_customized_required_title.font = {bold: true};
        for(var i=0;i<10;i++){
          temp2=this.next()
        }
        def_worksheet.mergeCells(temp+this.rowCount+':'+temp2+this.rowCount);
        for(var i=0;i<this.reqvsgenDefDataShiftTime.length;i++){
          this.rowCount++
          this._chars = this.chars.split(tempColumnName)[1]
          this._nextId=[0]
          var checkDisable=false
          if(this.reqvsgenDefDataSun[i]=='0/0' && this.reqvsgenDefDataMon[i]=='0/0' && this.reqvsgenDefDataTue[i]=='0/0' && this.reqvsgenDefDataWed[i]=='0/0' && this.reqvsgenDefDataThu[i]=='0/0' && this.reqvsgenDefDataFri[i]=='0/0' && this.reqvsgenDefDataSat[i]=='0/0'){
            checkDisable=true
          }else{
            checkDisable=false
          }
            allData=[this.reqvsgenDefDataShiftTime[i].shift_start,this.reqvsgenDefDataShiftTime[i].shift_length,this.reqvsgenDefDataShiftTime[i].shift_name,this.reqvsgenDefDataSun[i],this.reqvsgenDefDataMon[i],this.reqvsgenDefDataTue[i],this.reqvsgenDefDataWed[i],this.reqvsgenDefDataThu[i],this.reqvsgenDefDataFri[i],this.reqvsgenDefDataSat[i]]

            for(var j=0;j<allData.length;j++){
              temp2=this.next()
              const compData=def_worksheet.getCell(temp2+this.rowCount);
                tempValue=String(allData[j])
              compData.value=tempValue
              compData.alignment={ vertical: 'middle', horizontal: 'center' };
              if(i==0){
                compData.font = {bold: true};
                compData.fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'d1d1e0'}};
              }
              if(j==0){
                compData.border = {left: {style:'thin'}};
              }
              if(i==0 && j==0){
                compData.border = {left: {style:'thin'},top: {style:'thin'}};
              }
               if(i==0 && j!=0){
                compData.border = {top: {style:'thin'}};
              }

               if( j==(allData.length+ - +1)){
                compData.border = {right: {style:'thin'}};
              }

              if(i==0 &&  j==(allData.length+ - +1)){
                compData.border = {top: {style:'thin'},right: {style:'thin'}};
              }
              if( i==(this.reqvsgenDefDataShiftTime.length+ - +1)){
                compData.border = {bottom: {style:'thin'}};
              }
              if( i==(this.reqvsgenDefDataShiftTime.length+ - +1) &&  j==(allData.length+ - +1)){
                compData.border = {right: {style:'thin'},bottom: {style:'thin'},};
              }

              if(i==(this.reqvsgenDefDataShiftTime.length+ - +1) && j==0){
                compData.border = {left: {style:'thin'},bottom: {style:'thin'}};
              }
              if(checkDisable==true ){
                compData.font={color: {argb: "696969"}};
              }
            }
        }

// Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
  const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  fs.saveAs(blob,  this.fileName);
});
this.modalCtrl.dismiss()
await loading.dismiss();
  }
}
