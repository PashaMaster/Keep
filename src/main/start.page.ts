import { Component, AfterViewInit  } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateService} from '@ngx-translate/core';
import { NoteComponent } from '../note/note';
import { NoteItem } from '../item/note.item'; 
import { Service } from '../main/service'; 
import { Arhive } from '../arhive/arhive';


declare var $:any;
declare var jQuery:any;
var settings;


@Component({
    selector: 'main-app',
    templateUrl: './src/main/menu.html',
    styleUrls: ['./src/main/menu.css'],
    providers: [Service]
})

export class AppComponent {

    /** 
      * Конструктор класса, в котором идет определение выбранного языка из списка и просходит перевод страницы
      * @param=translate сервис, который хранит все необходимые параметры для перевода
      */ 
    constructor(private translate: TranslateService) {
       
        translate.addLangs(["English", "Russian"]);
        translate.setDefaultLang('English');
        let browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/English|Russian/) ? browserLang : 'English');
    }
    /**
      * Метод, который выполняет скрипт для работы меню
      */
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
          settings = document.querySelectorAll('dialog')[0];
          document.querySelector('#showSettings').onclick = function() {
            settings.showModal();
          };
          document.querySelector('.closeSettings').onclick = function() {
            settings.close();
          };
       }

    /** 
      * Заголовок меню
      */
    title:string = "Title"
    
    /** 
      * Читаем заголовок для меню
      */
    getTitle():string {

      return this.title;
    }

    /** 
      * Устанавливаем заголовок для меню
      * @param=title заголовок
      */ 
    setTitle(title: string):void {
      
      this.title = title;
    }

}