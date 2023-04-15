import { is } from './is';
import { textContent } from './textContent';

/**
 * For input
 * ```
 * <h{n}>
 *     <p>1</p>
 *     <p>2</p>
 *     <span>...</span>
 *     <img />
 *     <p></p>
 *     <p>3</p>
 *     <h{n+1}></h{n+1}>
 *     ....
 * </h{n}>
 * ```
 * this returns
 * ```
 * [
 *   "1",
 *   "2",
 *   "3",
 * ]
 * ```
 *
 * @param elements
 */
export function parseConsecutiveParagraphsAfterHeading(elements: Element[]): string[] {
  const paragraphs: string[] = [];
  for (let index = 1; index < elements.length; index++) {
    const node = elements[index];
    if (node.nodeName.startsWith('H')) break;
    if (is(node, 'P')) paragraphs.push(textContent(node));
  }
  return paragraphs.map((line) => line.trim()).filter((line) => line.length > 0);
}
