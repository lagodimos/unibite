export function elementFromHtml(elementHtml) {
    const template = document.createElement('template');
    template.innerHTML = elementHtml.trim();
    const element = template.content.firstElementChild;

    return element;
}
