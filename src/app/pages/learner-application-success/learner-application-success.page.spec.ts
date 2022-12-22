import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LearnerApplicationSuccessPage } from './learner-application-success.page';

describe('LearnerApplicationSuccessPage', () => {
  let component: LearnerApplicationSuccessPage;
  let fixture: ComponentFixture<LearnerApplicationSuccessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnerApplicationSuccessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LearnerApplicationSuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
