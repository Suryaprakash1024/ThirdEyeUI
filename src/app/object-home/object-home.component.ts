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
  x=0;
  y=0;
  currentShape = '';
  positionStatus: position[]= [];
  currentPosition = '';
  objects :Objects[] = [];
  redragger = 0;
  rePosition: any;
  ngOnInit(): void {
    this.appService.currentPosition.subscribe(x => {
      this.currentPosition = x;
    });
    this.appService.GetObjects().subscribe(x =>{
      this.objects = x;
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
  reDrag(Id : number,$event : any,position : position){
    console.log(Id, position);
    this.rePosition = position;
    this.redragger = Id;
  }
  
  drop(ev : any) {
    ev.preventDefault();
    if(this.redragger != 0){
      this.updatePosition(this.rePosition);
      this.redragger = 0;
    }
    else{
      this.pushToPositions("");
    }
    
  }
  updatePosition(oldpos : position){
    let newposition = this.positionStatus.find(x => x.Id == oldpos.Id);
    if(newposition){
    newposition.x = this.x;
    newposition.y = this.y;
    this.positionStatus = this.positionStatus.filter(x => x.Id != oldpos.Id);
    this.positionStatus.push(newposition);
    }
    
  }
  private pushToPositions(posId :string) {
    let Position: position = {
      Id: this.positionStatus.length+1,
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
  Id: number;
  positionId: string;
  x: number;
  y:number;
  shape : string;
}
export interface Objects{
  id : number;
  shape: string;
}