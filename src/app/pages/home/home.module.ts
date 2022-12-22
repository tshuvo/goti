import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';

import {HomePage} from './home.page';
import {MapViewComponent} from '../../components/map-view/map-view.component';
import {CircleInfoComponent} from '../../components/circle-info/circle-info.component';
import {BoothInfoComponent} from '../../components/booth-info/booth-info.component';
import {BankBranchComponent} from '../../components/bank-branch/bank-branch.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePage
            }
        ])
    ],
    declarations: [HomePage, MapViewComponent, CircleInfoComponent, BoothInfoComponent, BankBranchComponent]
})

export class HomePageModule {
}
