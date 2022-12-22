import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CommonService} from '../../services/common/common.service';
import {ActionSheetController, LoadingController, Platform} from '@ionic/angular';
import {ComplainService} from '../../services/complain/complain.service';
import {ImagePicker} from '@ionic-native/image-picker/ngx';
import {UploadService} from '../../services/uploadImage/upload.service';
import {StreamingMedia} from '@ionic-native/streaming-media/ngx';
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import {FilePath} from '@ionic-native/file-path/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import {
  MediaCapture,
  MediaFile,
  CaptureError,
  CaptureVideoOptions,
  CaptureAudioOptions,
  CaptureImageOptions
} from '@ionic-native/media-capture/ngx';
import {CameraOptions} from '@ionic-native/camera';
import {Camera} from '@ionic-native/camera/ngx';
import {Base64} from '@ionic-native/base64/ngx';

@Component({
  selector: 'app-complain',
  templateUrl: './complain.page.html',
  styleUrls: ['./complain.page.scss'],
})
export class ComplainPage implements OnInit {
  complainTypeList: any;
  complain_type_id: string;
  complain_desc: string;
  sess_user_data: any;
  all_complain: any;
  select_data: any;
  errorMsg: string;
  is_new: any;
  errorMsgShow: any;
  upcoming_id: string = '#FFF';
  current_id: string = '#FFF';
  previous_id: string = '#FFF';
  loadData: string;
  takePhotoLevel: any;
  // showList: boolean = true;
  has_file: string;
  file_type: string;
  checkedFile: boolean = false;
  files = [];
  base64blobCode:any;
  avData: any;
  isAudioVedioStart: string;
  sendFileEntry: any;
  saveLoading: any;
  base64Image: any;
  complainImageAttachment: any;
  complainImageFileSize: any;
  complainImageFileType: any;
  takePhotoColor: any;

  constructor(
      // public session: SessionService,
      public router: Router,
      private actionsheetCtrl: ActionSheetController,
      private imagePicker: ImagePicker,
      private common: CommonService,
      private complain: ComplainService,
      public loadingController: LoadingController,
      private mediaCapture: MediaCapture,
      private file: File,
      private camera: Camera,
      private media: Media,
      private uploadService: UploadService,
      private streamingMedia: StreamingMedia,
      private actionSheetController: ActionSheetController,
      private plt: Platform,
      private base64: Base64,
      private fileChooser: FileChooser,
      private filePath: FilePath
  ) {
    this.is_new = 'Y';
    this.loadData = 'Current';
    this.upcoming_id = '#FFF';
    this.current_id = '#0afdff';
    this.previous_id = '#FFF';
    this.takePhotoColor = '#000';
  }

  ngOnInit() {
    this.sess_user_data = this.common.getItem('userPhone');
    this.takePhotoLevel = "Add your photo";
    this.plt.ready().then(() => {
      this.getComplainTypeList();
      this.showFiles();
      // let path = this.file.dataDirectory;
      // this.file.checkDir(path, 'CCOMPLAIN').then(
      //     () => {
      //       this.loadFiles();
      //     },
      //     err => {
      //       this.file.createDir(path, 'CCOMPLAIN', false);
      //     }
      // );
    });

    console.log("clear all files");
    if(this.files.length > 0){
      for(let i =0; i<= this.files.length; i++)
        this.deleteFile(this.files[i]);
    }


  }

  ionViewDidEnter(){
    console.log("clear all files 2");
    if(this.files.length > 0){
      for(let i =0; i<= this.files.length; i++)
        this.deleteFile(this.files[i]);
    }

  }

  showFiles(){
    this.plt.ready().then(() => {
      this.getComplainTypeList();
      let path = this.file.dataDirectory;
      this.file.checkDir(path, 'CCOMPLAIN').then(
          () => {
            this.loadFiles();
          },
          err => {
            console.log("file not created!");
            this.file.createDir(path, 'CCOMPLAIN', false);
          }
      );
    });

  }

  fileBrowser(){


    this.fileChooser
        .open()
        .then(myUrl => {

          this.filePath.resolveNativePath(myUrl)
              .then(filePath => {

                this.copyFileToLocalDir(filePath);
              })
              .catch(err => console.log(err));
        })
        .catch(e => {
          console.log(e);
        });

  }

  loadFiles() {
    console.log("total number of file : ", this.files.length);
    console.log("total number of file : ", this.files.findIndex);
    let that = this;
    this.file.listDir(this.file.dataDirectory, 'CCOMPLAIN').then(
        res => {
          this.files = res;

          // that.startUpload(res);

        },
        err => console.log('error loading files: ', err)
    );
  }

  getComplainTypeList() {
    this.complain.getComplainList().subscribe(result => {
      console.log('complain_b type : ', result['data']['services']);
      this.complainTypeList = result['data']['services'];

    });
  }

  async saveComplain() {

    console.log("data need to send ", this.avData);

    if (this.complain_type_id === undefined || this.complain_type_id == null || this.complain_type_id === '') {
      this.common.toastMsg('Please select comment type.', false);
    } else if (this.complain_desc === undefined || this.complain_desc == null || this.complain_desc === '') {
      this.common.toastMsg('Please write comment.', false);
    } else {

      // const userSession = this.common.getItem();
      if(this.avData == null){
        this.has_file = 'N';
      }else{
        this.has_file = 'Y';
      }

      console.log("has_file", this.has_file);
      // const myObj = {
      //
      //   serviceId: this.complain_type_id,
      //   comment: this.complain_desc,
      //   // has_file : this.has_file,
      //   // file_type: this.file_type,
      //   src: 'APP',
      //   // complain_av_data: this.audioVideoData,
      //   // complain_av_type: this.complain_av_type,
      //   // user_id: userSession['MYDATA']['o_user_id'],
      // };
      // const postData = JSON.stringify(myObj);
      // console.log("complain_b post data: ", postData);
      this.saveLoading = await this.loadingController.create({
        message: 'Processing'
      });
      await this.saveLoading.present();
      const myObj = {
        comment: this.complain_desc,
        // engineNo: this.engineNo,
        complainFileAttachment: this.complainImageAttachment,
        complainFileName: this.common.getItem('userPhone')+ this.complainImageFileSize,
        complainFileSize: this.complainImageFileSize,
        complainFileType: this.complainImageFileType,
        serviceId: this.complain_type_id,
        src: "APP"
      };
      // const formData = new FormData();
      // formData.append('USERDATA', userData);
      // formData.append('file', imgBlob, file.name);
      console.log("send data to api ", myObj);
      this.uploadService.uploadFile(myObj).subscribe(dataRes => {
        this.saveLoading.dismiss();
        if (dataRes['status'] == '200') {
          // this.common.showAlert(true, null, result['STATUS']['MSG']);
          this.has_file = null;
          this.complain_type_id = null;
          this.complain_desc = null;
          this.common.toastMsg(dataRes['data'].message);
          this.showPreviousComments();
          // this.router.navigateByUrl('home');
        } else {
          // this.common.alertMsg( null, 'Please try again. ');
          this.common.toastMsg(dataRes['message'], false);
        }
      });

      // this.readFileNew(this.avData);

      // this.complain_b.saveComplain(postData).subscribe(result => {
      //   loading.dismiss();
      //   if (result.hasOwnProperty('STATUS') && result['STATUS']['CODE'] == '1') {
      //     // this.common.showAlert(true, null, result['STATUS']['MSG']);
      //     this.common.toastMsg('Comment save successfully');
      //     this.showPreviousComments();
      //     // this.router.navigateByUrl('home');
      //   } else {
      //     this.common.showAlert(false, null, 'Please try again. ');
      //   }
      // }, err => loading.dismiss());


    }

  }

  beingNewPage() {
    this.is_new = 'Y';
    this.loadData = 'Current';
    this.upcoming_id = '#FFF';
    this.current_id = '#0afdff';
    this.previous_id = '#FFF';
  }

  async showPreviousComments() {

    this.loadData = 'Upcoming';
    this.upcoming_id = '#0afdff';
    this.current_id = '#fff';
    this.previous_id = '#FFF';

    this.is_new = 'N';
    this.errorMsgShow = 'NO';
    const loading = await this.loadingController.create({ message: 'Please Wait...' });
    await loading.present();

    this.all_complain = this.complain.getPreviousComplain('').subscribe(result => {
          console.log('get previous comments : ', result);
          if ( result['status'] == '200') {
            // this.common.showAlert(false, 'Sorry!', result['MYDATA']['STATUS'].MSG);


            this.select_data = (result['data']['publicComments']);
          } else {
            this.errorMsgShow = 'YES';
            this.errorMsg = 'No Previous Comments Found.';

          }
        },

        err => {
          this.errorMsgShow = 'YES';
          this.errorMsg = 'No Previous Comments Found.',
              loading.dismiss();
        });
    loading.dismiss();
  }

  async selectMedia() {
    // this.showList = false;
    const actionSheet = await this.actionSheetController.create({
      header: 'What would you like to add?',
      buttons: [
        {
          text: 'Capture Image',
          handler: () => {
            this.captureImage();
          }
        },
        {
          text: 'Record Video',
          handler: () => {
            // this.showList = false;
            this.recordVideo();
          }
        },
        // {
        //
        //   text: 'Record Audio',
        //   handler: () => {
        //     // this.showList = false;
        //     this.recordAudio();
        //   }
        // },
        {
          text: 'Select File',
          handler: () => {
            // this.showList = true;
            // this.showFiles();
            this.fileBrowser();
            // this.pickImages();
          }
        },
        {

          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  async browseImageFile(documentType: any) {
    const actionSheet = await this.actionsheetCtrl.create({
      header: 'Upload Photo',
      cssClass: 'action-sheets-page',
      buttons: [
        {
          text: 'Camera',
          role: 'destructive',
          icon: 'camera',
          handler: () => {
            this.captureOnlyImage( documentType);
          }
        },
        {
          text: 'Gallery',
          icon: 'images',
          handler: () => {
            this.galleryImage(true,documentType)
          }
        },
      ]
    });
    await actionSheet.present();
  }

  async captureOnlyImage( documentType: any) {
    const options: CameraOptions = {
      quality: 20,
      targetHeight: 600,
      targetWidth: 600,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      // ...useAlbum ? {saveToPhotoAlbum: false} : {saveToPhotoAlbum: true},
      // ...useAlbum ? {sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM} : {sourceType: this.camera.PictureSourceType.CAMERA}
    };

    // const imageData = await this.camera.getPicture(options);
     this.camera.getPicture(options).then((imageDatas) => {

       this.base64.encodeFile(imageDatas).then((b4String: string) => {
         console.log('image paoya geche file path: ', imageDatas);
         this.complainImageAttachment = b4String;
         this.complainImageFileSize = '1';
         this.complainImageFileType = 'image/jpeg';
         this.takePhotoLevel = "Photo attached";
         this.takePhotoColor = '#F00';
       }, (err) => {
         console.log("make an error", err);

       });


     }, (err) => {
       console.log("make an error", err);

     });

    // if (this.base64Image === undefined ){
    //   console.log('come here...');
    //   this.common.alertMsg('','Please, take again.', 'OK');
    //   this.takePhotoLevel = "Take again please.";
    //   this.takePhotoColor = '#000';
    // }else{
    //   console.log('image paoya geche: ', this.base64Image);
    //   this.complainImageAttachment = this.base64Image;
    //   this.complainImageFileSize = '1';
    //   this.complainImageFileType = 'image/jpeg';
    //   this.takePhotoLevel = "Photo attached";
    //   this.takePhotoColor = '#F00';
    // }

    // console.log("data: ", imageData);
    // this.base64Image = `${imageData}`;

  }

  async galleryImage( useAlbum: boolean, documentType: any) {
    const options: CameraOptions = {
      quality: 20,
      targetHeight: 600,
      targetWidth: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true,
      mediaType: this.camera.MediaType.PICTURE,
      ...useAlbum ? {saveToPhotoAlbum: false} : {saveToPhotoAlbum: true},
      ...useAlbum ? {sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM} : {sourceType: this.camera.PictureSourceType.CAMERA}
    };

    // const imageData = await this.camera.getPicture(options);
    const imageData = await this.camera.getPicture(options);
    this.base64Image = `${imageData}`;
      this.complainImageAttachment = this.base64Image;
      this.complainImageFileSize = '1';
      this.complainImageFileType = 'image/jpeg';
      this.takePhotoLevel = "Photo attached";
      this.takePhotoColor = '#F00';

    console.log("gallery data: ", this.base64Image);
    // this.base64Image = `${imageData}`;

  }

  pickImages() {
    this.imagePicker.getPictures({}).then(
        results => {
          for (var i = 0; i < results.length; i++) {
            this.copyFileToLocalDir(results[i]);
          }
        }
    );

    // If you get problems on Android, try to ask for Permission first
    // this.imagePicker.requestReadPermission().then(result => {
    //   console.log('requestReadPermission: ', result);
    //   this.selectMultiple();
    // });
  }

  captureImage() {

    this.mediaCapture.captureImage().then(
        (data: MediaFile[]) => {
          if (data.length > 0) {
            this.copyFileToLocalDir(data[0].fullPath);
          }
        },
        (err: CaptureError) => console.error(err)
    );
  }

  recordAudio() {
    if(this.files.length > 0){
      this.deleteFile(this.files[0]);
    }
    let options: CaptureAudioOptions = {limit: 1, duration: 10};
    this.mediaCapture.captureAudio(options).then(
        (data: MediaFile[]) => {
          if (data.length > 0) {
            this.copyFileToLocalDir(data[0].fullPath);
          }
        },
        (err: CaptureError) => console.error(err)
    );
  }

  recordVideo() {
    if(this.files.length > 0){
      this.deleteFile(this.files[0]);
    }
    let options: CaptureVideoOptions = { limit: 1, duration: 30, quality: 0 };
    this.mediaCapture.captureVideo(options).then(
        (data: MediaFile[]) => {
          if (data.length > 0) {
            this.copyFileToLocalDir(data[0].fullPath);
          }
        },
        (err: CaptureError) => console.error(err)
    );
  }

  copyFileToLocalDir(fullPath) {
    let myPath = fullPath;
    console.log("your file path: ", fullPath);
    // Make sure we copy from the right location
    if (fullPath.indexOf('file://') < 0) {
      myPath = 'file://' + fullPath;
    }
    console.log("manupuleted path: ", myPath);
    const ext = myPath.split('.').pop();
    const d = Date.now();
    const newName = `${d}.${ext}`;

    const name = myPath.substr(myPath.lastIndexOf('/') + 1);
    const copyFrom = myPath.substr(0, myPath.lastIndexOf('/') + 1);
    const copyTo = this.file.dataDirectory + 'CCOMPLAIN';

    this.file.copyFile(copyFrom, name, copyTo, newName).then(
        success => {
          console.log("copy file done.. now show");
          // this.showList = true;

          // setTimeout(function(){
          //   console.log("come to load");
          //   this.loadFiles();
          // },500);

          this.showFiles();

          this.checkedFile = false;
          setTimeout(function(){
            document.getElementById('mediaCheck').click();
            console.log('auto select clicked');
          },1000);

        },
        error => {
          console.log('error: ', error);
        }
    );
    // this.loadFiles();
  }

  openFile(f: FileEntry) {
    if (f.name.indexOf('.wav') > -1) {
      // We need to remove file:/// from the path for the audio plugin to work
      console.log("come to open file");
      const path =  f.nativeURL.replace(/^file:\/\//, '');
      const audioFile: MediaObject = this.media.create(path);
      audioFile.play();
    }else if (f.name.indexOf('.amr') > -1) {
      // We need to remove file:/// from the path for the audio plugin to work
      console.log("come to open file");
      const path =  f.nativeURL.replace(/^file:\/\//, '');
      const audioFile: MediaObject = this.media.create(path);
      audioFile.play();
    }
    else if (f.name.indexOf('.MOV') > -1 || f.name.indexOf('.mp4') > -1) {
      // E.g: Use the Streaming Media plugin to play a video
      this.streamingMedia.playVideo(f.nativeURL);
    }
  }

  deleteFile(f: FileEntry) {
    const path = f.nativeURL.substr(0, f.nativeURL.lastIndexOf('/') + 1);
    this.file.removeFile(path, f.name).then(() => {
      this.loadFiles();
    }, err => console.log('error remove: ', err));
  }

  startUpload(fileEntry: FileEntry) {

    console.log("file name ", fileEntry.name);

    // if(this.checkedFile){

    //   let av = "";
    // if(fileEntry.name.endsWith('wav') || fileEntry.name.endsWith('amr')){
    //   av = 'A'
    //   this.complain_av_type = "audio";
    // }else{
    //   av = 'V'
    //   this.complain_av_type = "video";
    // }
    this.sendFileEntry = fileEntry;
    if(fileEntry.name.endsWith('MOV') || fileEntry.name.endsWith('mp4') || fileEntry.name.endsWith('3gp') ||
        fileEntry.name.endsWith('mkv') || fileEntry.name.endsWith('avi') || fileEntry.name.endsWith('flv') || fileEntry.name.endsWith('wmv')){
      console.log("vedio");
      this.file_type = "video";
    } else if(fileEntry.name.endsWith('.jpg') || fileEntry.name.endsWith('.png') || fileEntry.name.endsWith('.jpeg')){
      console.log("imgae");
      this.file_type = "image";
    }
    else{
      this.file_type = "video";
      console.log("audio");
    }

    this.file.resolveLocalFilesystemUrl(fileEntry.nativeURL)
        .then(entry => {
          ( < FileEntry > entry).file(file =>{
                entry.getMetadata((meta =>{
                  let kb = meta.size/1024;
                  console.log("file size: ",kb);
                  if(kb> 1000){
                    if(this.files.length > 0){
                      this.deleteFile(this.files[0]);
                    }
                    this.common.toastMsg( "your file size cannot be more then 1mb",false);
                    return;
                  }
                }));
                this.avData = file
              }
              //  this.readFile(file, av)
              //  this.readFileNew(file)

          )
        })
        .catch(err => {
          this.common.toastMsg('Error while reading file.', false);
        });
    // }else{
    //   console.log("no file selected");
    //   this.audioVideoData = '';
    // }

  }



// readFile(file: any, av) {
//   console.log("come to read file", file.nativeURL);
//     const reader = new FileReader();
//     let tempData : any;
//     reader.onload = () => {
//       console.log("reader.result", reader.result);
//         const formData = new FormData();
//         let imgBlob : any;
//         if(av == 'A'){
//           imgBlob = new Blob([reader.result], {
//             type: "audio/mp3"
//           });
//         }else{
//           imgBlob = new Blob([reader.result], {
//             type: "video/mp4"
//           });
//         }

//         // console.log("blob type:", typeof imgBlob);
//         console.log("blob :",  imgBlob);
//         // console.log('mahedi', window.btoa(imgBlob));



//         var blobReader = new FileReader();
//         // blobReader.readAsDataURL(imgBlob);
//         // // blobReader.readAsDataURL

//         let that =this;
//          blobReader.onloadend = function(evt) {
//           //  var b64 = evt.
//             var base64data = blobReader.result;
//             console.log('blobReader', base64data);
//             that.audioVideoData =   blobReader.result;
//         }

//         // blobReader.onloadend = this.audioVideoData



//         // formData.append('file', imgBlob, file.name);
//         // this.uploadImageData(formData);

//         //  this.audioVideoData = tempData;
//          console.log("fromdata audio video : ", this.audioVideoData);

//          console.log(' mahedi.result',  reader.result);
//     };
//     reader.readAsText(file);
// }

  readFileNew(file: any){
    console.log("has file in runmethod", this.has_file);
    if(this.has_file == 'Y'){
      let data : any;
      let base64: any;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        base64 = reader.result;
        console.log('base 64', base64);
        const myObj = {
          comment: this.complain_desc,
          // engineNo: this.engineNo,
          complainFileAttachment: base64,
          complainFileName: file.name,
          complainFileSize: file.size,
          complainFileType: file.type,
          serviceId: this.complain_type_id,
          src: "APP"
        };
        // const formData = new FormData();
        // formData.append('USERDATA', userData);
        // formData.append('file', imgBlob, file.name);
        console.log("send data to api ", myObj);
        this.uploadService.uploadFile(myObj).subscribe(dataRes => {
          this.saveLoading.dismiss();
          if (dataRes['status'] == '200') {
            // this.common.showAlert(true, null, result['STATUS']['MSG']);
            this.has_file = null;
            this.complain_type_id = null;
            this.complain_desc = null;
            this.common.toastMsg(dataRes['data'].message);
            this.deleteFile(this.sendFileEntry);
            this.showPreviousComments();
            // this.router.navigateByUrl('home');
          } else {
            // this.common.alertMsg( null, 'Please try again. ');
            this.common.toastMsg(dataRes['message'],false);
          }
          // console.log("console to mehedi vai with data",dataRes);
          // alert("come to delete");


        }, err => this.saveLoading.dismiss());
      };
      reader.readAsArrayBuffer(file);
    }else{
      console.log("request without has file");
      const myObj = {
        comment: this.complain_desc,
        // engineNo: this.engineNo,
        complainFileAttachment: '',
        complainFileName: '',
        complainFileSize: '',
        complainFileType: '',
        serviceId: this.complain_type_id,
        src: "APP"
      };
      // const formData = new FormData();
      // formData.append('USERDATA', userData);
      // formData.append('file', "");
      // console.log("send data to api ", formData);
      this.uploadService.uploadFile(myObj).subscribe(dataRes => {
        this.saveLoading.dismiss();
        if (dataRes['status'] == '200') {
          // this.common.showAlert(true, null, result['STATUS']['MSG']);
          this.has_file = null;
          this.complain_type_id = null;
          this.complain_desc = null;
          this.common.toastMsg(dataRes['data'].message);
          if(this.sendFileEntry != null){
            this.deleteFile(this.sendFileEntry);
          }
          this.showPreviousComments();
          //todo need to delete ....
          // this.router.navigateByUrl('home');
        } else {
          // this.common.showAlert(false, null, 'Please try again. ');
          this.common.alertMsg(null, 'Please try again. ', '');
        }

      }, err => this.saveLoading.dismiss());
    }


  }

  async uploadImageData(formData: FormData) {
    const loading = await this.loadingController.create({
      message: 'Uploading files...',
    });
    await loading.present();

  }


}
