import { PrismaClient } from "@prisma/client";
import { exec } from 'child_process';
import fs from 'fs';

const prisma = new PrismaClient();

export default async function backupDb(req, res) {
    const outputFile = "/var/www/beautytag-back.com/backups/backup.sql";
    try {
        await generateDumpFile(outputFile);
        
        // Aguarde até que o dump seja criado antes de fazer o download
        res.download(outputFile, (err) => {
            if (err) {
                console.error(`Erro ao enviar o arquivo: ${err}`);
                return res.status(500).json({ message: "Erro ao enviar o arquivo de backup" });
            }
            console.log(`Arquivo de backup enviado: ${outputFile}`);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro ao realizar o backup do banco de dados" });
    } finally {
        setTimeout(() => {
            console.log("Removendo arquivo de backup");
            removeFile(outputFile);
        }, 1 * 60 * 1000);
    }
};

async function generateDumpFile(outputFile) {
    const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, SUDO_PASSWORD } = process.env;

    const username = DB_USER;
    const password = DB_PASSWORD;
    const host = DB_HOST;
    const port = DB_PORT;
    const dbname = DB_NAME;

    // Verifique a conexão com o banco de dados usando Prisma
    await prisma.$connect();

    // Faça o dump do banco de dados usando pg_dump
    const dumpCommand = `PGPASSWORD='${password}' pg_dump -U ${username} -h ${host} -p ${port} ${dbname} > ${outputFile}`;

    return new Promise((resolve, reject) => {
        exec(dumpCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(`Erro ao executar o pg_dump: ${error.message}`);
                return reject(error);
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return reject(new Error(stderr));
            }
            console.log(`Dump do banco de dados criado com sucesso em ${outputFile}`);
            resolve();
        });
    });
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
