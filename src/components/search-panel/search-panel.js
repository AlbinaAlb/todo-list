import React, { Component } from 'react'
import './search-panel.css'

export default class SearchPanel extends Component {
  state = {
    term: ''
  }

onSearchChange =(e) =>{
  //получили текущ значение инпута
  const term = e.target.value
  //обновляем состояние добавляя текст из инпута
  this.setState({ term })
  //передаем в пропсы onSearchChange полученное значение
  this.props.onSearchChange(term)
}

  render() {
    return (
      <input type="text"
        className="form-control search-input"
        placeholder="type to search" 
        //делаем контролируемым
        value={this.state.term}
        //при каждом нажатии кнопки в инпуте
        onChange={this.onSearchChange}
        />
    )
  }
}
