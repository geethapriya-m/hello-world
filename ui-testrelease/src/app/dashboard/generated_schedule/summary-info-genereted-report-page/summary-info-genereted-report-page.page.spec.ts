import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SummaryInfoGeneretedReportPagePage } from './summary-info-genereted-report-page.page';

describe('SummaryInfoGeneretedReportPagePage', () => {
  let component: SummaryInfoGeneretedReportPagePage;
  let fixture: ComponentFixture<SummaryInfoGeneretedReportPagePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryInfoGeneretedReportPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SummaryInfoGeneretedReportPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
