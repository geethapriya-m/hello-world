import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IonToggle, NavController } from '@ionic/angular';
import { HeaderTitleService } from 'src/app/dashboard/nav-bar-footer/header-title.service';
import { MyBiddingService } from '../my-bidding.service';
import straightlines_io_apis from 'src/app/json/apis.json';
import { AddNewEmployeeService } from 'src/app/services/manage-bid-schedule/add-new-employee/add-new-employee.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import * as fs from "file-saver";
import * as docx from "docx";
import { AlignmentType, BorderStyle, Document,HeadingLevel, HorizontalPosition, HorizontalPositionAlign, Packer, Paragraph, SymbolRun, Table, TableCell, TableRow, TextRun, VerticalAlign, VerticalPositionAlign, WidthType } from 'docx';

@Component({
  selector: 'app-view-seniority-list',
  templateUrl: './view-seniority-list.component.html',
  styleUrls: ['./view-seniority-list.component.scss'],
})
export class ViewSeniorityListComponent implements OnInit {
  user_data: any;
  @ViewChild('mytoggle', {static: true}) mytoggle: IonToggle;
  allEmployee=[]
  editlist=true
  changeToggleValue
  round_id
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  @Output() passBidScheduleName: EventEmitter<any> = new EventEmitter<any>();@Output() passroundId: EventEmitter<any> = new EventEmitter<any>();
  bid_schedule_name="none"
  constructor(private route: ActivatedRoute,public navCtrl: NavController,
    private myBiddingSer:MyBiddingService,
    private cdref: ChangeDetectorRef,
    public formBuilder: FormBuilder,
    private getAllEmp:AddNewEmployeeService,
    private headerTitleService: HeaderTitleService) {
    this.route.params.subscribe(params => {
      this.bid_schedule_name = params['_bidScheduleName'];
        this.round_id = params['_rid'];
        this.passBidScheduleName.emit(this.bid_schedule_name)
        this.passroundId.emit(this.round_id)
  });
    }
  ngOnInit() {
    this.user_data=JSON.parse(sessionStorage.getItem('userData'))
    this.headerTitleService.setTitle('Seniority List');
    this.headerTitleService.setDefaultHeader(true)
    this.headerTitleService.setBackUrl(straightlines_io_apis.apis.my_bidding);
      this.headerTitleService.setForwardUrl(null);this.headerTitleService.checkBiddingTime('biddingheader')
      this.myBiddingSer.setTitle('seniorityList')
      this.passBidScheduleName.emit(this.bid_schedule_name)
      this.passroundId.emit(this.round_id )
      this.allEmp()
      this.editlist=true



  }
  toggleCss(){
    if(/webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
      return 'iPhone'
    }else{
      return 'android'
    }
  }


  changeToggle(e){
    this.editlist=!this.changeToggleValue
  }
   allEmp(){
    this.getAllEmp.getAllEmployeeBasedOnUserId(this.user_data.id).subscribe(
      (res)=>{this.allEmployee=res
        this.allEmployee=this.allEmployee.sort((a, b) => a.rank - b.rank)

    },
      (err)=>{console.log(err)},()=>{})
}
drop(event: CdkDragDrop<string[]>) {

  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }

  var oldIndex,newIndex
  oldIndex=event.previousIndex
  newIndex=event.currentIndex
      var temp=[],tempArr=[],tempRankOne,tempRank
      temp=event.container.data
      for(var i=0;i<temp.length;i++){

        var tempObj={"email": temp[i].email,
        "fname": temp[i].fname,
        "empid": temp[i].empid,
        "initials": temp[i].initials,
        "lname": temp[i].lname,
        "phone": temp[i].phone,
        "qualification": temp[i].qualification,
        "rank": i+1,
        "role": temp[i].role,
        "managerid":temp[i].managerid,
        "vacation": temp[i].vacation
      }
        tempArr.push(tempObj)
      }
      this.allEmployee=tempArr

      this.getAllEmp.updateAllEmp(this.allEmployee).subscribe((res)=>{

      },
      (err)=>{console.log(err)},()=>{})
  }
  downloadOne(){
    var tempArr=[]
    tempArr.push(new TableRow({
      children: [
          new TableCell({
            width: {
              size: 705,
              type: WidthType.DXA,
          },
          verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({text:"#",
              style: "header"})],
          }),
          new TableCell({
            width: {
              size: 4005,
              type: WidthType.DXA,
          },
          verticalAlign: VerticalAlign.CENTER,
          // horizontalAlign:HorizontalAlign.CENTER

              children: [new Paragraph({

                text:"Name",  style: "header"})],
          }),

      ],
    }))
    for(var i=0;i<this.allEmployee.length;i++){
      tempArr.push(new TableRow({
        children: [
            new TableCell({
              width: {
                size: 705,
                type: WidthType.DXA,
            },
            verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({text:String(this.allEmployee[i].rank),  style: "normalText"})],
            }),
            new TableCell({
              width: {
                size: 4005,
                type: WidthType.DXA,
            },
            verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({text:String(this.allEmployee[i].fname).charAt(0).toUpperCase() + String(this.allEmployee[i].fname).slice(1).toLowerCase()+', '+String(this.allEmployee[i].lname).charAt(0).toUpperCase() + String(this.allEmployee[i].lname).slice(1).toLowerCase(),  style: "normalText"})],
            }),

        ],
      }))
    }
    return tempArr
  }
  public download() {
var tempArr= []
    const doc = new Document({
      styles: {
        paragraphStyles: [
            {

                id: "header",
                name: "header",
                basedOn: "Normal",
                run: {

                    size:28,
                    color: "000000",

                },

                paragraph: {
                  alignment: AlignmentType.CENTER,

              },
            },
            {

              id: "headerTitle",
              name: "headerTitle",
              basedOn: "Normal",
              run: {
                bold:true,
                  size:32,
                  color: "000000",

              },

              paragraph: {
                alignment: AlignmentType.CENTER,

            },
          },
            {

              id: "tableCss",
              name: "table",
              basedOn: "Normal",
              paragraph: {
                alignment: AlignmentType.CENTER,

            },
          },
            {

              id: "normalText",
              name: "normalText",
              basedOn: "Normal",
              run: {
                size:28,
                color: "000000",
              },
              paragraph: {
                alignment: AlignmentType.CENTER,
            },
          },
      ],
    },
      sections: [
        {

            children: [

              new Paragraph({
                text: "Seniority List",
                style:"headerTitle",
            }),
            new Paragraph({
              text: "",
              style:"headerTitle",
          }),
                new Table({
                  alignment:AlignmentType.CENTER,
                  style: "tableCss",
                  columnWidths: [705, 4005],
                    rows:this.downloadOne()


                    ,
                }),
            ],
        },
    ],
});
Packer.toBuffer(doc).then((buffer) => {
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    fs.saveAs(blob,"My Document.docx")
});

}

public createHeading(text: string): Paragraph {
  return new Paragraph({
      text: text,
      heading: HeadingLevel.HEADING_1,
      thematicBreak: true,
  });
}

public educationtext(): Paragraph{

 return new Paragraph({
      text: "B.E. IT - 2005 to 2009",

  });

}
}
