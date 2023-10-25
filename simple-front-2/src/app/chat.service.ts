import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) {
  }

  sendChat(message : string){
    this.socket.emit('chat', message);
  }

  receiveChat(): Observable<string>{
    return this.socket.fromEvent('chat');
  }

  getUsers(): Observable<number>{
    return this.socket.fromEvent('users');
  }

}