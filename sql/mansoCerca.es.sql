CREATE DATABASE IF NOT EXISTS manosCerca;
USE manosCerca;

-- Crear la tabla Usuario
CREATE TABLE Usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    apellidos VARCHAR(255) NOT NULL
);

-- Crear la tabla UsuarioFamilia
CREATE TABLE Familia (
    id_usuario INT,
    descripcion TEXT,
    codigo_postal VARCHAR(10),
    direccion VARCHAR(255),
    PRIMARY KEY (id_usuario),
    CONSTRAINT fk_familia_usuario FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);
-- Crear la tabla UsuarioCuidador
CREATE TABLE Cuidador (
    id_usuario INT,
    formacion TEXT,
    experiencia TEXT,
    disponibilidad TEXT,
    codigo_postal VARCHAR(10),
    direccion VARCHAR(255),
    descripcion TEXT,
    PRIMARY KEY (id_usuario),
    CONSTRAINT fk_cuidador_usuario FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);
-- Crear la tabla Comentario
CREATE TABLE Comentario (
    id_comentario INT AUTO_INCREMENT,
    id_usuario INT,
    fecha DATE,
    comentario TEXT,
    descripcion TEXT,
    PRIMARY KEY(id_comentario),
    CONSTRAINT fk_comentario_familia FOREIGN KEY (id_usuario) REFERENCES Familia(id_usuario),
    CONSTRAINT fk_comentario_cuidador FOREIGN KEY (id_usuario) REFERENCES Cuidador(id_usuario)
);

-- Crear la tabla Servicio
CREATE TABLE Servicio (
    id_servicio INT AUTO_INCREMENT,
    descripcion TEXT,
   PRIMARY KEY(id_servicio)
);

-- Crear la tabla Requiere
CREATE TABLE Requiere (
    id_usuario INT,
    id_servicio INT,
    PRIMARY KEY (id_usuario, id_servicio),
    CONSTRAINT fk_requiere_familia FOREIGN KEY (id_usuario) REFERENCES Familia(id_usuario),
    CONSTRAINT fk_requiere_servicio FOREIGN KEY (id_servicio) REFERENCES Servicio(id_servicio)
);

-- Crear la tabla Ofrece
CREATE TABLE Ofrece (
    id_usuario INT,
    id_servicio INT,
    PRIMARY KEY (id_usuario, id_servicio),
    CONSTRAINT fk_ofrece_cuidador FOREIGN KEY (id_usuario) REFERENCES Cuidador(id_usuario),
    CONSTRAINT fk_ofrece_servicio FOREIGN KEY (id_servicio) REFERENCES Servicio(id_servicio)
);


