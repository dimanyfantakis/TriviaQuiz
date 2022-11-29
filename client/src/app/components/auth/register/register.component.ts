import { Component, OnInit ,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() register = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.register.emit();
  }

}
