import './App.css';
import Header from './components/header/header'
import List from './components/list/list'
import axios from 'axios'
import { useState, useEffect } from 'react';
import ModalForm from './components/modalForm/ModalForm';
import User from './Interfaces/User'

function App () {
  const urlUser = 'http://localhost:3001/user';
  const [users, setUsers] = useState([''])
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [userTarget, setUserTarget] =  useState(undefined)
  const [nameSearch, setNameSearch] = useState(undefined)
  const [initialDate, setInitialDate] = useState(undefined)
  const [finalDate, setFinalDate] = useState(undefined)
  const [orderBy, setOrderBy] = useState('ASC')

  const editUser = (user: any) => {
    setUserTarget(user)
    setIsOpenModal(true)
  }

  const fetchData = async (url: string) => {
    try {
      
      const params = {
        name: nameSearch,
        initialDate,
        finalDate,
        orderBy
      }

      const response = await axios.get(url, {params})
      
      return response.data

    } catch (error) {
      throw error;
    }
  };

  const getUsers = async () => {
    try {
      let data = await fetchData(urlUser)
      setUsers(data.users)

    } catch (error) {
      console.error('Erro ao obter usuários:', error);
    }
  };

  const saveUser = async (user: User) => {
    let url = urlUser

    try {
      
      if(!user.id){
        const response = await axios.post(url, user)
        const addedUser = response.data[0][0]

        users.push(addedUser)
      }
      
      if(user.id){
        const response = await axios.patch(url + '/' + user.id, user)
        const updated = response.data[0][0]

        setUsers((prevUsers) => 
          prevUsers.map((usr: any) => usr.id === updated.id ? updated : usr)
        )
      }

      setIsOpenModal(false)
    } catch(err) {
      console.log('erro', err)
    }
  }

  const deleteUser = async (user: User) => {
    try {
      const url = urlUser + '/' + user.id
      await axios.delete(url)

      setUsers((prevUsers) => 
        prevUsers.filter((usr: any) => usr.id != user.id)
      )
    } catch (err) {
      console.log(err)
    }
  }

  useEffect( () => {
    getUsers()
  }, [])

  return (
    <div className="App">
      <main>
        <ModalForm 
        clickSave={saveUser} 
        editUser={editUser} 
        setIsOpen={setIsOpenModal} 
        user={userTarget} 
        isOpen={isOpenModal}
        />

        <Header 
        changeInitial={setInitialDate} 
        changeFinal={setFinalDate} 
        changeOrder={setOrderBy} 
        onClickSearch={getUsers} 
        onChangeInput={setNameSearch} 
        onClickAdd={() => setIsOpenModal(true)} 
        />

        <List 
        deleteUser={deleteUser} 
        editUser={editUser} 
        users={users} 
        />
      </main>
    </div>
  );
}

export default App;
