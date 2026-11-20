export function factoryElem(elem, className, text) {
    const element = document.createElement(elem);
    element.setAttribute("class", className);
    element.textContent = text;

    return element
}