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
    function AppComponent(translate) {
        this.translate = translate;
        translate.addLangs(["English", "Russian"]);
        translate.setDefaultLang('English');
        var browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/English|Russian/) ? browserLang : 'English');
    }
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
    AppComponent = __decorate([
        core_1.Component({
            selector: 'main-app',
            templateUrl: './src/main/menu.html',
            styleUrls: ['./src/main/menu.css'],
            providers: [service_1.Service]
        }),
        __metadata("design:paramtypes", [core_2.TranslateService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
