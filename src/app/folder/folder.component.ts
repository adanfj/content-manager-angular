import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FileName } from '../files';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})

export class FolderComponent implements OnInit, OnChanges {

  @Input() files!: any;
  @Output() fileClicked= new EventEmitter<FileName>(false);
  public fold!: boolean;
  constructor(
    private http: HttpClient
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    this.fold = false;
    this.fileClicked.emit(new FileName("2022-06-14 - Attack To Donetsk.mp4",undefined,new FileName("Videos"))); //Esta emisión funciona
  }

  triggerFold() {
    this.fold = !this.fold;
  }

  public showFile(f: any):void {
    //console.log(f)
    this.fileClicked.subscribe(console.table,console.error,console.log)
    this.fileClicked.emit(f); //Esta queda ignorada
  }
}
