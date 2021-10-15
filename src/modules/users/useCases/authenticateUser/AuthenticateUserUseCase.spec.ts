import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../createUser/ICreateUserDTO";

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: InMemoryUsersRepository;

describe('Authenticate User', () => {

    beforeEach(() => {
        usersRepositoryInMemory = new InMemoryUsersRepository();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it('Should be able to authenticate an user', async () => {
        const newUser: ICreateUserDTO = {
            name: 'Usuário',
            email: 'usuario@email.com',
            password: 'passwordtest'
        };

        await createUserUseCase.execute(newUser);

        const resultTest = await authenticateUserUseCase.execute({
            email: newUser.email,
            password: newUser.password,
        });

        expect(resultTest).toHaveProperty('token');
    });
})