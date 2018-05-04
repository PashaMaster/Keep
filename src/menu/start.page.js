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
var core_2 = require("@ngx-translate/core");
var grafic_item_1 = require("../item/grafic.item");
var service_1 = require("../service/service");
var svg;
var settings;
var AppComponent = /** @class */ (function () {
    /**
      * Конструктор класса, в котором идет определение выбранного языка из списка и просходит перевод страницы
      * @param=translate сервис, который хранит все необходимые параметры для перевода
      */
    function AppComponent(translate, _noteService) {
        this.translate = translate;
        this._noteService = _noteService;
        /**
          * Заголовок меню
          */
        this.title = "Title";
        translate.addLangs(["English", "Russian"]);
        translate.setDefaultLang('English');
        var browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/English|Russian/) ? browserLang : 'English');
    }
    /**
      * Метод получения данных для диаграммы
      */
    AppComponent.prototype.getData = function () {
        var count = this._noteService.getItemsArhive().length +
            this._noteService.getDeleteItems().length +
            this._noteService.getItems().length;
        if (this._noteService.getItemsArhive().length / count * 100 == 0) {
            this.countArhive = '';
        }
        else {
            this.countArhive = (this._noteService.getItemsArhive().length / count * 100).toFixed(2);
        }
        if (this._noteService.getDeleteItems().length / count * 100 == 0) {
            this.countGarbage = '';
        }
        else {
            this.countGarbage = (this._noteService.getDeleteItems().length / count * 100).toFixed(2);
        }
        if (this._noteService.getItems().length / count * 100 == 0) {
            this.countNote = '';
        }
        else {
            this.countNote = (this._noteService.getItems().length / count * 100).toFixed(2);
        }
    };
    /**
      * Метод, который выполняет скрипт для работы меню
      */
    AppComponent.prototype.ngAfterViewInit = function () {
        $(function () {
            $(' #navigation a').stop().animate({ 'marginLeft': '-85px' }, 1000);
            $(' #navigation > li').hover(function () {
                $('a', $(this)).stop().animate({ 'marginLeft': '-2px' }, 200);
            }, function () {
                $('a', $(this)).stop().animate({ 'marginLeft': '-85px' }, 200);
            });
        });
        settings = document.querySelectorAll('dialog')[0];
        document.querySelector('#showSettings').onclick = function () {
            settings.showModal();
        };
        document.querySelector('.closeSettings').onclick = function () {
            settings.close();
        };
    };
    /**
      * Метод очистки диаграммы
      */
    AppComponent.prototype.clearSVG = function () {
        d3.selectAll("svg > *").remove();
    };
    /**
      * Метод построения  диаграммы
      */
    AppComponent.prototype.getDiagram = function (noteName, arhiveName, garbageName) {
        this.getData();
        this.clearSVG();
        var height = 300, width = 360, margin = 30, data = [
            { browser: noteName, rate: this.countNote },
            { browser: arhiveName, rate: this.countArhive },
            { browser: garbageName, rate: this.countGarbage },
        ];
        var color = d3.scale.category10();
        var radius = Math.min((width - 60) - 2 * margin, height - 2 * margin) / 2;
        var arc = d3.svg.arc()
            .outerRadius(radius)
            .innerRadius(0);
        var pie = d3.layout.pie()
            .sort(null)
            .value(function (d) { return d.rate; });
        svg = d3.select("body").select("svg")
            .attr("class", "axis")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + ((width - 60) / 2) + "," + (height / 2) + ")");
        var g = svg.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");
        g.append("path")
            .attr("d", arc)
            .style("fill", function (d) { return color(d.data.browser); });
        g.append("text")
            .attr("transform", function (d) {
            return "translate(" + arc.centroid(d) + ")";
        })
            .style("text-anchor", "middle")
            .text(function (d) {
            if (d.data.rate == 0)
                return d.data.rate;
            else
                return d.data.rate + "%";
        });
        var legendTable = d3.select("svg").append("g")
            .attr("transform", "translate(0, " + margin + ")")
            .attr("class", "legendTable");
        var legend = legendTable.selectAll(".legend")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function (d, i) {
            return "translate(0, " + i * 20 + ")";
        });
        legend.append("rect")
            .attr("x", width - 10)
            .attr("y", 4)
            .attr("width", 10)
            .attr("height", 10)
            .style("fill", function (d) { return color(d.data.browser); });
        legend.append("text")
            .attr("x", width - 15)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function (d) { return d.data.browser; });
    };
    /**
      * Формируем массив данных для отрисовки графика
      */
    AppComponent.prototype.getDataGrafic = function () {
        var dataGrafic = [];
        // тестовые записи
        dataGrafic.push(new grafic_item_1.GraficItem(5, new Date(2018, 3, 17)));
        dataGrafic.push(new grafic_item_1.GraficItem(1, new Date(2018, 3, 19)));
        dataGrafic.push(new grafic_item_1.GraficItem(5, new Date(2018, 3, 20)));
        dataGrafic.push(new grafic_item_1.GraficItem(11, new Date(2018, 3, 23)));
        dataGrafic.push(new grafic_item_1.GraficItem(9, new Date(2018, 3, 27)));
        //
        var deleteItems;
        var f;
        deleteItems = this._noteService.getDeleteItems();
        deleteItems.forEach(function (item, i, deleteItems) {
            f = false;
            dataGrafic.forEach(function (data, j, dataGrafic) {
                if (item.date.toDateString() == data.date.toDateString()) {
                    data.count++;
                    f = true;
                }
            });
            if (!f) {
                dataGrafic.push(new grafic_item_1.GraficItem(1, item.date));
            }
        });
        return dataGrafic;
    };
    /**
      * Строим график по данным удаления записок
      */
    AppComponent.prototype.getGrafic = function () {
        this.getDataGrafic();
        this.clearSVG();
        var height = 300, width = 600, margin = 30, Data = this.getDataGrafic();
        svg = d3.select("body").select("svg")
            .attr("class", "axis")
            .attr("width", width)
            .attr("height", height)
            .append("g");
        var xAxisLength = width - 2 * margin;
        var yAxisLength = height - 2 * margin;
        var maxValue = d3.max(Data, function (d) { return d.count; });
        var scaleX = d3.time.scale()
            .domain([d3.min(Data, function (d) { return d.date; }),
            d3.max(Data, function (d) { return d.date; })])
            .range([0, xAxisLength]);
        var scaleY = d3.scale.linear()
            .domain([maxValue, 0])
            .range([0, yAxisLength]);
        var xAxis = d3.svg.axis()
            .scale(scaleX)
            .orient("bottom")
            .tickFormat(d3.time.format('%e %B'));
        var yAxis = d3.svg.axis()
            .scale(scaleY)
            .orient("left");
        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(" + margin + "," + (height - margin) + ")")
            .call(xAxis);
        svg.append("g")
            .attr("class", "y-axis")
            .attr("transform", "translate(" + margin + "," + margin + ")")
            .call(yAxis);
        d3.selectAll("g.x-axis g.tick")
            .append("line")
            .classed("grid-line", true)
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", 0)
            .attr("y2", -(height - 2 * margin));
        d3.selectAll("g.y-axis g.tick")
            .append("line")
            .classed("grid-line", true)
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", xAxisLength)
            .attr("y2", 0);
        createChart(Data, "steelblue");
        function createChart(data, colorStroke) {
            var line = d3.svg.line()
                .interpolate("basis")
                .x(function (d) { return scaleX(d.date) + margin; })
                .y(function (d) { return scaleY(d.count) + margin; });
            var area = d3.svg.area()
                .interpolate("basis")
                .x(function (d) { return d.date; })
                .y0(height - margin)
                .y1(function (d) { return d.count; });
            var g = svg.append("g");
            g.append("path")
                .attr("d", area(data))
                .style("fill", "lightblue");
            g.append("path")
                .attr("d", line(data))
                .style("stroke", colorStroke)
                .style("fill", "none")
                .style("stroke-opacity", 0.6)
                .style("stroke-width", 2.5);
        }
        ;
    };
    /**
      * Изменение цвета заметок
      * @param = id цвет на который изменить
      */
    AppComponent.prototype.updateColor = function (id) {
        this._noteService.setColor('color' + id);
    };
    /**
      * Получение включения/выключения подсказок
      */
    AppComponent.prototype.getHelper = function () {
        if (this._noteService.getHelper() == 'true')
            $(".helper span").css({ "display": "block" });
        else
            $(".helper span").css({ "display": "none" });
    };
    /**
      * Включаем/выключаем подсказки
      */
    AppComponent.prototype.setHelper = function (flag) {
        this._noteService.setHelper(flag);
        this.getHelper();
    };
    /**
      * Читаем заголовок для меню
      */
    AppComponent.prototype.getTitle = function () {
        return this.title;
    };
    /**
      * Устанавливаем заголовок для меню
      * @param=title заголовок
      */
    AppComponent.prototype.setTitle = function (title) {
        this.title = title;
    };
    AppComponent.prototype.getPosition = function () {
        if (this._noteService.getPosition() == 'block')
            $(".notes li").css({ "width": "calc(100% /2 - 15px)" });
        else
            $(".notes li").css({ "width": "calc(100% - 15px)" });
    };
    /**
      * Устанавливаем позицию для блоков
      * @param=position свойство
      */
    AppComponent.prototype.setPosition = function (position) {
        if (position == '1')
            this._noteService.setPosition('inline');
        else
            this._noteService.setPosition('block');
        this.getPosition();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'main-app',
            templateUrl: './src/menu/menu.html',
            styleUrls: ['./src/menu/menu.css'],
            providers: [service_1.Service]
        }),
        __metadata("design:paramtypes", [core_2.TranslateService, service_1.Service])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
