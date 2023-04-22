export interface WordWiki {
  word: string;
  etymologies: Array<Etymology>;
}

export interface Etymology {
  description: Array<string>;
  nouns: Array<PartOfSpeech>;
  verbs: Array<PartOfSpeech>;
  adjectives: Array<PartOfSpeech>;
  prepositions: Array<PartOfSpeech>;
  adverbs: Array<PartOfSpeech>;
  letter: Array<PartOfSpeech>;
  number: Array<PartOfSpeech>;
}

export interface PartOfSpeech {
  description: string;
  definitionGroups: Array<DefinitionGroup>;
}

export interface DefinitionGroup {
  group: string | null;
  entries: Array<{
    meaning: string;
    examples: Array<string>;
  }>;
}
