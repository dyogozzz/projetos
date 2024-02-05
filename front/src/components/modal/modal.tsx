import './modal.css'

interface IModal {
  children: any,
  clickClose: () => void
}

const Modal = (props: IModal) => {

  return (
    <div className="modal">
      <div className="popup-inner">
        <div className='modal-content'>
          {props.children}
          <button onClick={props.clickClose} className="popup-close">X</button>
        </div>
      </div>
    </div>
  )
}

export default Modal