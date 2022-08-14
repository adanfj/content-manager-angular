import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faFile, faImage, faVideo } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { FileName } from '../files';

@Component({
  selector: 'app-content-editor',
  templateUrl: './content-editor.component.html',
  styleUrls: ['./content-editor.component.css']
})
export class ContentEditorComponent implements OnInit {
  pdfIcon = faFile
  imgIcon = faImage
  videoIcon = faVideo
  videos!: any
  documents!: any
  images!: any
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
}
