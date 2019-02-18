export let $ = (selector, parent = document) => {
	return parent.querySelector(selector)
};

export let qsa = (selector, parent = document) => {
	return parent.querySelectorAll(selector)
};

export let createElem = (elem, prop = {}) => {
	let createElem = document.createElement(elem);
	for (let key in prop) {
		createElem.setAttribute(key, prop[key])
	}
	return createElem;
};

export let on = (elem, type, handler, capture) => {
	elem.addEventListener(type, handler, !!capture)
};

export function delegate(currentTarget, selector, type, handler, capture) {
	const dispatchEvent = event => {
		const targetElement = event.target;
		const potentialElements = currentTarget.querySelectorAll(selector);
		let i = potentialElements.length;

		while (i--) {
			if (potentialElements[i] === targetElement) {
				handler.call(targetElement, event);
				break;
			}
		}
	};

	on(currentTarget, type, dispatchEvent, !!capture);
}

export let isPropInObj = (obj) => {
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			return true;
		}
	}
	return false;
};

export let findID = (target) => {
	if (target.dataset.id) {

		return target.dataset.id
	} else if (target === document) {
		return
	}
	return findID(target.parentNode)
};

export let setChosen = (target, selector, cssClass, parent = document) => {
	let elements = qsa(selector, parent);
	for (let i = 0; i < elements.length; i++) {
		if (elements[i] !== target) {
			elements[i].classList.remove(cssClass);
			continue;
		}
		if (elements[i] === target) {
			elements[i].classList.add(cssClass);
		}
	}
};