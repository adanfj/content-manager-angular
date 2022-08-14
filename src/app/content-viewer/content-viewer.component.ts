import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
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
  @Input() public file!:FileName;
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
  showFile(f:FileName){
    this.file=f
  }

}
