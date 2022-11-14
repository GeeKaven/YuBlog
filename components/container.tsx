type Props = {
  children?: React.ReactNode
}

const Container = ({ children }: Props) => {
  return <div className="mx-auto max-w-3xl px-4 sm:px-6">{children}</div>
}

export default Container
