document.addEventListener("DOMContentLoaded", () => {
  const inputComponent = [...document.querySelectorAll(".app-elem-input")];
  const computerResult = () => {
    const result = inputComponent.reduce((result, inputComponent) => {
      return result + inputComponent.valueAsNumber;
    }, 0);
    const output = document.querySelector(".app-elem-result");
    output.value = `${result}`;
  };
  inputComponent.forEach((inputComponent) => {
    inputComponent.addEventListener("change", computerResult);
  });
  computerResult();
});
