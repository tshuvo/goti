import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-prerequisition-of-appointment',
  templateUrl: './prerequisition-of-appointment.page.html',
  styleUrls: ['./prerequisition-of-appointment.page.scss'],
})
export class PrerequisitionOfAppointmentPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onAgreeClicked() {
    // this.router.navigate(['appointment'], { state: { serviceRequestId: ""} });
    this.router.navigateByUrl('appointment');
  }


}
