import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import {User} from '../entities/user';

export const getUser = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({where: {id: parseInt(req.params.id, 10)}});
    return res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const user = userRepository.create(req.body);
    await userRepository.save(user);
    return res.status(201).json(user);
};

export const updateUser = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    await userRepository.update(req.params.id, req.body);
    const updatedUser = await userRepository.findOne({where: {id: parseInt(req.params.id, 10)}});
    return res.json(updatedUser);
};

export const deleteUser = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    await userRepository.delete(req.params.id);
    return res.status(204).json({});
};
