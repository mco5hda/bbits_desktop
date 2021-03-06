import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IPCamera } from '../../models/cameras/ip-cameras.model';
import { Router } from '@angular/router';
import { CallOut } from './../../../utilities/callout';
import { IpCameraService } from '../ip-camera.service';
import { Environment } from 'src/app/app.environment';
import { DialogService } from 'src/app/confirm-dialog/dialog.service';

@Component({
  selector: 'app-details-ip-camera',
  templateUrl: './details-ip-camera.component.html',
  styleUrls: ['./details-ip-camera.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailsIpCameraComponent implements OnInit {
  ipCamera: IPCamera;
  loading: boolean = false;
  image: string = '';
  datasheet: string = '';
  selectorUrlAccessories = Environment.imageSelectorURL;
  nodeServerURLAccessories = Environment.nodeServerURL+Environment.nodeServerImageAccessoriesPath;

  constructor(
    private router: Router,
    private ipCameraService: IpCameraService,
    private dialogService: DialogService,
  ) { }

  ngOnInit() {
    this.ipCamera = JSON.parse(sessionStorage.getItem("ipCameraElement"));

    if(this.ipCamera.image.includes('imagecache')){
      this.image = Environment.imageSelectorURL+this.ipCamera.image
    }else{
      this.image = Environment.nodeServerURL+'static/assets/video/ip-cameras/images/'+this.ipCamera.id+'-'+this.ipCamera.image;
    }

    if(this.ipCamera.datasheet.includes('http://')){
      this.datasheet = this.ipCamera.datasheet;
    }else{
      this.datasheet = Environment.nodeServerURL+'static/assets/video/ip-cameras/datasheets/'+this.ipCamera.id+'-'+this.ipCamera.datasheet;
    }
  }

  changeTab(id: number){
    let x = document.getElementsByClassName('M-NavigationTabs__tabContent') as HTMLCollectionOf<HTMLElement>;

    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove('M-NavigationTabs__tabContent--active')
      x[i].classList.remove('visible')
    }

    for (let i = 0; i < x.length; i++) {
      if(x[i].tabIndex === id){
        x[i].className += ' M-NavigationTabs__tabContent--active visible'
        break;
      }
    }

    //Changes the color of the li in the current step
    let li = document.getElementsByClassName('M-TabLinks__link') as HTMLCollectionOf<HTMLElement>;

    for (let i = 0; i < li.length; i++) {
      li[i].classList.remove('M-TabLinks__link--active')
    }

    for (let i = 0; i < li.length; i++) {
      if(li[i].tabIndex === id){
        li[i].className += ' M-TabLinks__link--active'
        break;
      }
    }
  }

  editIPCamera(id: number){
    sessionStorage.setItem("ipCameraElement", JSON.stringify(this.ipCamera));
    this.router.navigate(["/edit-ip-camera"]);
  }

  deleteIPCamera(id: number){
    this.dialogService.openConfirmDialog().afterClosed().subscribe(
      res => {
        if ( res ){
          this.loading = true;

          this.ipCameraService.deleteIPCamera(id).subscribe(
            (data) => {
              try {
                if(data['status'] === 'IP Camera deleted'){
                  this.loading = false;
                  CallOut.deleted = true;
                  this.router.navigate(["/consult-ip-cameras"]);
                }
              } catch (error) {
                console.log('No logrado')
              }  
            },
            error => {
              this.loading = false;
              CallOut.addCallOut('error', 'The IP Camera has not deleted.', 5000)     
            }
          );
        }
      }
    );
  }

}
