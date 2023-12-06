-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `login` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `papel` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Docente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `siape` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `usuarioId` INTEGER NOT NULL,

    UNIQUE INDEX `Docente_usuarioId_key`(`usuarioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chefia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `inicio` DATETIME(3) NOT NULL,
    `fim` DATETIME(3) NOT NULL,
    `nivel` VARCHAR(191) NOT NULL,
    `docenteId` INTEGER NOT NULL,

    UNIQUE INDEX `Chefia_docenteId_key`(`docenteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Curso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Turma` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `cursoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Coordenador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `inicio` DATETIME(3) NOT NULL,
    `fim` DATETIME(3) NOT NULL,
    `cursoId` INTEGER NOT NULL,
    `docenteId` INTEGER NOT NULL,

    UNIQUE INDEX `Coordenador_cursoId_key`(`cursoId`),
    UNIQUE INDEX `Coordenador_docenteId_key`(`docenteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Disciplina` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CicloLetivo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ano` VARCHAR(191) NOT NULL,
    `semestre` INTEGER NOT NULL,
    `inicio` DATETIME(3) NOT NULL,
    `fim` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DocenteCicloLetivo` (
    `docenteId` INTEGER NOT NULL,
    `cicloLetivoId` INTEGER NOT NULL,
    `nivel` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`docenteId`, `cicloLetivoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Oferta` (
    `docenteId` INTEGER NOT NULL,
    `turmaId` INTEGER NOT NULL,
    `cicloLetivoId` INTEGER NOT NULL,
    `disciplinaId` INTEGER NOT NULL,

    PRIMARY KEY (`docenteId`, `turmaId`, `cicloLetivoId`, `disciplinaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Solicitacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` DATETIME(3) NOT NULL,
    `hora` DATETIME(3) NOT NULL,
    `justificativa` VARCHAR(191) NOT NULL,
    `anexo` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `ciencia_substituto` BOOLEAN NOT NULL,
    `data_devolucao` DATETIME(3) NOT NULL,
    `autorizacao_chefia` BOOLEAN NOT NULL,
    `ciencia_chefia` BOOLEAN NOT NULL,
    `ciencia_coordenador` BOOLEAN NOT NULL,
    `docente_solicitante_id` INTEGER NOT NULL,
    `docente_substituto_id` INTEGER NOT NULL,
    `ciclo_letivo_id` INTEGER NOT NULL,
    `disciplina_id` INTEGER NOT NULL,
    `turma_id` INTEGER NOT NULL,
    `disciplina_substituta_id` INTEGER NOT NULL,
    `chefia_id` INTEGER NOT NULL,
    `coordenador_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Docente` ADD CONSTRAINT `Docente_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chefia` ADD CONSTRAINT `Chefia_docenteId_fkey` FOREIGN KEY (`docenteId`) REFERENCES `Docente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Turma` ADD CONSTRAINT `Turma_cursoId_fkey` FOREIGN KEY (`cursoId`) REFERENCES `Curso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Coordenador` ADD CONSTRAINT `Coordenador_cursoId_fkey` FOREIGN KEY (`cursoId`) REFERENCES `Curso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Coordenador` ADD CONSTRAINT `Coordenador_docenteId_fkey` FOREIGN KEY (`docenteId`) REFERENCES `Docente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DocenteCicloLetivo` ADD CONSTRAINT `DocenteCicloLetivo_docenteId_fkey` FOREIGN KEY (`docenteId`) REFERENCES `Docente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DocenteCicloLetivo` ADD CONSTRAINT `DocenteCicloLetivo_cicloLetivoId_fkey` FOREIGN KEY (`cicloLetivoId`) REFERENCES `CicloLetivo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Oferta` ADD CONSTRAINT `Oferta_docenteId_fkey` FOREIGN KEY (`docenteId`) REFERENCES `Docente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Oferta` ADD CONSTRAINT `Oferta_turmaId_fkey` FOREIGN KEY (`turmaId`) REFERENCES `Turma`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Oferta` ADD CONSTRAINT `Oferta_cicloLetivoId_fkey` FOREIGN KEY (`cicloLetivoId`) REFERENCES `CicloLetivo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Oferta` ADD CONSTRAINT `Oferta_disciplinaId_fkey` FOREIGN KEY (`disciplinaId`) REFERENCES `Disciplina`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Solicitacao` ADD CONSTRAINT `Solicitacao_docente_solicitante_id_fkey` FOREIGN KEY (`docente_solicitante_id`) REFERENCES `Docente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
