import './header.css'

const Header = ({onClickSearch, onClickAdd, onChangeInput, changeOrder, changeInitial, changeFinal}: any) => {

    return (
        <form className='add-form'>
            <input className='input-component' placeholder='Pesquise um usuário' onChange={(e) => onChangeInput(e.target.value)} ></input>
            <input className='input-date' onChange={(e) => changeInitial(e.target.value)} type="date" />
            <input className='input-date' onChange={(e) => changeFinal(e.target.value)} type="date" />
            <select className='' onChange={(e) => changeOrder(e.target.value)} name="order" id="order">
                <option value="ASC">Crescente</option>
                <option value="DESC">Decrescente</option>
            </select>
            <button type='button' onClick={onClickSearch} className='btn primary'>
                <span className='material-symbols-outlined'>Search</span>
            </button>
            <button type='button' onClick={onClickAdd} className='btn primary'>
                <span className='material-symbols-outlined'>Add</span>
            </button>
        </form>
    )
}

export default Header