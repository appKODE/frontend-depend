export {}

declare global {
  interface Window {
    setPathfinderActive: (val: boolean) => void
  }
}

declare module 'react' {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: ForwardedRef<T>) => ReactElement | null,
  ): (props: P & RefAttributes<T>) => ReactElement | null

  function memo<P>(
    Component: (
      props: PropsWithChildren<P>,
      context?: any,
    ) => ReactElement | null,
    propsAreEqual?: (
      prevProps: Readonly<PropsWithChildren<P>>,
      nextProps: Readonly<PropsWithChildren<P>>,
    ) => boolean,
  ): (props: PropsWithChildren<P>, context?: any) => ReactElement | null
}
