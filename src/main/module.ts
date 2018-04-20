import { HttpClient, HttpClientModule} from "@angular/common/http";
import { BrowserModule} from "@angular/platform-browser";
import { NgModule} from "@angular/core";
import { TranslateModule, TranslateLoader} from "@ngx-translate/core";
import { TranslateHttpLoader} from "@ngx-translate/http-loader";
import { FormsModule }   from '@angular/forms';
import { RouterModule }      from '@angular/router';
import { HttpModule } from '@angular/http';

import { NoteComponent } from '../note/note';
import { AppComponent } from '../menu/start.page';
import { GarbageComponent } from '../garbage/garbage';
import { Arhive } from '../arhive/arhive';
import { Service } from '../service/service'; 



/** 
  * Переменная-константа, которая определяет навигацию по страницам, так же задает начальную страницу при запуске
  */
const routers = [
	{path: 'note', component: NoteComponent, userAsDefault: true},
	{path: 'arhive', component: Arhive},
  {path: 'garbage', component: GarbageComponent}
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
        NoteComponent, 
        AppComponent,
        GarbageComponent,
        Arhive
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