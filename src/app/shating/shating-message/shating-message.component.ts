import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shating-message',
  templateUrl: './shating-message.component.html',
  styleUrls: ['./shating-message.component.scss']
})
export class ShatingMessageComponent {
@Input("message")message!:string
}
