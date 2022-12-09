import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { LandingPagePageModule } from './app/landing-page/landing-page.module';
import { environment } from './environments/environment';


// const channel = new BroadcastChannel('tab');

// channel.postMessage('another-tab');
// // note that listener is added after posting the message

// channel.addEventListener('message', (msg) => {
//   if (msg.data === 'another-tab') {
//     // message received from 2nd tab

//     alert('App is already open into another tab.');
//   }
// });
if (environment.production) {
  enableProdMode();
}
if(/Android|webOS|iPhone|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
}
else{
  platformBrowserDynamic().bootstrapModule(LandingPagePageModule)
  .catch(err => console.log(err));

}
