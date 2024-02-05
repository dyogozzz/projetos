import connection from '../data/connection'
import { Request } from 'express'

interface User {
    id?: string
    name?: string,
    email?: string,
    phone?: string,
    created_at?: string,
    updated_at?: string,
}

interface Query {
    name?: string,
    initialDate?: string,
    finalDate?: string,
    orderBy?: string
}

export const getAll =  async (query: Query) => {
    let sql = 'SELECT * FROM users WHERE 1 = 1';
    let params = []

    if(query.name){
        sql += ` AND name LIKE ?`
        params.push(`%${query.name}%`)
    }

    if(query.initialDate){
        sql += ` AND created_at >= ?`
        params.push(query.initialDate)
    }

    if(query.finalDate){
        sql += ` AND created_at <= ?`
        params.push(query.finalDate)
    }

    if(query.orderBy){
        sql += ` ORDER BY created_at ${query.orderBy}`
    }

    const [users] = await connection.execute(sql, params)

    return users
}

export const createUser = async (user: User) => {
    await connection.execute(`INSERT INTO users (name, email, phone) VALUES ('${user.name}', '${user.email}', '${user.phone}')`)
    const newUser = await connection.execute(`SELECT *
    FROM users
    ORDER BY created_at DESC
    LIMIT 1;
    `)

    return newUser
}

export const deleteUser = async (id: string, req: Request) => {
    try {

        const user: any = await connection.execute(`SELECT * FROM users WHERE id = ${id}`)
        
        await connection.execute(`INSERT INTO deleted_users (id, name, email, phone, created_at, updated_at, deleted_via, deleted_ip, deleted_forward) VALUES (?,?,?,?,?,?,?,?,?)`,
        [
            user[0][0].id,
            user[0][0].name,
            user[0][0].email,
            user[0][0].phone,
            user[0][0].created_at,
            user[0][0].updated_at !== undefined ? user[0][0].updated_at : null,
            req.get('Via') || '',
            req.ip,
            req.get('x-forwarded-for') || '',
        ].map(value => value === undefined ? null : value))
        
        await connection.execute(`DELETE FROM users WHERE id = ${id}`)
    } catch (error) {
        console.error('Erro ao deletar um usuário:', error)
        return error
    }
}

export const updateUser = async (user: User) => {
    await connection.execute(`UPDATE users
    SET name = '${user.name}', phone = '${user.phone}', email = '${user.email}' WHERE id = ${user.id}`)

    const updatedUser = await connection.execute(`SELECT * FROM users WHERE id = ${user.id}`)

    return updatedUser
}
