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
var note_item_1 = require("../item/note.item");
var service_1 = require("../main/service");
var Arhive = /** @class */ (function () {
    /**
      * Конструктор класса
      * @param=_noteService объект, которые передает мок сервис для работы
      */
    function Arhive(_noteService) {
        this._noteService = _noteService;
        /**
          * Тестовый веделяемый элемент
          */
        this.testItem = { id: 0, textNote: "", dateOfBegin: new Date(''), autor: "" };
        /**
          * Выделяемый элемент
          */
        this.selectedItem = this.testItem;
    }
    /**
      * Метод, который считывает данные при загрузке станицы
      */
    Arhive.prototype.ngOnInit = function () {
        this.getItems();
        this.getAthiveItems();
        this.getHelper();
    };
    /**
      * Метод, который включает/выключает подсказки на странице
      */
    Arhive.prototype.getHelper = function () {
        if (this._noteService.getHelper() == 'true')
            $(".helper span").css({ "display": "block" });
        else
            $(".helper span").css({ "display": "none" });
    };
    /**
      * Метод,который получает данные архива из хранилища
      */
    Arhive.prototype.getAthiveItems = function () {
        this.itemsArhive = this._noteService.getItemsArhive();
    };
    /**
      * Метод,который записывает изменненые данные архива в хранилище
      */
    Arhive.prototype.setAthiveItems = function () {
        this._noteService.setItemsArhive(this.itemsArhive);
    };
    /**
      * Метод,который получает данные из хранилища
      */
    Arhive.prototype.getItems = function () {
        this.items = this._noteService.getItems();
    };
    /**
      * Метод,который записывает изменненые данные в хранилище
      */
    Arhive.prototype.setItems = function () {
        this._noteService.setItems(this.items);
    };
    /**
      * Метод, который дает id каждой записке в html
      * @param=item объект-записка
      */
    Arhive.prototype.selected = function (item) {
        return 'showDetail' + item.id;
    };
    /**
      * Метод, который показывает информацию о записке
      * @param=item объект-записка
      */
    Arhive.prototype.onSelected = function (item) {
        if (item != this.selectedItem) {
            $('#showDetail' + this.selectedItem.id).slideToggle();
            $('#showDetail' + item.id).slideToggle();
            this.selectedItem = item;
        }
        else {
            $('#showDetail' + item.id).slideToggle();
            this.selectedItem = this.testItem;
        }
        this.getHelper();
    };
    /** Метод, который убырает записку из архива
      * @param=id номер удаляемого элемента
      */
    Arhive.prototype.removeItem = function (id) {
        var arhItems = [];
        var newItem;
        this.itemsArhive.forEach(function (item, i, itemsArhive) {
            if (item.id != id)
                arhItems.push(new note_item_1.NoteItem(item.id, item.textNote, item.dateOfBegin, item.autor));
            else
                newItem = (new note_item_1.NoteItem(item.id, item.textNote, item.dateOfBegin, item.autor));
        });
        this.itemsArhive = arhItems;
        this.items.push(new note_item_1.NoteItem(this.items[this.items.length - 1].id + 1, newItem.textNote, newItem.dateOfBegin, newItem.autor));
        this.setItems();
        this.setAthiveItems();
    };
    Arhive = __decorate([
        core_1.Component({
            selector: 'arhive-app',
            templateUrl: './src/arhive/arhive.html',
            styleUrls: ['./src/arhive/arhive.css',
                './src/main/menu.css'],
            providers: []
        }),
        __metadata("design:paramtypes", [service_1.Service])
    ], Arhive);
    return Arhive;
}());
exports.Arhive = Arhive;
