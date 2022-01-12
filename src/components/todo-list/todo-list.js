import React from 'react'
import TodoListItem from '../todo-list-item'
import './todo-list.css'

//получаем из app пропсы { todos, onDeleted}
const TodoList = ({ todos, onDeleted, onToggleImportant, onToggleDone}) => {

  const elements = todos.map((item) => {
    //мы извлекаем отдельно идентификатор,потому что нам не нужно передавать его в TodoListItem
    const { id, ...itemProps } = item
    //{...item} спред оператор чтобы передать все свойства (label и important) объекта todos компоненту TodoListItem для  каждого элемента массива
    return (
      //когда возникает ошибка 'Warning...' , это значит что реакт хочет чтоы у дочерних элеентов был свой уникальный ключ. поэтому добавляем ключ с id для каждого li
      <li key={item.id} className="list-group-item">
        <TodoListItem
          {...itemProps}
          //при нажатии на кнопку удаление этого элемента по айди
          onDeleted={() => onDeleted(id)}
          onToggleImportant={() => onToggleImportant(id)}
          onToggleDone={() => onToggleDone(id)}
        />
      </li>
    )
  })

  return (
    <ul className='list-group todo-list'>
     {elements}
    </ul>
  )
}

export default TodoList
