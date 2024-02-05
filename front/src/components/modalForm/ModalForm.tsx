import Modal from '../modal/modal'
import Form from '../form/form'
import { useState } from 'react'
import User from '../../Interfaces/User'

interface IModalForm {
    isOpen: boolean,
    user?: User,
    setIsOpen: (arg: boolean) => void
    editUser: (arg: User | undefined) => void,
    clickSave : (arg: User) => void
}

const ModalForm = (props: IModalForm) => {

    const closeModal = () => {
        props.editUser(undefined)
        props.setIsOpen(false)
    }

    if(props.isOpen){
        return (
            <Modal clickClose={closeModal} >
                <Form clickSave={props.clickSave} user={props.user} clickCancel={closeModal}>

                </Form>
            </Modal>
        )
    }

    return null
}

export default ModalForm