import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient, HttpUrlEncodingCodec } from '@angular/common/http';
import { escape as _escape } from 'lodash-es';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('graphContainer') containerElementRef: ElementRef;
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
  constructor(private http:HttpClient) {
    this.loadScripts();
    
  }

  get container() {
    return this.containerElementRef.nativeElement;
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
    
    this.loadXML();
    //document.getElementById("top-page").scrollTo({ behavior: "smooth", top: 0 });

    
   
  }
  toJson(a:any){
    const ret = JSON.stringify(a);
    return ret;
  }
}
