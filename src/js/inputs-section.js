import { assignComponent as assignInputsComponent } from "./inputs-section.js";
function createComponent(template) {
  return template.content.cloneNode(true).firstElementChild;
}

export function assignComponent(element) {
  const template = element.querySelector("template.app-tmpl-section");
  const container = template.parentElement;

  const addComponent = () => {
    const sectionComponent = createComponent(template);
    container.append(sectionComponent);
    assignInputsComponent(sectionComponent);
  };
  element.addEventListener("click", (ev) => {
    if (ev.target?.matches("app-cmd-add-section")) {
      addComponent();
    }
  });
  addComponent();
}
