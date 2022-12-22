import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReExamPage } from './re-exam.page';

describe('ReExamPage', () => {
  let component: ReExamPage;
  let fixture: ComponentFixture<ReExamPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReExamPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReExamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
