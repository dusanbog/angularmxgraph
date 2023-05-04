import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var mxGraph: any;
declare var mxUtils: any;
declare var mxCodec: any;
declare var mxEvent: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('graphContainer') containerElementRef: ElementRef;
  constructor(private http:HttpClient) {
   
  }
  xml="";
  get container() {
    return this.containerElementRef.nativeElement;
  }

  loadXML()
  {
    /*Read Data*/
    this.http.get('assets/diagram.xml', { responseType: 'text' })  
    .subscribe((data) => {        
      this.xml = data;
      // Disables the built-in context menu
      //mxEvent.disableContextMenu(this.container);
      // Creates the graph inside the given container

      var diagram = mxUtils.parseXml(this.xml);
      var codec = new mxCodec(diagram);      
      const graph = new mxGraph(this.container);
      graph.htmlLabels = true;
      //graph.cellsEditable = false;

      graph.setConnectable(true);
      graph.setCellsEditable(false);
      //mxGraphHandler.prototype.guidesEnabled = true;
      graph.setEnabled(true);
      mxEvent.disableContextMenu(this.container);
      graph.setEnabled(false);
      graph.setCellsResizable(false);
      graph.setResizeContainer(false);
      graph.setMultigraph(false);
      //graph.zoomIn();
      graph.zoomOut();
      //graph.zoomActual();
      //graph.centerZoom = true;
      graph.allowAutoPanning = false
      graph.setPanning(false);


      graph.model.beginUpdate();
      codec.decode(diagram.documentElement, graph.getModel());     
      graph.model.endUpdate(); 
      // render as HTML node always. You probably won't want that in real world though
      graph.convertValueToString = function(cell:any) {
        return cell.value;
      }
           
      graph.refresh();
    });  
    /*Read Data*/
  }
  ngAfterViewInit(): void {

       
    this.loadXML();
   
  }

}
