import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NidverificationPage } from './nidverification.page';

describe('NidverificationPage', () => {
  let component: NidverificationPage;
  let fixture: ComponentFixture<NidverificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NidverificationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NidverificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
