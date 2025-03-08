function createComponent(template) {
  return template.content.cloneNode(true).firstElementChild;
}

export function assignComponent(element) {
  const template = element.querySelector(".app-tmpl-input");
  const container = element.querySelector(".app-cmp-input-list");

  const computerResult = () => {
    const inputComponent = [...document.querySelectorAll(".app-elem-input")];

    const result = inputComponent.reduce((result, inputComponent) => {
      return result + inputComponent.valueAsNumber;
    }, 0);

    const output = element.querySelector(".app-elem-result"); // แก้ไขให้เลือก output ใน element
    if (output) {
      output.textContent = `${result}`; // แสดงผลลัพธ์ใน output
    }
  };

  const updatecomponent = () => {
    const inputComponents = [
      ...container.querySelectorAll(".app-cmp-input"),
    ];
    inputComponents.forEach((inputCompoent, index) => {
      const title = inputCompoent.querySelector(".app-elem-input-title");
      const removeButton = inputCompoent.querySelector(".app-cmd-remove-input");

      if (title) title.textContent = `Number ${index + 1}`;
      if (removeButton) removeButton.disabled = inputComponents.length === 1;
    });
  };

  const addComponent = () => {
    const inputComponent = createComponent(template);
    container.append(inputComponent);

    updatecomponent();
    computerResult();

    inputComponent.addEventListener("change", (ev) => {
      if (ev.target?.matches('input[type="number"].app-elem-input')) {
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
  };

  element.addEventListener("click", (ev) => {
    if (ev.target?.matches(".app-cmd-add-input")) {
      addComponent();
    }
  });

  addComponent(); // เพิ่มแถวแรก
}
