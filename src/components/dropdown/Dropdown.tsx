import { map } from "lodash";
import { useState } from "react"
import { CSSTransition } from "react-transition-group";
import "./dropDown.scss";

export interface DropdownElement<T>{
  name: string | JSX.Element;
  item: T;
}

export const Dropdown = <T extends any>({ elements, currentElement, placeholder, onChange }: {elements: Array<DropdownElement<T>>, currentElement?: DropdownElement<T>, placeholder: string, onChange: (element: T) => void }): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);

  return <div className="text-accent relative dropdown cursor-pointer w-full flex">
    <div onClick={() => setOpen(!open)} className="border-solid border-b-2 border-accent p-2 mb-2 flex justify-between w-full">
      <span className="w-full">{currentElement?.name || placeholder}</span>
      <i className="fas fa-chevron-down p-2 self-center"></i>
    </div>
    <CSSTransition in={open} timeout={200} classNames="get-in">
      <div className={`bg-accent content p-2 absolute text-secondary w-full shadow-lg overflow-y-scroll`}>
        {map(elements, element => <div onClick={() => {setOpen(false); onChange(element.item)}} className="element hover:bg-gray-900 hover:bg-opacity-5 py-2">{element.name}</div>)}  
      </div>
    </CSSTransition>
  </div>
}
