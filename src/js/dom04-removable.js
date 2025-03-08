function createComponent(template) {
  return template.content.cloneNode(true).firstElementChild;
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".app-cmp-input-list");
  const template = document.querySelector("template.app-tmpl-input");
  const computerResult = () => {
    const inputComponent = [...document.querySelectorAll(".app-elem-input")];

    const result = inputComponent.reduce((result, inputComponent) => {
      return result + inputComponent.valueAsNumber;
    }, 0);

    const output = document.querySelector(".app-elem-result");
    output.value = `${result}`;
  };

  const updatecomponent = () => {
    const inputComponents = [...container.querySelectorAll('.app-cmp-input')].forEach((inputCompoent, index, inputComponent) =>{
      [...inputCompoent.querySelectorAll('.app-elem-input-title')].forEach(
        (element) => (element.textContent = `${index + 1}`),
      );
      [...inputCompoent.querySelectorAll('.app-cmd-remove-input')].forEach(
        (element) => (element.disabled = inputComponent.length === 1),
      );
    });
  };

  const addComponent = () => {
    const inputComponent = createComponent(template);
    const title = inputComponent.querySelector(".app-elem-input-title");
    title.textContent = `Number ${
      container.querySelectorAll(".app-cmp-input").length + 1
    }`;
    container.append(inputComponent);
    inputComponent.addEventListener("change", (ev) => {
      if (ev.target?.matches('input[type="number"].app-elem-result')){
        updatecomponent();
        computerResult();
      }
    });
    inputComponent.addEventListener("click", (ev) => {
      if (ev.target?.matches(".app-cmd-remove-input")) {
        inputComponent.remove();
        updatecomponent();
        computerResult();
      }
    });
    computerResult();
  };
  document
    .querySelector(".app-cmd-add-input")
    .addEventListener("click", addComponent);
  addComponent();
});
