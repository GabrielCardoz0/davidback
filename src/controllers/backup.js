import { PrismaClient } from "@prisma/client";
import {exec} from 'child_process';
import fs from 'fs';

const prisma = new PrismaClient();

export default async function backupDb(req,res) {
    // const outputFile = './src/files/backup.sql';
<<<<<<< HEAD
    const outputFile = "/var/www/beautytag-back.com/backups/backup.sql";
=======
    const outputFile = "~/backups/backup.sql";
>>>>>>> 738560f863fc330f36e3784a170ee056f866d314
    try {
        await generateDumpFile(outputFile);
        return res.download(outputFile);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Erro ao realizar o backup do banco de dados"});
    } finally {
        setTimeout(() => {
            console.log("Removendo arquivo de backup");
            removeFile(outputFile);
        }, 1 * 60 * 1000);
    }
};


async function generateDumpFile(outputFile) {
    const {DB_USER,DB_PASSWORD,DB_HOST,DB_PORT,DB_NAME, SUDO_PASSWORD} = process.env;

    const username = DB_USER;
    const password = DB_PASSWORD;
    const host = DB_HOST;
    const port = DB_PORT;
    const dbname = DB_NAME;

    // Verifique a conexão com o banco de dados usando Prisma
    await prisma.$connect();

    // Faça o dump do banco de dados usando pg_dump
    const child = `echo ${SUDO_PASSWORD} | sudo -S PGPASSWORD='${password}' pg_dump -U ${username} -h ${host} -p ${port} ${dbname} > ${outputFile}`;

    const dumpCommand = `echo ${SUDO_PASSWORD} | sudo -S -u postgres PGPASSWORD='${password}' sudo -u ${username} pg_dump -U ${username} -h ${host} -p ${port} ${dbname} > ${outputFile}
`;

    exec(dumpCommand, (error, stdout, stderr) => {
        if (error) {
        console.error(`Erro ao executar o pg_dump: ${error.message}`);
        return;
        }
        if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
        }
        console.log(`Dump do banco de dados criado com sucesso em ${outputFile}`);
    });

    await prisma.$disconnect();
};

function removeFile(filePath) {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(`Erro ao remover o arquivo: ${err}`);
            return;
        }
        console.log(`Arquivo removido com sucesso: ${filePath}`);
    });
}

