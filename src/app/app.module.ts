import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DetailsPage } from '../pages/details/details';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HolidaysReducer } from '../reducers/holidays.reducer';
import { HolidayActions } from '../actions/holiday.actions';
import { HolidayEffects } from '../effects/holiday.effects';
import { HolidayService } from '../services/holiday.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    StoreModule.provideStore({ holidays: HolidaysReducer }),
    EffectsModule.run(HolidayEffects)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, HolidayActions, HolidayService, HolidayEffects]
})
export class AppModule {}
