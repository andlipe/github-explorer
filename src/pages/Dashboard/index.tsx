import React, { useState, FormEvent } from "react";
import { FiChevronRight } from "react-icons/fi";
import api from "../../services/api";

import logoImg from '../../assets/logo.svg';
import {Title, Form, Repositories} from './styles';
import Repository from '../Repository/index';

interface Repository {
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;
    };
}

const Dashboard: React.FC = () => {
    const [newRepo, setnewRepo] = useState('')
    const [repositories, setRepositories] = useState<Repository[]>([]);

    async function handleAddRepository(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const response = await api.get<Repository>(`repos/${newRepo}`);

        const repository = response.data;

        setRepositories([...repositories, repository]);
        setnewRepo('');
    }

    return (
    <>
        <img src={logoImg} alt="Github Explorer" />
        <Title>Explore Repositórios no Github.</Title>

        <Form onSubmit={handleAddRepository}>
            <input
            value={newRepo}
            onChange={(e) => setnewRepo(e.target.value)}
            placeholder="Digite o nome do repositório"
            />
            <button type="submit">Pesquisar</button>
        </Form>

        <Repositories>
            {repositories.map(repository => (
                <a key={repository.full_name} href="teste" >
                <img
                src={repository.owner.avatar_url}
                alt={repository.owner.login}
                />

                <div>
                    <strong>{repository.full_name}</strong>
                    <p>{repository.description}</p>
                </div>
                <FiChevronRight size={20}></FiChevronRight>
            </a>
            ))}
        </Repositories>
    </>
    );
};

export default Dashboard;
