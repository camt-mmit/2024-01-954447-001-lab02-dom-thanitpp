function createComponent(template) {
  return template.content.cloneNode(true).firstElementChild;
}
export function assignComponent(element) {
  const template = element.querySelector("template.app-tmpl-input");
  if (!template) {
    console.error("Input template not found");
    return;
  }
  const container = element.querySelector(".app-cmp-inputs-list");
  if (!container) {
    console.error("Input container not found");
    return;
  }
  const updateInputComponents = () => {
    const inputComponents = [...container.querySelectorAll(".app-cmp-input")];
    inputComponents.forEach((component, index) => {
      const titleNoElements = component.querySelectorAll(".app-elem-title-no");
      titleNoElements.forEach((titleNo) => {
        titleNo.textContent = `${index + 1}`;
      });
      const removeButtons = component.querySelectorAll(".app-cmd-remove-input");
      removeButtons.forEach((cmdRemoveInput) => {
        cmdRemoveInput.disabled = inputComponents.length === 1;
      });
    });
  };
  const calculateResult = () => {
    const inputs = [
      ...container.querySelectorAll('input[type="number"].app-elem-input'),
    ];
    console.log(`Found ${inputs.length} input(s) for calculation.`);
    if (inputs.length === 0) {
      console.warn("No input elements found for calculation.");
      return;
    }
    const result = inputs.reduce((sum, element) => {
      const value = element.valueAsNumber;
      console.log(`Processing input value: ${value}`);
      return sum + (isNaN(value) ? 0 : value);
    }, 0);
    console.log(`Calculated result: ${result}`);
    const resultOutputs =
      container
        .closest(".app-cmp-section")
        ?.querySelectorAll("output.app-elem-result") || [];
    if (resultOutputs.length === 0) {
      console.error("No output elements found for displaying the result.");
      return;
    }
    resultOutputs.forEach((output) => {
      output.value = result.toLocaleString();
    });
  };
  const appendInputComponent = () => {
    const inputComponent = createComponent(template);
    const removeButton = inputComponent.querySelector(".app-cmd-remove-input");
    if (removeButton) {
      removeButton.addEventListener("click", () => {
        const currentInputs = container.querySelectorAll(".app-cmp-input");
        if (currentInputs.length > 1) {
          inputComponent.remove();
          updateInputComponents();
          calculateResult();
        }
      });
    }
    container.appendChild(inputComponent);
    updateInputComponents();
    calculateResult();
  };
  const addInputButton = element.querySelector(".app-cmd-add-input");
  if (addInputButton) {
    addInputButton.addEventListener("click", appendInputComponent);
  }
  container.addEventListener("input", (ev) => {
    const target = ev.target;
    if (target && target.matches('input[type="number"].app-elem-input')) {
      calculateResult();
    }
  });
  appendInputComponent();
}
