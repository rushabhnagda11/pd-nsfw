import React, { Component } from 'react';
import './App.css';

const data = [
  {
    "urls" : ["blob:http://localhost:3000/1e0619a6-2d12-456e-a63a-a4a13abd810c","2","3","1","2","3","1","2","3","1","2","3","1","2","3","1","2","3","1","2","3","1","2","3","1","2","3","1","2","3","1","2","3","1","2","3","1","2","3","1","2","3","1","2","3","1","2","3"],
    "title" : "Porn",
    "checked": true
  },
  {
    "urls" : ["1","2","3","1","2","3"],
    "title" : "Explicit Nudity",
    "checked": true
  },
  {
    "urls" : ["1","2","3","1","2","3"],
    "title" : "Animated Porn",
    "checked": true
    
  },
  {
    "urls" : ["1","2","3","1","2","3"],
    "title" : "Gore",
    "checked": false

  },
  {
    "urls" : ["1","2","3","1","2","3"],
    "title" : "Suggestive Nudity",
    "checked": false
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
        <img className={cssClass} onClick={this.onHandleImageClick} src={this.state.url} onError={this.onHandleImageError}/>
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
    if(this.props.urls.length > prevProps.urls.length) {
      this.setState({
        urls : this.props.urls
      })
      setTimeout(() => {this.el.scrollTo(0,10000)},200)
    }
  }

  render() {
    return (
      <div ref={el => {this.el = el}} style={{ borderStyle:'solid', borderColor:'#d3d3d3', maxWidth: 800, maxHeight:300, overflowY:'auto', overflowX:'auto', marginTop: 20}}>
      {this.state.urls.map((url,i) => (<ImageHolder key={i} url={url} checked={this.state.checked}></ImageHolder>))}
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
      checked: this.props.checked,
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
    let urls2 = this.state.urls.concat([])
    urls2.push(URL.createObjectURL(e.target.files[0]))
    this.setState({
      urls: urls2
    })
  }

  render() {
    return (
      <div>
        <h2>{this.state.name}</h2>
        <div>
          <input type="checkbox" checked={this.state.checked} onChange={this.handleCheckboxChange}/> Mark all as NSFW
          <input style={{marginLeft:20}} type="checkbox" checked={!this.state.checked} onChange={this.handleCheckboxChange}/> Mark all as SFW
        </div>
        <div>
          <ImageHolderList urls={this.state.urls || []} checked={this.state.checked}></ImageHolderList>

          <div className="upload-btn-wrapper">
            <button className="btn">Upload your own image</button>
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
        {data.map(cat => (<NSFWCategory key={cat["title"]} checked={cat["checked"]} name={cat["title"]} urls={cat["urls"]}></NSFWCategory>))}
      </div>
    );
  }
}

export default App;
