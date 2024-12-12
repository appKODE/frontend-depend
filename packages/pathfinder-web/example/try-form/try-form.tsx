import * as React from 'react'
import { useState } from 'react'

export const TryForm = () => {
  const [value, setValue] = useState(
    'http://127.0.0.1:3100/bo/backoffice/api/v1/customers/search/2323-22?page=22&pageSize=2',
  )

  const [result, setResult] = useState('')

  const onSubmitFetchHandler = async () => {
    const data = await fetch(value, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        Authorization: 'Bearer 12322',
      },
    })

    const json = await data.json()

    setResult(json)
  }

  const onSubmitXMLHttpRequestHandler = async () => {
    function reqListener() {
      try {
        setResult(JSON.parse(this.responseText))
      } catch (e) {
        console.error(onSubmitXMLHttpRequestHandler, e)
      }
    }

    var oReq = new XMLHttpRequest()
    oReq.onload = reqListener
    oReq.open('get', value, true)
    oReq.send()
  }

  return (
    <>
      <input
        type='text'
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button onClick={onSubmitFetchHandler}>Submit Fetch</button>

      <button onClick={onSubmitXMLHttpRequestHandler}>
        Submit XMLHttpRequest
      </button>

      <pre>{JSON.stringify(result, null, '\t')}</pre>
    </>
  )
}
