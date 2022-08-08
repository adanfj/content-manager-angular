import { Component, OnInit } from '@angular/core';
import { files } from '../files';

@Component({
  selector: 'app-file-tree',
  templateUrl: './file-tree.component.html',
  styleUrls: ['./file-tree.component.css']
})
export class FileTreeComponent implements OnInit {
  files = files
  constructor() { }

  ngOnInit(): void {
    console.log(files)
  }

}
