import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DriverTaggingPage } from './driver-tagging.page';

describe('DriverTaggingPage', () => {
  let component: DriverTaggingPage;
  let fixture: ComponentFixture<DriverTaggingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverTaggingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DriverTaggingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
