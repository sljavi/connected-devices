import React, {Component} from 'react';

const AttachScreenshotButton = ({attachScreenshot}) => {
  return (<button type='button' onClick={attachScreenshot}>Attach Screenshot</button>);
};
AttachScreenshotButton.propTypes = {
  attachScreenshot: React.PropTypes.func.isRequired
};


class AttachScreenshot extends Component {
  static propTypes = {
    capturingImage: React.PropTypes.bool,
    image: React.PropTypes.string,
    attachScreenshot: React.PropTypes.func.isRequired,
    removeAttachedImage: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.showImage = this.showImage.bind(this);
    this.hideImage = this.hideImage.bind(this);
  }

  showImage() {
    this.setState({
      showImage: true
    });
  }

  hideImage() {
    this.setState({
      showImage: false
    });
  }

  render() {
    if (this.props.capturingImage) {
      return (<span>Capturing Image...</span>);
    }
    if (this.props.image) {
      return (
        <div>
          <div className='attach-image-container'>
            <button type='button' onClick={this.props.removeAttachedImage}>x</button>
            <img src={this.props.image} onClick={this.showImage}/>
          </div>
          {this.state.showImage ?
            <div className='attach-image-modal'>
              <button type='button' onClick={this.hideImage}>x</button>
              <img src={this.props.image} onClick={this.hideImage}/>
            </div> : null
          }
        </div>
      );
    }
    return (<AttachScreenshotButton attachScreenshot={this.props.attachScreenshot}/>);
  }
}

export default AttachScreenshot;
