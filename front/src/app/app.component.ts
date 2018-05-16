import { Component, OnInit, HostListener } from '@angular/core';

import { Socket } from 'ng-socket-io';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

class Emote { 
  emote: string;
  x: number;
  y: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  public slide = 1;
  maxSlides = 8;

  public interval : any;

  public bitlyurl = 'https://bit.ly/2L7XN2k';

  public messages : string[] = [];
  public emotes : Emote[] = [];
  

  constructor(private socket: Socket)
  {
    
  }

  ngOnInit(): void {
    this.socket.on('chat-rcv', (data)=>{
      console.log('asdasdasd');
        if(this.messages.length > 2) 
        {
          this.messages = this.messages.slice(1, 3);
        }
        this.messages.push(data);
    });


    this.socket.on('emote-rcv', (data)=>{
      console.log('Emote Received: '+data);
          //this.messages.push(data);
          this.emotes.push(
            {
              emote: data,
              x: 100,
              y: 100
            }
          )
    });


    this.interval = setInterval( () => { 
        this.updateEmotes();
    }, 10);
  }

  ngOnDestroy(){
      clearInterval(this.interval);
  }


updateEmotes(){
  var toRemove = [];
  this.emotes.forEach((el, i)=>{
    el.x = el.x + 2;
    if(el.x > 2000) {
      toRemove.push(i);
    }
  });
  
  toRemove.forEach((i)=>{
    this.emotes.splice(i, 1);
  });
  
  
}

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
  console.log(event);
  
  if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
    if(this.slide < this.maxSlides)
      this.slide++;
  }

  if (event.keyCode === KEY_CODE.LEFT_ARROW) {
    if(this.slide > 1)
      this.slide--;
  }
}
 

}
