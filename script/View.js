// import Template from "./Template";
import {$, qsa, on, delegate, setChosen} from "./helpers";

export default class View {
	constructor(template) {
		this.template = template;
		this.newItem = $('.new-item');
		this.itemList = $('.item-list');
		this.count = $('.count');
		this.clearAllBtn = $('.clear-complete');
		this.toggleAll = $('.toggle-all');
		this.footer = $('.footer');
	}

	setItems(items) {
		this.itemList.innerHTML = this.template.setItems(items)
	}

	setCount(count) {
		this.count.innerText = count > 0 ? this.template.activeCount(count) : ''
	}

	editItemBegin(target, value) {
		target.appendChild(this.template.setEdit(value));
		let i = $('textarea', target);
		setTimeout(i.focus(), 0)
	}

	editItemSave(target) {
		target.parentElement.removeChild(target);
	}

	cleanNewItem() {
		this.newItem.value = '';
	}

	bindAddItem(handler) {
		on(this.newItem, 'change', (e) => {
			handler(e.target);
			this.cleanNewItem();
		})
	}

	bindDeleteItem(handler) {
		delegate(this.itemList, '.destroy', 'click', handler)
	}

	bindCompletedToggly(handler) {
		delegate(this.itemList, '.checkbox', 'click', handler)
	}

	bindEditItemBegin(handler) {
		delegate(this.itemList, '.content', 'dblclick', (e) => {
			handler(e)
		})
	}

	bindFilter(handler) {
		delegate(this.footer, '.btn', 'click', (e) => {
			handler(e);
			setChosen(e.target, '.btn', 'chosen', this.footer)
		});
	}

	bindClearCompleted(handler) {
		on(this.clearAllBtn, 'click', handler);
		on(this.clearAllBtn, 'click', () => {
			let target = qsa('.btn', this.footer)[0];
			setChosen(target, '.btn', 'chosen', this.footer)
		})
	}

	bindToggleAll(handler) {
		on(this.toggleAll, 'click', handler)
	}

	bindEditItemSave(handler) {
		delegate(this.itemList, '.edit>textarea', 'blur', handler, true);
		delegate(this.itemList, '.edit>textarea', 'keypress', ({target, keyCode}) => {
			if (keyCode === 13) {
				target.blur();
			}
		}, true);
		delegate(this.itemList, '.edit>textarea', 'keydown', ({target, keyCode}) => {
			if (keyCode === 27) {
				target.dataset.esc = 'true';
				target.blur();
			}
		}, true);
	}
}