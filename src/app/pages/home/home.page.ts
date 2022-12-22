import {Component, OnInit} from '@angular/core';
import {HomeService} from '../../services/home/home.service';
import {CommonService} from '../../services/common/common.service';
import {AuthenticationService} from '../../services/auth/Authentication.service';
import {Events, LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';
  

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
}) 

export class HomePage implements OnInit {
  

    public activeMenu:any;
    public menus:any;
    public slides:any;
    public hasSlide: boolean;
    public breadcumb: any;
    loggedIn: any;
    public showMenu:boolean = false;
    public emptySlideMsg;
    bankingMassage: any = " ";
    bankingMassageArray: any = [];

    constructor(
        private homeService: HomeService,
        private authenticationService: AuthenticationService,
        private loadingController: LoadingController,
        private router: Router,
        private commonService: CommonService,
        public events: Events
    ) {
        this.hasSlide = false;
        this.menus = [];
        this.slides = [];
        this.emptySlideMsg = 'দুঃখিত! কোন তথ্য পাওয়া যায় নি|';

    }

    ngOnInit() {


        this.saveMenu();
        this.authenticationService.authState.subscribe(state => {
            if (state) {
                this.loggedIn = true;
                let nidYN = this.commonService.getItem('nid');
                if (nidYN == null){
                    this.commonService.toastMsg("আপনার এন আই ডি যাচাই করা হয় নি। দয়াকরে আবার লগইন করুন। ", false);
                    this.authenticationService.logoutForNid();
                    this.router.navigateByUrl('login');
                } else{
                    if (nidYN == 'N'){
                        this.commonService.toastMsg("আপনার এন আই ডি যাচাই করা হয় নি। দয়াকরে আবার লগইন করুন। ", false);
                        this.authenticationService.logoutForNid();
                        this.router.navigateByUrl('login');
                    }
                }
            } else {
                this.loggedIn = false;
            }
        });

        this.events.subscribe('homePageReload', () => {
            this.initContent();
        });
    }

    async concatText(){

        this.homeService.getBankingMassage().subscribe(result => {
            this.bankingMassageArray = result;
            for (let i =0; i< this.bankingMassageArray.length; i++){
                this.bankingMassage += " * " + this.bankingMassageArray[i].trim() + "।" ;
            }
            this.commonService.setItem('bank_massage', this.bankingMassageArray);

        },err => {

        });

    }

    // goToRegisterPage(){
    //     console.log('goto registration');
    //     this.router.navigate(['registration']);
    // }

    async saveMenu() {
        this.events.publish('versionControlChecker');
        const loading = await this.loadingController.create({message: 'অপেক্ষা করুন...'});
        await loading.present();
        this.concatText();
        this.homeService.saveMenu().subscribe(result => {
            console.log('geting massage : ', result);
            this.commonService.setItem('home-menus', result);
            this.initContent();
            loading.dismiss();
        },err => {
            console.log("error ttt", err);
            // alert(err);
            this.router.navigateByUrl('/welcome');
            loading.dismiss();
            this.commonService.toastMsg('দুঃখিত! কোন তথ্য পাওয়া যায় নি, আপনার ইন্টারনেট সংযোগ পরীক্ষা করুন এবং কিছু সময় পরে আবার চেষ্টা করুন', false);
        });
    }


    public initContent() {
        this.hasSlide = false;
        this.menus = [];
        this.slides = [];
        this.getContent( '0', 'N', '0');
    }
    async getContent(parent_icon_id = '0', hasSlide='N', icon_id='0') {


        this.activeMenu = icon_id;
        this.breadcumb = this.homeService.getBreadcumb(icon_id, true);
        // this.showBankText = true;
        if(hasSlide == 'N'){

            this.hasSlide = false;
            this.slides = [];
            this.menus = this.homeService.getChildMenus(parent_icon_id);


        }else{
            this.hasSlide = true;
            this.menus = [];
            

            const loading = await this.loadingController.create({message: 'অপেক্ষা করুন...'});
            await loading.present();
            this.homeService.getSlides(icon_id).subscribe(result => {
                this.slides = result;


                /**start If no data found**/
                if(this.slides.length == 0){
                    this.slides = [
                        {
                            "SLIDE_ID": "0",
                            "ICON_ID": "0",
                            "SLIDE_SN": "1",
                            "ENABLED": "Y",
                            "SLIDE_TYPE": "HTML",
                            "SLIDE_CONTENT": "<div class='card text-center'><div class='card-header alert alert-danger'></div><div class='card-body'><p class='text-danger'>দুঃখিত! কোন তথ্য পাওয়া যায় নি|</p></div></div>",
                            "AUTO_RUN": "Y"
                        }
                        ];
                }
                /**end If no data found**/


                /*this.slides = [
                    {
                        "SLIDE_ID": "48",
                        "ICON_ID": "26",
                        "SLIDE_SN": "1",
                        "ENABLED": "Y",
                        "SLIDE_TYPE": "MAP",
                        "SLIDE_CONTENT": [ {  'lat': 23.8305, 'lng': 90.3768,  'title': 'ECB Canteen'}, { 'lat': 23.8225, 'lng': 90.3770,  'title': 'Kalshi'}],
                        "AUTO_RUN": "Y"
                    },

                    {
                        "SLIDE_ID": "49",
                        "ICON_ID": "26",
                        "SLIDE_SN": "2",
                        "ENABLED": "Y",
                        "SLIDE_TYPE": "MAP",
                        "SLIDE_CONTENT": [ { 'lat': 23.8225, 'lng': 90.3770,  'title': 'Kalshi'}],
                        "AUTO_RUN": "Y"
                    }
                ];*/

                loading.dismiss();
            },err =>function(e){
                loading.dismiss();
            });
        }

        if(this.menus.length == 0 &&  !this.hasSlide){
            this.showMenu = false;
            //this.homeService.storeMenus();
            this.commonService.toastMsg('দুঃখিত! কোন তথ্য পাওয়া যায় নি, কিছু সময় পরে আবার চেষ্টা করুন', false);
        }else{
            this.showMenu = true;

        }


    }

    // hideBankMessage(){
    //     console.log("get called");
    //     this.showBankText = true;
    // }

}
