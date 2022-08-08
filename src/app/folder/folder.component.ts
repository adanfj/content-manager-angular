import { Component, Input, OnInit } from '@angular/core';
import { FileName } from '../files';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})

export class FolderComponent implements OnInit {
  
  @Input() files!: FileName[];
  
  constructor() { }

  ngOnInit(): void {
  }

}
