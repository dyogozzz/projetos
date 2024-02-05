import { Request, Response } from 'express';
import * as userModel from '../models/userModel';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const query = req.query as { orderBy?: string };
    const users = await userModel.getAll(query);

    res.send({ users });
  } catch (error: any) {
    console.error('Erro ao obter usuários: ', error.message)
    res.status(400).send(error.message || 'Erro na requisição')
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    if(!user.name || !user.email || !user.phone){
      throw new Error('Os campos de nome, email e telefone são obrigatórios.')
    }

    const newUser = userModel.createUser(user)

    res.send(newUser)

  } catch (error: any) {
    console.error('Erro ao criar usuário: ', error.message)
    res.status(400).send(error.message || 'Erro na requisição')
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    let user = req.body;
    user.id = req.params.id;
    
    if(!user.name || !user.email || !user.phone){
      throw new Error('Os campos de nome, email e telefone são obrigatórios.')
    }
    
    const updated = await userModel.updateUser(user);

    res.send(updated);
  } catch (error: any) {
    console.error('Erro ao atualizar usuário: ', error.message)
    res.status(400).send(error.message || 'Erro na requisição')
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const response = await userModel.deleteUser(req.params.id, req);

    res.send(response);
  } catch (error: any) {
    console.error('Erro ao deletar usuário: ', error.message)
    res.status(400).send(error.message || 'Erro na requisição')
  }

};


