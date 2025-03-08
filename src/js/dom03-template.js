function createComponent(template) {
  return template.content.cloneNode(true).firstElementChild;
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".app-cmp-input-list");
  const template = document.querySelector('template.app-tmpl-input')
  const computerResult = () => {
    const inputComponent = [...document.querySelectorAll(".app-elem-input")];

    const result = inputComponent.reduce((result, inputComponent) => {
      return result + inputComponent.valueAsNumber;
    }, 0);

    const output = document.querySelector(".app-elem-result");
    output.value = `${result}`;
  };

  const addComponent = () => {
    const inputComponent = createComponent(template);
    const title = inputComponent.querySelector('.app-elem-input-title')
    title.textContent = `Number ${
      container.querySelectorAll('.app-cmp-input').length + 1
    }`;
    container.append(inputComponent);
    inputComponent.addEventListener("change", computerResult);
    computerResult();
  };
  document
    .querySelector(".app-cmd-add-input")
    .addEventListener("click", addComponent);
  addComponent();
});
