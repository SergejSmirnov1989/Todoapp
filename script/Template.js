import {createElem} from "./helpers";

export default class Template {
	setItems(items) {
		let i = '';
		for (let key in items) {
			i += `<div data-id="${key}" class="todo-item">
				      <div class="${items[key].complete ? 'complete' : 'active'}">
				          <input type="checkbox" class="checkbox">
				          <label class="content">${items[key]['content']}</label>
				          <button class="destroy"></button>
					  </div>
				  </div>`
		}
		return i;
	}

	setItem(item, id) {
		let div = createElem('div', {
			class: 'todo-item',
			'data-id': id
		});
		let i =	`<div class="${item.complete ? 'complete' : 'active'}">
						<input type="checkbox" class="checkbox">
						<label class="content">${item['content']}</label>
						<button class="destroy"></button>
					</div>
				</div>`
		div.innerHTML = i;
		return div;
	}

	setEdit(value) {
		let div = createElem('div', {
			class: 'popap'
		})
		let i = `<div class="edit">
				     <textarea cols="100" rows="10">${value}</textarea>
				 </div>`
		div.innerHTML = i;
		return div;
	}

	activeCount(activeItems) {
		let i = activeItems % 10;
		if (i == 1) {
			return activeItems + ' задание';
		}
		if (i > 1 && i <= 4) {
			return activeItems + ' задания';
		}
		if (i > 4) {
			return activeItems + ' заданий';
		}
		if (activeItems > 10 && activeItems < 15) {
			return activeItems + ' заданий';
		}
	}
}
