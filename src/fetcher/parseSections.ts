import { is } from './is';
import { textContent } from './textContent';

/**
 * Since the sections are not wrapped in a `<div>` or `<section>`, all the nodes are
 * flat and not nested. This attempts to group those sections and return as `Array<Array<Element>>`
 *
 * For input
 * ```
 * <h2>Hello</h2>
 * <p>Some para</p>
 * <h3>...</h3>
 *
 * <h2>Hola</h2>
 * <p>...</p>
 * <h3>...</h3>
 *
 * <h2>Hello</h2>
 * <p>Some other para</p>
 * <h3>...</h3>
 * ```
 *
 * and `headingNodeName: H2`, `headingTextContent: Hello`,
 *
 * output is
 *
 * ```
 * [
 *   [
 *     <h2>Hello</h2>,
 *     <p>Some para</p>,
 *     <h3>...</h3>
 *   ],
 *   [
 *     <h2>Hello</h2>,
 *     <p>Some other para</p>,
 *     <h3>...</h3>
 *   ],
 * ]
 * ```
 *
 *
 * @param elements
 * @param headingNodeName
 * @param headingTextContent
 */
export function parseSections(elements: Element[], headingNodeName: string, headingTextContent: string): Element[][] {
  const headingIndices = elements
    .map((e, index) => [e, index] as const)
    .filter(([node]) => is(node, headingNodeName))
    .map(([, index]) => index);

  const allSections = headingIndices.map((headingIndex, index) => {
    const isLastIndex = index === headingIndices.length - 1;
    return elements.slice(headingIndex, isLastIndex ? undefined : headingIndices[index + 1]);
  });

  return allSections.filter((sectionElements) => {
    const firstElement = sectionElements[0];
    return textContent(firstElement).startsWith(headingTextContent);
  });
}
