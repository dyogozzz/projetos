import './form.css'
import User from '../../Interfaces/User'
import { useState } from 'react'

interface IForm {
    user?: User,
    clickCancel?: ()=> void,
    clickSave: (arg: User) => void,
    children?: any
}

const Form = (props: IForm) => {
    const user = props.user || {
        name: '',
        phone: '',
        email: ''
    }

    const id = user.id
    const [email, setEmail] = useState(user.email)
    const [phone, setPhone] = useState(user.phone)
    const [name, setName] = useState(user.name)
    
    return (
        <>
            <div className="title">
                <h1>Cadastro de usuário</h1>
            </div>
            <div className='form'>
                <div className='campo'>
                    <label htmlFor="email">Email</label>
                    <input type="text" name='email' value={email} onInput={(e: any) => setEmail(e.target.value)} placeholder="E-mail" />
                </div>
                <div className='campo'>
                    <label htmlFor="nome">Nome</label>
                    <input type="text" value={name} onInput={(e: any) => setName(e.target.value)} placeholder="Nome" />
                </div>
                <div className='campo'>
                    <label htmlFor="phone">Telefone</label>
                    <input type="text" value={phone} onInput={(e: any) => setPhone(e.target.value)} placeholder="Telefone" />
                </div>
            </div>
            <div className='buttons-form'>
                <button className='btn success' type='button' onClick={() => props.clickSave(
                    {   
                        id,
                        email,
                        phone,
                        name
                    }
                )}>Salvar</button>
                <button className='btn cancel' type='button' onClick={props.clickCancel}>Cancelar</button>
            </div>
        </>
    )
}

export default Form