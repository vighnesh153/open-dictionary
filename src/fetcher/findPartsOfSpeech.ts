import { DefinitionGroup, Etymology, PartOfSpeech } from './types';
import { partsOfSpeech } from './partsOfSpeech';
import { parseSections } from './parseSections';
import { parseConsecutiveParagraphsAfterHeading } from './parseConsecutiveParagraphsAfterHeading';
import { parseDefinitionGroups } from './parseDefinitionGroups';
import { parseDefinitionGroupEntry } from './parseDefinitionGroupEntry';
import { textContent } from './textContent';

export function findPartsOfSpeech(elements: Element[], headingLevel: string): Omit<Etymology, 'description'> {
  const etymology: Omit<Etymology, 'description'> = {
    adjectives: [],
    adverbs: [],
    nouns: [],
    prepositions: [],
    verbs: [],
    letter: [],
    number: [],
  };
  partsOfSpeech.forEach(({ partOfSpeechKey, key }) => {
    const sections = parseSections(elements, headingLevel, partOfSpeechKey);
    sections.forEach((section) => {
      const partOfSpeech: PartOfSpeech = {
        description: parseConsecutiveParagraphsAfterHeading(section).join(' '),
        definitionGroups: [],
      };
      const definitionGroups = parseDefinitionGroups(section);
      definitionGroups.forEach((definitionGroupEl) => {
        const hasNestedDefinitions = Boolean(definitionGroupEl.querySelector('ol'));
        if (hasNestedDefinitions) {
          const definitionGroup: DefinitionGroup = {
            group: '',
            entries: [],
          };
          const listItems = definitionGroupEl.querySelectorAll('ol > li');
          listItems.forEach((listItem) => {
            definitionGroup.entries.push(parseDefinitionGroupEntry(listItem));
          });
          Array.from(definitionGroupEl.children).forEach((child) => {
            if (['ul', 'dl', 'ol', 'p'].includes(child.nodeName?.toLowerCase() ?? '')) {
              child.remove();
            }
          });
          definitionGroup.group = textContent(definitionGroupEl) || null;
          partOfSpeech.definitionGroups.push(definitionGroup);
          definitionGroup.entries = definitionGroup.entries.filter(
            (entry) => entry.meaning || entry.examples.length > 0
          );
        } else {
          partOfSpeech.definitionGroups.push({
            group: null,
            entries: [parseDefinitionGroupEntry(definitionGroupEl)].filter(
              (entry) => entry.meaning || entry.examples.length > 0
            ),
          });
        }
      });
      etymology[key].push(partOfSpeech);
    });
  });
  return etymology;
}
