import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllServicePage } from './all-service.page';

describe('AllServicePage', () => {
  let component: AllServicePage;
  let fixture: ComponentFixture<AllServicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllServicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
