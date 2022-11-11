import classNames from 'classnames'
import ListProvider from './ListProvider'

const UnorderedList = (props: JSX.IntrinsicElements['ul']) => {
  const { className = '', ...rest } = props
  const isTaskList = className.includes('contains-task-list')

  return (
    <ListProvider type={isTaskList ? 'tl' : 'ul'}>
      <ul {...rest} className={classNames(className, 'my-6')}></ul>
    </ListProvider>
  )
}

export default UnorderedList
