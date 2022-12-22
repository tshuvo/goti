import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LearnerServiceService} from '../../services/learner/learner-service.service';

@Component({
    selector: 'app-learner-application-success',
    templateUrl: './learner-application-success.page.html',
    styleUrls: ['./learner-application-success.page.scss'],
})

export class LearnerApplicationSuccessPage implements OnInit {

    serviceRequestNo: any;
    phoneNo: any;

    constructor(private route: Router, private learnerService: LearnerServiceService) {
    }

    ngOnInit() {
        this.serviceRequestNo = this.route.getCurrentNavigation().extras.state.serviceRequestId;

        this.phoneNo = this.route.getCurrentNavigation().extras.state.phoneNo;
        console.log("Success page receive data : ", this.serviceRequestNo + " and phone no: ", this.phoneNo);
    }


    goFor(option) {
        console.log('comming with option: ', option);
        if (option == 'HOME') {
            this.route.navigateByUrl('home');
        } else if (option == 'EDIT') {
            this.route.navigate(['/driving-license-application'], {queryParams: {'serviceNo': this.serviceRequestNo, 'notification': 'edit'}});
            // console.log("Success page service request no: ", this.serviceRequestNo);
            // // this.route.navigate(['learner-license-application'], { state: { serviceRequestId: this.serviceRequestNo } });
            // this.route.navigate(['/learner-license-application'], {queryParams: {'serviceNo': this.serviceRequestNo, 'notification': 'edit'}});
        } else {
            this.payment();
        }
    }

    payment(){
        this.route.navigate(['learner-bill-info'], { state: { serviceRequestId: this.serviceRequestNo}});

    }
}
