import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DriverLicenseTaggingPage } from './driver-license-tagging.page';

describe('DriverLicenseTaggingPage', () => {
  let component: DriverLicenseTaggingPage;
  let fixture: ComponentFixture<DriverLicenseTaggingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverLicenseTaggingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DriverLicenseTaggingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
