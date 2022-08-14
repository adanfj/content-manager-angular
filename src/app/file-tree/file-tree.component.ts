import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileName } from '../files';

@Component({
  selector: 'app-file-tree',
  templateUrl: './file-tree.component.html',
  styleUrls: ['./file-tree.component.css']
})
export class FileTreeComponent implements OnInit {
  @Input() videos!: any
  @Input() documents!: any
  @Input() images!: any
  @Input() public editable:boolean = false;
  @Output() fileClicked= new EventEmitter<FileName>();
  @Output() onRefresh= new EventEmitter();
  
  constructor(
  ) { }
  ngOnInit(): void {
  }
  refresh(){
    this.onRefresh.emit("")
  }
  handle(f:any){
    console.log(f)
    this.fileClicked.emit(f);
  }

}
