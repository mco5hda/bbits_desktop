import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AnalogRecording } from '../../models/recordings/analog-recordings.model';
import { Router } from '@angular/router';
import { Environment } from 'src/app/app.environment';

@Component({
  selector: 'app-consult-analog-recordings',
  templateUrl: './consult-analog-recordings.component.html',
  styleUrls: ['./consult-analog-recordings.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ConsultAnalogRecordingsComponent implements OnInit {

  analogRecordings: AnalogRecording[] = new Array();
  currentPage: number = 1;
  elementsPerPage: number = Environment.defaultPaginationElements;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllAnalogRecordings();
  }

  getAllAnalogRecordings(){
    //Send the request to the  server and get the json with the ip cameras elements array

    let data = {
      "id": "",
      "name": undefined,
      "family": undefined,
      "category": undefined,
      "accessories" : "DVR-XS-DVD,DVR-XS050-A,DVR-XS100-A,DVR-XS200-A,DVR-XS300-A,DVR-XS400-A",
      "image": undefined,
      "thumbnail": undefined,
      "datasheet": undefined,
      "ctnClass": undefined,
      "ctnClassFull": undefined,
      "dataFormat": undefined,
      "inputRelayOutputs": undefined,
      "targetSystemSize": undefined,
      "timeLine": false,
      "userLevels": undefined,
      "subTypes": [
        {"name": "DVR-5000-16A000","description": "DIVAR AN 5000"},
        {"name": "DVR-5000-16A001","description": "DIVAR AN 5000"},
        {"name": "DVR-5000-16A100","description": "DIVAR AN 5000"},
        {"name": "DVR-5000-16A101","description": "DIVAR AN 5000"},
        {"name": "DVR-5000-16A200","description": "DIVAR AN 5000"},
        {"name": "DVR-5000-16A201","description": "DIVAR AN 5000"},
        {"name": "DVR-5000-16A401","description": "DIVAR AN 5000"}
      ],
      "basicFeaturesRecording":{
        "channels" : undefined,
        "frameRateIPS" : undefined,
        "ipsPerCamera" : "30",
        "liveResolution" : "960H",
        "systemSize" : undefined,
        "loopinVideo" : true,
        "preAlarm" : true,
        "motionDetection": true,
        "mountableRack" : true,
        "multipleCamera" : true,
        "videoCompression" : "H.264",
        "hResolution" : true,
        "network" : "10/100/1000-BaseT",
        "operativeSystem" : "Windows XP, Windows Vista or Windows 7"
      },
      "advancedFeaturesRecording":{
        "smartMotionSearch" : true,
        "instantPlayBack" : true,
        "searchMode" : "Time, channel, type, smart",
        "callUpPrepositionOnDome" : true,
        "cameraLockoutsByUser" : true,
        "dataIntegrityCheck" : true,
        "increaseFrameRateOnAlarm" : true,
        "individualCameraAdjustment" : true
      },
      "aioFunctionsRecording":{
        "ptzControls" : true,
        "ptzJoystickControl" : true,
        "adminControl" : true,
        "exportOptions" : true
      },
      "audioRecording":{
        "associateCameraToAudio" : true,
        "biDirectionalAudio" : true,
        "inOutChanels" : true,
        "synchronousAudio" : true
      },
      "integrationRecording":{
        "optionalAtpmPos" : false,
        "sdk" : false
      },
      "localRemoteViewingRecording":{
        "mobileClientAccess" : true,
        "webBrowserAccess" : true,
        "setViewingPermissions" : false,
        "simultaneousAccessibleUser" : undefined
      },
      "recording":{
        "scheduleRecordingModes" : undefined,
        "screenDivisionMultiScreen" : true,
        "recordingResolution" : "CVBS(PAL):704x576CVBS(NTSC):704x480VGA:1920x10801280x10241280x7201024x768HDMI:1920x10801280x10241280x7201024x768960Hcamera:960x576(PAL)960x480(NTSC)720Hcamera:704x576(PAL)704x480(NTSC)",
        "digitalZoomLive" : true
      },
      "storageOptionsRecording":{
        "supportDevices" : undefined,
        "expandable" : true,
        "externalStorage" : true,
        "onBoardRaid" : false,
        "numberHD" : "4",
        "exportOptionsStorage" : undefined,
        "backUpMode" : "Manual"
      },
      "videoOutputRecording":{
        "connectorType" : "BNC/VGA/HDMI",
        "spotMonitor" : true
      },
      "price" : "1.0",
      "electricalData":{
        "inputVoltage" : undefined,
        "normalVersion" : undefined
      }
    }

    for (let index = 0; index < 10; index++) {
      let analogRecording: AnalogRecording = new AnalogRecording();
      analogRecording.id = index;
      
      for(let key in data){
        if(key === 'name'){
          analogRecording.name = 'Prueba'+index;
        }else if(key === 'family'){
          analogRecording.family = 'Prueba';
        }else if(key === 'category'){
          analogRecording.category = 'Prueba';
        }else if(key === 'ctnClass'){
          analogRecording.ctnClass = 'Prueba';
        }else if(key === 'ctnClassFull'){
          analogRecording.ctnClassFull = 'Prueba';
        }else if(key === 'price'){
          analogRecording.price = 'Prueba';
        }else if(key === 'dataFormat'){
          analogRecording.dataFormat = 'Prueba';
        }else if(key === 'inputRelayOutputs'){
          analogRecording.inputRelayOutputs = 'Prueba';
        }else if(key === 'targetSystemSize'){
          analogRecording.targetSystemSize = 'Prueba';
        }else if(key === 'timeLine'){
          analogRecording.timeLine = false;
        }else if(key === 'userLevels'){
          analogRecording.userLevels = 'Prueba';
        }else if(key === 'basicFeaturesRecording'){
          for(let index in data[key]){
            if(index === 'channels'){
              analogRecording.basicFeatures.channels = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'frameRateIPS'){
              analogRecording.basicFeatures.frameRateIPS = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'ipsPerCamera'){
              analogRecording.basicFeatures.ipsPerCamera = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'liveResolution'){
              analogRecording.basicFeatures.liveResolution = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'systemSize'){
              analogRecording.basicFeatures.systemSize = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'loopinVideo'){
              analogRecording.basicFeatures.loopinVideo = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'preAlarm'){
              analogRecording.basicFeatures.preAlarm = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'motionDetection'){
              analogRecording.basicFeatures.motionDetection = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'mountableRack'){
              analogRecording.basicFeatures.mountableRack = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'multipleCamera'){
              analogRecording.basicFeatures.multipleCamera = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'videoCompression'){
              analogRecording.basicFeatures.videoCompression = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'hResolution'){
              analogRecording.basicFeatures.hResolution = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'network'){
              analogRecording.basicFeatures.network = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'operativeSystem'){
              analogRecording.basicFeatures.operativeSystem = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }else if(key === 'advancedFeaturesRecording'){
          for(let index in data[key]){
            if(index === 'smartMotionSearch'){
              analogRecording.advancedFeatures.smartMotionSearch = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'instantPlayBack'){
              analogRecording.advancedFeatures.instantPlayBack = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'searchMode'){
              analogRecording.advancedFeatures.searchMode = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'callUpPrepositionOnDome'){
              analogRecording.advancedFeatures.callUpPrepositionOnDome = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'cameraLockoutsByUser'){
              analogRecording.advancedFeatures.cameraLockoutsByUser = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'dataIntegrityCheck'){
              analogRecording.advancedFeatures.dataIntegrityCheck = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'increaseFrameRateOnAlarm'){
              analogRecording.advancedFeatures.increaseFrameRateOnAlarm = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'individualCameraAdjustment'){
              analogRecording.advancedFeatures.individualCameraAdjustment = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }else if(key === 'aioFunctionsRecording'){
          for(let index in data[key]){
            if(index === 'ptzControls'){
              analogRecording.aioFunctions.ptzControls = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'adminControl'){
              analogRecording.aioFunctions.adminControl = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'exportOptions'){
              analogRecording.aioFunctions.exportOptions = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'ptzJoystickControl'){
              analogRecording.aioFunctions.ptzJoystickControl = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }else if(key === 'audioRecording'){
          for(let index in data[key]){
            if(index === 'inOutChanels'){
              analogRecording.audio.inOutChanels = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'associateCameraToAudio'){
              analogRecording.audio.associateCameraToAudio = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'biDirectionalAudio'){
              analogRecording.audio.biDirectionalAudio = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'synchronousAudio'){
              analogRecording.audio.synchronousAudio = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }else if(key === 'integrationRecording'){
          for(let index in data[key]){
            if(index === 'optionalAtpmPos'){
              analogRecording.integration.optionalAtpmPos = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'sdk'){
              analogRecording.integration.sdk = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }else if(key === 'localRemoteViewingRecording'){
          for(let index in data[key]){
            if(index === 'mobileClientAccess'){
              analogRecording.larViewing.mobileClientAccess = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'webBrowserAccess'){
              analogRecording.larViewing.webBrowserAccess = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'setViewingPermissions'){
              analogRecording.larViewing.setViewingPermissions = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'simultaneousAccessibleUser'){
              analogRecording.larViewing.simultaneousAccessibleUser = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }else if(key === 'recording'){
          for(let index in data[key]){
            if(index === 'scheduleRecordingModes'){
              analogRecording.recording.scheduleRecordingModes = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'screenDivisionMultiScreen'){
              analogRecording.recording.screenDivisionMultiScreen = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'recordingResolution'){
              analogRecording.recording.recordingResolution = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'digitalZoomLive'){
              analogRecording.recording.digitalZoomLive = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }else if(key === 'storageOptionsRecording'){
          for(let index in data[key]){
            if(index === 'supportDevices'){
              analogRecording.storageOptions.supportDevices = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'expandable'){
              analogRecording.storageOptions.expandable = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'externalStorage'){
              analogRecording.storageOptions.externalStorage = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'onBoardRaid'){
              analogRecording.storageOptions.onBoardRaid = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'numberHD'){
              analogRecording.storageOptions.numberHD = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'exportOptionsStorage'){
              analogRecording.storageOptions.exportOptionsStorage = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'backUpMode'){
              analogRecording.storageOptions.backUpMode = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }else if(key === 'videoOutputRecording'){
          for(let index in data[key]){
            if(index === 'connectorType'){
              analogRecording.videoOutput.connectorType = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'spotMonitor'){
              analogRecording.videoOutput.spotMonitor = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }else if(key === 'electricalData'){
          for(let index in data[key]){
            if(index === 'inputVoltage'){
              analogRecording.electricalData.inputVoltage = this.validateUndefinedValue(index, data[key][index]);
            }else if(index === 'normalVersion'){
              analogRecording.electricalData.normalVersion = this.validateUndefinedValue(index, data[key][index]);
            }
          }
        }
      }
      
      this.analogRecordings.push(analogRecording)
    }
  }

  validateUndefinedValue(key, value){
    if(value === undefined){
      return '';
    }else{
      return value;
    }
  }

  detailsAnalogRecording(id: number){
    sessionStorage.setItem("analogRecordingElement", JSON.stringify(this.analogRecordings[id]));
    this.router.navigate(["/details-analog-recording"]);
  }

  editAnalogRecording(id: number){
    sessionStorage.setItem("analogRecordingElement", JSON.stringify(this.analogRecordings[id]));
    this.router.navigate(["/edit-analog-recording"]);
  }

  deleteAnalogRecording(id: number){
    alert('Delete');
  }

}