import React from 'react'
import styled from 'styled-components'
import { Button, Box, Row } from '../../atoms'
import { TRadioOptions } from '../../atoms/radio-input/types'
import { RadioGroup } from '../../molecules'
import { KeyValueField } from '../../molecules/key-value-field'
import { EndpointsList } from '../endpoints-list'
import {
  THeadersChangeHandler,
  TUrlHeaders,
  TUrlItem,
} from '../endpoints-list/types'
import { TConfig } from '../panel/types'

const DefaultControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`

const Text = styled.span`
  display: block;
  font-size: 14px;
  letter-spacing: 1.5px;
`

const RightControls = styled(Row)`
  justify-content: end;
  align-items: center;
`

type Props = {
  specId: string
  environments?: TRadioOptions[]
  defaultHeaders: string
  defaultEnv?: string
  config: TConfig
  urlHeaders?: TUrlHeaders
  filteredPaths?: TUrlItem[]
  urlEnvInitialValues: Record<string, string>
  onChangeDefaultHeaders: (headers: string, specId: string) => void
  resetOptions: () => void
  onChangeDefaultEnv: (envId: string | null, specId: string) => void
  setDefaultValue: (value: string) => void
  onChangeUrlEnv: (urlId: string, envId?: string) => void
  onChangeEndpointHeaders: THeadersChangeHandler
}

const RadioWrapper = styled.div`
  max-width: 100px;
`

export const SpecPanel = ({
  specId,
  environments,
  defaultHeaders,
  defaultEnv,
  config,
  urlHeaders,
  filteredPaths,
  urlEnvInitialValues,
  resetOptions,
  onChangeDefaultEnv,
  setDefaultValue,
  onChangeDefaultHeaders,
  onChangeUrlEnv,
  onChangeEndpointHeaders,
}: Props) => {
  return (
    <>
      {environments && environments.length > 0 && (
        <DefaultControls>
          <Text>Requests</Text>
          <RightControls>
            <KeyValueField
              id={specId}
              title='Global headers'
              placeholder='Enter each header on a new line. &#10;For example:&#10;Authorization: Bearer 123&#10;Prefer: code=200, dynamic=true'
              onApply={value => onChangeDefaultHeaders(value, specId)}
              initialValue={defaultHeaders}
            />
            <Box w={16} />
            <RadioWrapper>
              <RadioGroup
                id={specId}
                value={defaultEnv}
                color={'red'}
                onChange={(_, value) => {
                  onChangeDefaultEnv(value || null, specId)
                  setDefaultValue(value)
                }}
                items={[
                  ...environments,
                  {
                    label: 'Default',
                    value: '',
                  },
                ]}
              />
            </RadioWrapper>

            <Box w={16} />
            <Button active title='reset to default' onClick={resetOptions}>
              reset to default
            </Button>
          </RightControls>
        </DefaultControls>
      )}
      {urlHeaders &&
        environments &&
        filteredPaths &&
        config.urlList.length > 0 && (
          <EndpointsList
            headers={urlHeaders}
            environments={environments}
            items={filteredPaths}
            initialValues={urlEnvInitialValues}
            onBasePathChange={onChangeUrlEnv}
            onHeadersChange={(headers: string, endpointId: string) => {
              onChangeEndpointHeaders(headers, endpointId, specId)
            }}
          />
        )}
    </>
  )
}
