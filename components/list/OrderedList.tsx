import ListProvider from './ListProvider'

const OrderedList = (props: JSX.IntrinsicElements['ol']) => {
  const { ...rest } = props

  return (
    <ListProvider type='ol'>
      <ol {...rest} className='my-6'></ol>
    </ListProvider>
  )
}

export default OrderedList
