import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-model-form',
  standalone: true,
  imports: [],
  templateUrl: './model-form.component.html',
  styleUrl: './model-form.component.css'
})
export class ModelFormComponent {

  @Input() isOpen : boolean = false
}
