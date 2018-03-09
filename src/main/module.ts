import { HttpClient, HttpClientModule} from "@angular/common/http";
import { BrowserModule} from "@angular/platform-browser";
import { NgModule} from "@angular/core";
import { TranslateModule, TranslateLoader} from "@ngx-translate/core";
import { TranslateHttpLoader} from "@ngx-translate/http-loader";
import { FormsModule }   from '@angular/forms';
import { RouterModule }      from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent }   from './app.component';
import { NoteDetailComponent }   from '../note/note-detail/note-detail.component';
import { NotesComponent } from '../note/notes/notes.component';
import { DashboardComponent }      from '../main-page/dashboard.component';

/** 
  * Переменная-константа, которая определяет навигацию по страницам, так же задает начальную страницу при запуске
  */
const routers = [
	{path: 'dashboard', component: DashboardComponent, userAsDefault: true},
	{path: 'notes', component: NotesComponent},
  {path: 'notedetail/:id', component: NoteDetailComponent}
];

/** 
  * Функция, которая определяет параметры для перевода(открывает json файл определенного языка)
  * @param=httpClient переменная, передпющая данные клиента
  */
export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, "i18n/", ".json");
}

@NgModule({
    declarations: [ 
        AppComponent, 
        NoteDetailComponent, 
        NotesComponent,  
        DashboardComponent
    ],
    imports: [ 
    	BrowserModule, 
    	FormsModule, 
    	RouterModule.forRoot(routers),
      HttpModule,
    	HttpClientModule,
	    TranslateModule.forRoot({
             loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
	providers: [], 
    bootstrap: [ 
        AppComponent 
    ]
})

export class AppModule { }