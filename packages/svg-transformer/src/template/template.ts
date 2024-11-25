import type { Config } from '@svgr/core'

export const template: Config['template'] = (variables, { tpl }) => {
  return tpl`
${variables.imports};

${variables.interfaces};

export const ${variables.componentName} = (${variables.props}) => (
${variables.jsx}
);

`
}
