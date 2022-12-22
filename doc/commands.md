 
 api key for BRTA_GOTI: AIzaSyAP7mzXoivf19RhMbNpj9e4WlPZEUjnvqk
 
 ##Google map
 https://ionic.tutorials24x7.com/blog/implement-google-maps-in-ionic-4-for-android
  
 ionic cordova plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="AIzaSyAP7mzXoivf19RhMbNpj9e4WlPZEUjnvqk"
 npm install @ionic-native/core @ionic-native/google-maps 
 
 ionic cordova plugin add cordova-plugin-geolocation --variable GEOLOCATION_USAGE_DESCRIPTION="To locate you"
 npm install --save @ionic-native/geolocation
 
 // add code in config.xml
 <preference name="GOOGLE_MAPS_ANDROID_API_KEY" value="AIzaSyAP7mzXoivf19RhMbNpj9e4WlPZEUjnvqk" />
 
 //add in index.html
 <script defer src="http://maps.google.com/maps/api/js?key=AIzaSyAP7mzXoivf19RhMbNpj9e4WlPZEUjnvqk&callback=initMap&libraries=places,drawing,geometry"></script>

#https://ionicframework.com/docs/v3/cli/commands.html
npm config set -g production false

-- For native storage--
ionic cordova plugin add cordova-sqlite-storage
npm install --save @ionic/storage

-- For network information--
ionic cordova plugin add cordova-plugin-network-information
npm install @ionic-native/network

-- For device UUID --
ionic cordova plugin add cordova-plugin-uniquedeviceid
npm install @ionic-native/unique-device-id

-- for camera plugin ---
ionic cordova plugin add cordova-plugin-camera
npm install @ionic-native/camera

-- for inapp browsing --
ionic cordova plugin add cordova-plugin-inappbrowser
npm install --save @ionic-native/in-app-browser

-- for inapp browsing theaming --
ionic cordova plugin add cordova-plugin-themeablebrowser
npm install --save @ionic-native/themeable-browser

ionic cordova plugin add cordova-plugin-native-spinner
npm install --save @ionic-native/spinner-dialog

/// app version control 
ionic cordova plugin add cordova-plugin-app-version
npm install @ionic-native/app-version

//image picker
ionic cordova plugin add cordova-plugin-telerik-imagepicker
npm install @ionic-native/image-picker

//media capture
ionic cordova plugin add cordova-plugin-media-capture
npm install @ionic-native/media-capture

//media
ionic cordova plugin add cordova-plugin-media
npm install @ionic-native/media

//streaming media
ionic cordova plugin add cordova-plugin-streaming-media
npm install @ionic-native/streaming-media

//file chooser
ionic cordova plugin add cordova-plugin-filechooser
npm install @ionic-native/file-chooser

//file path
ionic cordova plugin add cordova-plugin-filepath
npm install @ionic-native/file-path

// make resources
ionic cordova resources

//
ionic cordova run android --prod

http://210.4.76.98:8080/bsp/api/file/menu/signal-image/1
/// android network sequrity xml page ....

<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="true">
        <trust-anchors>
            <certificates src="system" />
        </trust-anchors>
    </base-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">localhost</domain>
        <domain includeSubdomains="true">http://210.4.76.133:9999</domain>
    </domain-config>
</network-security-config>
