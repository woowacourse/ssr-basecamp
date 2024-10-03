export const renderTabs = (template, currentPath) => {
  template = template.replace(
    new RegExp(
      `<a\\s+href="${currentPath}"[^>]*><div\\s+class="tab-item">`,
      'g'
    ),
    `<a href="${currentPath}"><div class="tab-item selected">`
  );

  return template;
};
