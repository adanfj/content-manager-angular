import { HttpClient, HttpRequest } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FileName } from '../files';

@Component({
  selector: 'app-file-tree',
  templateUrl: './file-tree.component.html',
  styleUrls: ['./file-tree.component.css']
})
export class FileTreeComponent implements OnInit {
  videos!: any
  documents!: any
  images!: any
  public selectedFile!: FileName;
  @Input() public editable:boolean = false;
  @Output() fileClicked= new EventEmitter<FileName>();
  constructor(
    private http: HttpClient
  ) { }
  ngOnInit(): void {
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
  handle(f:any){
    // console.log(f)
    this.selectedFile=f;
    this.fileClicked.emit(f);
  }

}
