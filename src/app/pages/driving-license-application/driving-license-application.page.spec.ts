import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DrivingLicenseApplicationPage } from './driving-license-application.page';

describe('DrivingLicenseApplicationPage', () => {
  let component: DrivingLicenseApplicationPage;
  let fixture: ComponentFixture<DrivingLicenseApplicationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrivingLicenseApplicationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DrivingLicenseApplicationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
