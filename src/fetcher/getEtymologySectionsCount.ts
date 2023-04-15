import { is } from './is';
import { textContent } from './textContent';

/**
 * Returns the count of `<h3>` nodes that begin with "Etymology"
 * @param elements
 */
export function getEtymologySectionsCount(elements: Element[]): number {
  return elements
    .map((element) => is(element, 'H3') && textContent(element).startsWith('Etymology'))
    .filter((isTrue) => isTrue).length;
}
