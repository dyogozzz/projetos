import User from '../../Interfaces/User'

interface props {
    user: User,
    deleteUser: (arg: User) => any,
    setUserTarget: (arg: User) => any
}

const Card = (props: props) => {
    const formatDateTime = (date: any) => {
        const dateTime = new Date(date);

        const day = dateTime.getDate().toString().padStart(2, '0');
        const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
        const year = dateTime.getFullYear();

        const hours = dateTime.getHours().toString().padStart(2, '0');
        const minutes = dateTime.getMinutes().toString().padStart(2, '0');
        const seconds = dateTime.getSeconds().toString().padStart(2, '0');

        const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

        return formattedDateTime;
    }
    
    const formatPhone = (phone: any) => {
        
        if(!phone){
            return ''
        }

        const cleaned = phone.replace(/\D/g, '');

        const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);

        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }

        return phone;
    }

    return (
        <tbody>
            <tr>
                <td>
                    {props.user.name}
                </td>
                <td>
                    {props.user.email}
                </td>
                <td>
                    {formatPhone(props.user.phone)}
                </td>
                <td>
                    {formatDateTime(props.user.created_at)}
                </td>
                <td>
                    <div className="btn-grouper">
                        <button className="btn edit" onClick={ () => props.setUserTarget(props.user) }>
                            <span className="material-symbols-outlined">Edit</span>
                        </button>

                        <button className="btn delete" onClick={ () => props.deleteUser(props.user) }>
                            <span className="material-symbols-outlined">Delete</span>
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    )
}

export default Card