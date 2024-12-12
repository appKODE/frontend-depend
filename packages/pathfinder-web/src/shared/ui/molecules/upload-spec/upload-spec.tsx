import React, { ChangeEvent } from 'react'
import styled from 'styled-components'

type Props = {
  onLoad: (data: any) => void
}

const Text = styled.span`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  text-transform: uppercase;
  white-space: nowrap;
`

const Wrapper = styled.label`
  position: relative;
  display: inline-block;
  margin: 8px;
  padding: 12px 14px;
  padding-left: 18px;
  transition: 0.3s ease;
  user-select: none;
  cursor: pointer;
`

const HiddenInput = styled.input`
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
`

export const UploadSpec = ({ onLoad }: Props) => {
  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const blob = event.target.files
    if (blob) {
      const files = Array.from(blob).map(file => {
        const reader = new FileReader()
        return new Promise<string | ArrayBuffer | null>(resolve => {
          // Resolve the promise after reading file
          reader.onload = () => resolve(reader.result)

          // Read the file as a text
          reader.readAsText(file)
        })
      })
      const res = await Promise.all(files)
      const jsons: object[] = res.map(file =>
        JSON.parse(typeof file === 'string' ? file : ''),
      )
      onLoad(jsons)
    }
  }
  // const handleReaderLoad = (event: ProgressEvent<FileReader>) => {
  //   if (event.target && typeof event.target.result === 'string') {
  //     const json = JSON.parse(event.target.result);

  //     onLoad(json);
  //   }
  // };

  return (
    <Wrapper htmlFor='upload-spec'>
      <Text>+</Text>
      <HiddenInput
        id='upload-spec'
        type='file'
        multiple
        accept='application/json'
        onChange={handleChange}
      />
    </Wrapper>
  )
}
