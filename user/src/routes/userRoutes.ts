import {Router} from 'express';
import { userController } from '../dependencies/dependencies';
const router = Router();

router.get('/:id', userController.getUserById);
router.get('/', userController.getAllUsers);
// router.post('/register', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUserById);

export default router;
