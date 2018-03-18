import { Injectable } from '@angular/core';
import { ITEMS } from '../mock/note.test';
import { NoteItem } from '../item/note.item'; 
import { DeleteItem } from '../item/delete.item'; 

@Injectable()

export class Service {

	items: NoteItem[];
	itemsArhive: NoteItem[] = [];
	itemsDelete: DeleteItem[] = [];

	constructor() {
		this.items=ITEMS;
	}

	getItems() {		
		return this.items;
	}

	setItems(items: NoteItem[]) {
		this.items=items;	
	}

	getItemsArhive() {		
		return this.itemsArhive;
	}

	setItemsArhive(itemsArhive: NoteItem[]) {
		this.itemsArhive=itemsArhive;	
	}

	getDeleteItems() {		
		return this.itemsDelete;
	}

	setDeleteItems(itemsDelete: DeleteItem[]){
		this.itemsDelete=itemsDelete;
	}
}
