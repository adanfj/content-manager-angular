import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FileName } from '../files';
@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})

export class FolderComponent implements OnInit {
  @Input() files!: any;
  @Input() public editable!:boolean;
  @Input()  selectedFile!: FileName;
  
  @Output() fileClicked = new EventEmitter<FileName>();
  
  constructor(
  ) { }

  ngOnInit(): void {
    //this.fold = false;
  }

  triggerFold(f:FileName) {
    f.fold = !f.fold;
  }

  showFile(f: FileName) {
    console.log(f)
    this.fileClicked.emit(f); 
  }
}
