import { Component } from '@angular/core';
import { ChatService } from './chat.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  public users: number = 0;
  public newMessage: string = '';
  public messages: string[] = [];

  constructor(private chatService: ChatService){

  }

  ngOnInit(){

    this.chatService.receiveChat().subscribe((message: string) => {
      this.messages.push(message);
    });

    this.chatService.getUsers().subscribe((users: number) => {
      this.users = users;
    });

  }

  addChat(){
    //this.messages.push(this.newMessage);
    this.chatService.sendChat(this.newMessage);
    this.newMessage = '';
  }

}
