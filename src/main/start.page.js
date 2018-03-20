"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@ngx-translate/core");
var service_1 = require("../main/service");
var settings;
var AppComponent = /** @class */ (function () {
    /**
      * Конструктор класса, в котором идет определение выбранного языка из списка и просходит перевод страницы
      * @param=translate сервис, который хранит все необходимые параметры для перевода
      */
    function AppComponent(translate, _noteService) {
        this.translate = translate;
        this._noteService = _noteService;
        /**
          * Заголовок меню
          */
        this.title = "Title";
        translate.addLangs(["English", "Russian"]);
        translate.setDefaultLang('English');
        var browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/English|Russian/) ? browserLang : 'English');
    }
    /**
      * Метод, который выполняет скрипт для работы меню
      */
    AppComponent.prototype.ngAfterViewInit = function () {
        $(function () {
            $(' #navigation a').stop().animate({ 'marginLeft': '-85px' }, 1000);
            $(' #navigation > li').hover(function () {
                $('a', $(this)).stop().animate({ 'marginLeft': '-2px' }, 200);
            }, function () {
                $('a', $(this)).stop().animate({ 'marginLeft': '-85px' }, 200);
            });
        });
        settings = document.querySelectorAll('dialog')[0];
        document.querySelector('#showSettings').onclick = function () {
            settings.showModal();
        };
        document.querySelector('.closeSettings').onclick = function () {
            settings.close();
        };
    };
    /**
      * Изменение цвета заметок
      * @param = id цвет на который изменить
      */
    AppComponent.prototype.updateColor = function (id) {
        this._noteService.setColor('color' + id);
    };
    /**
      * Получение подсказок
      * @param = index номер подсказки
      */
    AppComponent.prototype.titleHelper = function (index) {
        if (this.getHelper() == 'true') {
            var title = void 0;
            switch (index) {
                case 1:
                    title = "Search";
                    break;
                case 2:
                    title = "Language";
                    break;
                case 3:
                    title = "Helper";
                    break;
                case 4:
                    title = "Note";
                    break;
                case 5:
                    title = "Arhive";
                    break;
                case 6:
                    title = "Garbage";
                    break;
                case 7:
                    title = "Settings";
                    break;
                case 8:
                    title = "Contacts";
                    break;
                case 9:
                    title = "Close";
                    break;
                case 10:
                    title = "Color";
                    break;
                default:
                    title = "";
                    break;
            }
            return title;
        }
        else
            return "null";
    };
    /**
      * Получение включения/выключения подсказок
      */
    AppComponent.prototype.getHelper = function () {
        return this._noteService.getHelper();
    };
    /**
      * Включаем/выключаем подсказки
      */
    AppComponent.prototype.setHelper = function (flag) {
        this._noteService.setHelper(flag);
    };
    /**
      * Читаем заголовок для меню
      */
    AppComponent.prototype.getTitle = function () {
        return this.title;
    };
    /**
      * Устанавливаем заголовок для меню
      * @param=title заголовок
      */
    AppComponent.prototype.setTitle = function (title) {
        this.title = title;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'main-app',
            templateUrl: './src/main/menu.html',
            styleUrls: ['./src/main/menu.css'],
            providers: [service_1.Service]
        }),
        __metadata("design:paramtypes", [core_2.TranslateService, service_1.Service])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
