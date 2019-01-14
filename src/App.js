import React, { Component } from 'react';
import './App.css';

const data = [
  {
    "urls" : ["1","2","3","1","2","3"],
    "title" : "Porn",
  },
  {
    "urls" : ["1","2","3","1","2","3"],
    "title" : "Explicit Nudity",
  },
  {
    "urls" : ["1","2","3","1","2","3"],
    "title" : "Animated Porn",
  },
  {
    "urls" : ["1","2","3","1","2","3"],
    "title" : "Gore",

  },
  {
    "urls" : ["1","2","3","1","2","3"],
    "title" : "Suggestive Nudity",
  }
]

class ImageHolder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: this.props.url,
      checked: this.props.checked
    }
    this.onHandleImageClick = this.onHandleImageClick.bind(this)
  }

  componentDidUpdate(prevProps) {
    if(prevProps.checked != this.props.checked) {
      this.setState({
        checked: !prevProps.checked
      })
    }
  }

  onHandleImageClick() {
    this.setState({
      checked: !this.state.checked,
    })
  }

  render() {
    let borderColor = this.state.checked ? '#000000' : '#FFFFFF'
    return (
      <div style={{display : 'inline'}}>
      <img onClick={this.onHandleImageClick} style={{ borderColor: borderColor , borderWidth : '5px', borderStyle: 'solid', height : 60, width : 60, marginLeft : 30, marginTop : 10}} src={this.state.url}/>
      </div>
    )
  }
}

class ImageHolderList extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      urls : this.props.urls,
      checked: this.props.checked
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.checked != this.props.checked) {
      this.setState({
        checked: !prevProps.checked
      })
    }
  }

  render() {
    console.log(this.state.checked)
    return (
      <div>
      {this.state.urls.map(url => (<ImageHolder key={url} url={url} checked={this.state.checked}></ImageHolder>))}
      </div>
    )
  }
}

class NSFWCategory extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name : this.props.name,
      urls: this.props.urls,
      checked: false,
    }
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
  } 
  handleCheckboxChange(e) {
    let checked = !this.state.checked
    this.setState({
      checked: checked
    })
    
  }

  render() {
    console.log(this.state.checked)
    return (
      <div>
        <h2>{this.state.name}</h2>
        <input type="checkbox" checked={this.state.checked} onChange={this.handleCheckboxChange}/> select all
        <ImageHolderList urls={this.state.urls || []} checked={this.state.checked}></ImageHolderList>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div style={{marginLeft : 30}}>
        {data.map(cat => (<NSFWCategory key={cat["title"]} name={cat["title"]} urls={cat["urls"]}></NSFWCategory>))}
        <div style={{marginTop: 30}}><button style={{height: 45, width: 80, background: '#546fff', color: '#ffffff', fontSize: 14}}>Upload</button></div>
      </div>
    );
  }
}

export default App;
