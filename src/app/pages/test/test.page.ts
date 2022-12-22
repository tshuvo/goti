import {Component, OnInit} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';

// Import classes from maps module
import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    LatLng,
    MarkerOptions,
    Marker, MyLocation, GoogleMapsAnimation
} from '@ionic-native/google-maps';

import {LoadingController, Platform, ToastController} from '@ionic/angular';

@Component({
    selector: 'app-test',
    templateUrl: './test.page.html',
    styleUrls: ['./test.page.scss'],
})

export class TestPage implements OnInit {

    map: GoogleMap;
    loading: any;
    branchLocation = [];
    branchBarkerList: Marker;
    userMarker: Marker;

    ngOnInit() {
    }

    constructor(
        public platform: Platform,
        private geolocation: Geolocation,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController
    ) {

        this.branchLocation = [
            {
                lat: 23.8225,
                lng: 90.3770,
                title: 'Kalshi',
            }, {
                lat: 23.8305,
                lng: 90.3768,
                title: 'ECB Canteen',
            },
        ];

        this.platform.ready().then(() => {
            this.map = GoogleMaps.create('map');
            this.onLocationSetInMap();

            // this.loadMap();
        });
    }

    async onLocationSetInMap() {

        let i;
        await this.map.clear();
        this.loading = await this.loadingCtrl.create({
            message: 'Map is Loading...'
        });
        await this.loading.present();

        this.map.getMyLocation().then((location: MyLocation) => {
            // console.log(JSON.stringify(location, null, 2));
            this.map.animateCamera({
                target: location.latLng,
                zoom: 17,
                tilt: 30
            });
            this.userMarker = this.map.addMarkerSync({
                title: 'This is your location',
                snippet: 'location name will here',
                icon: 'assets/images/location_user.png',
                position: location.latLng,
                animation: GoogleMapsAnimation.BOUNCE
            });
            this.userMarker.showInfoWindow();
            this.userMarker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
                this.showToast('Clicked on your location');
            });

            for (i = 0; i < this.branchLocation.length; i++) {
                const markerOptions: MarkerOptions = {
                    title: this.branchLocation[i].title,
                    icon: 'assets/images/location_branch.png',
                    position: new LatLng(this.branchLocation[i].lat, this.branchLocation[i].lng),
                    animation: GoogleMapsAnimation.BOUNCE
                };
                this.addMarkerOnMap(markerOptions);
            }

            this.loading.dismiss();
        }).catch(err => {
            this.loading.dismiss();
            this.showToast(err.error_message);
        });
    }

    addMarkerOnMap(markerOptions: MarkerOptions) {
        this.branchBarkerList = this.map.addMarkerSync(markerOptions);
    }

    async showToast(msg: string) {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'middle'
        });
        toast.present();
    }

    loadMap() {
        let map = GoogleMaps.create('map');
        let coordinates: LatLng;
        map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {
            //get current location
            this.geolocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 25000
            }).then((position) => {
                coordinates = new LatLng(position.coords.latitude, position.coords.longitude);
            }).catch((error) => {
            });

            // mark my location
            map.animateCamera({
                target: coordinates,
                zoom: 8,
            });

            let markerOptions: MarkerOptions = {
                position: coordinates,
                icon: 'assets/images/location-me.png',
                title: 'Your Location'
            };

            let marker = map.addMarker(markerOptions)
                .then((marker: Marker) => {
                    marker.showInfoWindow();
                });

            let address = [
                {
                    'lat': 23.346133299999998,
                    'long': 90.06542960000001,
                    'title': 'loc 1',
                }, {
                    'lat': 23.846133299999998,
                    'long': 90.26542960000001,
                    'title': 'loc 2',
                },
            ];

            address.forEach(function(key, val) {
                console.log(key, val);
            });

            // location mark 2
            let markerOptions2: MarkerOptions = {
                position: new LatLng(23.846133299999998, 90.06542960000001),
                icon: 'assets/images/location-branch.png',
                title: '2 Location'
            };

            let marker2 = map.addMarker(markerOptions2)
                .then((marker2: Marker) => {
                    marker2.showInfoWindow();
                });
        });
    }

}
