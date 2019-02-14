import Storage from "./Storage";
import Template from "./Template";
import View from "./View";
import Model from "./Model";
import Controller from "./Controller";

let template = new Template();
let view = new View(template);
let storage = new Storage('mara');
let model = new Model(storage);
let controller = new Controller(model, view);

window.onload = () => {
	controller.setItems()
};

