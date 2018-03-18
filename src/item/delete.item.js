"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
  * Класс, который будет хранить удаленные данные
  */
var DeleteItem = /** @class */ (function () {
    /**
      * Конструктор класса
      * @param=item запискa
      * @param=dateOfBegin дата
      */
    function DeleteItem(item, date) {
        this.item = item;
        this.date = date;
    }
    return DeleteItem;
}());
exports.DeleteItem = DeleteItem;
