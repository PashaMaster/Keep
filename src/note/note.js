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
var delete_item_1 = require("../item/delete.item");
var add, detail;
var NoteComponent = /** @class */ (function () {
    /**
      * Конструктор класса
      * @param=_noteService объект, которые передает мок сервис для работы
      */
    function NoteComponent(_noteService) {
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
      * Метод, который обрабатывает кнопку для добавления(js) и заполняет тестовые данные в массив
      */
    NoteComponent.prototype.ngOnInit = function () {
        add = document.querySelectorAll('dialog')[1];
        document.querySelector('#showAdd').onclick = function () {
            add.showModal();
        };
        document.querySelector('.closeAdd').onclick = function () {
            add.close();
        };
        this.getItems();
        this.getDeleteItems();
    };
    /**
      * Метод,который получает данные корзины из хранилища
      */
    NoteComponent.prototype.getDeleteItems = function () {
        this.itemsDelete = this._noteService.getDeleteItems();
    };
    /**
      * Метод,который записывает изменненые данные корзины в хранилища
      */
    NoteComponent.prototype.setDeleteItems = function () {
        this._noteService.setDeleteItems(this.itemsDelete);
    };
    /**
      * Метод,который получает данные из хранилища
      */
    NoteComponent.prototype.getItems = function () {
        this.items = this._noteService.getItems();
    };
    /**
      * Метод,который записывает изменненые данные в хранилище
      */
    NoteComponent.prototype.setItems = function () {
        this._noteService.setItems(this.items);
    };
    /**
      * Метод, который дает id каждой записке в html
      * @param=item объект-записка
      */
    NoteComponent.prototype.selected = function (item) {
        return 'showDetail' + item.id;
    };
    /**
      * Метод, который изменяет записку
      * @param=item объект-записка
      */
    NoteComponent.prototype.onSelected = function (item) {
        if (item != this.selectedItem) {
            $('#showDetail' + this.selectedItem.id).slideToggle();
            $('#showDetail' + item.id).slideToggle();
            this.selectedItem = item;
        }
        else {
            $('#showDetail' + item.id).slideToggle();
            this.selectedItem = this.testItem;
        }
        this.setItems();
    };
    /**
     * Метод, который добавляет записку
     * @param=textN строка, которую нужно добавить
     * @param=dateN дата, которую нужно добавить
     * @param=nameN автор, которого нужно добавить
     */
    NoteComponent.prototype.addItem = function (textN, dateN, nameN) {
        var lastItem;
        var id;
        if (this.items.length == 0)
            id = 1;
        else {
            lastItem = this.items[this.items.length - 1];
            id = lastItem.id + 1;
        }
        this.items.push(new note_item_1.NoteItem(id, textN, dateN, nameN));
        this.setItems();
    };
    /**
     * Метод, который удаляет записку
     * @param=id номер удаляемого элемента
     */
    NoteComponent.prototype.removeItem = function (id) {
        var newItems = [];
        var delItem;
        this.items.forEach(function (item, i, items) {
            if (item.id != id)
                newItems.push(new note_item_1.NoteItem(item.id, item.textNote, item.dateOfBegin, item.autor));
            else
                delItem = (new delete_item_1.DeleteItem(item, new Date()));
        });
        this.itemsDelete.push(new delete_item_1.DeleteItem(delItem.item, delItem.date));
        this.items = newItems;
        this.setItems();
        this.setDeleteItems();
    };
    NoteComponent = __decorate([
        core_1.Component({
            selector: 'note-app',
            templateUrl: './src/note/note.html',
            styleUrls: ['./src/note/note.css'],
            providers: []
        }),
        __metadata("design:paramtypes", [service_1.Service])
    ], NoteComponent);
    return NoteComponent;
}());
exports.NoteComponent = NoteComponent;
