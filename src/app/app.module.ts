import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { MatButtonModule, MatCheckboxModule } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatMenuModule } from "@angular/material/menu";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MalihuScrollbarModule } from "ngx-malihu-scrollbar";
import { DraftnamePipe } from "../app/dashboard/pipes/draftname.pipe";
import { ReactiveFormsModule } from '@angular/forms';

import * as $ from 'jquery';

@NgModule({
  declarations: [AppComponent, DraftnamePipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MalihuScrollbarModule.forRoot(),
    ReactiveFormsModule
  ],
  exports: [MatButtonModule, MatCheckboxModule],
  providers: [],
  bootstrap: [AppComponent]
  // schemas:[ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
