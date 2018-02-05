import { Component } from '@angular/core';
import { HotRegisterer } from "angular-handsontable";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data : any[];
  columns: object[] = [
    {data: 'id', title: 'Id'},
    {data: 'name', title: 'Name'},
    {data: 'location', title: 'Location'},
  ];
  x;
  y;
  value;
  colWidths=[200,200,200];
  instance: string = "hotInstance";
  constructor(private _hotRegisterer: HotRegisterer,private _http: HttpClient) {}
  selectCell($event){
  const x = parseInt(this.x, 10);
    const y = parseInt(this.y, 10);
    const hot = this._hotRegisterer.getInstance(this.instance);

    if (isNaN(x) || isNaN(y)) {
      hot.deselectCell();
      return false;
    }

    if (hot.selectCell(y, x)) {
      $event.target.focus();

    } else {
      hot.deselectCell();
    }
  
    hot.unlisten();
  }

  changeValue($event) {
    const x = parseInt(this.x, 10);
    const y = parseInt(this.y, 10);

    if (isNaN(x) || isNaN(y)) {
      return false;
    }

    const hot = this._hotRegisterer.getInstance(this.instance);

    hot.setDataAtCell(y, x, $event.target.value);
  }
  load($event){
    var hot=this._hotRegisterer.getInstance(this.instance);
    this._http.get(`//www.mocky.io/v2/5a785cad2f00004711668f83`)
      .subscribe((res: Response) => {
        console.log(res);
        this.data=res['users'];
      });
 }
 change($event){
  var hot=this._hotRegisterer.getInstance(this.instance);
  hot.setDataAtCell(1,2,'500');
  // hot.selectCell(2,2);
 }
}
