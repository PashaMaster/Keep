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
var note_test_1 = require("../mock/note.test");
var Service = /** @class */ (function () {
    /**
      * Конструктор, в котором получаем тестовые записки из хранилища
      */
    function Service() {
        /**
          * Флаг, котрый хранит данные о включении/выключении подсказок
          */
        this.anotation = 'true';
        /**
          * Массив, котой хранит архивные записки
          */
        this.itemsArhive = [];
        /**
          * Массив, котой хранит удаленные записки
          */
        this.itemsDelete = [];
        this.items = note_test_1.ITEMS;
    }
    /**
      * Метод получения записок из сервиса
      */
    Service.prototype.getItems = function () {
        return this.items;
    };
    /**
      * Метод перезаписи записок в сервис
      */
    Service.prototype.setItems = function (items) {
        this.items = items;
    };
    /**
      * Метод получения архивных записок из сервиса
      */
    Service.prototype.getItemsArhive = function () {
        return this.itemsArhive;
    };
    /**
      * Метод перезаписи архивных записок в сервис
      */
    Service.prototype.setItemsArhive = function (itemsArhive) {
        this.itemsArhive = itemsArhive;
    };
    /**
      * Метод получения удаленных записок из сервиса
      */
    Service.prototype.getDeleteItems = function () {
        return this.itemsDelete;
    };
    /**
      * Метод перезаписи удаленных записок в сервис
      */
    Service.prototype.setDeleteItems = function (itemsDelete) {
        this.itemsDelete = itemsDelete;
    };
    /**
      * Метод записи включения/выключения подсказок
      */
    Service.prototype.setHelper = function (anotation) {
        this.anotation = anotation;
    };
    /**
      * Метод получения включения/выключения подсказок
      */
    Service.prototype.getHelper = function () {
        return this.anotation;
    };
    Service = __decorate([
        core_1.Injectable()
        /**
          * Класс, который моделирует мок-сервис
          */
        ,
        __metadata("design:paramtypes", [])
    ], Service);
    return Service;
}());
exports.Service = Service;
