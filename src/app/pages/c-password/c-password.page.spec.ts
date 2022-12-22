import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CPasswordPage } from './c-password.page';

describe('CPasswordPage', () => {
  let component: CPasswordPage;
  let fixture: ComponentFixture<CPasswordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CPasswordPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
