import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoadingController, Platform} from '@ionic/angular';
import {LearnerServiceService} from '../../services/learner/learner-service.service';

@Component({
  selector: 'app-prerequisition-of-learner',
  templateUrl: './prerequisition-of-learner.page.html',
  styleUrls: ['./prerequisition-of-learner.page.scss'],
})
export class PrerequisitionOfLearnerPage implements OnInit {


  constructor(private router: Router, private learnerService: LearnerServiceService, private loadingController: LoadingController,  public platform: Platform) { }

  ngOnInit() {
  }

  onAgreeClicked() {
     // this.router.navigate(['learner-license-application'], { state: { serviceRequestId: ""} });
     this.router.navigate(['driving-license-application'], { state: { serviceRequestId: ""} });
    // this.router.navigateByUrl('learner-license-application');
  }

  showMedicalForm()
  {
    // return this.learnerService.showMedicalForm();
    this.learnerService.showMedicalForm();
  }

}
