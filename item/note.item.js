"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
  * Класс, который будет хранить номер и записку
  */
var NoteItem = /** @class */ (function () {
    /**
      * Конструктор класса
      * @param=id номер записки
      * @param=textNote текст записки
      * @param=dateOfBegin дата
      * @param=autor имя автора
      */
    function NoteItem(id, textNote, dateOfBegin, autor) {
        this.id = id;
        this.textNote = textNote;
        this.dateOfBegin = dateOfBegin;
        this.autor = autor;
    }
    return NoteItem;
}());
exports.NoteItem = NoteItem;
