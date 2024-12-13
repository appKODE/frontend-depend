<div align="center">

### :construction: :construction: :construction: THIS PROJECT HAS AN EXPERIMENTAL STATUS, DON'T USE IT :construction: :construction: :construction:

&nbsp;

# @kode-frontend/pathfinder-web

  <a href="https://www.npmjs.com/package/@kode-frontend/pathfinder-web">
    <img alt="npm version" src="https://img.shields.io/npm/v/@kode-frontend/pathfinder-web.svg">
  </a>
  <a href="https://www.npmjs.com/package/@kode-frontend/pathfinder-web">
    <img alt="npm downloads" src="https://img.shields.io/npm/dt/@kode-frontend/pathfinder-web.svg">
  </a>
  <a href="https://github.com/appKODE/pathfinder-web/blob/main/LICENSE">
    <img alt="npm license" src="https://img.shields.io/npm/l/@kode-frontend/pathfinder-web.svg">
  </a>
  <a href="https://standardjs.com">
    <img alt="standard js" src="https://img.shields.io/badge/code_style-standard-brightgreen.svg">
  </a>
  <a href="https://reactjs.org/">
    <img alt="react version" src="https://img.shields.io/badge/react->=16-green?style=flat&logo">
  </a>
  <br>
  <a href="#">
    <img alt="status" src="https://img.shields.io/badge/status-experimental-red?style=flat&logo">
  </a>

  <p>
    <a href="#installation">Installation</a> | 
    <a href="#features">Features</a> |
    <a href="#quickstart">Quickstart</a> |
    <a href="#usage">Usage</a> |
    <a href="#example">Example</a>
  </p>
  
</div>
&nbsp;

Pathfinder is a tool that allows to substitute the base URL for requests, helping with global error handling, testing, mocking, and more. This package provides a useful UI panel for easy HTTP requests manipulations on the client side.

## Installation

```bash
npm i @kode-frontend/pathfinder-web

# or using yarn
yarn add @kode-frontend/pathfinder-web
```

Pathfinder is intended to be paired with a storage adapter and an OpenAPI resolver, which can be fully customized or installed as npm packages.

## Introduction

There are cases in which it is useful to monitor or manipulate HTTP requests, instead of letting it happen as is. Pathfinder is a tool that allows to configure the base path for an API on the client side, both for all requests and for each one separately. It provides a UI panel, which enables to interactively change the requests environment in accordance with an uploaded OpenAPI config.

Pathfinder works with the [OpenAPI 3.0 Specification](https://swagger.io/specification/), which can be exported from [Stoplight](https://stoplight.io/).

### Features:

- **Request interception:**\
   intercepts requests according to the specified environment and changes base URL.
- **Feature toggle for production:**\
   allows to enable or disable a feature through the developer tools.
- **Uploading and updating data from an OpenAPI config:**\
   updates environment lists and paths on the spot by uploading an OpenAPI config.

## Quickstart

Create a new provider component with Pathfinder. Import `storage` and `openApiResolver` from this packages or create custom ones.

> **Storage** is an object that implements Pathfinder data storage\
> **Resolver** takes OpenAPI data and converts it to the PathFinder format

```jsx
import { ReactNode } from 'react';
import {
  Pathfinder,
  openApiResolver,
  storage,
} from '@kode-frontend/pathfinder-web';

// Optional initial specifications
import spec1 from 'path/to/json';
import spec2 from 'path/to/json';

type Props = {
  children: ReactNode,
};

export const PathfinderProvider = ({ children }: Props) => {
  return (
    <Pathfinder
      dataKey={`some string`}
      storage={storage}
      resolver={openApiResolver}
      active={process.env.NODE_ENV !== 'production'}
      // Optional initial specifications
      defaultSpecs={[spec1, spec2]}
    >
      {children}
    </Pathfinder>
  );
};

// dataKey - The key witch will use for storing pathfinder data. It can use for versioning storage by with app version.
```

Import `PathfinderProvider` and render it around your whole app:

```jsx
import { PathfinderProvider } from './pathfinder'

const App = () => {
  return (
    <PathfinderProvider>
      <div>your app</div>
    </PathfinderProvider>
  )
}
```

## Usage

1. Run your project.

> During local development (`process.env.NODE_ENV !== 'production'`) you will see a button with gears in the bottom right of the screen. When clicking it the Pathfinder UI panel appears.

<!-- TODO: добавить скрин с панелью -->

2. Upload your [OpenAPI 3.0 Specification](https://swagger.io/specification/) file from [Stoplight](https://stoplight.io/).
3. Configure the base paths for all requests or only for the required ones.

## Development

### Plop.js

There is a plop.js tool to create ui-component using a template. You need to set up [extension](https://marketplace.visualstudio.com/items?itemName=SamKirkland.plop-templates) to create components quickly. After the extension installation you should follow these 2 steps:

1. Create a new folder for your ui-component;
2. Click on the `New File from Template` in the context menu.

Use it for quick component creation without mistakes.

## Example

Clone repository and install dependencies:

```bash
git clone https://github.com/appKODE/pathfinder-web

npm i

# or using yarn
yarn
```

[TSDX](https://tsdx.io/) scaffolds Pathfinder inside `/src`, and also sets up a [Parcel-based](https://parceljs.org) playground for it inside `/example`.

The recommended workflow is to run TSDX in one tab of your terminal:

```bash
npm start

# or using yarn
yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `/src` causes a rebuild to `/dist`.

Then run the example playground in another tab of your terminal:

```bash
# go to /example
cd example

# install dependencies and run create-react-app dev server
npm i && npm start

# or using yarn
yarn && yarn start
```

Now, anytime you make changes to your library in `/src` or to the example app's `/src`, `create-react-app` will live-reload your local dev server so you can iterate on your component in real-time.

## TODO

- [x] replace css modules with styled components
- [x] add storybook
- [ ] refactor components
- [ ] add usage examples
- [x] add multy specification files support

## License

[MIT ©](https://github.com/appKODE/pathfinder-web/LICENCE)

There is plop.js tool to create ui-component using a template. You need to set up to create components quickly. After an extension installing you should follow next 2 steps:

1. Create new folder for ui-component;
2. Click on `New File from Template` in context menu.

Use it for quick component creating without mistakes.
