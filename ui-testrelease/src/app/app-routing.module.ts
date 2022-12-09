import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';
import straightlines_io_apis from 'src/app/json/apis.json';

import { DashboardComponent } from './dashboard/dashboard.component';
import { EnterWorkLoadComponent } from 'src/app/dashboard/work_load_data/enter-work-load/enter-work-load.component';
import { GeneratedSchedulesComponent } from 'src/app/dashboard/generated_schedule/generated-schedules/generated-schedules.component';
import { STLinesDashboardComponent } from './dashboard/s-t-lines-dashboard/s-t-lines-dashboard.component';
import { SelectOptionForWorkloadComponent } from './dashboard/select-option-for-workload/select-option-for-workload.component';
import { ManageBidScheduleComponent } from './dashboard/bidding-dashboard/manage-bid-schedule/manage-bid-schedule.component';

import { MyBiddingDashboardComponent } from './dashboard/bidding-dashboard/my-bidding-dashboard/my-bidding-dashboard.component';
import { MyBiddingStepOneShiftLineComponent } from './dashboard/bidding-dashboard/my-bidding-dashboard/my-bidding-step-one-shift-line/my-bidding-step-one-shift-line.component';
import { SelectShiftLineForBiddingComponent } from './dashboard/bidding-dashboard/my-bidding-dashboard/select-shift-line-for-bidding/select-shift-line-for-bidding.component';
import { ViewBidShiftlinesComponent } from './dashboard/bidding-dashboard/my-bidding-dashboard/view-bid-shiftlines/view-bid-shiftlines.component';
import { ManageShiftLineSchedulesComponent } from './dashboard/manage-shift-line-schedules/manage-shift-line-schedules.component';
import { GeneratedScheduleListComponent } from './dashboard/manage-shift-line-schedules/generated-schedule-list/generated-schedule-list.component';
import { EditScheduleComponent } from './dashboard/manage-shift-line-schedules/edit-schedule/edit-schedule.component';
import { ImportExcelSheetForScheduleComponent } from './dashboard/select-option-for-workload/import-excel-sheet-for-schedule/import-excel-sheet-for-schedule.component';

import { AddNewEmployeeComponent } from './dashboard/add-new-employee/add-new-employee.component';
import { ViewSeniorityListComponent } from './dashboard/bidding-dashboard/my-bidding-dashboard/view-seniority-list/view-seniority-list.component';
import { ViewBidWindowComponent } from './dashboard/bidding-dashboard/my-bidding-dashboard/view-bid-window/view-bid-window.component';
import { ViewLeaveBidComponent } from './dashboard/bidding-dashboard/my-bidding-dashboard/view-leave-bid/view-leave-bid.component';
import { SelectOptionForBidLeaveComponent } from './dashboard/bidding-dashboard/my-bidding-dashboard/bid-leave/select-option-for-bid-leave/select-option-for-bid-leave.component';
import { BidLeaveVacationComponent } from './dashboard/bidding-dashboard/my-bidding-dashboard/bid-leave/bid-leave-vacation/bid-leave-vacation.component';
import { SelectDateComponent } from './dashboard/bidding-dashboard/my-bidding-dashboard/bid-leave/select-date/select-date.component';
import { CreateNewBidScheduleComponent } from './dashboard/bidding-dashboard/manage-bid-schedule/create-new-bid-schedule/create-new-bid-schedule.component';
import { EditBidScheduleComponent } from './dashboard/bidding-dashboard/manage-bid-schedule/edit-bid-schedule/edit-bid-schedule.component';
import { EmployeeAuthGuard } from './services/auth/employee-auth.guard';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { LoginPageModule } from './home/login-register/login/login.module';
import { SelectShiftlineByBidManagerComponent } from './dashboard/bidding-dashboard/my-bidding-dashboard/my-bidding-step-one-shift-line/select-shiftline-by-bid-manager/select-shiftline-by-bid-manager.component';
import { ScheduleLeaveSummaryComponent } from './dashboard/bidding-dashboard/my-bidding-dashboard/schedule-leave-summary/schedule-leave-summary.component';
import { LoginComponent } from './home/login/login.component';
import { UserDataComponent } from './home/user-data/user-data.component';
import { GuestAuthGuard } from './services/auth/guest-auth.guard';
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
    ,canActivate:[AuthGuard],
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'feedback',
    loadChildren: () => import('./home/feedback/feedback.module').then( m => m.FeedbackPageModule),
    canActivate:[AuthGuard],
  },
  {
    path: 'edit-schedule-data',
    loadChildren: () => import('src/app/dashboard/generated_schedule/add-edit-shift-lines/edit-schedule-data/edit-schedule-data.module').then( m => m.EditScheduleDataPageModule),
    canActivate:[AuthGuard],
  },
  {
    path: 'edit-work-load-data',
    loadChildren: () => import('src/app/dashboard/work_load_data/edit-work-load-data/edit-work-load-data.module').then( m => m.EditWorkLoadDataPageModule),
    canActivate:[AuthGuard],
  },
  {
    path: 'required-vs-generated-workforce',
    loadChildren: () => import('src/app/dashboard/generated_schedule/required-vs-generated-workforce/required-vs-generated-workforce.module').then( m => m.RequiredVsGeneratedWorkforcePageModule)
    ,canActivate:[AuthGuard],
  },
  {
    path: 'add-new-shift-line',
    loadChildren: () => import('src/app/dashboard/generated_schedule/add-edit-shift-lines/add-new-shift-line/add-new-shift-line.module').then( m => m.AddNewShiftLinePageModule),
    canActivate:[AuthGuard],
  },

  {
    path: 'view-total-mid-shift-lines-data',
    loadChildren: () => import('src/app/dashboard/generated_schedule/summary/view-total-mid-shift-lines-data/view-total-mid-shift-lines-data.module').then( m => m.ViewTotalMidShiftLinesDataPageModule),
    canActivate:[AuthGuard],
  },
  {
    path: 'view-total-day-shift-lines-data',
    loadChildren: () => import('src/app/dashboard/generated_schedule/summary/view-total-day-shift-lines-data/view-total-day-shift-lines-data.module').then( m => m.ViewTotalDayShiftLinesDataPageModule)
    ,canActivate:[AuthGuard],
  },
  {
    path: 'view-total-eve-shift-lines-data',
    loadChildren: () => import('src/app/dashboard/generated_schedule/summary/view-total-eve-shift-lines-data/view-total-eve-shift-lines-data.module').then( m => m.ViewTotalEveShiftLinesDataPageModule),
    canActivate:[AuthGuard],
  },
  {
    path: 'summary-info-genereted-report-page',
    loadChildren: () => import('src/app/dashboard/generated_schedule/summary-info-genereted-report-page/summary-info-genereted-report-page.module').then( m => m.SummaryInfoGeneretedReportPagePageModule),
    canActivate:[AuthGuard],
  },
  {
    path: 'add-new-shift-definition',
    loadChildren: () => import('src/app/dashboard/work_load_data/add-new-shift-definition/add-new-shift-definition.module').then( m => m.AddNewShiftDefinitionPageModule),
    canActivate:[AuthGuard],

  },
  {
    path: 'time-picker',
    loadChildren: () => import('src/app/dashboard/work_load_data/add-new-shift-definition/time-picker/time-picker.module').then( m => m.TimePickerPageModule),
    canActivate:[AuthGuard],
  },
  {
    path: 'footer',
    loadChildren: () => import('src/app/dashboard/nav-bar-footer/footer/footer.module').then( m => m.FooterPageModule),
    canActivate:[AuthGuard],
  },

  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'nav-bar',
    loadChildren: () => import('src/app/dashboard/nav-bar-footer/nav-bar/nav-bar.module').then( m => m.NavBarPageModule),
    canActivate:[AuthGuard],
  },

  {
    path: 'business-rules-pdf',
    loadChildren: () => import('src/app/dashboard/generated_schedule/add-edit-shift-lines/business-rules-pdf/business-rules-pdf.module').then( m => m.BusinessRulesPdfPageModule),
    canActivate:[AuthGuard],
  },
  {
    path: 'view-summary-day-category-wise',
    loadChildren: () => import('src/app/dashboard/generated_schedule/summary/view-summary-day-category-wise/view-summary-day-category-wise.module').then( m => m.ViewSummaryDayCategoryWisePageModule),
    canActivate:[AuthGuard],
  },
  {
    path: straightlines_io_apis.apis.register_api,
    loadChildren: () => import('./home/login-register/register/register.module').then( m => m.RegisterPageModule)
  },
  {path: straightlines_io_apis.apis.login_api,component:LoginComponent},
  {
    path: straightlines_io_apis.apis.reset_password_api,
    loadChildren: () => import('./home/login-register/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: straightlines_io_apis.apis.password_changed_message_api,
    loadChildren: () => import('./home/login-register/reset-password/password-changed-message/password-changed-message.module').then( m => m.PasswordChangedMessagePageModule)
  },
  {path: 'manager',component:UserDataComponent,canActivate:[AuthGuard]},
  {path: 'user',component:UserDataComponent,canActivate:[EmployeeAuthGuard]},
  {path: 'dashboard',component:EmployeeDashboardComponent,canActivate:[EmployeeAuthGuard],

  children:[
    {path: '', component:MyBiddingDashboardComponent,canActivate:[EmployeeAuthGuard],
  children:[


    {path: 'bidding', component:MyBiddingStepOneShiftLineComponent,canActivate:[EmployeeAuthGuard]},
    {path: 'view-bid-schedule/:_bidScheduleName/:_rid', component:ViewBidShiftlinesComponent,canActivate:[EmployeeAuthGuard]},
    {path: 'view-seniority-list/:_bidScheduleName/:_rid', component:ViewSeniorityListComponent,canActivate:[EmployeeAuthGuard]},
    {path: 'view-leave-bid/:_bidScheduleName/:_rid', component:ViewLeaveBidComponent,canActivate:[EmployeeAuthGuard]},
    {path: 'view-bid-window/:_bidScheduleName/:_rid', component:ViewBidWindowComponent,canActivate:[EmployeeAuthGuard]},
    {path: 'schedule-leave-summary/:_bidScheduleName/:_rid', component:ScheduleLeaveSummaryComponent,canActivate:[EmployeeAuthGuard]},
    {path: 'SSB', component:SelectShiftLineForBiddingComponent,canActivate:[EmployeeAuthGuard]},
    {path: 'select-bid-leave', component:SelectOptionForBidLeaveComponent,canActivate:[EmployeeAuthGuard]},
    {path: 'bid-leave-vacation', component:BidLeaveVacationComponent,canActivate:[EmployeeAuthGuard]},
  ]},
  ]
  },
  {path: 'sTlines-dashboard',component:DashboardComponent,canActivate:[AuthGuard],
    children:[
      {path:'',component:STLinesDashboardComponent,canActivate:[AuthGuard]},
      {path: 'select',component:SelectOptionForWorkloadComponent,canActivate:[AuthGuard,]},
      {path: 'import-schedule',component:ImportExcelSheetForScheduleComponent,canActivate:[AuthGuard]},
      {path: 'manage-shift-line-schedules',component:ManageShiftLineSchedulesComponent,canActivate:[AuthGuard],
        children:[
          {path: '',component:GeneratedScheduleListComponent,canActivate:[AuthGuard]},
          {path: 'enter-work-load',component:EnterWorkLoadComponent,canActivate:[AuthGuard]},
          {path: 'generated-schedules',component:GeneratedSchedulesComponent,canActivate:[AuthGuard]},
          {path: 'edit-schedule/:_id/:_sn',component:EditScheduleComponent,canActivate:[AuthGuard]},
      ]
    },
    {path: 'bidding/bid-list',component:ManageBidScheduleComponent,canActivate:[AuthGuard]},
    {path: 'bidding/create-new-bid-schedule',component:CreateNewBidScheduleComponent,canActivate:[AuthGuard]},
    {path: 'bidding/view-bid-schedule/:_id',component:CreateNewBidScheduleComponent,canActivate:[AuthGuard]},
    {path: 'bidding/edit-bid-schedule/:_id',component:EditBidScheduleComponent,canActivate:[AuthGuard]},
    {path: 'bidding/add-new-employee',component:AddNewEmployeeComponent,canActivate:[AuthGuard]},
    {path: 'bidding/generated-schedules',component:GeneratedSchedulesComponent,canActivate:[AuthGuard]},
    {path: 'bidding/enter-work',component:EnterWorkLoadComponent,canActivate:[AuthGuard]},
    {path: 'select-date', component:SelectDateComponent,canActivate:[AuthGuard]},
    {path: 'bidding/my-bidding',component:MyBiddingDashboardComponent,canActivate:[AuthGuard],
      children:[
        {path: '', component:MyBiddingStepOneShiftLineComponent,canActivate:[AuthGuard]},
        {path: 'view-bid-schedule/:_bidScheduleName/:_rid', component:ViewBidShiftlinesComponent,canActivate:[AuthGuard]},
        {path: 'view-seniority-list/:_bidScheduleName/:_rid', component:ViewSeniorityListComponent,canActivate:[AuthGuard]},
        {path: 'view-leave-bid/:_bidScheduleName/:_rid', component:ViewLeaveBidComponent,canActivate:[AuthGuard]},
        {path: 'view-bid-window/:_bidScheduleName/:_rid', component:ViewBidWindowComponent,canActivate:[AuthGuard]},
        {path: 'view-schedule-leave-summary/:_bidScheduleName/:_rid', component:ScheduleLeaveSummaryComponent,canActivate:[AuthGuard]},
        {path: 'SSB', component:SelectShiftLineForBiddingComponent,canActivate:[AuthGuard]},
        {path: 'SSBforEmployee', component:SelectShiftlineByBidManagerComponent,canActivate:[AuthGuard]},
        {path: 'select-bid-leaveforEmployee', component:SelectOptionForBidLeaveComponent,canActivate:[AuthGuard]},
        {path: 'bid-leave-vacation', component:BidLeaveVacationComponent,canActivate:[AuthGuard]},
      ]},
    ]
  },
  {path: 'stLines-dashBoard',component:DashboardComponent,canActivate:[GuestAuthGuard],
    children:[
      {path:'',component:STLinesDashboardComponent,canActivate:[GuestAuthGuard]},
      {path: 'seleCt',component:SelectOptionForWorkloadComponent,canActivate:[GuestAuthGuard,]},
      {path: 'manage-shiftline-schedules',component:ManageShiftLineSchedulesComponent,canActivate:[GuestAuthGuard],
        children:[
          {path: '',component:GeneratedScheduleListComponent,canActivate:[GuestAuthGuard]},
          {path: 'enter-workload',component:EnterWorkLoadComponent,canActivate:[GuestAuthGuard]},
          {path: 'schedule-generated',component:GeneratedSchedulesComponent,canActivate:[GuestAuthGuard]},
          {path: 'edit-shiftline-schedule/:_id/:_sn',component:EditScheduleComponent,canActivate:[GuestAuthGuard]},
      ]
    },
    ]},
  {
    path:'old-login',
    loadChildren: () => import('./home/login-register/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'landing-page',
    loadChildren: () => import('./landing-page/landing-page.module').then( m => m.LandingPagePageModule)
  },
  {
    path: 'fullscreen-chart',
    loadChildren: () => import('src/app/dashboard/generated_schedule/summary/view-summary-day-category-wise/fullscreen-chart/fullscreen-chart.module').then( m => m.FullscreenChartPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'create-new-shift-defintion',
    loadChildren: () => import('src/app/dashboard/work_load_data/create-new-shift-defintion/create-new-shift-defintion.module').then( m => m.CreateNewShiftDefintionPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: straightlines_io_apis.apis.registration_verification_landing_page_api,
    loadChildren: () => import('./registration-verification-landing/registration-verification-landing.module').then( m => m.RegistrationVerificationLandingPageModule)
  },
  { path: '**',component:LoginPageModule}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
