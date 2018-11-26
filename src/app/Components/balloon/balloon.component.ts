import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Balloon } from 'src/app/Model/Balloon';

@Component({
  selector: 'app-balloon',
  templateUrl: './balloon.component.html',
  styleUrls: ['./balloon.component.css']
})
export class BalloonComponent implements OnInit {
  
  @Input() balloon: Balloon;
  
  constructor() { }

  ngOnInit() {
  
  }

}
