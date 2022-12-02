import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app-service';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnInit {
  positions: any;

  constructor(private readonly appService: AppService,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.appService.GetPositions().subscribe(x => {
      this.positions = x;
    });
  }
  SetPosition(position:string){
    this.appService.currentPosition.next(position);
    this.router.navigate(['/objects']);

  }
  Add(){
    this.SetPosition('');
  }
}
