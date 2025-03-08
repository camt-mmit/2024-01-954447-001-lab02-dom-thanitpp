function createComponent() {
  const component = document.createElement("div");
  component.classList.add("app-cmp-input");

  const label = document.createElement("label");

  const title = document.createElement("b");
  title.classList.add("app-elem-input-title");

  const input = document.createElement("input");
  input.setAttribute("type", "number");
  input.setAttribute("value", "0");
  input.classList.add("app-elem-input");

  component.append(label);
  label.append(title, input);

  return component;
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".app-cmp-input-list");

  const computerResult = () => {
    const inputComponent = [...document.querySelectorAll(".app-elem-input")];

    const result = inputComponent.reduce((result, inputComponent) => {
      return result + inputComponent.valueAsNumber;
    }, 0);

    const output = document.querySelector(".app-elem-result");
    output.value = `${result}`;
  };

  const addComponent = () => {
    const inputComponent = createComponent();
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
