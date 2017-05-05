import React from 'react';
import AttachScreenshot from './attach-screenshot';

const ExpectedBehavior = ({expectedBehavior, attachScreenshotInExpectedBehavior, removeAttachedImageInExpectedBehavior, setExpectedBehavior}) => {
  return (
    <div className='expected-behavior-container'>
      <h3>Expected Behavior</h3>
      <textarea placeholder='Description' onChange={setExpectedBehavior}/>
      <AttachScreenshot
        capturingImage={expectedBehavior.capturingImage}
        image={expectedBehavior.image}
        attachScreenshot={attachScreenshotInExpectedBehavior}
        removeAttachedImage={removeAttachedImageInExpectedBehavior}/>
    </div>
  );
};

ExpectedBehavior.propTypes = {
  expectedBehavior: React.PropTypes.object.isRequired,
  attachScreenshotInExpectedBehavior: React.PropTypes.func.isRequired,
  removeAttachedImageInExpectedBehavior: React.PropTypes.func.isRequired,
  setExpectedBehavior: React.PropTypes.func.isRequired
};

export default ExpectedBehavior;
