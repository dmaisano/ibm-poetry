import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';
import { HomeComponent } from './home/home.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { PoemDialogComponent } from './poem-dialog/poem-dialog.component';
import { PoemComponent } from './poem/poem.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TruncatePipe,
    HelpDialogComponent,
    PoemDialogComponent,
    ErrorDialogComponent,
    PoemComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    // Material
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTableModule,
  ],
  entryComponents: [
    HelpDialogComponent,
    PoemDialogComponent,
    ErrorDialogComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
