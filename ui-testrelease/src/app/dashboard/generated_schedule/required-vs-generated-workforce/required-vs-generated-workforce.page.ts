import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import Chart, { ChartData, ChartDataSets, ChartOptions, ChartPoint, ChartType } from 'chart.js';

import { Label } from 'ng2-charts';
import { RequiredWorkforce } from 'src/app/model/requiredWorkforce';
// import requiredWorkforceData  from '../json/required-workforce.json'
import { RequiredWorkforceService } from 'src/app/services/required-workforce.service';
import { WorkLoadService } from 'src/app/services/work-load.service';
@Component({
  selector: 'app-required-vs-generated-workforce',
  templateUrl: './required-vs-generated-workforce.page.html',
  styleUrls: ['./required-vs-generated-workforce.page.scss'],
})
export class RequiredVsGeneratedWorkforcePage implements OnInit {
  // @ViewChild('barCanvas',{static: true}) barCanvas;
   barChart: Chart;
  // @ViewChild('barCanvas') private barCanvas: ElementRef;
  // @ViewChild('barCanvasMon') private barCanvasMon: ElementRef;
  // @ViewChild("barCanvas") barCanvas: ElementRef;

   errorMsg: any;


   requiredVSgeneratedWorkforceData ;
  total: any[];
  // barChart: any;
  doughnutChart: any;
  lineChart: any;
  // requiredWorkLoadData;
  sun: any;
  public sunMid
  isHiddenSun=true
  isHiddenMon=true
  isHiddenTue=true
  isHiddenWed=true
  isHiddenThu=true
  isHiddenFri=true
  isHiddenSat=true
  requiredEmpData:any
  generatedEmpData
  data:[];
  SunDayRequired = [];
  SunDayGenerated = [];
  Run = [];
  totalSunGenerated: any;
  totalSunRequired: any;
  diffSunMid: any;
  diffSunDay: any;
  diffSunEve: any;
  validSunMid: boolean;
  validSunDay: boolean;
  validSunEve: boolean;
  mon: any;
  MonDayRequired= [];
  MonDayGenerated= [];
  diffMonMid: any;
  diffMonDay: any;
  diffMonEve: any;
  totalMonRequired: any;
  totalMonGenerated: any;
  tue:any
  TueDayRequired= [];
  TueDayGenerated= [];
  diffTueMid: any;
  diffTueDay: any;
  diffTueEve: any;
  totalTueRequired: any;
  totalTueGenerated: any;
  wed:any
  WedDayRequired= [];
  WedDayGenerated= [];
  diffWedMid: any;
  diffWedDay: any;
  diffWedEve: any;
  totalWedRequired: any;
  totalWedGenerated: any;

  thu:any
  ThuDayRequired= [];
  ThuDayGenerated= [];
  diffThuMid: any;
  diffThuDay: any;
  diffThuEve: any;
  totalThuRequired: any;
  totalThuGenerated: any;
  fri:any
  FriDayRequired= [];
  FriDayGenerated= [];
  diffFriMid: any;
  diffFriDay: any;
  diffFriEve: any;
  totalFriRequired: any;
  totalFriGenerated: any;
  sat:any
  SatDayRequired= [];
  SatDayGenerated= [];
  diffSatMid: any;
  diffSatDay: any;
  diffSatEve: any;
  totalSatRequired: any;
  totalSatGenerated: any;
   constructor(public modalCtrl: ModalController,
               private route:Router,
               public dataService:RequiredWorkforceService,
               public alertCtrl: AlertController,
               public dialogs: MatDialog) {

   }
   ngOnInit() {
// this.dataService.getRequiredWorkforceData().subscribe(
//   (data) => {this.requiredWorkLoadData = data;



     this.requiredEmpData=this.requiredVSgeneratedWorkforceData.Required
     this.generatedEmpData=this.requiredVSgeneratedWorkforceData.Scheduled
     this.SunDayRequired.push(this.requiredEmpData.SUN_MID)
     this.SunDayRequired.push(this.requiredEmpData.SUN_DAY)
     this.SunDayRequired.push(this.requiredEmpData.SUN_EVE)
     this.SunDayGenerated.push(this.generatedEmpData.SUN_MID)
     this.SunDayGenerated.push(this.generatedEmpData.SUN_DAY)
     this.SunDayGenerated.push(this.generatedEmpData.SUN_EVE)
     this.diffSunMid=this.SunDayGenerated[0] + - + this.SunDayRequired[0]
     this.diffSunDay=this.SunDayGenerated[1] + - + this.SunDayRequired[1]
     this.diffSunEve=this.SunDayGenerated[2] + - + this.SunDayRequired[2]
     this.totalSunRequired= this.SunDayRequired[0] + + + this.SunDayRequired[1] + + + this.SunDayRequired[2]
     this.totalSunGenerated= this.SunDayGenerated[0] + + + this.SunDayGenerated[1] + + + this.SunDayGenerated[2]

     this.MonDayRequired.push(this.requiredEmpData.MON_MID)
     this.MonDayRequired.push(this.requiredEmpData.MON_DAY)
     this.MonDayRequired.push(this.requiredEmpData.MON_EVE)
     this.MonDayGenerated.push(this.generatedEmpData.MON_MID)
     this.MonDayGenerated.push(this.generatedEmpData.MON_DAY)
     this.MonDayGenerated.push(this.generatedEmpData.MON_EVE)
     this.diffMonMid=this.MonDayGenerated[0] + - + this.MonDayRequired[0]
     this.diffMonDay=this.MonDayGenerated[1] + - + this.MonDayRequired[1]
     this.diffMonEve=this.MonDayGenerated[2] + - + this.MonDayRequired[2]
     this.totalMonRequired= this.MonDayRequired[0] + + + this.MonDayRequired[1] + + + this.MonDayRequired[2]
     this.totalMonGenerated= this.MonDayGenerated[0] + + + this.MonDayGenerated[1] + + + this.MonDayGenerated[2]


     this.TueDayRequired.push(this.requiredEmpData.TUE_MID)
     this.TueDayRequired.push(this.requiredEmpData.TUE_DAY)
     this.TueDayRequired.push(this.requiredEmpData.TUE_EVE)
     this.TueDayGenerated.push(this.generatedEmpData.TUE_MID)
     this.TueDayGenerated.push(this.generatedEmpData.TUE_DAY)
     this.TueDayGenerated.push(this.generatedEmpData.TUE_EVE)
     this.diffTueMid=this.TueDayGenerated[0] + - + this.TueDayRequired[0]
     this.diffTueDay=this.TueDayGenerated[1] + - + this.TueDayRequired[1]
     this.diffTueEve=this.TueDayGenerated[2] + - + this.TueDayRequired[2]
     this.totalTueRequired= this.TueDayRequired[0] + + + this.TueDayRequired[1] + + + this.TueDayRequired[2]
     this.totalTueGenerated= this.TueDayGenerated[0] + + + this.TueDayGenerated[1] + + + this.TueDayGenerated[2]

     this.WedDayRequired.push(this.requiredEmpData.WED_MID)
     this.WedDayRequired.push(this.requiredEmpData.WED_DAY)
     this.WedDayRequired.push(this.requiredEmpData.WED_EVE)
     this.WedDayGenerated.push(this.generatedEmpData.WED_MID)
     this.WedDayGenerated.push(this.generatedEmpData.WED_DAY)
     this.WedDayGenerated.push(this.generatedEmpData.WED_EVE)
     this.diffWedMid=this.WedDayGenerated[0] + - + this.WedDayRequired[0]
     this.diffWedDay=this.WedDayGenerated[1] + - + this.WedDayRequired[1]
     this.diffWedEve=this.WedDayGenerated[2] + - + this.WedDayRequired[2]
     this.totalWedRequired= this.WedDayRequired[0] + + + this.WedDayRequired[1] + + + this.WedDayRequired[2]
     this.totalWedGenerated= this.WedDayGenerated[0] + + + this.WedDayGenerated[1] + + + this.WedDayGenerated[2]


     this.ThuDayRequired.push(this.requiredEmpData.THU_MID)
     this.ThuDayRequired.push(this.requiredEmpData.THU_DAY)
     this.ThuDayRequired.push(this.requiredEmpData.THU_EVE)
     this.ThuDayGenerated.push(this.generatedEmpData.THU_MID)
     this.ThuDayGenerated.push(this.generatedEmpData.THU_DAY)
     this.ThuDayGenerated.push(this.generatedEmpData.THU_EVE)
     this.diffThuMid=this.ThuDayGenerated[0] + - + this.ThuDayRequired[0]
     this.diffThuDay=this.ThuDayGenerated[1] + - + this.ThuDayRequired[1]
     this.diffThuEve=this.ThuDayGenerated[2] + - + this.ThuDayRequired[2]
     this.totalThuRequired= this.ThuDayRequired[0] + + + this.ThuDayRequired[1] + + + this.ThuDayRequired[2]
     this.totalThuGenerated= this.ThuDayGenerated[0] + + + this.ThuDayGenerated[1] + + + this.ThuDayGenerated[2]

     this.FriDayRequired.push(this.requiredEmpData.FRI_MID)
     this.FriDayRequired.push(this.requiredEmpData.FRI_DAY)
     this.FriDayRequired.push(this.requiredEmpData.FRI_EVE)
     this.FriDayGenerated.push(this.generatedEmpData.FRI_MID)
     this.FriDayGenerated.push(this.generatedEmpData.FRI_DAY)
     this.FriDayGenerated.push(this.generatedEmpData.FRI_EVE)
     this.diffFriMid=this.FriDayGenerated[0] + - + this.FriDayRequired[0]
     this.diffFriDay=this.FriDayGenerated[1] + - + this.FriDayRequired[1]
     this.diffFriEve=this.FriDayGenerated[2] + - + this.FriDayRequired[2]
     this.totalFriRequired= this.FriDayRequired[0] + + + this.FriDayRequired[1] + + + this.FriDayRequired[2]
     this.totalFriGenerated= this.FriDayGenerated[0] + + + this.FriDayGenerated[1] + + + this.FriDayGenerated[2]


     this.SatDayRequired.push(this.requiredEmpData.SAT_MID)
     this.SatDayRequired.push(this.requiredEmpData.SAT_DAY)
     this.SatDayRequired.push(this.requiredEmpData.SAT_EVE)
     this.SatDayGenerated.push(this.generatedEmpData.SAT_MID)
     this.SatDayGenerated.push(this.generatedEmpData.SAT_DAY)
     this.SatDayGenerated.push(this.generatedEmpData.SAT_EVE)
     this.diffSatMid=this.SatDayGenerated[0] + - + this.SatDayRequired[0]
     this.diffSatDay=this.SatDayGenerated[1] + - + this.SatDayRequired[1]
     this.diffSatEve=this.SatDayGenerated[2] + - + this.SatDayRequired[2]
     this.totalSatRequired= this.SatDayRequired[0] + + + this.SatDayRequired[1] + + + this.SatDayRequired[2]
     this.totalSatGenerated= this.SatDayGenerated[0] + + + this.SatDayGenerated[1] + + + this.SatDayGenerated[2]
   }
  public barChartOptions: ChartOptions = {
    responsive: true,
    // aspectRatio:2.32,
    maintainAspectRatio: true,
    title: {
      display: true,

  },

  layout: {

    padding: {
      top:0,
        bottom: -30,
    }
},

    scales: { xAxes: [{

      gridLines: {

        display: false,


      },
      ticks: {
        beginAtZero: true,

      },

    }],
    yAxes: [{

      gridLines: {
        display: false,

      },
      ticks: {
        beginAtZero: true,
        stepSize:5,
        min: 0,
        max: 25,

      }
    }] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',

      }
    },

             "animation": {
                "duration": 1,
              "onComplete": function() {
                var chartInstance = this.chart,
                  ctx = chartInstance.ctx;

                ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';

                this.data.datasets.forEach(function(dataset, i) {
                  var meta = chartInstance.controller.getDatasetMeta(i);
                  meta.data.forEach(function(bar, index) {
                    var data = dataset.data[index];
                    ctx.fillText(data, bar._model.x, bar._model.y - 5);
                  });
                });
              }
            },



  };
  public barChartLabels: Label[] = ['', '', ''];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  // public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: this.SunDayRequired,
      backgroundColor: ["#246CA5", "#246CA5", "#246CA5"],
      hoverBackgroundColor:["#246CA5","#246CA5","#246CA5",],
      barPercentage:0.6,

    },
    { data: this.SunDayGenerated,
      backgroundColor: ["#0194E3","#0194E3","#0194E3",],
      hoverBackgroundColor:["#0194E3","#0194E3","#0194E3",],
      barPercentage:0.6,

      },

  ];
  public barChartDataTest1: ChartDataSets[] = [
    { data: [8,7],
      backgroundColor: ["#246CA5","#0194E3"],
      hoverBackgroundColor:["#246CA5","#0194E3"],
      barPercentage:0.6,

    }
    // { data: [4],
    //   backgroundColor: ["#0194E3"],
    //   hoverBackgroundColor:["#0194E3"],
    //   barPercentage:0.6,

    //   },

  ];
  public barChartDataIndex: ChartDataSets[] = [
    { data: [],
      backgroundColor: ["#246CA5","#0194E3"],
      hoverBackgroundColor:["#246CA5","#0194E3"],
      barPercentage:0.6,

    }
    // { data: [4],
    //   backgroundColor: ["#0194E3"],
    //   hoverBackgroundColor:["#0194E3"],
    //   barPercentage:0.6,

    //   },

  ];
  public barChartDataTest2: ChartDataSets[] = [
    { data: [3],
      backgroundColor: ["#246CA5"],
      hoverBackgroundColor:["#246CA5"],
      barPercentage:0.6,

    },
    { data: [4],
      backgroundColor: ["#0194E3"],
      hoverBackgroundColor:["#0194E3"],
      barPercentage:0.6,

      },

  ];
  public barChartDataTest3: ChartDataSets[] = [
    { data: [3],
      backgroundColor: ["#246CA5"],
      hoverBackgroundColor:["#246CA5"],
      barPercentage:0.6,

    },
    { data: [4],
      backgroundColor: ["#0194E3"],
      hoverBackgroundColor:["#0194E3"],
      barPercentage:0.6,

      },

  ];
  public barChartDataMon: ChartDataSets[] = [
    { data: this.MonDayRequired,
      backgroundColor: ["#246CA5", "#246CA5", "#246CA5"],
      hoverBackgroundColor:["#246CA5","#246CA5","#246CA5",],
      barPercentage:0.6

    },
    { data: this.MonDayGenerated,
      backgroundColor: ["#0194E3","#0194E3","#0194E3",],
      hoverBackgroundColor:["#0194E3","#0194E3","#0194E3",],
      barPercentage:0.6
      }
  ];
  public barChartDataTue: ChartDataSets[] = [
    { data: this.TueDayRequired,
      backgroundColor: ["#246CA5", "#246CA5", "#246CA5"],
      hoverBackgroundColor:["#246CA5","#246CA5","#246CA5",],
      barPercentage:0.6

    },
    { data: this.TueDayGenerated,
      backgroundColor: ["#0194E3","#0194E3","#0194E3",],
      hoverBackgroundColor:["#0194E3","#0194E3","#0194E3",],
      barPercentage:0.6
      }
  ];
  public barChartDataWed: ChartDataSets[] = [
    { data: this.WedDayRequired,
      backgroundColor: ["#246CA5", "#246CA5", "#246CA5"],
      hoverBackgroundColor:["#246CA5","#246CA5","#246CA5",],
      barPercentage:0.6

    },
    { data: this.WedDayGenerated,
      backgroundColor: ["#0194E3","#0194E3","#0194E3",],
      hoverBackgroundColor:["#0194E3","#0194E3","#0194E3",],
      barPercentage:0.6
      }
  ];
  public barChartDataThu: ChartDataSets[] = [
    { data: this.ThuDayRequired,
      backgroundColor: ["#246CA5", "#246CA5", "#246CA5"],
      hoverBackgroundColor:["#246CA5","#246CA5","#246CA5",],
      barPercentage:0.6

    },
    { data: this.ThuDayGenerated,
      backgroundColor: ["#0194E3","#0194E3","#0194E3",],
      hoverBackgroundColor:["#0194E3","#0194E3","#0194E3",],
      barPercentage:0.6
      }
  ];
  public barChartDataFri: ChartDataSets[] = [
    { data: this.FriDayRequired,
      backgroundColor: ["#246CA5", "#246CA5", "#246CA5"],
      hoverBackgroundColor:["#246CA5","#246CA5","#246CA5",],
      barPercentage:0.6
    },
    { data: this.FriDayGenerated,
      backgroundColor: ["#0194E3","#0194E3","#0194E3",],
      hoverBackgroundColor:["#0194E3","#0194E3","#0194E3",],
      barPercentage:0.6
      }
  ];
  public barChartDataSat: ChartDataSets[] = [
    { data: this.SatDayRequired,
      backgroundColor: ["#246CA5", "#246CA5", "#246CA5"],
      hoverBackgroundColor:["#246CA5","#246CA5","#246CA5",],
      barPercentage:0.6

    },
    { data: this.SatDayGenerated,
      backgroundColor: ["#0194E3","#0194E3","#0194E3",],
      hoverBackgroundColor:["#0194E3","#0194E3","#0194E3",],
      barPercentage:0.6
      }
  ];

  goBack(){
  this.route.navigateByUrl('workload-data-report-generate')
  }

}





























