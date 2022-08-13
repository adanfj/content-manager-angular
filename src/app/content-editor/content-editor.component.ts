import { Component, Input, OnInit } from '@angular/core';
import { FileName } from '../files';

@Component({
  selector: 'app-content-editor',
  templateUrl: './content-editor.component.html',
  styleUrls: ['./content-editor.component.css']
})
export class ContentEditorComponent implements OnInit {
  @Input() public file!:FileName;
  constructor() { }

  ngOnInit(): void {
  }
  showFile(f:FileName){
    
  }
}
