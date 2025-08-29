type DocSwitchProps = {
    toggle: boolean;
    handleToggle: () => void;
}

const DocSwitch = ({toggle, handleToggle}: DocSwitchProps) => {
  return (
    <div className="bg-light-fg dark:bg-dark-fg w-18 h-6 rounded-lg flex text-light-t dark:text-dark-t font-semibold border-2 border-light-bd dark:border-dark-bd">

        <div className={`flex items-center justify-center flex-1 rounded-lg cursor-pointer ${toggle ? "bg-primary text-dark-t" : ""}`} onClick={() => handleToggle()}>
           CV
        </div>
       <div className={`flex items-center justify-center flex-1 rounded-lg  cursor-pointer ${!toggle ? "bg-primary text-dark-t" : ""}`} onClick={() => handleToggle()}>
           CL
        </div>
    </div>
  )
}

export default DocSwitch