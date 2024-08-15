import { Router } from 'express';
import { getUser, createUser, updateUser, deleteUser } from '../controllers/userController';

const router = Router();

router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
