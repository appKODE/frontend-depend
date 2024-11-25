import { Command, Option } from 'commander'
import inquirer from 'inquirer'
import { processSVGs } from './process-svgs'
import { template } from './template'

async function getConfig(program: Command) {
  const inputPath = program.getOptionValue('input') as string
  const outputPath = program.getOptionValue('output') as string
  const platform = program.getOptionValue('platform') as string
  const interactive = program.getOptionValue('interactive') as boolean

  if (interactive) {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'inputPath',
        message: 'Enter the input folder path (containing SVG files):',
        default: inputPath,
      },
      {
        type: 'input',
        name: 'outputPath',
        message:
          'Enter the output folder path (where the React components will be saved):',
        default: outputPath,
      },
      {
        type: 'list',
        name: 'platform',
        message: 'Choose a platform for the components:',
        choices: ['react', 'react-native'],
        default: platform,
      },
    ])

    return {
      inputPath: answers.inputPath,
      outputPath: answers.outputPath,
      platform: answers.platform,
      template,
    }
  }

  return {
    inputPath,
    outputPath,
    platform,
    template,
  }
}

async function main() {
  const program = new Command()

  program
    .name('@kode-frontend/svg-transformer')
    // .version("0.0.1") TODO: add version
    .description('CLI to convert SVGs to React/React Native components')
    .option(
      '-i, --input <path>',
      'Input folder containing SVG files',
      './icons',
    )
    .option('--interactive', 'Interactive mode for configuring the CLI', false)
    .option(
      '-o, --output <path>',
      'Output folder to save React components',
      './output',
    )
    .addOption(
      new Option(
        '-p, --platform <platform>',
        'Platform for the components (react or react-native)',
      )
        .choices(['react', 'react-native'])
        .default('react'),
    )
    .parse(process.argv)

  try {
    const config = await getConfig(program)

    await processSVGs({
      inputPath: config.inputPath,
      outputPath: config.outputPath,
      config: config,
      platform: config.platform as 'react' | 'react-native',
    })
    console.log(`\n🎉 SVG processing complete! See – ${config.outputPath}\n`)
  } catch (error) {
    console.error('Error processing SVG files:', error)
  }
}

main()
