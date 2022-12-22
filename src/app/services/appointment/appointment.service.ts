import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CommonService} from "../common/common.service";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  serverURL: string;
  data: Observable<Object>;

  constructor(
      public http: HttpClient,
      private common: CommonService,
  ) {
    this.serverURL = this.common.apiBaseUrl;
  }

  public getReg()
  {
    let url = this.serverURL + "v1/dashboard/registration-no-list-for-appointment";
    return this.common.setReq('GET',url);
  }

  public getBranchList(){
    let url = this.serverURL + "v1/dashboard/branch-list-for-appointment";
    return this.common.setReq('GET', url);
  }

  public getContactNumberByRegistrationNo(registrationNo){
    let params = {
      registrationNo: registrationNo
    };
    let url = this.serverURL + "v1/dashboard/contact-no-by-registration-for-appointment";
    return this.common.setReq('POST',url, params);
  }

  public getTimeSlot(appointmentDate, registrationNo)
  {
    let params = {
      appointmentDate: appointmentDate,
      registrationNo: registrationNo
    };
    let url = this.serverURL + "v1/dashboard/registration-no-wise-appointment-time";
    return this.common.setReq('GET',url, params);
  }

  public getTimeSlotByBranch(appointmentDate, branchID)
  {
    let params = {
      appointmentDate: appointmentDate,
      branchId: branchID
    };
    let url = this.serverURL + "v1/dashboard/branch-wise-appointment-time";
    return this.common.setReq('POST',url, params);
  }

  public deleteAppointment(appointmentID)
  {
    let params = {
      encAppointmentId: appointmentID
    };
    let url = this.serverURL + "v1/dashboard/remove-appointment";
    return this.common.setReq('POST',url, params);
  }

  public submitAppointment(appointmentDate, branchID, contactNumber, registrationNo, slotId)
  {
    let params = {
      "appointmentDate": appointmentDate,
      "branchId": branchID,
      "contactNo": contactNumber,
      "registrationNo": registrationNo,
      "slotId": slotId
    };
    let url = this.serverURL + "v1/dashboard/save-appointment";
    return this.common.setReq('POST',url,params);
  }


}
