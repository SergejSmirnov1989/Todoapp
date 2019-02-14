export default class Storage {
	constructor(DBName) {
		const localStorage = window.localStorage;

		this.getLocalStorage = () => {
			return JSON.parse(localStorage.getItem(DBName) || '{}');
		};

		this.setLocalStorage = (todos) => {
			localStorage.setItem(DBName, JSON.stringify(todos));
		};
	}
}