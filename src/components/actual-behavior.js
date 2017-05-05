import React from 'react';
import AttachScreenshot from './attach-screenshot';

const ActualBehavior = ({actualBehavior, attachScreenshotInActualBehavior, removeAttachedImageInActualBehavior, setActualBehavior}) => {
  return (
    <div className='actual-behavior-container'>
      <h3>Actual Behavior</h3>
      <textarea placeholder='Description' onChange={setActualBehavior}/>
      <AttachScreenshot
        capturingImage={actualBehavior.capturingImage}
        image={actualBehavior.image}
        attachScreenshot={attachScreenshotInActualBehavior}
        removeAttachedImage={removeAttachedImageInActualBehavior}/>
    </div>
  );
};

ActualBehavior.propTypes = {
  actualBehavior: React.PropTypes.object.isRequired,
  attachScreenshotInActualBehavior: React.PropTypes.func.isRequired,
  removeAttachedImageInActualBehavior: React.PropTypes.func.isRequired,
  setActualBehavior: React.PropTypes.func.isRequired
};

export default ActualBehavior;
