
export function createComponent(template) {
  if (!template || !template.content) {
    console.error("Invalid template provided to createComponent.");
    return null;
  }
  return template.content.cloneNode(true).firstElementChild;
}


export function updateInputNumbers(container) {
  const inputs = container.querySelectorAll(".app-cmd-input");
  inputs.forEach((input, index) => {
    const title = input.querySelector(".app-elem-input-title-no");
    if (title) {
      title.textContent = index + 1; 
    }
  });
}


export function assignInputs(addButton, template, container, computeResult) {
  if (!addButton || !template || !container || typeof computeResult !== "function") {
    console.error("Invalid arguments passed to assignInputs.");
    return;
  }

  addButton.addEventListener("click", () => {
    const inputComponent = createComponent(template);
    if (!inputComponent) {
      console.error("Failed to create input component.");
      return;
    }

    const inputCount = container.querySelectorAll(".app-cmd-input").length + 1;
    const title = inputComponent.querySelector(".app-elem-input-title-no");
    if (title) {
      title.textContent = inputCount;
    }

    const inputField = inputComponent.querySelector(".app-elem-input");
    if (inputField) {
      inputField.addEventListener("input", () => computeResult());
    }

    const removeButton = inputComponent.querySelector(".app-cmd-remove-input");
    if (removeButton) {
      removeButton.addEventListener("click", () => {
        const allInputs = container.querySelectorAll(".app-cmd-input");
        if (allInputs.length > 1) { 
          inputComponent.remove();
          updateInputNumbers(container);
          computeResult();
        } else {
          alert("At least one input must exist in a section.");
        }
      });
    }

    container.appendChild(inputComponent);
    computeResult();
  });
}
