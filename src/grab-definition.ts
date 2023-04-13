import { DefinitionGroup, Etymology, PartOfSpeech, WordWiki } from './types';

function is(node: Element, nodeName: string): boolean {
  return node.nodeName === nodeName;
}

function textContent(node: Element): string {
  return node.textContent?.trim() ?? '';
}

const word = textContent(document.querySelector('#firstHeading') ?? document.createElement('div'));
const definitionsContainerChildren = Array.from(document.querySelector('.mw-parser-output')?.children ?? []);

function removeUnwantedNodes() {
  const classes = ['mw-editsection', 'HQToggle', 'maintenance-line', 'reference'];
  classes.forEach((cssClass) => {
    const nodes = document.querySelectorAll(`.${cssClass}`);
    nodes.forEach((e) => e.remove());
  });
}

function getSections(elements: Element[], headingNodeName: string, headingTextContent: string): Element[][] {
  const headingIndices = elements
    .map((e, index) => [e, index] as const)
    .filter(([node]) => is(node, headingNodeName))
    .map(([, index]) => index);

  return headingIndices
    .map((headingIndex, index) => {
      const isLastIndex = index === headingIndices.length - 1;
      return elements.slice(headingIndex, isLastIndex ? undefined : headingIndices[index + 1]);
    })
    .filter((sectionElements) =>
      Boolean(sectionElements.find((node) => textContent(node).startsWith(headingTextContent)))
    );
}

function getEtymologyCount(elements: Element[]): number {
  return elements
    .map((element) => is(element, 'H3') && textContent(element).startsWith('Etymology'))
    .filter((isTrue) => isTrue).length;
}

function getConsecutiveParagraphsAfterHeading(elements: Element[]): string[] {
  const paragraphs: string[] = [];
  for (let index = 1; index < elements.length; index++) {
    const node = elements[index];
    if (node.nodeName.startsWith('H')) break;
    if (is(node, 'P')) paragraphs.push(textContent(node));
  }
  return paragraphs.map((line) => line.trim()).filter((line) => line.length > 0);
}

function getDefinitionGroups(elements: Element[]): Element[] {
  return Array.from(elements.find((node) => is(node, 'OL'))?.children ?? []);
}

function buildEmptyEtymology(elements: Element[]): Etymology {
  return {
    description: getConsecutiveParagraphsAfterHeading(elements),
    nouns: [],
    verbs: [],
    adjectives: [],
    prepositions: [],
    adverbs: [],
  };
}

function parseDefinitionGroupEntry(listItem: Element): DefinitionGroup['entries'][number] {
  const examples: string[] = [];
  const dl = listItem.querySelector('dl');
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

function findPartsOfSpeech(elements: Element[], headingLevel: string): Omit<Etymology, 'description'> {
  const partsOfSpeech = [
    { partOfSpeechKey: 'Noun', key: 'nouns' as const },
    {
      partOfSpeechKey: 'Verb',
      key: 'verbs' as const,
    },
    {
      partOfSpeechKey: 'Adjective',
      key: 'adjectives' as const,
    },
    {
      partOfSpeechKey: 'Preposition',
      key: 'prepositions' as const,
    },
    {
      partOfSpeechKey: 'Adverb',
      key: 'adverbs' as const,
    },
  ];
  const etymology: Omit<Etymology, 'description'> = {
    adjectives: [],
    adverbs: [],
    nouns: [],
    prepositions: [],
    verbs: [],
  };
  partsOfSpeech.forEach(({ partOfSpeechKey, key }) => {
    const sections = getSections(elements, headingLevel, partOfSpeechKey);
    sections.forEach((section) => {
      const partOfSpeech: PartOfSpeech = {
        description: getConsecutiveParagraphsAfterHeading(section).join(' '),
        definitionGroups: [],
      };
      const definitionGroups = getDefinitionGroups(section);
      definitionGroups.forEach((definitionGroupEl) => {
        if (definitionGroupEl.querySelector('ol')) {
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

function main() {
  const wordWiki: WordWiki = {
    word,
    etymologies: [],
  };

  removeUnwantedNodes();
  const englishTextSection = getSections(definitionsContainerChildren, 'H2', 'English')[0];

  const etymologyCount = getEtymologyCount(englishTextSection);
  if (etymologyCount > 1) {
    const etymologySections = getSections(englishTextSection, 'H3', 'Etymology');
    etymologySections.forEach((etymologySection) => {
      const etymology = buildEmptyEtymology(etymologySection);
      wordWiki.etymologies.push({
        ...etymology,
        ...findPartsOfSpeech(etymologySection, 'H4'),
      });
    });
  } else {
    const etymologySections = getSections(englishTextSection, 'H3', 'Etymology');
    const etymology = buildEmptyEtymology(etymologySections[0] ?? []);
    wordWiki.etymologies.push({
      ...etymology,
      ...findPartsOfSpeech(englishTextSection, 'H3'),
    });
  }

  console.log(JSON.stringify(wordWiki, null, 2));
}

main();
