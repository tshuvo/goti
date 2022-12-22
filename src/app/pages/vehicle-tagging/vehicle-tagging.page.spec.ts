import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VehicleTaggingPage } from './vehicle-tagging.page';

describe('VehicleTaggingPage', () => {
  let component: VehicleTaggingPage;
  let fixture: ComponentFixture<VehicleTaggingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleTaggingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleTaggingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
