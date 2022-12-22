import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LearnerBillInfoPage } from './learner-bill-info.page';

describe('LearnerBillInfoPage', () => {
  let component: LearnerBillInfoPage;
  let fixture: ComponentFixture<LearnerBillInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnerBillInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LearnerBillInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
