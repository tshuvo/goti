import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CommonService} from '../common/common.service';
import {LoadingController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  public menuListData;
  public breadcumb;
  public slideListData: Object = [];
  public serverURL;

  constructor(
      public http: HttpClient,
      public commonService: CommonService,
      private loadingController: LoadingController,

  ) {
    this.breadcumb = [];
    /*this.menuListData = [
      {
        "ICON_ID": "1",
        "PARENT_ICON_ID": "0",
        "ICON_LEVEL": "1",
        "ICON_TEXT": "সেবা সমূহ",
        "HAS_SLIDES": "N",
        "ENABLED": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "2",
        "PARENT_ICON_ID": "0",
        "ICON_LEVEL": "1",
        "ICON_TEXT": "সড়ক নিরাপত্তা",
        "HAS_SLIDES": "N",
        "ENABLED": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "3",
        "PARENT_ICON_ID": "0",
        "ICON_LEVEL": "1",
        "ICON_TEXT": "যোগাযোগ",
        "HAS_SLIDES": "N",
        "ENABLED": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "4",
        "PARENT_ICON_ID": "0",
        "ICON_LEVEL": "1",
        "ICON_TEXT": "আইন",
        "HAS_SLIDES": "N",
        "ENABLED": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "5",
        "PARENT_ICON_ID": "1",
        "ICON_LEVEL": "2",
        "ICON_TEXT": "রেজিস্ট্রেশন",
        "HAS_SLIDES": "N",
        "ENABLED": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "6",
        "PARENT_ICON_ID": "1",
        "ICON_LEVEL": "2",
        "ICON_TEXT": "ফিটনেস",
        "HAS_SLIDES": "Y",
        "ENABLED": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "7",
        "PARENT_ICON_ID": "1",
        "ICON_LEVEL": "2",
        "ICON_TEXT": "ট্যাক্স টোকেন",
        "HAS_SLIDES": "Y",
        "ENABLED": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "8",
        "PARENT_ICON_ID": "1",
        "ICON_LEVEL": "2",
        "ICON_TEXT": "মালিকানা স্থানান্তর",
        "HAS_SLIDES": "Y",
        "ENABLED": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "9",
        "PARENT_ICON_ID": "1",
        "ICON_LEVEL": "2",
        "ICON_TEXT": "রুট পারমিট",
        "HAS_SLIDES": "Y",
        "ENABLED": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "10",
        "PARENT_ICON_ID": "1",
        "ICON_LEVEL": "2",
        "ICON_TEXT": "ডিজিটাল রেজিঃ সার্টিফিকেট",
        "HAS_SLIDES": "Y",
        "ENABLED": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "11",
        "PARENT_ICON_ID": "1",
        "ICON_LEVEL": "2",
        "ICON_TEXT": "ডিজিটাল নম্বরপ্লেট",
        "HAS_SLIDES": "Y",
        "ENABLED": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "12",
        "PARENT_ICON_ID": "1",
        "ICON_LEVEL": "2",
        "ICON_TEXT": "লাইসেন্স",
        "HAS_SLIDES": "N",
        "ENABLED": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "13",
        "PARENT_ICON_ID": "2",
        "ICON_LEVEL": "2",
        "ICON_TEXT": "পথচারী",
        "HAS_SLIDES": "N",
        "ENABLED": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "14",
        "PARENT_ICON_ID": "2",
        "ICON_LEVEL": "2",
        "ICON_TEXT": "যাত্রী",
        "HAS_SLIDES": "N",
        "ENABLED": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "15",
        "PARENT_ICON_ID": "2",
        "ICON_LEVEL": "2",
        "ICON_TEXT": "চালক",
        "HAS_SLIDES": "Y",
        "ENABLED": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "16",
        "PARENT_ICON_ID": "2",
        "ICON_LEVEL": "2",
        "ICON_TEXT": "ট্রাফিক",
        "HAS_SLIDES": "Y",
        "ENABLED": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "17",
        "PARENT_ICON_ID": "2",
        "ICON_LEVEL": "2",
        "ICON_TEXT": "গণপরিবহন",
        "HAS_SLIDES": "Y",
        "ENABLED": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "18",
        "PARENT_ICON_ID": "2",
        "ICON_LEVEL": "2",
        "ICON_TEXT": "রাইড শেয়ারিং",
        "HAS_SLIDES": "Y",
        "ENABLED": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "19",
        "PARENT_ICON_ID": "2",
        "ICON_LEVEL": "2",
        "ICON_TEXT": "শিশু ও প্রতিবন্ধী",
        "HAS_SLIDES": "Y",
        "ENABLED": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "20",
        "PARENT_ICON_ID": "3",
        "ICON_LEVEL": "2",
        "ICON_TEXT": "ফি পরিশোধ",
        "HAS_SLIDES": "N",
        "ENABLED": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "21",
        "PARENT_ICON_ID": "3",
        "ICON_LEVEL": "2",
        "ICON_TEXT": "বিআরটিএ",
        "HAS_SLIDES": "N",
        "ENABLED": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "22",
        "PARENT_ICON_ID": "3",
        "ICON_LEVEL": "2",
        "ICON_TEXT": "অভিযোগ",
        "HAS_SLIDES": "N",
        "ENABLED": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "23",
        "PARENT_ICON_ID": "3",
        "ICON_LEVEL": "2",
        "ICON_TEXT": "পুলিশ",
        "HAS_SLIDES": "Y",
        "ENABLED": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "24",
        "PARENT_ICON_ID": "4",
        "ICON_LEVEL": "2",
        "ICON_TEXT": "শাস্তি",
        "HAS_SLIDES": "N",
        "ENABLED": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "25",
        "PARENT_ICON_ID": "4",
        "ICON_LEVEL": "2",
        "ICON_TEXT": "জরিমানা পরিশোধ",
        "HAS_SLIDES": "N",
        "ENABLED": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "26",
        "PARENT_ICON_ID": "5",
        "ICON_LEVEL": "3",
        "ICON_TEXT": "মোটর সাইকেল",
        "HAS_SLIDES": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "27",
        "PARENT_ICON_ID": "5",
        "ICON_LEVEL": "3",
        "ICON_TEXT": "পণ্যবাহী যান",
        "HAS_SLIDES": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "28",
        "PARENT_ICON_ID": "5",
        "ICON_LEVEL": "3",
        "ICON_TEXT": "যাত্রীবাহী যান",
        "HAS_SLIDES": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "29",
        "PARENT_ICON_ID": "5",
        "ICON_LEVEL": "3",
        "ICON_TEXT": "গাড়ী ও জিপ",
        "HAS_SLIDES": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "30",
        "PARENT_ICON_ID": "5",
        "ICON_LEVEL": "3",
        "ICON_TEXT": "বিশেষায়িত যান",
        "HAS_SLIDES": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "31",
        "PARENT_ICON_ID": "5",
        "ICON_LEVEL": "3",
        "ICON_TEXT": "কৃষি যান",
        "HAS_SLIDES": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "32",
        "PARENT_ICON_ID": "20",
        "ICON_LEVEL": "3",
        "ICON_TEXT": "ব্যাংক",
        "HAS_SLIDES": "N",
        "ICON": ''
      },
      {
        "ICON_ID": "33",
        "PARENT_ICON_ID": "20",
        "ICON_LEVEL": "3",
        "ICON_TEXT": "অনলাইন",
        "HAS_SLIDES": "N",
        "ICON": ''
      },
      {
        "ICON_ID": "34",
        "PARENT_ICON_ID": "20",
        "ICON_LEVEL": "3",
        "ICON_TEXT": "বুথ",
        "HAS_SLIDES": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "35",
        "PARENT_ICON_ID": "21",
        "ICON_LEVEL": "3",
        "ICON_TEXT": "সার্কেল",
        "HAS_SLIDES": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "36",
        "PARENT_ICON_ID": "21",
        "ICON_LEVEL": "3",
        "ICON_TEXT": "সদরদপ্তর",
        "HAS_SLIDES": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "37",
        "PARENT_ICON_ID": "22",
        "ICON_LEVEL": "3",
        "ICON_TEXT": "এনফোর্সমেন্ট",
        "HAS_SLIDES": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "38",
        "PARENT_ICON_ID": "22",
        "ICON_LEVEL": "3",
        "ICON_TEXT": "নির্বাহী ম্যাজিস্ট্রেট",
        "HAS_SLIDES": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "39",
        "PARENT_ICON_ID": "32",
        "ICON_LEVEL": "4",
        "ICON_TEXT": "শাখা সমূহ",
        "HAS_SLIDES": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "40",
        "PARENT_ICON_ID": "32",
        "ICON_LEVEL": "4",
        "ICON_TEXT": "নিকটস্থ শাখা",
        "HAS_SLIDES": "Y",
      },
      {
        "ICON_ID": "41",
        "PARENT_ICON_ID": "33",
        "ICON_LEVEL": "4",
        "ICON_TEXT": "আইপে-বিআরটিএ",
        "HAS_SLIDES": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "42",
        "PARENT_ICON_ID": "33",
        "ICON_LEVEL": "4",
        "ICON_TEXT": "সেবা বাতায়ন পোর্টাল",
        "HAS_SLIDES": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "43",
        "PARENT_ICON_ID": "12",
        "ICON_LEVEL": "4",
        "ICON_TEXT": "স্মার্ট কার্ড ড্রাইভিং লাইসেন্স",
        "HAS_SLIDES": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "44",
        "PARENT_ICON_ID": "12",
        "ICON_LEVEL": "4",
        "ICON_TEXT": "শিক্ষানবিশ ড্রাইভিং লাইসেন্স",
        "HAS_SLIDES": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "45",
        "PARENT_ICON_ID": "12",
        "ICON_LEVEL": "4",
        "ICON_TEXT": "ড্রাইভিং স্কুল",
        "HAS_SLIDES": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "46",
        "PARENT_ICON_ID": "12",
        "ICON_LEVEL": "4",
        "ICON_TEXT": "কনডাক্টর লাইসেন্স",
        "HAS_SLIDES": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "49",
        "PARENT_ICON_ID": "24",
        "ICON_LEVEL": "4",
        "ICON_TEXT": "যানবাহন সংক্রান্ত",
        "HAS_SLIDES": "Y"
      },
      {
        "ICON_ID": "50",
        "PARENT_ICON_ID": "24",
        "ICON_LEVEL": "4",
        "ICON_TEXT": "ড্রাইভিং লাইসেন্স সংক্রান্ত",
        "HAS_SLIDES": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "51",
        "PARENT_ICON_ID": "24",
        "ICON_LEVEL": "4",
        "ICON_TEXT": "ট্রাফিক নিয়মাবলী ভঙ্গ",
        "HAS_SLIDES": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "52",
        "PARENT_ICON_ID": "24",
        "ICON_LEVEL": "4",
        "ICON_TEXT": "নিরাপত্তা শর্ত ভঙ্গ",
        "HAS_SLIDES": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "53",
        "PARENT_ICON_ID": "25",
        "ICON_LEVEL": "4",
        "ICON_TEXT": "ট্রাফিক মামলা",
        "HAS_SLIDES": "Y",
        "ICON": ''
      },
      {
        "ICON_ID": "54",
        "PARENT_ICON_ID": "25",
        "ICON_LEVEL": "4",
        "ICON_TEXT": "ভ্রাম্যমান আদালতে মামলা",
        "HAS_SLIDES": "Y",
        "ICON": ''
      }
    ];*/

    /*this.slideListData = [
       {
         "SLIDE_ID": "1",
         "ICON_ID": "26",
         "SLIDE_SN": "1",
         "SLIDE_CONTENT": "Slide 1",
         "ENABLED": "Y"
       },
       {
         "SLIDE_ID": "2",
         "ICON_ID": "26",
         "SLIDE_SN": "2",
         "SLIDE_CONTENT": "Slide 2",
         "ENABLED": "Y"
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

    this.serverURL = this.commonService.apiBaseUrl;
  }

  /*async storeMenus() {
    const url = this.serverURL +'file/menu/list';
    this.commonService.setReq('GET', url).subscribe(result => {
      this.commonService.setItem('home-menus', result);
    },err =>function(e){
    });
  }*/

  public saveMenu() {
    const url = this.serverURL +'file/menu/list';
    return this.commonService.setReq('GET', url);
  }

  public getBankingMassage() {
    const url = this.serverURL +'file/menu/noticeList';
    return this.commonService.setReq('GET', url);
  }

  public getMenu(icon_id = '0') {
    let menus = false;
    this.menuListData = this.commonService.getItem('home-menus');
    if(this.menuListData != null){
      this.menuListData.forEach(function (val) {
        if (val.ICON_ID == icon_id  && val.ENABLED == 'Y') {
          menus = val;
        }
      });
    }    
    return menus;
  }


  public getBreadcumb(icon_id = '0', init=false) {
    if(init){
      this.breadcumb = []
    }
    let menu = this.getMenu(icon_id);

    if(menu){
      this.breadcumb.push(menu);
      if(menu['PARENT_ICON_ID'] != '0'){
        return this.getBreadcumb(menu['PARENT_ICON_ID']);
      }else{
        return this.breadcumb.reverse();
      }
    }else{
      return false;
    }
  }

  /*public getChildMenus(parent_icon_id = '0') {

    this.menuListData = this.commonService.getItem('home-menus');
    let menus = [];
    this.menuListData.forEach(function (val) {
      if (val.PARENT_ICON_ID == parent_icon_id) {
        menus.push(val);
      }
    });
    return menus;
  }*/

  public getChildMenus(parent_icon_id = '0') {

    this.menuListData = this.commonService.getItem('home-menus');
    let menus = [];
    if( this.menuListData != null){
      this.menuListData.forEach(function (val) {
        if (val.PARENT_ICON_ID == parent_icon_id  && val.ENABLED == 'Y') {
          menus.push(val);
        }
      });
    }    
    return menus;
  }


  /*public getSlides(icon_id = '0') {
    let slides = [];
    this.slideListData.forEach(function (val) {
      if (val.ICON_ID == icon_id) {
        slides.push(val);
      }
    });
    return slides;
  }*/

  public getSlides(icon_id = "0") {
    const url = this.serverURL + "file/menu/slides-by-menuId";
    return this.commonService.setReq('POST',url, {"iconId": icon_id});

  }
}
