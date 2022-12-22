import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrerequisitionOfAppointmentPage } from './prerequisition-of-appointment.page';

describe('PrerequisitionOfAppointmentPage', () => {
  let component: PrerequisitionOfAppointmentPage;
  let fixture: ComponentFixture<PrerequisitionOfAppointmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrerequisitionOfAppointmentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrerequisitionOfAppointmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
