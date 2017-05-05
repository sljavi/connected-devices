import React from 'react';
import AttachScreenshot from './attach-screenshot';

const StepToReproduce = ({step, index, removeStepToReproduce, onChangeStepToReproduce, attachScreenshotInStep, removeAttachedImageInStep}) => {
  return (
    <div className='step-to-reproduce'>
      <span>{index + 1}.</span>
      <div>
        <textarea placeholder='Description' onChange={onChangeStepToReproduce} data-index={index}/>
        <AttachScreenshot
          capturingImage={step.capturingImage}
          image={step.image}
          attachScreenshot={() => attachScreenshotInStep(index)}
          removeAttachedImage={() => removeAttachedImageInStep(index)}
        />
      </div>
      <button type='button' className='remove-step-to-reproduce' onClick={() => removeStepToReproduce(index)}>x</button>
    </div>
  );
};
StepToReproduce.propTypes = {
  step: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired,
  removeStepToReproduce: React.PropTypes.func.isRequired,
  onChangeStepToReproduce: React.PropTypes.func.isRequired,
  attachScreenshotInStep: React.PropTypes.func.isRequired,
  removeAttachedImageInStep: React.PropTypes.func.isRequired
};

export const AddStepToReproduceButton = ({addStepToReproduce}) => {
  return (<button type='button' onClick={addStepToReproduce}>Add step to reproduce</button>);
};
AddStepToReproduceButton.propTypes = {
  addStepToReproduce: React.PropTypes.func.isRequired
};

const StepsToReproduce = ({steps, addStepToReproduce, removeStepToReproduce, onChangeStepToReproduce, attachScreenshotInStep, removeAttachedImageInStep}) => {
  return (
    <div className='steps-to-reproduce'>
      <h3>Steps to Reproduce</h3>
      <div>
        {steps.map((step, index) => <StepToReproduce key={step.time} index={index} step={step} removeStepToReproduce={removeStepToReproduce} onChangeStepToReproduce={onChangeStepToReproduce} attachScreenshotInStep={attachScreenshotInStep} removeAttachedImageInStep={removeAttachedImageInStep}/>)}
      </div>
      <AddStepToReproduceButton addStepToReproduce={addStepToReproduce}/>
    </div>
  );
};
StepsToReproduce.propTypes = {
  steps: React.PropTypes.array.isRequired,
  addStepToReproduce: React.PropTypes.func.isRequired,
  removeStepToReproduce: React.PropTypes.func.isRequired,
  onChangeStepToReproduce: React.PropTypes.func.isRequired,
  attachScreenshotInStep: React.PropTypes.func.isRequired,
  removeAttachedImageInStep: React.PropTypes.func.isRequired
};

export default StepsToReproduce;
