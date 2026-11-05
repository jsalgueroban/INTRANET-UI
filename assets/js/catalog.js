import { initSearchField, initFilterBar } from './ui-controls.js';

document.querySelectorAll('.ui-search-field').forEach(initSearchField);
document.querySelectorAll('.ui-filter-bar').forEach(group => initFilterBar(group));

const catalog = document.querySelector("#catalog");

catalog?.addEventListener("click", (event) => {
  const demo = event.target.closest("[data-progress-demo]");
  if (demo) {
    const progress = document.getElementById("feedback-progress");
    const output = document.getElementById("feedback-progress-value");
    const status = document.getElementById("feedback-progress-status");
    demo.disabled = true;
    progress.value = 0;
    output.textContent = "0 %";
    status.textContent = "Simulación iniciada";
    const timer = window.setInterval(() => {
      progress.value = Math.min(progress.value + 5, 100);
      output.textContent = `${progress.value} %`;
      if (progress.value === 100) {
        window.clearInterval(timer);
        status.textContent = "Simulación completada";
        demo.disabled = false;
      }
    }, 150);
    return;
  }
  const help = event.target.closest("[data-help]");
  if (help) {
    const open = help.getAttribute("aria-expanded") === "true";
    help.setAttribute("aria-expanded", String(!open));
    document.getElementById(help.getAttribute("aria-controls")).hidden = open;
    return;
  }
  const dialogOpen = event.target.closest("[data-dialog-open]");
  if (dialogOpen) { document.getElementById(dialogOpen.dataset.dialogOpen).showModal(); return; }
  const dialogClose = event.target.closest("[data-dialog-close]");
  if (dialogClose) { dialogClose.closest("dialog").close(); return; }
  const pageButton = event.target.closest("[data-page], [data-page-next], [data-page-prev]");
  if (pageButton) {
    const nav = pageButton.closest(".ui-pagination");
    const current = Number(nav.querySelector('[aria-current="page"]').dataset.page);
    const page = pageButton.dataset.page ? Number(pageButton.dataset.page) : pageButton.hasAttribute("data-page-prev") ? Math.max(current - 1, 1) : Math.min(current + 1, 3);
    nav.querySelectorAll("[data-page]").forEach(item => item.toggleAttribute("aria-current", Number(item.dataset.page) === page));
    nav.querySelector(`[data-page="${page}"]`).setAttribute("aria-current", "page");
    nav.querySelector("[data-page-next]").disabled = page === 3;
    nav.querySelector("[data-page-prev]").disabled = page === 1;
    nav.parentElement.querySelector(".ui-pagination__status").textContent = `Página ${page} de 3`;
    return;
  }
  const disclosure = event.target.closest("[data-disclosure]");
  if (disclosure) {
    const expanded = disclosure.getAttribute("aria-expanded") === "true";
    disclosure.setAttribute("aria-expanded", String(!expanded));
    document.querySelector(`#${disclosure.getAttribute("aria-controls")}`)?.toggleAttribute("hidden", expanded);
  }
});

const catalogIndex=document.querySelector('[data-catalog-index]');
if(catalogIndex){
  document.querySelectorAll('.catalog-section').forEach((section,index)=>{
    const heading=document.getElementById(section.getAttribute('aria-labelledby'))||section.querySelector('h2');
    if(!heading)return;
    if(!section.id)section.id=`catalog-group-${index+1}`;
    const link=document.createElement('a');
    link.href=`#${section.id}`;
    link.textContent=heading.textContent;
    catalogIndex.append(link);
  });
}
