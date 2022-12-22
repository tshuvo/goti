import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LearnerLicenseApplicationPage } from './learner-license-application.page';

describe('LearnerLicenseApplicationPage', () => {
  let component: LearnerLicenseApplicationPage;
  let fixture: ComponentFixture<LearnerLicenseApplicationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnerLicenseApplicationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LearnerLicenseApplicationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
