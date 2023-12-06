-- DropForeignKey
ALTER TABLE `docente` DROP FOREIGN KEY `Docente_usuarioId_fkey`;

-- AddForeignKey
ALTER TABLE `Docente` ADD CONSTRAINT `Docente_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
