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
var service_1 = require("../main/service");
var GarbageComponent = /** @class */ (function () {
    /**
      * Конструктор класса
      * @param=_noteService объект, которые передает мок сервис для работы
      */
    function GarbageComponent(_noteService) {
        this._noteService = _noteService;
    }
    /**
      * Метод, который считывает данные при загрузке станицы
      */
    GarbageComponent.prototype.ngOnInit = function () {
        this.getItems();
        this.getDeleteItems();
    };
    GarbageComponent.prototype.getDeleteItems = function () {
        this.itemsDelete = this._noteService.getDeleteItems();
    };
    GarbageComponent.prototype.setDeleteItems = function () {
        this._noteService.setDeleteItems(this.itemsDelete);
    };
    /**
      * Метод,который получает данные из хранилища
      */
    GarbageComponent.prototype.getItems = function () {
        this.items = this._noteService.getItems();
    };
    /**
      * Метод,который записывает изменненые данные в хранилище
      */
    GarbageComponent.prototype.setItems = function () {
        this._noteService.setItems(this.items);
    };
    GarbageComponent = __decorate([
        core_1.Component({
            selector: 'garbage-app',
            templateUrl: './src/garbage/garbage.html',
            styleUrls: ['./src/garbage/garbage.css'],
            providers: []
        }),
        __metadata("design:paramtypes", [service_1.Service])
    ], GarbageComponent);
    return GarbageComponent;
}());
exports.GarbageComponent = GarbageComponent;
