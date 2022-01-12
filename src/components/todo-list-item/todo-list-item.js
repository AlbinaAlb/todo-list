import React, { Component } from 'react'
import './todo-list-item.css'

export default class TodoListItem extends Component {
  /*  //состояние свойств done-зачеркнуть, important-жирный шрифт
  state = {
    done: false,
    important: false,
  }

   //функция при клике на текст,он зачеркивается
  onLabelClick = () => {
    this.setState(({ done }) => {
      //меняем на противоположное значение состояние
      return { done: !done }
    })
  }

  //функция для маркировки важных задач
  onMarkImportant = () => {
    //чтоб переключать состояние делаем ф-ю с аргументом который меняется и возвращаем свойство important с значнием в котором состояние не отмечено
    this.setState(({ important }) => {
      return {
        //меняем на противоположное значение состояние
        important: !important,
      }
    })
  } */

  render() {
    //достать из props
    const {
      label,
      onDeleted,
      onToggleImportant,
      onToggleDone,
      important,
      done,
    } = this.props

    let classNames = 'todo-list-item'
    if (done) {
      classNames += ' done'
    }

    if (important) {
      classNames += ' important'
    }

    return (
      <span className={classNames}>
        <span className="todo-list-item-label" onClick={onToggleDone}>
          {label}
        </span>

        <div>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm float-right"
            onClick={onDeleted}
          >
            <i className="fa fa-trash-o" />
          </button>
          <button
            type="button"
            className="btn btn-outline-success btn-sm float-right"
            onClick={onToggleImportant}
          >
            <i className="fa fa-exclamation" />
          </button>
        </div>
      </span>
    )
  }
}
