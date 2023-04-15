import { is } from './is';

/**
 * For input
 * ```
 * <ol>
 *     <li>...</li>
 *     <li>...</li>
 *     <li>...</li>
 * </ol>
 * ```
 * this returns:
 * ```
 * [
 *   <li>...</li>,
 *   <li>...</li>,
 *   <li>...</li>
 * ]
 * ```
 *
 * @param elements
 */
export function parseDefinitionGroups(elements: Element[]): Element[] {
  return Array.from(elements.find((node) => is(node, 'OL'))?.children ?? []);
}
