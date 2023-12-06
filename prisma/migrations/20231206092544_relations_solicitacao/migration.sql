/*
  Warnings:

  - You are about to drop the column `autorizacao_chefia` on the `solicitacao` table. All the data in the column will be lost.
  - You are about to drop the column `chefia_id` on the `solicitacao` table. All the data in the column will be lost.
  - You are about to drop the column `ciclo_letivo_id` on the `solicitacao` table. All the data in the column will be lost.
  - You are about to drop the column `ciencia_chefia` on the `solicitacao` table. All the data in the column will be lost.
  - You are about to drop the column `ciencia_coordenador` on the `solicitacao` table. All the data in the column will be lost.
  - You are about to drop the column `ciencia_substituto` on the `solicitacao` table. All the data in the column will be lost.
  - You are about to drop the column `coordenador_id` on the `solicitacao` table. All the data in the column will be lost.
  - You are about to drop the column `data_devolucao` on the `solicitacao` table. All the data in the column will be lost.
  - You are about to drop the column `disciplina_id` on the `solicitacao` table. All the data in the column will be lost.
  - You are about to drop the column `disciplina_substituta_id` on the `solicitacao` table. All the data in the column will be lost.
  - You are about to drop the column `docente_solicitante_id` on the `solicitacao` table. All the data in the column will be lost.
  - You are about to drop the column `docente_substituto_id` on the `solicitacao` table. All the data in the column will be lost.
  - You are about to drop the column `turma_id` on the `solicitacao` table. All the data in the column will be lost.
  - Added the required column `autorizacaoChefia` to the `Solicitacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chefiaId` to the `Solicitacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cicloLetivoId` to the `Solicitacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cienciaChefia` to the `Solicitacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cienciaCoordenador` to the `Solicitacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cienciaSubstituto` to the `Solicitacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coordenadorId` to the `Solicitacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `disciplinaId` to the `Solicitacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `docenteSolicitanteId` to the `Solicitacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `docenteSubstitutoId` to the `Solicitacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `turmaId` to the `Solicitacao` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `chefia` DROP FOREIGN KEY `Chefia_docenteId_fkey`;

-- DropForeignKey
ALTER TABLE `coordenador` DROP FOREIGN KEY `Coordenador_docenteId_fkey`;

-- DropForeignKey
ALTER TABLE `solicitacao` DROP FOREIGN KEY `Solicitacao_docente_solicitante_id_fkey`;

-- DropForeignKey
ALTER TABLE `turma` DROP FOREIGN KEY `Turma_cursoId_fkey`;

-- AlterTable
ALTER TABLE `solicitacao` DROP COLUMN `autorizacao_chefia`,
    DROP COLUMN `chefia_id`,
    DROP COLUMN `ciclo_letivo_id`,
    DROP COLUMN `ciencia_chefia`,
    DROP COLUMN `ciencia_coordenador`,
    DROP COLUMN `ciencia_substituto`,
    DROP COLUMN `coordenador_id`,
    DROP COLUMN `data_devolucao`,
    DROP COLUMN `disciplina_id`,
    DROP COLUMN `disciplina_substituta_id`,
    DROP COLUMN `docente_solicitante_id`,
    DROP COLUMN `docente_substituto_id`,
    DROP COLUMN `turma_id`,
    ADD COLUMN `autorizacaoChefia` BOOLEAN NOT NULL,
    ADD COLUMN `chefiaId` INTEGER NOT NULL,
    ADD COLUMN `cicloLetivoId` INTEGER NOT NULL,
    ADD COLUMN `cienciaChefia` BOOLEAN NOT NULL,
    ADD COLUMN `cienciaCoordenador` BOOLEAN NOT NULL,
    ADD COLUMN `cienciaSubstituto` BOOLEAN NOT NULL,
    ADD COLUMN `coordenadorId` INTEGER NOT NULL,
    ADD COLUMN `dataDevolucao` DATETIME(3) NULL,
    ADD COLUMN `disciplinaId` INTEGER NOT NULL,
    ADD COLUMN `disciplinaSubstitutaId` INTEGER NULL,
    ADD COLUMN `docenteSolicitanteId` INTEGER NOT NULL,
    ADD COLUMN `docenteSubstitutoId` INTEGER NOT NULL,
    ADD COLUMN `turmaId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Chefia` ADD CONSTRAINT `Chefia_docenteId_fkey` FOREIGN KEY (`docenteId`) REFERENCES `Docente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Turma` ADD CONSTRAINT `Turma_cursoId_fkey` FOREIGN KEY (`cursoId`) REFERENCES `Curso`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Coordenador` ADD CONSTRAINT `Coordenador_docenteId_fkey` FOREIGN KEY (`docenteId`) REFERENCES `Docente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Solicitacao` ADD CONSTRAINT `Solicitacao_docenteSolicitanteId_fkey` FOREIGN KEY (`docenteSolicitanteId`) REFERENCES `Docente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Solicitacao` ADD CONSTRAINT `Solicitacao_docenteSubstitutoId_fkey` FOREIGN KEY (`docenteSubstitutoId`) REFERENCES `Docente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Solicitacao` ADD CONSTRAINT `Solicitacao_cicloLetivoId_fkey` FOREIGN KEY (`cicloLetivoId`) REFERENCES `CicloLetivo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Solicitacao` ADD CONSTRAINT `Solicitacao_disciplinaId_fkey` FOREIGN KEY (`disciplinaId`) REFERENCES `Disciplina`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Solicitacao` ADD CONSTRAINT `Solicitacao_turmaId_fkey` FOREIGN KEY (`turmaId`) REFERENCES `Turma`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Solicitacao` ADD CONSTRAINT `Solicitacao_disciplinaSubstitutaId_fkey` FOREIGN KEY (`disciplinaSubstitutaId`) REFERENCES `Disciplina`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Solicitacao` ADD CONSTRAINT `Solicitacao_chefiaId_fkey` FOREIGN KEY (`chefiaId`) REFERENCES `Chefia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Solicitacao` ADD CONSTRAINT `Solicitacao_coordenadorId_fkey` FOREIGN KEY (`coordenadorId`) REFERENCES `Coordenador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
