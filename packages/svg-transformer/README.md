# @kode-frontend/svg-transformer 🚀

Easily convert SVGs into optimized React or React Native components with this CLI.

## 🌟 Why Use This?

With `@kode-frontend/svg-transformer`, you can:

- **Automatically optimize** icons for enhanced performance.
- **Create components effortlessly** for React or React Native.

## 🛠 Usage

Whether you want a quick one-off run or plan to integrate it into your project, `@kode-frontend/svg-transformer` has you covered.

### 📋 Without Installation

Run the CLI directly without installing it globally:

```bash
# Using npx
npx @kode-frontend/svg-transformer -i ./icons -o ./output -p react

# Using pnpm exec
pnpm exec @kode-frontend/svg-transformer -i ./icons -o ./output -p react

# Using yarn dlx
yarn dlx @kode-frontend/svg-transformer -i ./icons -o ./output -p react
```

### 🌍 Global Installation

Install globally to use the CLI anywhere:

```bash
# npm
npm install -g @kode-frontend/svg-transformer

# pnpm
pnpm add -g @kode-frontend/svg-transformer

# yarn
yarn global add @kode-frontend/svg-transformer
```

Run it globally:

```bash
@kode-frontend/svg-transformer -i ./icons -o ./output -p react
```

### 📦 Local Installation

Install as a development dependency in your project:

```bash
# npm
npm install --save-dev @kode-frontend/svg-transformer

# yarn
yarn add --dev @kode-frontend/svg-transformer

# pnpm
pnpm add -D @kode-frontend/svg-transformer
```

Run the CLI via npm scripts or a direct command:

```bash
# npm script
npm run @kode-frontend/svg-transformer -- -i ./icons -o ./output -p react

# yarn
yarn @kode-frontend/svg-transformer -i ./icons -o ./output -p react

# pnpm
pnpm @kode-frontend/svg-transformer -i ./icons -o ./output -p react
```

### ⚙️ Options

| Option        | Description                                           | Default  |
| ------------- | ----------------------------------------------------- | -------- |
| --input       | Input folder containing SVG files                     | ./icons  |
| --output      | **Output folder** to save React components            | ./output |
| --platform    | Target platform: **react** or **react-native**        | react    |
| --interactive | Run in interactive mode to configure options manually | false    |

### 🖐 Interactive Mode

Use interactive mode for guided configuration:

```bash
npx @kode-frontend/svg-transformer --interactive
```
