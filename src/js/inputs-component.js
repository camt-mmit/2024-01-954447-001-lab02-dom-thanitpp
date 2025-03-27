import { assignComponent as assignInputComponent } from "./input-components";
// Original: return template.content.cloneNode(true).firstElementChild;
function createComponent(template) {
  return template.content.cloneNode(true).firstElementChild;
}
export function assignSectionComponent(globalContainer) {
  const sectionTemplate = document.querySelector("template.app-tmpl-section");
  if (!sectionTemplate) {
    console.error("Section template not found");
    return;
  }
  const updateSectionNumbersAndButtons = () => {
    const sections = [...globalContainer.querySelectorAll(".app-cmp-section")];
    sections.forEach((section, index) => {
      const sectionNumberElement = section.querySelector(".section-number");
      if (sectionNumberElement) {
        sectionNumberElement.textContent = `Section ${index + 1}`;
      }
      const removeButton = section.querySelector(".app-cmd-remove-section");
      if (removeButton) {
        removeButton.disabled = sections.length === 1;
      }
    });
  };
  const addSection = () => {
    const sectionComponent = createComponent(sectionTemplate);
    sectionComponent.addEventListener("click", (event) => {
      const removeButton = event.target.closest(".app-cmd-remove-section");
      if (removeButton) {
        const sections = globalContainer.querySelectorAll(".app-cmp-section");
        if (sections.length > 1) {
          const sectionToRemove = removeButton.closest(".app-cmp-section");
          if (sectionToRemove) {
            sectionToRemove.remove();
            updateSectionNumbersAndButtons();
          }
        }
      }
    });
    assignInputComponent(sectionComponent);
    globalContainer.appendChild(sectionComponent);
    updateSectionNumbersAndButtons();
  };
  const addSectionButton = document.querySelector(".app-cmd-add-section");
  if (addSectionButton) {
    addSectionButton.addEventListener("click", addSection);
  }
  globalContainer.addEventListener("click", (event) => {
    const removeButton = event.target.closest(".app-cmd-remove-section");
    if (removeButton) {
      const sections = globalContainer.querySelectorAll(".app-cmp-section");
      if (sections.length > 1) {
        const sectionToRemove = removeButton.closest(".app-cmp-section");
        if (sectionToRemove) {
          sectionToRemove.remove();
          updateSectionNumbersAndButtons();
        }
      }
    }
  });
  const existingSections = globalContainer.querySelectorAll(".app-cmp-section");
  if (existingSections.length === 0) {
    addSection();
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const globalContainer = document.querySelector(".app-sections-list");
  if (globalContainer) {
    assignSectionComponent(globalContainer);
  }
});
