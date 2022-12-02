import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app-service';

@Component({
  selector: 'app-object-home',
  templateUrl: './object-home.component.html',
  styleUrls: ['./object-home.component.scss']
})
export class ObjectHomeComponent implements OnInit {
  constructor(private elementRef:ElementRef,
              private readonly appService: AppService,
              private readonly router: Router ) { }
  startTop = 0;
  startLeft = 0;
  x=0;
  y=0;
  currentShape = '';
  positionStatus: position[]= [];
  currentPosition = ''
  ngOnInit(): void {
    this.appService.currentPosition.subscribe(x => {
      this.currentPosition = x;
    });
    this.appService.GetObjects().subscribe(x =>{
      console.log(x);
    })
    this.appService.GetPositionsById(this.currentPosition).subscribe(x=>{
      x.forEach((y:position) => {
        this.initAddElements(y);
      })
    })
  }

  allowDrop(ev : any) {
    ev.preventDefault();
    this.x = ev.x-588;
    this.y = ev.y-90;
    // console.log(ev.x-588,ev.y-90);
  }
  
  drag(shape:string,ev : any) {
    ev.dataTransfer.setData("text", ev.target.id);
    this.currentShape = shape;
  }
  
  drop(ev : any) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    this.startLeft = ev.srcElement.offsetLeft;
    this.startTop = ev.srcElement.offsetTop;
    this.pushToPositions("");
    this.addHtmlElement();
    // ev.target.appendChild(document.getElementById(data));
  }

  private pushToPositions(posId :string) {
    let Position: position = {
      positionId: posId,
      shape: this.currentShape,
      x: this.x,
      y: this.y
    };
    this.positionStatus.push(Position);
  }

  private initAddElements(pos:position){
    this.x = pos.x;
    this.y = pos.y;
    this.currentShape = pos.shape;
    this.pushToPositions(pos.positionId);
    this.addHtmlElement();
    }
  private addHtmlElement() {
    var d1 = this.elementRef.nativeElement.querySelector('.dragger');
    switch(this.currentShape){
      case 'Circle':{
        d1.insertAdjacentHTML('beforeend', '<img src="assets/faicons/circle-outline.png" height="100px" alt="circle" '+
        'style="position:absolute;margin-left:' + this.x + 'px;margin-top:' + this.y + 'px;">');
        break;
      } 
      case 'Square':{
        d1.insertAdjacentHTML('beforeend', '<img src="assets/faicons/square.png" height="120px" alt="square" '+
        'style="position:absolute;margin-left:' + this.x + 'px;margin-top:' + this.y + 'px;">');
        break;
      }
      case 'Ellipse':{
        d1.insertAdjacentHTML('beforeend', '<img src="assets/faicons/circle-outline.png" height="95px" width="200px" alt="ellipse" '+
        'style="position:absolute;margin-left:' + this.x + 'px;margin-top:' + this.y + 'px;">');
        break;
      }
      case 'Rectangle':{
        d1.insertAdjacentHTML('beforeend', '<img src="assets/faicons/square.png" height="120px" width="200px" alt="rectange" '+
        'style="position:absolute;margin-left:' + this.x + 'px;margin-top:' + this.y + 'px;">');
        break;
      }
    }
    
  }
  goBack(){
    this.router.navigate(['/position']);
  }
  Save(){
    console.log(this.positionStatus);
    let newpos = this.positionStatus.filter(x => x.positionId === '');
    if(this.currentPosition != ''){
      newpos.forEach(x =>{
      x.positionId = this.currentPosition;
      });
    }
    
    this.appService.SavePositions(newpos).subscribe(x => {
      if(x){
        alert('Saved Successfully');
      }
      this.goBack();
    });
  }
}
export interface position{
  positionId: string;
  x: number;
  y:number;
  shape : string;
}