"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var core_2 = require("@ngx-translate/core");
var http_loader_1 = require("@ngx-translate/http-loader");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var http_2 = require("@angular/http");
var note_1 = require("../note/note");
var start_page_1 = require("./start.page");
var garbage_1 = require("../garbage/garbage");
var arhive_1 = require("../arhive/arhive");
/**
  * Переменная-константа, которая определяет навигацию по страницам, так же задает начальную страницу при запуске
  */
var routers = [
    { path: 'note', component: note_1.NoteComponent, userAsDefault: true },
    { path: 'arhive', component: arhive_1.Arhive },
    { path: 'garbage', component: garbage_1.GarbageComponent }
];
/**
  * Функция, которая определяет параметры для перевода(открывает json файл определенного языка)
  * @param=httpClient переменная, передпющая данные клиента
  */
function HttpLoaderFactory(httpClient) {
    return new http_loader_1.TranslateHttpLoader(httpClient, "i18n/", ".json");
}
exports.HttpLoaderFactory = HttpLoaderFactory;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                note_1.NoteComponent,
                start_page_1.AppComponent,
                garbage_1.GarbageComponent,
                arhive_1.Arhive
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                router_1.RouterModule.forRoot(routers),
                http_2.HttpModule,
                http_1.HttpClientModule,
                core_2.TranslateModule.forRoot({
                    loader: {
                        provide: core_2.TranslateLoader,
                        useFactory: HttpLoaderFactory,
                        deps: [http_1.HttpClient]
                    }
                })
            ],
            providers: [],
            bootstrap: [
                start_page_1.AppComponent
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
