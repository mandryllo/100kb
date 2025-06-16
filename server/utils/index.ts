const processDescription = (description: string | undefined) => {
  if (description === 'undefined') return;
  return description;
};

const addEllipsis = (text: string | undefined) => {
  if (!text) return;
  if (['?', '!', '.'].some(mark => text.endsWith(mark))) return text;
  return `${text}...`;
};

const processLink = (link: string) => {
  const url = new URL(link);
  if (['atom', 'xml'].some(it => url.pathname.endsWith(it))) return url.origin;
  return link;
};
export {
  processDescription,
  addEllipsis,
  processLink
};
