import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { faSearch, faSearchMinus, faSearchPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import { PdfJsViewerComponent } from 'ng2-pdfjs-viewer';


import { environment } from 'src/environments/environment';
import { FileName } from '../files';



@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})


export class ContentComponent implements OnInit, OnChanges {
  @Input() public file!: FileName;
  @Input() public aspectRatio: string = "";
  @Input() public editing: boolean = false;
  @ViewChild("contentVideo") contentVideo!: ElementRef;
  @ViewChild("pdfViewerOnDemand") contentPDF:any;
  stringToSearch = 'hi';
  topic: string = "";
  title: string = "";
  updateTime: string = "end";
  startTime: number = 0.0;
  endTime: number = 0.0;
  pdfPages = 0
  zoom: number = 1.0
  urlSafe!: SafeResourceUrl;
  uploadIcon = faUpload
  zoomInIcon = faSearchPlus
  zoomOutIcon = faSearchMinus
  @Output() onRefresh = new EventEmitter();
  constructor(public domSanitizer: DomSanitizer) { }
  
  async ngOnChanges(changes: SimpleChanges | null) {

    this.urlSafe = this.domSanitizer.bypassSecurityTrustResourceUrl(this.file.getURL());
    if (this.file.media == "video") {
      this.aspectRatio = "aspect-video"
      if (this.contentVideo) {
        this.contentVideo.nativeElement.firstChild.src = this.file.getURL()
        this.contentVideo.nativeElement.load()
      }
    }
    else this.aspectRatio = ""
    if (this.file.media == "document" && this.contentPDF) {
      this.contentPDF.refresh();
    }
  }
  ngOnInit(): void {
    document.getElementById("start")?.setAttribute("value", "00:00:00.00")
    document.getElementById("end")?.setAttribute("value", "00:00:00.00")

  }
  handleTime(e: any) {
    document.getElementById(this.updateTime)?.setAttribute("value", new Date(e.currentTime * 1000).toISOString().substring(11, 22))
    if (this.updateTime == "start") this.startTime = e.currentTime
    if (this.updateTime == "end") this.endTime = e.currentTime
  }
  autoTime(c: string) {
    this.updateTime = c
  }
  processTitle(t: any) {
    this.title = t.value
  }
  processTopic(t: any) {
    this.topic = t.value
  }
  modifyZoom(z: number) {
    this.zoom *= z
  }
  uploadSnippet() {
    fetch(`${environment.apiURL}/split/video`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        filename: this.file.getFullName(),
        startTime: new Date(this.startTime * 1000).toISOString().substring(11, 22),
        endTime: new Date(this.endTime * 1000).toISOString().substring(11, 22),
        topic: this.topic,
        title: this.title
      })
    }).then(res => this.onRefresh.emit(""))
  }

}
