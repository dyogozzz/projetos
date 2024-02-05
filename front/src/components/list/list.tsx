import Card from '../card/card'
import User from '../../Interfaces/User'

interface IList {
    users?: any,
    editUser: (param: User) => any,
    deleteUser: (param: User) => any
}

const List = (props: IList) => {

    return (
        <table>
            <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Criado em</th>
                <th>Ações</th>
            </tr>

            {props.users ? props.users.map((user: User) => <Card deleteUser={props.deleteUser} setUserTarget={props.editUser} user={user} />) : null}
        </table>
    )
}

export default List