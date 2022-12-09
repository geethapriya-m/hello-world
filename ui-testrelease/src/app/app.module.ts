import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';
import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';
import { IonicPullupModule } from 'ionic-pullup';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { HttpClientModule } from '@angular/common/http';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { ChartsModule } from 'ng2-charts';
import {MatDividerModule} from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { GeneratedSchedulesComponent } from './dashboard/generated_schedule/generated-schedules/generated-schedules.component';
import { ScheduleOneComponent } from './dashboard/generated_schedule/schedule/schedule-one/schedule-one.component';
import { ScheduleThreeComponent } from './dashboard/generated_schedule/schedule/schedule-three/schedule-three.component';
import { ScheduleTwoComponent } from './dashboard/generated_schedule/schedule/schedule-two/schedule-two.component';
import { BlankFooterComponent } from './dashboard/nav-bar-footer/footer/blank-footer/blank-footer.component';
import { FooterPageModule } from './dashboard/nav-bar-footer/footer/footer.module';
import { FooterComponent } from './dashboard/nav-bar-footer/footer/footer/footer.component';
import { BlankHeaderComponent } from './dashboard/nav-bar-footer/nav-bar/blank-header/blank-header.component';
import { NavBarPageModule } from './dashboard/nav-bar-footer/nav-bar/nav-bar.module';
import { EnterWorkLoadComponent } from './dashboard/work_load_data/enter-work-load/enter-work-load.component';
import { STLinesDashboardComponent } from './dashboard/s-t-lines-dashboard/s-t-lines-dashboard.component';
import { SelectOptionForWorkloadComponent } from './dashboard/select-option-for-workload/select-option-for-workload.component';
import { BiddingDashboardComponent } from './dashboard/bidding-dashboard/bidding-dashboard.component';
import { ManageBidScheduleComponent } from './dashboard/bidding-dashboard/manage-bid-schedule/manage-bid-schedule.component';
import { ManageBidDashboardComponent } from './dashboard/bidding-dashboard/manage-bid-dashboard/manage-bid-dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { MyBiddingDashboardComponent } from './dashboard/bidding-dashboard/my-bidding-dashboard/my-bidding-dashboard.component';
import { MyBiddingStepOneShiftLineComponent } from './dashboard/bidding-dashboard/my-bidding-dashboard/my-bidding-step-one-shift-line/my-bidding-step-one-shift-line.component';
import { SelectShiftLineForBiddingComponent } from './dashboard/bidding-dashboard/my-bidding-dashboard/select-shift-line-for-bidding/select-shift-line-for-bidding.component';
import { ViewBidShiftlinesComponent } from './dashboard/bidding-dashboard/my-bidding-dashboard/view-bid-shiftlines/view-bid-shiftlines.component';
import { ManageShiftLineSchedulesComponent } from './dashboard/manage-shift-line-schedules/manage-shift-line-schedules.component';
import { GeneratedScheduleListComponent } from './dashboard/manage-shift-line-schedules/generated-schedule-list/generated-schedule-list.component';
import { SaveScheduleComponent } from './dashboard/generated_schedule/generated-schedules/save-schedule/save-schedule.component';
import { EditScheduleComponent } from './dashboard/manage-shift-line-schedules/edit-schedule/edit-schedule.component';
import { EditShiftLineScheduleComponent } from './dashboard/manage-shift-line-schedules/edit-schedule/edit-shift-line-schedule/edit-shift-line-schedule.component';
import { ImportExcelSheetForScheduleComponent } from './dashboard/select-option-for-workload/import-excel-sheet-for-schedule/import-excel-sheet-for-schedule.component';
import { MidSummaryComponent } from './dashboard/manage-shift-line-schedules/edit-schedule/summary/mid-summary/mid-summary.component';
import { ChartComponent } from './dashboard/manage-shift-line-schedules/edit-schedule/summary/chart/chart.component';
import { DatePickerModule } from 'ionic4-date-picker';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { NgCalendarModule  } from 'ionic2-calendar';

import { AddNewEmployeeComponent } from './dashboard/add-new-employee/add-new-employee.component';
import { CustomDatePipe } from './services/manage-bid-schedule/custom-pipe/custom-date.pipe';
import { SelectedEmployeeModalComponent } from './dashboard/bidding-dashboard/manage-bid-schedule/selected-employee-modal/selected-employee-modal.component';
import { SelectedShiftlineScheduleModalComponent } from './dashboard/bidding-dashboard/manage-bid-schedule/selected-shiftline-schedule-modal/selected-shiftline-schedule-modal.component';
import { ViewSeniorityListComponent } from './dashboard/bidding-dashboard/my-bidding-dashboard/view-seniority-list/view-seniority-list.component';
import { ViewBidWindowComponent } from './dashboard/bidding-dashboard/my-bidding-dashboard/view-bid-window/view-bid-window.component';
import { ViewLeaveBidComponent } from './dashboard/bidding-dashboard/my-bidding-dashboard/view-leave-bid/view-leave-bid.component';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {MatStepperModule} from '@angular/material/stepper';
import { SelectOptionForBidLeaveComponent } from './dashboard/bidding-dashboard/my-bidding-dashboard/bid-leave/select-option-for-bid-leave/select-option-for-bid-leave.component';
import { SkipBidLeaveComponent } from './dashboard/bidding-dashboard/my-bidding-dashboard/bid-leave/skip-bid-leave/skip-bid-leave.component';
import {MatRadioModule} from '@angular/material/radio';
import { BidLeaveVacationComponent } from './dashboard/bidding-dashboard/my-bidding-dashboard/bid-leave/bid-leave-vacation/bid-leave-vacation.component';
import { SelectDateComponent } from './dashboard/bidding-dashboard/my-bidding-dashboard/bid-leave/select-date/select-date.component';
import { CreateNewBidScheduleComponent } from './dashboard/bidding-dashboard/manage-bid-schedule/create-new-bid-schedule/create-new-bid-schedule.component';
import {MatInputModule} from '@angular/material/input';
import { SelectBidRoundsComponent } from './dashboard/bidding-dashboard/manage-bid-schedule/create-new-bid-schedule/select-bid-rounds/select-bid-rounds.component';
import { SelectEmployeeComponent } from './dashboard/bidding-dashboard/manage-bid-schedule/create-new-bid-schedule/select-employee/select-employee.component';
import { SelectVacationSlotsComponent } from './dashboard/bidding-dashboard/manage-bid-schedule/create-new-bid-schedule/select-vacation-slots/select-vacation-slots.component';
import { SelectShiftlineComponent } from './dashboard/bidding-dashboard/manage-bid-schedule/create-new-bid-schedule/select-shiftline/select-shiftline.component';
import { SelectShiftlineScheduleSummaryComponent } from './dashboard/bidding-dashboard/manage-bid-schedule/create-new-bid-schedule/select-shiftline/select-shiftline-schedule-summary/select-shiftline-schedule-summary.component';
import { SelectVacationSlotSummaryComponent } from './dashboard/bidding-dashboard/manage-bid-schedule/create-new-bid-schedule/select-vacation-slots/select-vacation-slot-summary/select-vacation-slot-summary.component';
import { SelectedEmployeeSummaryComponent } from './dashboard/bidding-dashboard/manage-bid-schedule/create-new-bid-schedule/select-employee/selected-employee-summary/selected-employee-summary.component';
import { SaveNewBidScheduleComponent } from './dashboard/bidding-dashboard/manage-bid-schedule/create-new-bid-schedule/save-new-bid-schedule/save-new-bid-schedule.component';
import { BidRoundSummaryComponent } from './dashboard/bidding-dashboard/manage-bid-schedule/create-new-bid-schedule/select-bid-rounds/bid-round-summary/bid-round-summary.component';
import { BidScheduleActionSheetComponent } from './dashboard/bidding-dashboard/manage-bid-schedule/bid-schedule-action-sheet/bid-schedule-action-sheet.component';
import { CustomSchedulePopupComponent } from './dashboard/bidding-dashboard/manage-bid-schedule/create-new-bid-schedule/select-shiftline/custom-schedule-popup/custom-schedule-popup.component';
import { EditBidScheduleComponent } from './dashboard/bidding-dashboard/manage-bid-schedule/edit-bid-schedule/edit-bid-schedule.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { SelectShiftlineByBidManagerComponent } from './dashboard/bidding-dashboard/my-bidding-dashboard/my-bidding-step-one-shift-line/select-shiftline-by-bid-manager/select-shiftline-by-bid-manager.component';
import { ScheduleLeaveSummaryComponent } from './dashboard/bidding-dashboard/my-bidding-dashboard/schedule-leave-summary/schedule-leave-summary.component';
import { LoginComponent } from './home/login/login.component';
import { UserDataComponent } from './home/user-data/user-data.component';
import { DeselectDirective } from './directive/deselect.directive';
import { SelectOptionForShiftlineEditDeleteComponent } from './dashboard/manage-shift-line-schedules/generated-schedule-list/select-option-for-shiftline-edit-delete/select-option-for-shiftline-edit-delete.component';
import { EditScheduleActionSheetComponent } from './dashboard/manage-shift-line-schedules/edit-schedule/edit-schedule-action-sheet/edit-schedule-action-sheet.component';
import { BidSummaryCalendarComponent } from './dashboard/bidding-dashboard/my-bidding-dashboard/my-bidding-step-one-shift-line/bid-summary-calendar/bid-summary-calendar.component';
import { IncorrectShiftlineScheduleMessageComponent } from './dashboard/bidding-dashboard/manage-bid-schedule/create-new-bid-schedule/incorrect-shiftline-schedule-message/incorrect-shiftline-schedule-message.component';
import { TimePipe } from './pipes/time.pipe';
import { SaveExportActionSheetComponent } from './dashboard/generated_schedule/generated-schedules/save-export-action-sheet/save-export-action-sheet.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LeaveSelectionConfirmationComponent } from './dashboard/bidding-dashboard/my-bidding-dashboard/bid-leave/bid-leave-vacation/leave-selection-confirmation/leave-selection-confirmation.component';



@NgModule({
  declarations: [AppComponent,
    EnterWorkLoadComponent,
    DashboardComponent,
    GeneratedSchedulesComponent,
    ScheduleTwoComponent,
    ScheduleThreeComponent,
    ScheduleOneComponent,
    STLinesDashboardComponent,
    SelectOptionForWorkloadComponent,
    BiddingDashboardComponent,
    ManageBidScheduleComponent,
    ManageBidDashboardComponent,
    MyBiddingDashboardComponent,
    MyBiddingStepOneShiftLineComponent,
    SelectOptionForWorkloadComponent,
    SelectShiftLineForBiddingComponent,
    ViewBidShiftlinesComponent,
    ManageShiftLineSchedulesComponent,
    GeneratedScheduleListComponent,
    SaveScheduleComponent,
    EditScheduleComponent,
    EditShiftLineScheduleComponent,
    MidSummaryComponent,
    ImportExcelSheetForScheduleComponent,
    ChartComponent,


    AddNewEmployeeComponent,
    CustomDatePipe,
    SelectedEmployeeModalComponent,
    SelectedShiftlineScheduleModalComponent,
    ViewSeniorityListComponent,
    ViewBidWindowComponent,
    ViewLeaveBidComponent,
    SelectOptionForBidLeaveComponent,
    SkipBidLeaveComponent,
    BidLeaveVacationComponent,
    SelectDateComponent,
    SelectVacationSlotsComponent,
    CreateNewBidScheduleComponent,
    SelectShiftlineComponent,
    SelectShiftlineScheduleSummaryComponent,
    SelectVacationSlotSummaryComponent,
    SelectedEmployeeSummaryComponent,
    SaveNewBidScheduleComponent,
    BidRoundSummaryComponent,
    BidScheduleActionSheetComponent,
    CustomSchedulePopupComponent,
    SelectEmployeeComponent,
    SelectBidRoundsComponent,
    EditBidScheduleComponent,
    EmployeeDashboardComponent,
    SelectShiftlineByBidManagerComponent,
    ScheduleLeaveSummaryComponent,
    LoginComponent,
    UserDataComponent,
    DeselectDirective,
    SelectOptionForShiftlineEditDeleteComponent,
    EditScheduleActionSheetComponent,
    BidSummaryCalendarComponent,
    IncorrectShiftlineScheduleMessageComponent,
    SaveExportActionSheetComponent,
    TimePipe,
    LeaveSelectionConfirmationComponent


  ],
  entryComponents: [],
  imports: [BrowserModule,
    FormsModule,
    IonicPullupModule,
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    MatNativeDateModule ,
    NgCalendarModule,
    BrowserAnimationsModule,
    PdfViewerModule,
    MatDividerModule,
    MatIconModule,
    ChartsModule,
    ReactiveFormsModule,
    FooterPageModule,
    NavBarPageModule,
    MatDatepickerModule,
    DatePickerModule,
    MatSelectModule,
    MatExpansionModule,
    DragDropModule,
    MatCheckboxModule,
    CdkStepperModule,
    MatStepperModule,
    MatRadioModule,
    MatInputModule,
    NgbModule
  ],
  providers: [ScreenOrientation,
    BlankHeaderComponent,
    FooterComponent,
    MatNativeDateModule ,
    BlankFooterComponent,
    NgCalendarModule,

    NavParams,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas:      [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
