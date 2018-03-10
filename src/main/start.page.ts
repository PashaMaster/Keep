import { Component, AfterViewInit  } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateService} from '@ngx-translate/core';
import { NoteComponent } from '../note/note';
declare var $:any;


@Component({
    selector: 'main-app',
    templateUrl: './src/main/menu.html',
    styleUrls: ['./src/main/menu.css'],
    providers: []
})

export class AppComponent {

    /** 
      * Конструктор класса, в котором идет определение выбранного языка из списка и просходит перевод страницы
      * @param=translate сервис, который хранит все необходимые параметры для перевода
      
    constructor(private translate: TranslateService) {
       
        translate.addLangs(["en", "ru"]);
        translate.setDefaultLang('en');
        let browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|ru/) ? browserLang : 'en');
    }*/
     ngAfterViewInit(){
         $(function() {
                $(' #navigation a').stop().animate({'marginLeft':'-85px'},1000);

                $(' #navigation > li').hover(
                    function () {
                        $('a',$(this)).stop().animate({'marginLeft':'-2px'},200);
                    },
                    function () {
                        $('a',$(this)).stop().animate({'marginLeft':'-85px'},200);
                    }
                );
            });
     }
}