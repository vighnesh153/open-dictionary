const whitespaces = [' ', '\t', '\n'];

export function hasWhiteSpace(s: string): boolean {
  return whitespaces.some((whitespace) => s.includes(whitespace));
}
