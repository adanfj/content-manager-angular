import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faFolder, faFolderClosed, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { FileName } from '../files';
@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})

export class FolderComponent implements OnInit {
  @Input() files!: any;
  @Input() public editable!: boolean;
  @Input() selectedFile!: FileName;

  @Output() fileClicked = new EventEmitter<FileName>();
  @Output() onRefresh = new EventEmitter();
  folderIcon = faFolderClosed
  folderOpenIcon = faFolderOpen
  constructor(
  ) { }

  ngOnInit(): void {
    //this.fold = false;
  }
  refresh() {
    this.onRefresh.emit("")
  }
  triggerFold(f: FileName) {
    f.fold = !f.fold;
  }

  showFile(f: FileName) {
    console.log(f)
    this.fileClicked.emit(f);
  }
}
