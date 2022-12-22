import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrerequisitionOfLearnerPage } from './prerequisition-of-learner.page';

describe('PrerequisitionOfLearnerPage', () => {
  let component: PrerequisitionOfLearnerPage;
  let fixture: ComponentFixture<PrerequisitionOfLearnerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrerequisitionOfLearnerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrerequisitionOfLearnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
