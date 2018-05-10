import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

const config: SocketIoConfig = { url: 'http://ec2-18-206-155-25.compute-1.amazonaws.com/', options: {} };


import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config) 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
