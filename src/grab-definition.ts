// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const word = document.querySelector('#firstHeading')!.textContent;
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const definitionsContainerChildren = Array.from(document.querySelector('.mw-parser-output')!.children);

function is(node: Element, nodeName: string): boolean {
  return node.nodeName === nodeName;
}

function textContent(node: Element): string {
  return node.textContent?.trim() ?? '';
}

function removeUnwantedNodes() {
  const classes = ['mw-editsection', 'HQToggle']
  classes.forEach((cssClass) => {
    const nodes = document.querySelectorAll(`.${cssClass}`);
    nodes.forEach((e) => e.remove());
  })
}

function getSection(elements: Element[], headingNodeName: string, headingTextContent: string): Element[] {
  const headingIndices = elements
    .map((e, index) => [e.nodeName, index] as const)
    .filter(([nodeName]) => nodeName === headingNodeName)
    .map(([, index]) => index);
  const headingElements = headingIndices.map((index) => elements[index]);
  const headingIndexStart =
    headingIndices[headingElements.findIndex((node) => textContent(node) === headingTextContent)];
  const headingIndexEnd =
    headingIndices[headingElements.findIndex((node) => textContent(node) === headingTextContent) + 1];
  if (!headingIndexStart) return [];
  return elements.slice(headingIndexStart, Number.isNaN(headingIndexEnd) ? -1 : headingIndexEnd);
}

function getEnglishTextSection() {
  return getSection(definitionsContainerChildren, 'H2', 'English');
}

function iterateOverSubsections(sections: Element[], heading: string) {
  const subsectionTitles = ['Verb', 'Adjective', 'Noun', 'Adverb', 'Preposition'];
  subsectionTitles.forEach((subsectionTitle) => {
    const subsection = getSection(sections, heading, subsectionTitle);
    if (subsection.length === 0) return;
    console.log(subsectionTitle, subsection);
    // TODO: determine children heading would be h4 or h5 based on parent heading (h3 or h4)
    // eg: Derived terms, Hypernyms
  });
}

function main() {
  removeUnwantedNodes();
  const englishTextSection = getEnglishTextSection();

  englishTextSection.forEach((node) => {
    if (!is(node, 'H3')) return;
    if (!textContent(node).startsWith('Etymology ')) return;
    iterateOverSubsections(englishTextSection, 'H4');
  });

  iterateOverSubsections(englishTextSection, 'H3');
}

main();
