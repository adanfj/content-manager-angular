import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FileName } from '../files';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})


export class ContentComponent implements OnInit, OnChanges {
  @Input() public file!:FileName;
  @Input() public aspectRatio:string="";
  @Input() public editing:boolean=false;
  topic!:string;
  title!:string;
  urlSafe!:SafeResourceUrl;
  uploadIcon = faUpload

  constructor(public domSanitizer: DomSanitizer) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.urlSafe = this.domSanitizer.bypassSecurityTrustResourceUrl(this.file.getURL());
    if(this.file.media=="video")this.aspectRatio="aspect-video"
    else this.aspectRatio=""
  }
  ngOnInit(): void {
    
  }

}
