
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `witak-app` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `witak-app` ;

CREATE TABLE IF NOT EXISTS `witak-app`.`usuarios` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nombre_usuario` VARCHAR(60) NOT NULL,
  `pass_usuario` VARCHAR(200) NOT NULL,
  `salt_usuario` VARCHAR(200) NOT NULL,
  `correo_usuario` VARCHAR(45) NOT NULL,
  `telefono_usuario` VARCHAR(16) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE INDEX `id_usuario_UNIQUE` (`id_usuario` ASC) VISIBLE,
  UNIQUE INDEX `correo_usuario_UNIQUE` (`correo_usuario` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `witak-app`.`formularios` (
  `id_formulario` INT NOT NULL AUTO_INCREMENT,
  `nombre_formulario` VARCHAR(45) NOT NULL,
  `objetivo_formulario` VARCHAR(65) NOT NULL,
  `descripcion_formulario` VARCHAR(100) NOT NULL,
  `publico_formulario` VARCHAR(30) NOT NULL,
  `tono_formulario` VARCHAR(55) NOT NULL,
  `estado_formulario` VARCHAR(10) NULL DEFAULT 'PENDIENTE',
  `fecha_limite` DATETIME NOT NULL,
  `fecha_creacion` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_formulario`),
  UNIQUE INDEX `id_formulario_UNIQUE` (`id_formulario` ASC) VISIBLE,
  INDEX `fk_formulario_usuario_idx` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_formulario_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `witak-app`.`usuarios` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `witak-app`.`tableros` (
  `id_tablero` INT NOT NULL AUTO_INCREMENT,
  `nombre_tablero` VARCHAR(40) NOT NULL,
  `descripcion_tablero` VARCHAR(120) NOT NULL,
  `columna_referencia` INT NULL DEFAULT '1',
  `fecha_creacion` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_limite` DATETIME NOT NULL,
  `id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_tablero`),
  UNIQUE INDEX `nombre_tablero_UNIQUE` (`nombre_tablero` ASC) VISIBLE,
  UNIQUE INDEX `id_tablero_UNIQUE` (`id_tablero` ASC) VISIBLE,
  INDEX `fk_tablero_user_idx` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_tablero_user`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `witak-app`.`usuarios` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
