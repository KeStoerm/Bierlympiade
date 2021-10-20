import React, { ReactChild } from "react";

export const Stepper = ({currentStep, children}: {currentStep: number, children: Array<ReactChild> }): JSX.Element => {
  return <div className="stepper w-full">
    <div className="step">
      {React.Children.toArray(children)[currentStep]}
    </div>
  </div>
}