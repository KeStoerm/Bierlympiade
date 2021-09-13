import { ReactChild, useState } from 'react';
import { useLongPress } from 'use-long-press';

export const LongPressButton = ({callback, classNames, children}: {callback?: Function, classNames?: string, children?: ReactChild}): JSX.Element => {
  const [isHolding, setIsHolding] = useState<Boolean>(false);

  const bind = useLongPress(() => callback && callback(), {
    onStart: () => setIsHolding(true),
    onFinish: () => setIsHolding(false),
    onCancel: () => setIsHolding(false),
    threshold: 1000,
  });

  return <div {...bind} className={`longPressButton relative w-full h-20 flex items-center cursor-pointer ${classNames}`}>
    <p className="content text-center w-full">{children}</p>
    <div className="progressBar w-full h-full absolute top-0 left-0">
      <div className={`progress bg-black h-full opacity-20 ${isHolding ? 'w-full' : 'w-0'} transition-all duration-1000`}></div>
    </div>
  </div>
}
