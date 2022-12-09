import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddNewShiftDefinitionPage } from './add-new-shift-definition.page';

describe('AddNewShiftDefinitionPage', () => {
  let component: AddNewShiftDefinitionPage;
  let fixture: ComponentFixture<AddNewShiftDefinitionPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewShiftDefinitionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddNewShiftDefinitionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
