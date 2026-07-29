import React, { Suspense, lazy } from 'react'
import styled from 'styled-components'

// Динамический импорт для избежания ошибок с global в SSR
const API = lazy(() =>
  import('@stoplight/elements').then(mod => ({ default: mod.API })),
)

// Импорт CSS отдельно
import '@stoplight/elements/styles.min.css'

type Props = {
  specDocument?: object
}

const Wrapper = styled.div`
  flex: 1;
  overflow: auto;
  background: #ffffff;

  // Изоляция стилей Elements
  & .sl-elements {
    --color-primary: #6699cc;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }

  & * {
    box-sizing: border-box;
  }
`

const ErrorMessage = styled.div`
  padding: 24px;
  text-align: center;
  color: ${({ theme }) => theme.colors.panel.textMuted};
  font-size: 14px;
`

const LoadingMessage = styled.div`
  padding: 24px;
  text-align: center;
  color: ${({ theme }) => theme.colors.panel.textMuted};
  font-size: 14px;
`

export const SpecPreview = ({ specDocument }: Props) => {
  if (!specDocument) {
    return <ErrorMessage>Preview not available</ErrorMessage>
  }

  return (
    <Wrapper>
      <Suspense fallback={<LoadingMessage>Loading preview...</LoadingMessage>}>
        <API
          apiDescriptionDocument={specDocument}
          router='hash'
          layout='responsive'
        />
      </Suspense>
    </Wrapper>
  )
}
