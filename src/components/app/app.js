import React, { Component } from 'react'

import AppHeader from '../app-header'
import SearchPanel from '../search-panel'
import TodoList from '../todo-list'
import ItemStatusFilter from '../item-status-filter'
import ItemAddForm from '../item-add-form'
import './app.css'

export default class App extends Component {
  maxId = 100

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch'),
    ],
    //то что находится в term внутри состояния, будет сортироваться
    term: '',
    filter: 'active', //active, all, done
  }

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++,
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      //создаем новый массив без фрагмента которого не должно быть в нем и не изменяя старый массив
      //копируем часть от начала массива до индекса, который нужно удалить и от индекса, который нужно удалить до конца массива
      const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]

      return {
        todoData: newArr,
      }
    })
  }

  //сформировать объект как элемент массива
  addItem = (text) => {
    const newItem = this.createTodoItem(text)
    //добавить элемент в массив
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem]

      return {
        todoData: newArr,
      }
    })
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id)
    const oldItem = arr[idx]
    //получаем новый элемент, такой же как старый только с противоположным значением done
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }

    //сконструировать новый массив c новым элементом
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done'),
      }
    })
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important'),
      }
    })
  }

  onSearchChange = (term) => {
    this.setState({ term })
  }

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  //ф-я для показа только тех задач, которые введены в поиск
  search(items, term) {
    if (term.length === 0) {
      return items
    }
    //отфильтровать массив и создать новый
    return items.filter((item) => {
      //покажет label -  видимый текст на экране, который содержит строку term
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
    })
  }

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items
      case 'active':
        return items.filter((item) => !item.done)
      case 'done':
        return items.filter((item) => item.done)
      default:
        return items
    }
  }

  render() {
    const { todoData, term, filter } = this.state

    const visibleItems = this.filter(this.search(todoData, term), filter)

    //filter создает новый массив и сохраняет только те знаяения,в которых done - true, и вычисляет их длину
    const doneCount = todoData.filter((el) => el.done).length
    const todoCount = todoData.length - doneCount

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />

        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    )
  }
}
