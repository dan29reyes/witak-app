-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema witak-app
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema witak-app
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `witak-app` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `witak-app` ;

-- -----------------------------------------------------
-- Table `witak-app`.`usuarios`
-- -----------------------------------------------------
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
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `witak-app`.`formularios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `witak-app`.`formularios` (
  `id_formulario` INT NOT NULL AUTO_INCREMENT,
  `idea_formulario` VARCHAR(35) NOT NULL,
  `nombre_formulario` VARCHAR(45) NOT NULL,
  `objetivo_formulario` VARCHAR(65) NOT NULL,
  `descripcion_formulario` VARCHAR(100) NOT NULL,
  `publico_formulario` VARCHAR(30) NOT NULL,
  `tono_formulario` VARCHAR(15) NOT NULL,
  `id_usuario` INT NOT NULL,
  `fecha_limite` DATETIME NOT NULL,
  `fecha_creacion` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
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


-- -----------------------------------------------------
-- Table `witak-app`.`tableros`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `witak-app`.`tableros` (
  `id_tablero` INT NOT NULL AUTO_INCREMENT,
  `nombre_tablero` VARCHAR(40) NOT NULL,
  `descripcion_tablero` VARCHAR(120) NOT NULL,
  `estado_tablero` VARCHAR(15) NOT NULL DEFAULT "PENDIENTE",
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
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `witak-app`.`listas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `witak-app`.`listas` (
  `id_lista` INT NOT NULL AUTO_INCREMENT,
  `nombre_lista` VARCHAR(45) NOT NULL,
  `posicion_lista` INT NOT NULL,
  `id_tablero` INT NOT NULL,
  PRIMARY KEY (`id_lista`),
  UNIQUE INDEX `id_lista_UNIQUE` (`id_lista` ASC) VISIBLE,
  UNIQUE INDEX `nombre_lista_UNIQUE` (`nombre_lista` ASC) VISIBLE,
  INDEX `fk_lista_tablero_idx` (`id_tablero` ASC) VISIBLE,
  CONSTRAINT `fk_lista_tablero`
    FOREIGN KEY (`id_tablero`)
    REFERENCES `witak-app`.`tableros` (`id_tablero`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `witak-app`.`tarjetas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `witak-app`.`tarjetas` (
  `id_tarjeta` INT NOT NULL AUTO_INCREMENT,
  `nombre_tarjeta` VARCHAR(35) NOT NULL,
  `descripcion_tarjeta` VARCHAR(70) NOT NULL,
  `posicion_tarjeta` INT NOT NULL,
  `id_lista` INT NOT NULL,
  PRIMARY KEY (`id_tarjeta`),
  UNIQUE INDEX `id_tarjeta_UNIQUE` (`id_tarjeta` ASC) VISIBLE,
  INDEX `fk_tarjeta_lista_idx` (`id_lista` ASC) VISIBLE,
  CONSTRAINT `fk_tarjeta_lista`
    FOREIGN KEY (`id_lista`)
    REFERENCES `witak-app`.`listas` (`id_lista`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
