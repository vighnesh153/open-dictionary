import { WordWiki } from './types';
import { removeUnwantedNodes } from './removeUnwantedNodes';
import { parseSections } from './parseSections';
import { getEtymologySectionsCount } from './getEtymologySectionsCount';
import { parseConsecutiveParagraphsAfterHeading } from './parseConsecutiveParagraphsAfterHeading';
import { findPartsOfSpeech } from './findPartsOfSpeech';

export function parseWordWiki(word: string, elements: Element[]): WordWiki {
  const wordWiki: WordWiki = {
    word,
    etymologies: [],
  };

  removeUnwantedNodes();
  const englishTextSection = parseSections(elements, 'H2', 'English')[0];

  const etymologyCount = getEtymologySectionsCount(englishTextSection);
  /**
   * <h3>Etymology 1</h3>
   * <h3>Etymology 2</h3>
   * ...
   */
  if (etymologyCount > 1) {
    const etymologySections = parseSections(englishTextSection, 'H3', 'Etymology');
    etymologySections.forEach((etymologySection) => {
      wordWiki.etymologies.push({
        description: parseConsecutiveParagraphsAfterHeading(etymologySection),
        ...findPartsOfSpeech(etymologySection, 'H4'),
      });
    });
  } else {
    const etymologySections = parseSections(englishTextSection, 'H3', 'Etymology');
    wordWiki.etymologies.push({
      description: parseConsecutiveParagraphsAfterHeading(etymologySections[0] ?? []),
      ...findPartsOfSpeech(englishTextSection, 'H3'),
    });
  }

  return wordWiki;
}
