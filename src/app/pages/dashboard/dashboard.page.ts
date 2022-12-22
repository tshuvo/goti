import {Component} from '@angular/core';
import {AlertController, LoadingController} from '@ionic/angular';
import {CommonService} from "../../services/common/common.service";
import {UserService} from '../../services/user/user.service';
import {Router} from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {

  allNotifications: any;
  serviceData: any;

  constructor(
    private router: Router,
    private commonService: CommonService,
    public loadingController: LoadingController,
    private alertController: AlertController,
    private userService: UserService
  ) {
    this.getAllNotifications();
   }


  async getAllNotifications() {

    const loading = await this.loadingController.create({message: 'অপেক্ষা করুন...'});
    await loading.present();
    this.serviceData = this.userService.getAllNotification().subscribe(result => {
        loading.dismiss();
        if (result['status'] == 200) {
            this.allNotifications = result['data']['notification'];
            console.log('all notification', this.allNotifications);
        } else {
            this.commonService.toastMsg(result['message'], false);
        }
    }, err => {

        loading.dismiss();
    });
}

notificationClick(paramData) {
  this.router.navigate(['/notification-details'], {queryParams: paramData});
}

getTitelName(notificationType) {
  let name = '';
  switch (notificationType) {
    case 'DRIVER_LICENSE':
        name  = 'ড্রাইভিং লাইসেন্স';
        break;

     // case 'DRIVING_LICENSE_WITH_LEARNER':
     //    name  = 'ড্রাইভিং লাইসেন্স';
     //    break;

    case 'LEARNER_STATUS':
        name = 'শিক্ষানবিশ লাইসেন্স';
        break;

    case 'FITNESS_WILL_EXPIRE_SOON':
        name  = 'ফিটনেস মেয়াদ  শীঘ্রই  শেষ হবে';
        break;

    case 'FITNESS':
       name  = 'মেয়াদোত্তীর্ণ ফিটনেস';
        break;

    case 'TAX_WILL_EXPIRE_SOON':
       name  = 'ট্যাক্স টোকেন মেয়াদ  শীঘ্রই  শেষ হবে';
        break;

    case 'TAX':
       name  = 'মেয়াদোত্তীর্ণ ট্যাক্স টোকেন ';
        break;

    case 'ROUTE_PERMIT_WILL_EXPIRE_SOON':
        name  = 'রুট পারমিট মেয়াদ শীঘ্রই শেষ হবে';
        break;

    case 'ROUTE_PERMIT':
        name  = 'মেয়াদোত্তীর্ণ রুট পারমিট';
        break;

    case 'APPOINTMENT_STATUS':
        name  = 'এপয়েন্টমেন্ট';
        break;

    case 'TAGGED_VEHICLE':
        name = 'সংযুক্তকৃত মোটরযান';
        break;

    default: 
        break;
}
return name;
}

}
