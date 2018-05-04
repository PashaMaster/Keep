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
var service_1 = require("../service/service");
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
        this.numberList = 1;
        this.initList();
        this.getItems();
        this.getDeleteItems();
        this.getAthiveItems();
        this.getHelper();
        this.getPosition();
    };
    NoteComponent.prototype.getPosition = function () {
        if (this._noteService.getPosition() == 'block')
            $(".notes").css("width", "calc(100% / 4- 15px)");
        else
            $(".notes").css("width", "calc(100% - 15px)");
    };
    NoteComponent.prototype.initList = function () {
        $(".addinputT").css({ "display": "none" });
        $("#noteListB").css({ "display": "none" });
    };
    NoteComponent.prototype.delListElemtnt = function () {
        this.numberList--;
        $("#noteList" + this.numberList.toString()).css({ "display": "none" });
        if (this.numberList == 1)
            $("#noteListB").css({ "display": "none" });
    };
    NoteComponent.prototype.getList = function () {
        if (this.numberList <= 3) {
            $("#noteList" + this.numberList.toString()).css({ "display": "block" });
            $("#noteListB").css({ "display": "block" });
            this.numberList++;
        }
    };
    /**
     * Метод, который включает/выключает подсказки на странице
     */
    NoteComponent.prototype.getHelper = function () {
        if (this._noteService.getHelper() == 'true')
            $(".helper span").css({ "display": "block" });
        else
            $(".helper span").css({ "display": "none" });
    };
    /*
     * Получение цвета из хранилища
     */
    NoteComponent.prototype.getColor = function () {
        return this._noteService.getColor();
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
      * Метод,который получает данные архива из хранилища
      */
    NoteComponent.prototype.getAthiveItems = function () {
        this.itemsArhive = this._noteService.getItemsArhive();
    };
    /**
      * Метод,который записывает изменненые данные архива в хранилище
      */
    NoteComponent.prototype.setAthiveItems = function () {
        this._noteService.setItemsArhive(this.itemsArhive);
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
        this.getHelper();
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
        if (this.itemsDelete.length == 0)
            delItem.item.id = 1;
        else
            delItem.item.id = this.itemsDelete[this.itemsDelete.length - 1].item.id + 1;
        this.itemsDelete.push(new delete_item_1.DeleteItem(delItem.item, delItem.date));
        this.items = newItems;
        this.setItems();
        this.setDeleteItems();
    };
    /**
      * Метод, который добавляет записку в архив
      * @param=id номер добавляемого элемента
      */
    NoteComponent.prototype.addArhiveItem = function (id) {
        var newItem = [];
        var arhItems;
        this.items.forEach(function (item, i, items) {
            if (item.id != id)
                newItem.push(new note_item_1.NoteItem(item.id, item.textNote, item.dateOfBegin, item.autor));
            else
                arhItems = (new note_item_1.NoteItem(item.id, item.textNote, item.dateOfBegin, item.autor));
        });
        this.items = newItem;
        this.itemsArhive.push(new note_item_1.NoteItem(arhItems.id, arhItems.textNote, arhItems.dateOfBegin, arhItems.autor));
        this.setItems();
        this.setAthiveItems();
    };
    NoteComponent = __decorate([
        core_1.Component({
            selector: 'note-app',
            templateUrl: './src/note/note.html',
            styleUrls: ['./src/note/note.css',
                './src/menu/menu.css'],
            providers: []
        }),
        __metadata("design:paramtypes", [service_1.Service])
    ], NoteComponent);
    return NoteComponent;
}());
exports.NoteComponent = NoteComponent;
