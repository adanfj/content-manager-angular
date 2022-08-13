import { Component, Input, OnInit } from '@angular/core';
import { FileName } from '../files';

@Component({
  selector: 'app-content-viewer',
  templateUrl: './content-viewer.component.html',
  styleUrls: ['./content-viewer.component.css']
})
export class ContentViewerComponent implements OnInit {
  @Input() public file!:FileName;
  constructor() { }

  ngOnInit(): void {
  }
  showFile(f:FileName){
    this.file=f
  }

}
