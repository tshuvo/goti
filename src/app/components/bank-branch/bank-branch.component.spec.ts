import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BankBranchComponent } from './bank-branch.component';

describe('BankBranchComponent', () => {
  let component: BankBranchComponent;
  let fixture: ComponentFixture<BankBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankBranchComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BankBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
