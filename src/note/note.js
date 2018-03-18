"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var note_item_1 = require("../item/note.item");
var add, detail;
var NoteComponent = /** @class */ (function () {
    function NoteComponent() {
        this.testItem = { id: 0, textNote: "", dateOfBegin: new Date(''), autor: "" };
        this.selectedItem = this.testItem;
        /**
         * Поле, которое хранит в себе массив элементов списка
         */
        this.items = [
            { id: 1, textNote: "Hello!" },
            { id: 2, textNote: "I am Pash" },
            { id: 3, textNote: "Good morning:)" },
            { id: 4, textNote: "What do you do?" }
        ];
    }
    NoteComponent.prototype.ngOnInit = function () {
        add = document.querySelectorAll('dialog')[1];
        document.querySelector('#showAdd').onclick = function () {
            add.showModal();
        };
        document.querySelector('.closeAdd').onclick = function () {
            add.close();
        };
    };
    NoteComponent.prototype.selected = function (item) {
        return 'showDetail' + item.id;
    };
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
    };
    NoteComponent.prototype.removeItem = function (id) {
        var newItems = [];
        this.items.forEach(function (item, i, items) {
            if (item.id != id)
                newItems.push(new note_item_1.NoteItem(item.id, item.textNote, item.dateOfBegin, item.autor));
        });
        this.items = newItems;
    };
    NoteComponent = __decorate([
        core_1.Component({
            selector: 'note-app',
            templateUrl: './src/note/note.html',
            styleUrls: ['./src/note/note.css'],
            providers: []
        })
    ], NoteComponent);
    return NoteComponent;
}());
exports.NoteComponent = NoteComponent;
