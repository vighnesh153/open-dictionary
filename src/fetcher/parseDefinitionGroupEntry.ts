import { DefinitionGroup } from './types';
import { textContent } from './textContent';

/**
 * For input
 * ```html
 * <li>
 *     <span>a</span>
 *     <span>b</span>
 *     <span>c</span>
 *     <dl>
 *         <dd>1</dd>
 *         <dd>2</dd>
 *     </dl>
 * </li>
 * ```
 * this returns
 * ```
 * {
 *     meaning: 'abc',
 *     examples: ['1', '2'],
 * }
 * ```
 * @param listItem
 */
export function parseDefinitionGroupEntry(listItem: Element): DefinitionGroup['entries'][number] {
  const examples: string[] = [];
  const dl = listItem.querySelector('li > dl');
  Array.from(dl?.children ?? []).forEach((dd) => {
    examples.push(textContent(dd));
  });
  Array.from(listItem.children).forEach((child) => {
    if (['ul', 'dl', 'ol', 'p'].includes(child.nodeName?.toLowerCase() ?? '')) {
      child.remove();
    }
  });
  const meaning = textContent(listItem);
  return {
    meaning,
    examples,
  };
}
