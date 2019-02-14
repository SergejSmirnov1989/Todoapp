export default class Model {
	constructor(storage) {
		this.storage = storage;
		this.todo = this.getTodo();
	}

	getTodo() {
		return this.todo || this.storage.getLocalStorage();
	}

	setTodo(item, id) {
		let items = this.getTodo();
		items[id] = item;
		this.storage.setLocalStorage(this.todo = items);
	}

	editTodo(id, value) {
		let items = this.getTodo();
		let lastValue = items[id]['content'];
		if (value != lastValue && value != '') {
			items[id]['content'] = value;
			this.storage.setLocalStorage(this.todo = items);
		}
	}

	setComplete(id) {
		let items = this.getTodo();
		items[id].complete = !items[id].complete;
		this.storage.setLocalStorage(this.todo = items);
	}

	deletTodo(id) {
		let items = this.getTodo();
		delete items[id];
		this.storage.setLocalStorage(this.todo = items);
	}

	deletCompleted() {
		let items = this.getTodo();
		for (let key in items) {
			if (items[key]['complete']) {
				this.deletTodo(key);
			}
		}
	}

	toggleAll() {
		let items = this.getTodo();
		let active = false;
		let keys = [];

		for (let key in items) {
			if (!items[key]['complete']) {
				active = true;
				keys.push(key);
			}
		}

		if (active) {
			keys.forEach((item) => {
				this.setComplete(item);
			});

			return;
		}

		for (let key in items) {
			this.setComplete.call(this, key);
		}

		return;
	}

	activeCount() {
		if (!this.todo) {
			return 0;
		}

		let count = 0;

		for (let key in this.todo) {
			if (!this.todo[key]['complete']) {
				count++;
			}
		}

		return count
	}

	filter(complete) {
		let items = this.getTodo();
		let itemComplete = {};
		let itemActive = {};

		for (let key in items) {
			if (items[key]['complete']) {
				itemComplete[key] = items[key];
				continue;
			}
			itemActive[key] = items[key];
		}

		if (complete) {
			return itemComplete;
		}

		return itemActive;
	}
}