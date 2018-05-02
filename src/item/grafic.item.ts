/**
  * Класс, который будет хранить количество записок в определенную дату
  */
export class GraficItem {

	/**
	  * Поле, которое количество записок
	  */
	count : number;
	
	/**
	  * Поле которое хранит дату
	  */
	date: Date;

	/**
	  * Конструктор класса
	  * @param=count количество записок
	  * @param=date дата удаления
	  */
	constructor(count: number, date: Date) {
  
		this.count=count;
        this.date = date;
	}
}