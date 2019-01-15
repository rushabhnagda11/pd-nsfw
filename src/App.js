import React, { Component } from 'react';
import './App.css';
import Switch from "react-switch";


export function fileNameToS3(name) {
  return (
    'https://' +
    ('https://s3-us-west-2.amazonaws.com/nanonets/' + name)
      .replace(/^https:\/\//, '')
      .replace(/\/+/g, '/')
      .replace(/\/+$/, '')
  );
}

export function generateS3UrlsFromDict(data) {
  let base_image_folder = data["image_folder"];
  let image_urls = data["image_indexes"].map(name => fileNameToS3(base_image_folder + name));
  return image_urls;
}

export function generateS3FileName(index, suffix) {
  return (index + 1) + suffix;
}

const MAX_IMAGE_INDEX_PORN = 182;
const MAX_IMAGE_INDEX_ANIMATED_PORN = 161;
const MAX_IMAGE_INDEX_EXPLICIT_NUDITY = 104;
const MAX_IMAGE_INDEX_GORE = 96;
const MAX_IMAGE_INDEX_SUGGESTIVE_NUDITY = 118;
const MAX_IMAGE_INDEX_SFW = 285;

const data = [
  {
    "image_indexes": [...Array(MAX_IMAGE_INDEX_PORN).keys()].map(num => generateS3FileName(num, "_porn.jpeg")),
    "image_folder": "uploadedfiles/nsfw_data/nsfw/porn/",
    "title" : "Porn",
    "checked": true
  },
  {
    "image_indexes": [...Array(MAX_IMAGE_INDEX_EXPLICIT_NUDITY).keys()].map(num => generateS3FileName(num, "_en.jpeg")),
    "image_folder": "uploadedfiles/nsfw_data/nsfw/explicit_nudity/",
    "title" : "Explicit Nudity",
    "checked": true
  },
  {
    "image_indexes": [...Array(MAX_IMAGE_INDEX_ANIMATED_PORN).keys()].map(num => generateS3FileName(num, "_ap.jpeg")),
    "image_folder": "uploadedfiles/nsfw_data/nsfw/animated_porn/",
    "title" : "Animated Porn",
    "checked": true
    
  },
  {
    "image_indexes": [...Array(MAX_IMAGE_INDEX_GORE).keys()].map(num => generateS3FileName(num, "_gore.jpeg")),
    "image_folder": "uploadedfiles/nsfw_data/nsfw/gore/",
    "title" : "Gore",
    "checked": true

  },
  {
    "image_indexes": [...Array(MAX_IMAGE_INDEX_SUGGESTIVE_NUDITY).keys()].map(num => generateS3FileName(num, "_sn.jpeg")),
    "image_folder": "uploadedfiles/nsfw_data/nsfw/suggestive_nudity/",
    "title" : "Suggestive Nudity",
    "checked": false
  },
  {
    "image_indexes": [...Array(MAX_IMAGE_INDEX_SFW).keys()].map(num => generateS3FileName(num, "_sfw.jpeg")),
    "image_folder": "uploadedfiles/nsfw_data/sfw/",
    "title" : "Safe for Work",
    "checked": false
  }
]

class ImageHolder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: this.props.url,
      checked: this.props.checked,
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
      url: 'https://mycyberuniverse.com/images/thumbnail/error.png',
    })
  }

  render() {
    let cssClass = this.state.checked ? 'image-holder-selected' : 'image-holder-unselected'

    return (
      <span>
        <img
          className={cssClass}
          onClick={this.onHandleImageClick}
          src={this.state.url}
          onError={this.onHandleImageError}
        />
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
        {this.state.urls.map(
          (url,i) => (<ImageHolder key={i} url={url} checked={this.state.checked}></ImageHolder>))
        }
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
        <div style={{display: 'flex', alignItems:'center'}}>

        <span style={{display:'inline-block', marginRight: 10}}>Mark all as NSFW</span>
        <Switch onChange={this.handleCheckboxChange} checked={this.state.checked} checkedIcon={false} uncheckedIcon={false} onColor='#cf4545' id="normal-switch"/>
        {/* <input style={{marginLeft:20}} type="checkbox" checked={!this.state.checked} onChange={this.handleCheckboxChange}/> Mark all as NSFW */}
        </div>
        <div style={{fontSize: 14, marginTop: 5}}><i >(toggle individual images by clicking on them)</i></div>
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
    console.log(data);
    return (
      <div style={{marginLeft : 30}}>
        {
          data.map(
            cat => (
              <NSFWCategory
                key={cat["title"]}
                checked={cat["checked"]}
                name={cat["title"]}
                urls={generateS3UrlsFromDict(cat)}
              >
              </NSFWCategory>
            )
          )
        }
      </div>
    );
  }
}

export default App;
