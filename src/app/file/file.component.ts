import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FileName } from '../files';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
  editIcon = faPencil
  removeIcon = faTrash
  @Output() fileClicked = new EventEmitter<FileName>();
  @Input()file!:FileName;
  @Input() editable:boolean=false;
  @Input() selected:boolean=false;
  editing=false;
  constructor() { }

  ngOnInit(): void {
  }

  showFile(){
    this.fileClicked.emit(this.file)
  }
  triggerEdit(){this.editing=!this.editing}

}
