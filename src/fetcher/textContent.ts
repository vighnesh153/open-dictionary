export function textContent(node: Element): string {
  return node.textContent?.trim() ?? '';
}
