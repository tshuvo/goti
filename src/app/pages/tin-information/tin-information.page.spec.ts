import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TinInformationPage } from './tin-information.page';

describe('TinInformationPage', () => {
  let component: TinInformationPage;
  let fixture: ComponentFixture<TinInformationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TinInformationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TinInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
