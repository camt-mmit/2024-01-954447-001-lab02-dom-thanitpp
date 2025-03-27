import {
  createComponent,
  assignInputs,
  updateInputNumbers,
} from "./input-component.js";

document.addEventListener("DOMContentLoaded", () => {
  const addSectionButton = document.querySelector(".add-section");
  const sectionTemplate = document.getElementById("section-template");
  const inputTemplate = document.getElementById("input-template");
  const container = document.body;

  if (!addSectionButton || !sectionTemplate || !inputTemplate) {
    console.error("Required DOM elements are missing.");
    return;
  }

  function createSection() {
    const section = sectionTemplate.content.cloneNode(true);
    const sectionNumber = container.querySelectorAll(".section").length + 1;

    section.querySelector(".section-number").textContent = sectionNumber;

    const inputList = section.querySelector(".app-cmd-input-list");
    const resultOutput = section.querySelector(".app-elem-result");

    const computeResult = () => {
      const inputs = inputList.querySelectorAll(".app-elem-input");
      const sum = Array.from(inputs).reduce(
        (total, input) => total + (parseFloat(input.value) || 0),
        0,
      );
      resultOutput.value = sum;
    };

    const addInputButton = section.querySelector(".app-cmd-add-input");
    assignInputs(addInputButton, inputTemplate, inputList, computeResult);

    section
      .querySelector(".app-cmd-remove-section")
      .addEventListener("click", (event) => {
        const allSections = container.querySelectorAll(".section");
        if (allSections.length > 1) {
          const sectionToRemove = event.target.closest(".section");
          if (sectionToRemove) {
            sectionToRemove.remove();
            updateSectionNumbers();
          }
        } else {
          alert("At least one section must exist.");
        }
      });

    container.appendChild(section);

    addInputButton.click();
  }

  function updateSectionNumbers() {
    container.querySelectorAll(".section").forEach((section, index) => {
      section.querySelector(".section-number").textContent = index + 1;
    });
  }

  addSectionButton.addEventListener("click", createSection);

  createSection();
});
