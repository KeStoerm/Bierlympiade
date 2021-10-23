import React, { ReactChild } from "react";

export const Stepper = ({currentStep, children, className}: {currentStep: number, children: Array<ReactChild>, className?: string }): JSX.Element => {
  return <div className={`${className} stepper w-full`}>
    <div className="step h-full">
      {React.Children.toArray(children)[currentStep]}
    </div>
  </div>
}