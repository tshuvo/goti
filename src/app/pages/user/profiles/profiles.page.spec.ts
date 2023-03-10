import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {ProfilesPage} from './profiles.page';

describe('ProfilesPage', () => {
    let component: ProfilesPage;
    let fixture: ComponentFixture<ProfilesPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProfilesPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(ProfilesPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
