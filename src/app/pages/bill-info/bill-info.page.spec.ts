import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BillInfoPage } from './bill-info.page';

describe('BillInfoPage', () => {
  let component: BillInfoPage;
  let fixture: ComponentFixture<BillInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BillInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
