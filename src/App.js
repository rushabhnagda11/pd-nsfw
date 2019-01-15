import React, { Component } from 'react';
import './App.css';

const data = [
  {
    "urls" : ["blob:http://localhost:3000/1e0619a6-2d12-456e-a63a-a4a13abd810c","2","3","1","2","3"],
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
    this.onHandleImageError = this.onHandleImageError.bind(this)
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

  onHandleImageError() {
    this.setState({
      url: 'https://mycyberuniverse.com/images/thumbnail/error.png'
    })
  }

  render() {
    let cssClass = this.state.checked ? 'image-holder-selected' : 'image-holder-unselected'
    return (
      <span>
        <img class={cssClass} onClick={this.onHandleImageClick} src={this.state.url} onError={this.onHandleImageError}/>
      </span>
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
    return (
      <div style={{display: "inline"}}>
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
    this.handleFileUpload = this.handleFileUpload.bind(this)
  } 
  handleCheckboxChange(e) {
    let checked = !this.state.checked
    this.setState({
      checked: checked
    })
    
  }

  handleFileUpload(e) {
    let urls = this.state.urls
    urls.push(URL.createObjectURL(e.target.files[0]))
    this.setState({
      urls: urls
    })
  }

  render() {
    return (
      <div>
        <h2>{this.state.name}</h2>
        <div>
          <input type="checkbox" checked={this.state.checked} onChange={this.handleCheckboxChange}/> select all
        </div>
        <div>
          <ImageHolderList urls={this.state.urls || []} checked={this.state.checked}></ImageHolderList>

          <div class="upload-btn-wrapper">
            <button class="btn">Upload</button>
            <input type="file" name="myfile" onChange={this.handleFileUpload}/>
          </div>
        </div>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div style={{marginLeft : 30}}>
        {data.map(cat => (<NSFWCategory key={cat["title"]} name={cat["title"]} urls={cat["urls"]}></NSFWCategory>))}
      </div>
    );
  }
}

export default App;
