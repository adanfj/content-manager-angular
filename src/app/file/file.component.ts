import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faFile, faFileAlt, faFileArchive, faImage, faPaperPlane, faPencil, faTrash, faVideo, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
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
  @Input() file!: FileName;
  @Input() editable: boolean = false;
  @Input() selected: boolean = false;
  @Output() onRefresh = new EventEmitter();
  editing = false;
  constructor() { }

  ngOnInit(): void {
  }
  getIcon(): IconDefinition {
    if(this.file.media=="video")return faVideo
    if(this.file.media=="image")return faImage
    return faFileAlt
  }
  showFile() {
    this.fileClicked.emit(this.file)
  }
  remove(t: any) {
    fetch(`${environment.apiURL}/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        file: this.file.getFullName(),
      })
    }).then(res => {
      this.onRefresh.emit("")
    }).catch(e => this.onRefresh.emit(""))

  }
  triggerEdit(t?: any) {
    this.editing = !this.editing
    if (!this.editing) {
      const newFile = new FileName(t.value + "." + this.file.name.split(".")[1], this.file.files, this.file.parent)
      fetch(`${environment.apiURL}/rename`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          file: this.file.getFullName(),
          name: newFile.name,
        })
      }).then(res => {
        this.file = newFile
        this.onRefresh.emit("")
      })

    }
  }
}
