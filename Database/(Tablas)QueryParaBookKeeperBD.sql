--Comandos de definicion de la BD

USE master;
GO
ALTER DATABASE BookKeeperDB
SET SINGLE_USER
WITH ROLLBACK IMMEDIATE;
GO
DROP DATABASE BookKeeperDB

CREATE DATABASE BookKeeperDB;
GO
USE BookKeeperDB

--Comandos de pais
CREATE TABLE Pais (
    ID_pais TINYINT IDENTITY(1,1) PRIMARY KEY,
    Nombre_pais NVARCHAR(100) NOT NULL -- 
);

CREATE TABLE Estado (
    ID_estado TINYINT IDENTITY(1,1) PRIMARY KEY,
    Nombre_estado NVARCHAR(100) NOT NULL, 
    ID_pais TINYINT FOREIGN KEY REFERENCES Pais(ID_pais)
);

CREATE TABLE Municipio (
    ID_municipio TINYINT IDENTITY(1,1) PRIMARY KEY,
    Nombre_municipio NVARCHAR(100) NOT NULL, 
    ID_estado TINYINT FOREIGN KEY REFERENCES Estado(ID_estado) 
);

-------------------------------------------------------Comandos de la empresa-------------------------------------------------------------------
CREATE TABLE Empresa (
	ID_empresa INT IDENTITY(1,1) PRIMARY KEY,
	Nombre NVARCHAR(100) NOT NULL,
	ID_pais TINYINT FOREIGN KEY REFERENCES Pais(ID_pais) NOT NULL,
	ID_estado TINYINT FOREIGN KEY REFERENCES Estado(ID_estado) NOT NULL,
	ID_municipio TINYINT FOREIGN KEY REFERENCES Municipio(ID_municipio) NOT NULL,
	Calle NVARCHAR(100) NOT NULL,
	Numero_telefono NVARCHAR(15) NOT NULL,
	Correo NVARCHAR(320) NOT NULL
);

---------------------------------------------------------Comandos para libro---------------------------------------------------------------------

CREATE TABLE Condicion (
	ID_condicion TINYINT IDENTITY(1,1) PRIMARY KEY,
	Descripcion NVARCHAR(100) NOT NULL
);

CREATE TABLE Idioma (
	ID_idioma TINYINT IDENTITY(1,1) PRIMARY KEY,
	Nombre NVARCHAR(100) NOT NULL
);

CREATE TABLE Ubicacion (
	ID_ubicacion TINYINT IDENTITY(1,1) PRIMARY KEY,
	Seccion NVARCHAR(30) NOT NULL, 
	Estanteria tinyint NOT NULL
);

CREATE TABLE Editorial (
	ID_editorial SMALLINT IDENTITY(1,1) PRIMARY KEY,
	Nombre NVARCHAR(100) NOT NULL, 
);

CREATE TABLE Genero (
	ID_genero SMALLINT IDENTITY(1,1) PRIMARY KEY,
	Nombre NVARCHAR(100) NOT NULL, 
);

CREATE TABLE Autor (
	ID_autor SMALLINT IDENTITY(1,1) PRIMARY KEY,
	Nombre NVARCHAR(100) NOT NULL,
	Apellido NVARCHAR(100) NOT NULL
);

CREATE TABLE Libro (
	ID_libro INT IDENTITY(1,1) PRIMARY KEY,
	Titulo NVARCHAR(100) NOT NULL,
	Numero_ISBN NVARCHAR(13) NOT NULL,
	ID_editorial SMALLINT FOREIGN KEY REFERENCES Editorial(ID_editorial) NOT NULL,
	Year_publicacion DATE NOT NULL,
	N_paginas SMALLINT NOT NULL,
	Tipo_pasta char(1) NOT NULL,
	ID_ubicacion TINYINT FOREIGN KEY REFERENCES Ubicacion(ID_ubicacion) NOT NULL,
	ID_idioma TINYINT FOREIGN KEY REFERENCES Idioma(ID_idioma) NOT NULL,
	ID_condicion TINYINT FOREIGN KEY REFERENCES Condicion(ID_condicion) NOT NULL
);


CREATE TABLE GeneroLibro (
	ID_genero SMALLINT FOREIGN KEY REFERENCES Genero(ID_genero) NOT NULL, 
	ID_libro INT FOREIGN KEY REFERENCES Libro(ID_libro) NOT NULL, 
	CONSTRAINT PK_GeneroLibro PRIMARY KEY (ID_genero, ID_libro)
);

CREATE TABLE AutorLibro (
	ID_autor SMALLINT FOREIGN KEY REFERENCES Autor(ID_autor) NOT NULL, 
	ID_libro INT FOREIGN KEY REFERENCES Libro(ID_libro) NOT NULL, 
	CONSTRAINT PK_AutorLibro PRIMARY KEY (ID_autor, ID_libro)
);

---------------------------------------------------------Comandos para empleado---------------------------------------------------------------------
CREATE TABLE Rol (
	ID_rol TINYINT IDENTITY(1,1) PRIMARY KEY,
	Descripcion NVARCHAR(100) NOT NULL
);


CREATE TABLE Cargo (
	ID_cargo TINYINT IDENTITY(1,1) PRIMARY KEY,
	Descripcion NVARCHAR(100) NOT NULL,
	ID_rol TINYINT FOREIGN KEY REFERENCES Rol(ID_rol) NOT NULL
);

CREATE TABLE Empleado (
	ID_empleado INT IDENTITY(1,1) PRIMARY KEY,
	Nombre NVARCHAR(100) NOT NULL,
	Apellido NVARCHAR(100) NOT NULL,
	ID_pais TINYINT FOREIGN KEY REFERENCES Pais(ID_pais) NOT NULL,
	ID_estado TINYINT FOREIGN KEY REFERENCES Estado(ID_estado) NOT NULL,
	ID_municipio TINYINT FOREIGN KEY REFERENCES Municipio(ID_municipio) NOT NULL,
	Calle NVARCHAR(100) NOT NULL,
	Correo NVARCHAR(320) NOT NULL,
	Numero_telefono NVARCHAR(15) NOT NULL,
	Fecha_contratacion DATETIME NOT NULL,
	Fecha_nacimiento DATETIME NOT NULL,
	ID_cargo TINYINT FOREIGN KEY REFERENCES Cargo(ID_cargo) NOT NULL,
	Estado_empleado BIT NOT NULL, 
	Clave NVARCHAR(100) NOT NULL
);


---------------------------------------------------------Comandos para cliente---------------------------------------------------------------------
CREATE TABLE Cliente (
	ID_cliente INT IDENTITY(1,1) PRIMARY KEY,
	Nombre NVARCHAR(100) NOT NULL,
	Apellido NVARCHAR(100) NOT NULL,
	ID_pais TINYINT FOREIGN KEY REFERENCES Pais(ID_pais) NOT NULL,
	ID_estado TINYINT FOREIGN KEY REFERENCES Estado(ID_estado) NOT NULL,
	ID_municipio TINYINT FOREIGN KEY REFERENCES Municipio(ID_municipio) NOT NULL,
	Calle NVARCHAR(100) NOT NULL,
	Correo NVARCHAR(320) NOT NULL,
	Numero_telefono NVARCHAR(15) NOT NULL,
	Fecha_registro DATETIME NOT NULL,
	Fecha_nacimiento DATETIME NOT NULL,
	Estado_renta bit NOT NULL
);

---------------------------------------------------------Comandos para Renta---------------------------------------------------------------------
CREATE TABLE Renta (
	ID_renta INT IDENTITY(1,1) PRIMARY KEY,
	Fecha_renta DATETIME NOT NULL,
	Fecha_devolucion DATETIME NOT NULL,
	Fecha_devolucion_real DATETIME,
	ID_cliente INT FOREIGN KEY REFERENCES Cliente(ID_cliente) NOT NULL,
	--ID_empleado INT FOREIGN KEY REFERENCES Empleado(ID_empleado) 
);

CREATE TABLE DetalleRenta(
	ID_detalle_renta INT IDENTITY(1,1) PRIMARY KEY,
	ID_renta INT FOREIGN KEY REFERENCES Renta(ID_renta) NOT NULL,
	ID_libro INT FOREIGN KEY REFERENCES Libro(ID_libro) NOT NULL,
	ID_condicion TINYINT FOREIGN KEY REFERENCES Condicion(ID_condicion) NOT NULL
);
---------------------------------------------------------Comandos para Multas---------------------------------------------------------------------
CREATE TABLE TipoMulta (
	ID_tipo_multa SMALLINT IDENTITY(1,1) PRIMARY KEY,
	Descripcion NVARCHAR(100) NOT NULL, 
	Tarifa MONEY NOT NULL
);

CREATE TABLE Multa (
	ID_multa INT IDENTITY(1,1) PRIMARY KEY,
	Motivo NVARCHAR(100) NOT NULL,
	Monto MONEY NOT NULL,
	Metodo_pago NVARCHAR(30) NOT NULL,
	Numero_tarjeta NVARCHAR(16),
	Fecha_multa DATETIME NOT NULL,
	ID_tipo_multa SMALLINT FOREIGN KEY REFERENCES TipoMulta(ID_tipo_multa) NOT NULL,
	ID_renta INT FOREIGN KEY REFERENCES Renta(ID_renta) NOT NULL
);
GO



