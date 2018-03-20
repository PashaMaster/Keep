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
    constructor(private translate: TranslateService, private _noteService: Service) {
       
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
      * Получение подсказок
      * @param = index номер подсказки
      */   
    titleHelper(index:number):string {
      
      if (this.getHelper()=='true')
      {
        let title:string;        
        switch (index) {
          case 1:
            title="Search";
            break;
          case 2:
            title="Language";
            break;
          case 3:
            title="Helper";
            break;
          case 4:
            title="Note";
            break;
          case 5:
            title="Arhive";
            break;
          case 6:
            title="Garbage";
            break;
          case 7:
            title="Settings";
            break;
          case 8:
            title="Contacts";
            break;
          case 9:
            title="Close";
            break;
          default:
            title="";
            break;
        }
        return title;      
      }
      else
        return "null";      

    }

    /**
      * Получение включения/выключения подсказок
      */   
    getHelper():string {
      return this._noteService.getHelper();
    }

    /**
      * Включаем/выключаем подсказки
      */   
    setHelper(flag:string) {

      this._noteService.setHelper(flag);
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