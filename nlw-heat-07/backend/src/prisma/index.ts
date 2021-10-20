// Arquivo de conexão com o banco de dados

import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default prismaClient;
