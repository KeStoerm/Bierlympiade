import { ReactChild } from "react"

export const Modal = ({children}: {children: ReactChild | ReactChild[]}): JSX.Element => {
  return <div className="modalBg bg-secondary bg-opacity-70 fixed top-0 left-0 w-screen h-screen py-4 flex items-center justify-center z-50">
    <div className="modalInner bg-secondary p-4 w-full md:w-1/2">
      {children}
    </div>
  </div>
}