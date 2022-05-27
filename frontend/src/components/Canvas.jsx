import * as React from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';

const styles = {
  border: '0.0625rem solid #9c9c9c',
  borderRadius: '0.25rem',
};

const Canvas = class extends React.Component {
  constructor(props) {
    super(props);

    this.canvas = React.createRef();
  }


  handleSubmit (image) {
    const submission = {
      "image": image,
      "user": this.props.user,
    }

    fetch("http://localhost:8000/image", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(submission)
    }).catch(e => console.log("Failed to submit image!" + e))
  }

  render() {
    return (
      <div>
        <ReactSketchCanvas
          ref={this.canvas}
          style={styles}
          width="600"
          height="600"
          strokeWidth={4}
          strokeColor="black"
        />
        <button
          onClick={() => {
            this.canvas.current
              .exportImage("png")
              .then(data => {
                this.handleSubmit(data);
              })
              .catch(e => {
                console.log("Failed to submit image!");
              });
          }}
        >
        Submit Image
        </button>
      </div>
    );
  }
}

export default Canvas;