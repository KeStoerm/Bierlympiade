import "./input.scss";

export const Input = ({value, onChange, placeholder}: {value: string, onChange: (value: string) => void, placeholder: string}): JSX.Element => {
  return <input value={value} placeholder={placeholder} onChange={event => onChange(event.target.value)}
    className="w-full placeholder-accent input bg-none bg-transparent focus:ring-0 p-2 border-solid border-b-2 border-accent caret-accent text-accent"/>
}