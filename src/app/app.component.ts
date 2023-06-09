import { Component, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpUrlEncodingCodec } from '@angular/common/http';
import { escape as _escape } from 'lodash-es';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  options={    
    highlight:"#0000ff",
    lightbox:false,
    nav:true,
    resize:true,
    editable:false,
    toolbar:"zoom layers",
    zoom:1,
    xml:"",
  };
  loading=true;
  constructor(private http:HttpClient,private readonly changeDetectorRef: ChangeDetectorRef) {
    this.loadScripts();
    this.loadXML();
  }

  loadScripts() {
    const dynamicScripts = [
     'https://viewer.diagrams.net/js/viewer-static.min.js'
    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }
  loadXML()
  {
    /*Read Data*/
    this.http.get('assets/diagram.xml', { responseType: 'text' })  
    .subscribe((data) => {        
      this.options.xml = data;
      this.loading=false;

    });  
    /*Read Data*/
  }
  ngAfterViewInit(): void {        
    setTimeout(() => {
      this.findMe();
    }, 500);    
  }
  toJson(a:any){
    const ret = JSON.stringify(a);
    return ret;
  }
  findMe(){
    var elements = document.querySelectorAll('[href="http://localhost:4200/routeCode=10"]');
    debugger;
    elements[0]?.scrollIntoView();
  }
}
