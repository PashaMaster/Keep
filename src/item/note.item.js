"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
  * Класс, который будет хранить номер и записку
  */
var NoteItem = /** @class */ (function () {
    /**
      * Конструктор класса
      * @param=id номер записки
      * @param=textNote заголовок записки
      * @param=dateOfBegin дата
      * @param=autor имя автора
      * @param=textList список записки
      */
    function NoteItem(id, textNote, dateOfBegin, autor, textList) {
        this.id = id;
        this.textNote = textNote;
        this.dateOfBegin = dateOfBegin;
        this.autor = autor;
        this.textList = textList;
    }
    return NoteItem;
}());
exports.NoteItem = NoteItem;
