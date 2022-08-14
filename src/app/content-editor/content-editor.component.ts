import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faArrowLeft, faArrowRight, faBars, faFile, faImage, faUpload, faVideo } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { FileName } from '../files';

@Component({
  selector: 'app-content-editor',
  templateUrl: './content-editor.component.html',
  styleUrls: ['./content-editor.component.css']
})
export class ContentEditorComponent implements OnInit {
  menuIcon = faBars
  pdfIcon = faFile
  imgIcon = faImage
  videoIcon = faVideo
  uploadIcon = faUpload
  leftIcon = faArrowLeft
  rightIcon = faArrowRight
  videos!: any
  documents!: any
  images!: any
  currentURL:string=""
  currentTitle:string=""
  fileTreeVisiblePortable:boolean=false
  @Input() public file!: FileName;
  @Output() fileListUpdated = new EventEmitter()
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.refresh()
    
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
  showFile(f: FileName) {
    this.file = f
    this.fileTreeVisiblePortable=false;
  }
  upload(e: any, type: string) {
    for (const f of e.files) {
      let formData = new FormData();
      formData.append(e.value, f)
      fetch(environment.apiURL + "/" + type, {
        method: "POST",
        body: formData
      })
      .then(res=>this.refresh())
      .catch(console.error)
    }
  }
  processURL(t:any){
    this.currentURL=t.value;
  }
  processTitle(t:any){
    this.currentTitle=t.value;
  }
  triggerTree(){
    this.fileTreeVisiblePortable=!this.fileTreeVisiblePortable
  }
  prepareURLVideo(){
    console.log(this.currentURL)
    let code,media=""
    if(this.currentURL.includes("youtube.com")){
      code=this.currentURL.split("v=")[1]
      media="/youtube"
    }
    if(this.currentURL.includes("youtu.be")){
      code=this.currentURL.split(".be/")[1]
      media="/youtube"
    }
    this.http.post(`${environment.apiURL}/prepare/video${media}`,JSON.stringify({
      title:this.currentTitle,
      code
    }),{
      headers: {
        "Content-Type": "application/json"
      }
    }).subscribe((r:any)=>{})
  }
}
