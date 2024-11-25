import { transform, type Config } from '@svgr/core'
import Case from 'case'
import fs from 'fs-extra'
import path from 'path'

const SVGR_OPTIONS: Config = {
  plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
  prettier: true,
  svgo: true,
  svgoConfig: {
    plugins: ['preset-default'],
  },
  typescript: true,
}

/**
 * Optimizes and transforms SVG to React or React Native components
 * @param svgData - The raw SVG data.
 * @param config - Configuration settings for SVGO and SVGR.
 * @param isReactNative - Flag to determine if the output is for React Native.
 * @param componentName - The component name to be used in the generated file.
 * @returns The transformed React component as a string.
 */
async function transformSVG(
  svgData: string,
  config: any,
  platform: 'react' | 'react-native',
  componentName: string,
): Promise<string> {
  return await transform(
    svgData,
    {
      ...SVGR_OPTIONS,
      native: platform === 'react-native',
      template: config.template,
    },
    { componentName },
  )
}

type ProcessSVGsParams = {
  inputPath: string
  outputPath: string
  config: any
  platform: 'react' | 'react-native'
}

/**
 * Processes all SVG files in the provided folder, optimizes and transforms them into React components.
 * @param inputPath - Path to the folder containing SVG files.
 * @param outputPath - Path to the folder where the generated components will be saved.
 * @param config - Configuration options for SVGO and SVGR.
 * @param isReactNative - Flag to specify if the components should be React Native-compatible.
 */
export async function processSVGs({
  inputPath,
  outputPath,
  config,
  platform,
}: ProcessSVGsParams) {
  try {
    const files = await fs.readdir(inputPath)
    const svgFiles = files.filter(file => file.endsWith('.svg'))

    await Promise.all(
      svgFiles.map(async file => {
        const svgPath = path.join(inputPath, file)
        const svgData = await fs.readFile(svgPath, 'utf8')
        const componentName = Case.pascal(file.replace(/\.svg$/, ''))

        const componentCode = await transformSVG(
          svgData,
          config,
          platform,
          componentName,
        )
        const outputFilePath = path.join(
          outputPath,
          `${file.replace('.svg', '.tsx')}`,
        )

        await fs.outputFile(outputFilePath, componentCode)
      }),
    )
  } catch (error) {
    console.error('Error processing SVG files:', error)
  }
}
