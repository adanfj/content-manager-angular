import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowLeft, faArrowRight, faBars, faFile, faImage, faRotateBackward, faUpload, faVideo } from '@fortawesome/free-solid-svg-icons';
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
  goBackIcon = faRotateBackward
  videos!: any
  documents!: any
  images!: any
  currentURL: string = ""
  currentTitle: string = ""
  fileTreeVisiblePortable: boolean = false
  @Input() public file!: FileName;
  @Output() fileListUpdated = new EventEmitter()
  constructor(
    private http: HttpClient,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.refresh()
    // setInterval(()=>this.refresh(),10000)

  }
  refresh() {
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
    this.fileTreeVisiblePortable = false;
  }
  goToViewer() {
    this._router.navigateByUrl('/')
  }
  async upload(e: any, type: string) {
    let formData = new FormData();
    console.log(e.files)
    for (const f of e.files) {
      console.log(f.name)
      formData.append(f.name, f)
    }
    const res = await fetch(`${environment.apiURL}/${type}`, {
      method: "POST",
      body: formData
    })
    console.log(res)
    this.refresh()
  }
  processURL(t: any) {
    this.currentURL = t.value;
  }
  processTitle(t: any) {
    this.currentTitle = t.value;
  }
  triggerTree() {
    this.fileTreeVisiblePortable = !this.fileTreeVisiblePortable
  }
  prepareURLVideo() {
    console.log(this.currentURL)
    let code, media = ""
    if (this.currentURL.includes("youtube.com")) {
      code = this.currentURL.split("v=")[1]
      media = "/youtube"
    }
    if (this.currentURL.includes("youtu.be")) {
      code = this.currentURL.split(".be/")[1]
      media = "/youtube"
    }
    this.http.post(`${environment.apiURL}/prepare/video${media}`, JSON.stringify({
      title: this.currentTitle,
      code
    }), {
      headers: {
        "Content-Type": "application/json"
      }
    }).subscribe((r: any) => { })
  }
}
