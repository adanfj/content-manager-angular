import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowLeft, faArrowRight, faBars, faEdit } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { FileName } from '../files';

@Component({
  selector: 'app-content-viewer',
  templateUrl: './content-viewer.component.html',
  styleUrls: ['./content-viewer.component.css']
})
export class ContentViewerComponent implements OnInit {
  videos!: any
  documents!: any
  images!: any
  gotoEditorIcon = faEdit
  menuIcon = faBars
  leftIcon = faArrowLeft
  rightIcon = faArrowRight

  @Input() public file!:FileName;
  fileTreeVisiblePortable:boolean=false
  constructor(
    private http: HttpClient,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.refresh()
    // setInterval(()=>this.refresh(),10000)
  }
  refresh(){
    this.http.post(`${environment.apiURL}/videos`, JSON.stringify({ username: "root" }), {
      headers: {
        "Content-Type": "application/json"
      },
    }).subscribe((r: any) =>
      this.videos = [new FileName(Object.keys(r.media)[0], Object.values(r.media)[0]),])

    this.http.post(`${environment.apiURL}/documents`, JSON.stringify({ username: "root" }), {
      headers: {
        "Content-Type": "application/json"
      },
    }).subscribe((r: any) => this.documents = [new FileName(Object.keys(r.media)[0], Object.values(r.media)[0]),])

    this.http.post(`${environment.apiURL}/images`, JSON.stringify({ username: "root" }), {
      headers: {
        "Content-Type": "application/json"
      },
    }).subscribe((r: any) => this.images = [new FileName(Object.keys(r.media)[0], Object.values(r.media)[0]),])
  }
  showFile(f:FileName){
    this.file=f
    this.fileTreeVisiblePortable=false;
  }
  triggerTree(){
    this.fileTreeVisiblePortable=!this.fileTreeVisiblePortable
  }
  goToEditor(){
    this._router.navigateByUrl('/editor')
  }
}
