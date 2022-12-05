import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app-service';

@Component({
  selector: 'app-object-home',
  templateUrl: './object-home.component.html',
  styleUrls: ['./object-home.component.scss']
})
export class ObjectHomeComponent implements OnInit {
  Id: number = 0;
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
  }
  
  drag(shape:string,ev : any) {
    ev.dataTransfer.setData("text", ev.target.id);
    this.currentShape = shape;
  }
  reDrag(pId : number,$event : any,position : position){
    this.rePosition = position;
    this.redragger = pId;
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
    let newposition = this.positionStatus.find(x => x.pId == oldpos.pId);
    if(newposition){
      newposition.x = this.x;
      newposition.y = this.y;
      this.positionStatus = this.positionStatus.filter(x => x.pId != oldpos.pId);
      this.positionStatus.push(newposition);
      if(newposition.id != 0){
        this.appService.UpdatePositions(newposition).subscribe();
      }
    }
    
  }
  private pushToPositions(posId :string) {
    let Position: position = {
      id:this.Id,
      pId: this.positionStatus.length+1,
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
    this.Id = pos.id;
    this.currentShape = pos.shape;
    this.pushToPositions(pos.positionId);
    this.Id = 0;
    }
  goBack(){
    this.router.navigate(['/position']);
  }
  Save(){
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
  id: number;
  pId:number;
  positionId: string;
  x: number;
  y:number;
  shape : string;
}
export interface Objects{
  id : number;
  shape: string;
}