import { environment } from "src/environments/environment";

export class FileName {
  parent: FileName | undefined;
  files: FileName[] = [];
  public media: string | undefined;
  constructor(
    public name: string,
    files?: any,
    parent?: FileName,
  ) {
    this.media = parent ? parent.media : name.toLowerCase().substring(0, name.length);
    this.parent = parent;
    if (files&&files !== '') {
      this.files = [...this.files, ...Object.keys(files).map(f => new FileName(f, files[f], this))]
    }
  }
  getFullName(): string {
    let p = this.parent;
    let toret = this.name;
    while (p) {
      toret = p.name + "/" + toret;
      p = p.parent;
    }
    return toret;
  }
  getURL():string{
    return `${environment.apiURL}/${this.getFullName()}`
  }
}
