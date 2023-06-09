export function removeUnwantedNodes(document: Document) {
  const classes = ['mw-editsection', 'HQToggle', 'maintenance-line', 'reference'];
  classes.forEach((cssClass) => {
    const nodes = document.querySelectorAll(`.${cssClass}`);
    nodes.forEach((e) => e.remove());
  });
}
