import { Component, OnInit } from '@angular/core';
import {CommonService} from "../../services/common/common.service";
import {HomeService} from "../../services/home/home.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(private common: CommonService, private homeService:HomeService) {

  }

  ngOnInit() {
  }
 
}
