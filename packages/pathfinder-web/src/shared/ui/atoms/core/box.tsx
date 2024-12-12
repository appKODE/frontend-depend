import styled from 'styled-components'

type Props = {
  h?: number
  w?: number
  m?: number
  mt?: number
  mr?: number
  mb?: number
  ml?: number
  p?: number
  pt?: number
  pr?: number
  pb?: number
  pl?: number
}

const rulesByPropsDic: Record<keyof Props, string> = {
  h: 'height',
  w: 'width',
  m: 'margin',
  mb: 'margin-bottom',
  ml: 'margin-left',
  mr: 'margin-right',
  mt: 'margin-top',
  p: 'padding',
  pb: 'padding-bottom',
  pl: 'padding-left',
  pr: 'padding-right',
  pt: 'padding-top',
}

export const Box = styled.div<Props>`
  ${({ theme, ...props }) => {
    const res: string[] = []
    for (const p in props) {
      const rule = rulesByPropsDic[p as keyof Props]
      const value = props[p as keyof Props]

      if (!rule || !value) {
        continue
      }

      if (Object.prototype.hasOwnProperty.call(props, p)) {
        res.push(`${rule}:${value}px`)
      }
    }
    return res.join(';')
  }}
`
