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
var delete_item_1 = require("../item/delete.item");
var service_1 = require("../main/service");
var GarbageComponent = /** @class */ (function () {
    /**
      * Конструктор класса
      * @param=_noteService объект, которые передает мок сервис для работы
      */
    function GarbageComponent(_noteService) {
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
    GarbageComponent.prototype.ngOnInit = function () {
        this.getItems();
        this.getDeleteItems();
    };
    /**
      * Получение подсказок
      * @param = index номер подсказки
      */
    GarbageComponent.prototype.titleHelper = function (index) {
        if (this.getHelper() == 'true') {
            var title = void 0;
            switch (index) {
                case 1:
                    title = "Number";
                    break;
                case 2:
                    title = "Note";
                    break;
                case 3:
                    title = "DateDel";
                    break;
                case 4:
                    title = "Note";
                    break;
                case 5:
                    title = "Date";
                    break;
                case 6:
                    title = "Name";
                    break;
                case 7:
                    title = "Delete";
                    break;
                case 8:
                    title = "Remove";
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
    GarbageComponent.prototype.getHelper = function () {
        return this._noteService.getHelper();
    };
    /**
      * Метод,который получает данные корзины из хранилища
      */
    GarbageComponent.prototype.getDeleteItems = function () {
        this.itemsDelete = this._noteService.getDeleteItems();
    };
    /**
      * Метод,который записывает изменненые данные корзины в хранилища
      */
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
    /**
      * Метод, который дает id каждой записке в html
      * @param=item объект-записка
      */
    GarbageComponent.prototype.selected = function (item) {
        return 'showDetail' + item.id;
    };
    /**
      * Метод, который показывает информацию о записке
      * @param=item объект-записка
      */
    GarbageComponent.prototype.onSelected = function (item) {
        if (item != this.selectedItem) {
            $('#showDetail' + this.selectedItem.id).slideToggle();
            $('#showDetail' + item.id).slideToggle();
            this.selectedItem = item;
        }
        else {
            $('#showDetail' + item.id).slideToggle();
            this.selectedItem = this.testItem;
        }
    };
    /** Метод, который убырает записку из корзиныы
      * @param=id номер удаляемого элемента
      */
    GarbageComponent.prototype.removeItem = function (id) {
        var delItems = [];
        var newItem;
        this.itemsDelete.forEach(function (item, i, itemsDelete) {
            if (item.item.id != id)
                delItems.push(new delete_item_1.DeleteItem(item.item, new Date()));
            else
                newItem = (new note_item_1.NoteItem(item.item.id, item.item.textNote, item.item.dateOfBegin, item.item.autor));
        });
        this.itemsDelete = delItems;
        var index;
        if (this.items.length == 0)
            index = 1;
        else
            index = this.items[this.items.length - 1].id + 1;
        this.items.push(new note_item_1.NoteItem(index, newItem.textNote, newItem.dateOfBegin, newItem.autor));
        this.setItems();
        this.setDeleteItems();
    };
    /** Метод, который удаляет записку из корзиныы
      * @param=id номер удаляемого элемента
      */
    GarbageComponent.prototype.deleteItem = function (id) {
        var delItems = [];
        this.itemsDelete.forEach(function (item, i, itemsDelete) {
            if (item.item.id != id)
                delItems.push(new delete_item_1.DeleteItem(item.item, new Date()));
        });
        this.itemsDelete = delItems;
        this.setDeleteItems();
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
