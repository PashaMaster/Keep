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
    function Service() {
        this.itemsDelete = [];
        this.items = note_test_1.ITEMS;
    }
    Service.prototype.getItems = function () {
        return this.items;
    };
    Service.prototype.setItems = function (items) {
        this.items = items;
    };
    Service.prototype.getDeleteItems = function () {
        return this.itemsDelete;
    };
    Service.prototype.setDeleteItems = function (itemsDelete) {
        this.itemsDelete = itemsDelete;
    };
    Service = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], Service);
    return Service;
}());
exports.Service = Service;
