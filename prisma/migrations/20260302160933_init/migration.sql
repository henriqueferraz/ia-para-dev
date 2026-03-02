-- CreateTable
CREATE TABLE "Empreendimento" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nomeEmpreendimento" TEXT NOT NULL,
    "nomeEmpreendedor" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,
    "segmento" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ATIVO',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
