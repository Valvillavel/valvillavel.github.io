import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader} from '@ngx-translate/core'; 
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AppDirective } from './app.directive'; 
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { ProposalItemComponent } from './pages/proposal-item/proposal-item.component';
import { InspectionsGridComponent } from './pages/inspections-grid/inspections-grid.component';
import { InspectionsItemComponent } from './pages/inspections-item/inspections-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { IonicSelectableModule } from 'ionic-selectable';
import { environment } from '../environments/environment';
export function createTranslateLoader(http:HttpClient){
   return new TranslateHttpLoader(http,'./assets/i18n/','.json');
}
@NgModule({
    declarations: [
        AppComponent,
        AppDirective
    ],
    imports: [BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        NgxDatatableModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        IonicSelectableModule,
        CKEditorModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        BrowserAnimationsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: environment.production,
          // Register the ServiceWorker as soon as the application is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerWhenStable:30000'
        })],
    providers: [
        SignupComponent,
        ProposalItemComponent,
        InspectionsGridComponent,
        InspectionsItemComponent,
        LoginComponent,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
