/**
 * Insert a text in an element.
 * @param elementID The ID of the target element
 * @param text The text to be placed in the element
 */
export default function replaceText(elementID: string, text: string): void {
    const element = document.getElementById(elementID);
    if (element) {
        element.innerText = text;
    }
}
