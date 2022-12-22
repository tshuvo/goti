import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {
    GoogleMap,
    GoogleMaps,
    GoogleMapsAnimation,
    LatLng,
    Marker,
    MarkerOptions,
    MyLocation
} from '@ionic-native/google-maps';
import {Platform} from '@ionic/angular';

@Component({
    selector: 'app-map-view',
    templateUrl: './map-view.component.html',
    styleUrls: ['./map-view.component.scss'],
})

export class MapViewComponent implements OnInit, AfterViewInit {

    // tslint:disable-next-line:no-input-rename
    @Input('branchLocation') branchLocation;
    // tslint:disable-next-line:no-input-rename
    @Input('locationId') locationId;
    userMarker: Marker;
    map: GoogleMap;
    branchBarkerList: Marker;
    branchDistance = [];
    userLatLng: LatLng;

    constructor(public platform: Platform) {
        this.locationId = this.locationId + '-' + Math.random();
    }

    ngOnInit() {

    }

    ngAfterViewInit() {

        /* this.branchLocation = [
            {
                address: 'Kalshi',
                bankName: 'Mirpur DOHS',
                boothName: 'Mirpur DOHS',
                branchName: 'Mirpur DOHS',
                lat: 23.8225,
                lng: 90.3770,
                title: null
            },
            {
                address: 'Ecb Chottor Bus Stand',
                bankName: 'Ecb Chottor Bus Stand',
                boothName: 'Ecb Chottor Bus Stand',
                branchName: 'Ecb Chottor Bus Stand',
                lat: 23.8227,
                lng: 90.3937,
                title: null
            },
            {
                address: 'Mirpur DOHS',
                bankName: 'Mirpur DOHS',
                boothName: 'Mirpur DOHS',
                branchName: 'Mirpur DOHS',
                lat: 23.8365,
                lng: 90.3695,
                title: null
            }
        ]; */

        this.platform.ready().then(() => {
            this.map = GoogleMaps.create('map-' + this.locationId);
            this.onLocationSetInMap();
        });
    }

    async onLocationSetInMap() {

        let i;
        await this.map.clear();

        this.map.getMyLocation().then((location: MyLocation) => {
            this.userLatLng = location.latLng;
            // console.log(JSON.stringify(location, null, 2));
            /* this.map.animateCamera({
                 target: this.userLatLng,
                 zoom: 15,
                 tilt: 30
             }); */

            this.userMarker = this.map.addMarkerSync({
                title: 'This is your location',
                icon: 'assets/images/location_user.png',
                position: this.userLatLng,
                animation: GoogleMapsAnimation.BOUNCE
            });

            try {
                console.log('db branch location ', this.branchLocation);
                if (this.branchLocation.length > 0) {
                    for (i = 0; i < this.branchLocation.length; i++) {
                        const dis = this.getDistanceBetweenPoints(this.userLatLng, this.branchLocation[i].lat, this.branchLocation[i].lng);
                        const arr = {
                            index: i,
                            distance: dis,
                            lat: this.branchLocation[i].lat,
                            lng: this.branchLocation[i].lng,
                            bankName: this.branchLocation[i].bankName,
                            branchName: this.branchLocation[i].branchName,
                            address: this.branchLocation[i].address
                        };
                        this.branchDistance.push(arr);
                    }
                    console.log('branchDistance with out sort ', this.branchDistance);
                }

                this.branchDistance = this.branchDistance.sort((a: any, b: any) => {
                    a = a.distance;
                    b = b.distance;
                    if (a < b) {
                        return -1;
                    } else if (a > b) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                console.log('branchDistance with sort ', this.branchDistance);
                console.log('nearest bank branch ', this.branchDistance[0].index + ', ' + this.branchDistance[0].distance + ', ' +
                    this.branchDistance[0].lat + ', ' + this.branchDistance[0].lng + ', ' + this.branchDistance[0].bankName + ', ' +
                    this.branchDistance[0].branchName + ', ' + this.branchDistance[0].address);

                this.map.animateCamera({
                    target: new LatLng(this.branchDistance[0].lat, this.branchDistance[0].lng),
                    zoom: 14,
                    tilt: 30
                });

                const markerOptions: MarkerOptions = {
                    title: this.branchDistance[0].bankName,
                    snippet: this.branchDistance[0].branchName + ', ' + this.branchDistance[0].address,
                    icon: 'assets/images/location_branch.png',
                    position: new LatLng(this.branchDistance[0].lat, this.branchDistance[0].lng),
                    animation: GoogleMapsAnimation.BOUNCE
                };
                this.addMarkerOnMap(markerOptions);

            } catch (e) {
                console.log('Map location point error', e.getMessages());
            }
        }).catch(err => {
            console.log('Map location point error_2', err);
        });
    }

    getDistanceBetweenPoints(start, endLat, endLng, units: any = 'meter') {

        const earthRadius = {
            meter: 6378137,
            miles: 3958.8,
            km: 6371
        };
        const R = earthRadius[units || 'miles'];

        const lat1 = start.lat;
        const lon1 = start.lng;
        const lat2 = endLat;
        const lon2 = endLng;

        const dLat = this.toRad((lat2 - lat1));
        const dLon = this.toRad((lon2 - lon1));

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d;
    }

    toRad(x) {
        return x * Math.PI / 180;
    }

    addMarkerOnMap(markerOptions: MarkerOptions) {
        this.branchBarkerList = this.map.addMarkerSync(markerOptions);
    }
}
