import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RequiredVsGeneratedWorkforcePage } from './required-vs-generated-workforce.page';

describe('RequiredVsGeneratedWorkforcePage', () => {
  let component: RequiredVsGeneratedWorkforcePage;
  let fixture: ComponentFixture<RequiredVsGeneratedWorkforcePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RequiredVsGeneratedWorkforcePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RequiredVsGeneratedWorkforcePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
