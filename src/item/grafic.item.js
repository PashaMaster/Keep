"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
  * Класс, который будет хранить количество записок в определенную дату
  */
var GraficItem = /** @class */ (function () {
    /**
      * Конструктор класса
      * @param=count количество записок
      * @param=date дата удаления
      */
    function GraficItem(count, date) {
        this.count = count;
        this.date = date;
    }
    return GraficItem;
}());
exports.GraficItem = GraficItem;
