import {findID} from "./helpers"

export default class Controller {
	constructor(model, view) {
		this.model = model;
		this.view = view;

		view.bindAddItem(this.addItem.bind(this));
		view.bindDeleteItem(this.deleteItem.bind(this));
		view.bindCompletedToggly(this.completedToggle.bind(this));
		view.bindEditItemBegin(this.editItemBegin.bind(this));
		view.bindEditItemSave(this.editItemSave.bind(this));
		view.bindFilter(view.completeBtn, this.viewComplete.bind(this));
		view.bindFilter(view.activeBtn, this.viewActive.bind(this));
		view.bindFilter(view.showAllBtn, this.setItems.bind(this));
		view.bindClearCompleted(this.deleteCompleted.bind(this));
		view.bindToggleAll(this.toggleAll.bind(this));
	}

	setItems() {
		this.view.setItems(this.model.getTodo());
		this.view.disabledBtn(this.model.filter(true));
		this.setCount();
	}

	viewComplete() {
		this.view.setItems(this.model.filter(true));
	}
	viewActive() {
		this.view.setItems(this.model.filter(false));
	}

	deleteCompleted() {
		this.model.deletCompleted();
		this.setItems()
	}

	addItem(target) {
		let id = Date.now();
		let item = {
			content: target.value.trim(),
			complete: false
		};
		this.model.setTodo(item, id);
		this.setItems()
	}

	deleteItem(e) {
		let id = findID(e.target);
		this.model.deletTodo(id);
		this.setItems();

	}

	completedToggle(e) {
		let id = findID(e.target);
		this.model.setComplete(id);
		this.setItems()
	}

	editItemBegin(e) {
		let currentTarget = e.target.parentElement.parentElement;
		let value = e.target.innerText;
		this.view.editItemBegin(currentTarget, value);
	}

	editItemSave(e) {
		if(!!e.target.dataset.esc) {
			this.setItems();
			return;
		}
		let target = e.target.parentElement.parentElement;
		let id = findID(e.target);
		let value = e.target.value.trim();
		this.model.editTodo(id, value);
		this.view.editItemSave(target);
		this.setItems()
	}

	toggleAll() {
		this.model.toggleAll();
		this.setItems();
	}

	setCount() {
		this.view.setCount(this.model.activeCount());
	}
}