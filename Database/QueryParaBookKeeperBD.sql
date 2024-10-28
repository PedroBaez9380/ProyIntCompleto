
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------Comandos para la inicializacion de datos ---------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

INSERT INTO Rol (Descripcion) VALUES ('Admin'), ('Usuario');

--INSERT INTO Pais VALUES ('Mexico')
--INSERT INTO Estado VALUES ('Nuevo Leon', 1)
--INSERT INTO Municipio VALUES ('San Nicolas de los Garza', 1)

--INSERT INTO Cargo VALUES ('Gerente', 1)
--select * from Cargo

INSERT INTO Empleado (Nombre, Apellido, ID_pais, ID_estado, ID_municipio, Calle, Correo, Numero_telefono, Fecha_contratacion, Fecha_nacimiento, ID_cargo, Estado_empleado, Clave)
VALUES ('Pedro Alberto', 'Baez Najera', 1, 1, 1, 'Av. Universidad', 'pedro.baeznjr@uanl.edu.mx', '8128644703', GETDATE(), '2004-04-27', 1, 1, 'admin')

SELECT * FROM EMPLEADO

GO

-- Pais
INSERT INTO Pais (Nombre_pais) VALUES ('México'), ('Estados Unidos');

-- Estado (asumiendo que México es ID_pais = 1, Estados Unidos es ID_pais = 2)
INSERT INTO Estado (Nombre_estado, ID_pais) VALUES ('Jalisco', 1), ('California', 2);

-- Municipio (asumiendo que Jalisco es ID_estado = 1, California es ID_estado = 2)
INSERT INTO Municipio (Nombre_municipio, ID_estado) VALUES ('Guadalajara', 1), ('Los Angeles', 2);

-- Condicion
INSERT INTO Condicion (Descripcion) VALUES ('Nuevo'), ('Usado');

-- Idioma
INSERT INTO Idioma (Nombre) VALUES ('Español'), ('Inglés');

-- Ubicacion
INSERT INTO Ubicacion (Seccion, Estanteria) VALUES ('A', 1), ('B', 2);

-- Editorial
INSERT INTO Editorial (Nombre) VALUES ('Editorial Uno'), ('Editorial Dos');

-- Genero
INSERT INTO Genero (Nombre) VALUES ('Ficción'), ('Ciencia');

-- Autor
INSERT INTO Autor (Nombre, Apellido) VALUES ('Gabriel', 'García Márquez'), ('Isaac', 'Asimov');

-- Rol
INSERT INTO Rol (Descripcion) VALUES ('Admin'), ('Vendedor');

-- Cargo (asumiendo que el rol Admin es ID_rol = 1 y Vendedor es ID_rol = 2)
INSERT INTO Cargo (Descripcion, ID_rol) VALUES ('Manager', 1), ('Asistente', 2);

-- TipoMulta
INSERT INTO TipoMulta (Descripcion, Tarifa) VALUES ('Retraso', 50.00), ('Daño', 100.00);





-- Empresa (asumiendo que Guadalajara es ID_municipio = 1)
INSERT INTO Empresa (Nombre, ID_pais, ID_estado, ID_municipio, Calle, Numero_telefono, Correo) 
VALUES ('Empresa ABC', 1, 1, 1, 'Av. Patria 123', '3312345678', 'contacto@empresaabc.com');

-- Libro (asumiendo Editorial Uno es ID_editorial = 1, Ubicación A es ID_ubicacion = 1, Español es ID_idioma = 1, Nuevo es ID_condicion = 1)
INSERT INTO Libro (Titulo, Numero_ISBN, ID_editorial, Year_publicacion, N_paginas, Tipo_pasta, ID_ubicacion, ID_idioma, ID_condicion) 
VALUES ('Cien Años de Soledad', '9781234567897', 1, '1967-06-05', 417, 'D', 1, 1, 1);

-- GeneroLibro (relación entre Genero y Libro)
INSERT INTO GeneroLibro (ID_genero, ID_libro) VALUES (1, 1);

-- AutorLibro (relación entre Autor y Libro)
INSERT INTO AutorLibro (ID_autor, ID_libro) VALUES (1, 1);

-- Empleado (asumiendo el cargo Manager es ID_cargo = 1)
INSERT INTO Empleado (Nombre, Apellido, ID_pais, ID_estado, ID_municipio, Calle, Correo, Numero_telefono, Fecha_contratacion, Fecha_nacimiento, ID_cargo, Estado_empleado, Clave) 
VALUES ('Juan', 'Pérez', 1, 1, 1, 'Av. Vallarta 321', 'juan.perez@empresa.com', '3312345678', '2023-01-01', '1990-05-10', 1, 1, 'ABC123');

-- Cliente (asumiendo Guadalajara es ID_municipio = 1)
INSERT INTO Cliente (Nombre, Apellido, ID_pais, ID_estado, ID_municipio, Calle, Correo, Numero_telefono, Fecha_registro, Fecha_nacimiento, Estado_renta) 
VALUES ('Carlos', 'Hernández', 1, 1, 1, 'Calle 5 de Febrero 100', 'carlos@cliente.com', '3311122233', '2023-02-15', '1985-07-20', 1);

-- Renta (asumiendo el cliente Carlos es ID_cliente = 1)
INSERT INTO Renta (Fecha_renta, Fecha_devolucion, ID_cliente) 
VALUES ('2024-01-10', '2024-01-17', 1);

-- DetalleRenta (asumiendo la renta ID_renta = 1 y el libro ID_libro = 1)
INSERT INTO DetalleRenta (ID_renta, ID_libro, ID_condicion) 
VALUES (1, 1, 1);

-- Multa (asumiendo la renta ID_renta = 1 y el tipo de multa Retraso es ID_tipo_multa = 1)
INSERT INTO Multa (Motivo, Monto, Metodo_pago, Numero_tarjeta, Fecha_multa, ID_tipo_multa, ID_renta) 
VALUES ('Retraso en devolución', 50.00, 'Tarjeta', '1234567890123456', '2024-01-18', 1, 1);





-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------Comandos para la modificacion de datos (en stored procedures)---------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

CREATE PROCEDURE [dbo].[GestionPais]
    @Operacion VARCHAR(10),
    @ID_pais TINYINT = NULL,
    @Nombre_pais NVARCHAR(100) = NULL
AS
BEGIN
    IF @Operacion = 'SELECT'
    BEGIN
        SELECT * FROM Pais;
    END
    ELSE IF @Operacion = 'INSERT'
    BEGIN
        INSERT INTO Pais (Nombre_pais)
        VALUES (@Nombre_pais);
    END
    ELSE IF @Operacion = 'UPDATE'
    BEGIN
        UPDATE Pais
        SET Nombre_pais = @Nombre_pais
        WHERE ID_pais = @ID_pais;
    END
    ELSE IF @Operacion = 'DELETE'
    BEGIN
        DELETE FROM Pais
        WHERE ID_pais = @ID_pais;
    END
END;
GO
--
CREATE PROCEDURE [dbo].[GestionEstado]
    @Operacion VARCHAR(10),
    @ID_estado TINYINT = NULL,
    @Nombre_estado NVARCHAR(100) = NULL,
    @ID_pais TINYINT = NULL
AS
BEGIN
    IF @Operacion = 'SELECT'
    BEGIN
        SELECT e.ID_estado, e.Nombre_estado, e.ID_pais, p.Nombre_pais
        FROM Estado e
        JOIN Pais p ON e.ID_pais = p.ID_pais;
    END
    ELSE IF @Operacion = 'INSERT'
    BEGIN
        INSERT INTO Estado (Nombre_estado, ID_pais)
        VALUES (@Nombre_estado, @ID_pais);
    END
    ELSE IF @Operacion = 'UPDATE'
    BEGIN
        UPDATE Estado
        SET Nombre_estado = @Nombre_estado,
            ID_pais = @ID_pais
        WHERE ID_estado = @ID_estado;
    END
    ELSE IF @Operacion = 'DELETE'
    BEGIN
        DELETE FROM Estado
        WHERE ID_estado = @ID_estado;
    END
END;
GO
--
CREATE PROCEDURE [dbo].[GestionMunicipio]
    @Operacion VARCHAR(10),
    @ID_municipio TINYINT = NULL,
    @Nombre_municipio NVARCHAR(100) = NULL,
    @ID_estado TINYINT = NULL
AS
BEGIN
    IF @Operacion = 'SELECT'
    BEGIN
        SELECT m.ID_municipio, m.Nombre_municipio, m.ID_estado, e.Nombre_estado
        FROM Municipio m
        JOIN Estado e ON m.ID_estado = e.ID_estado;
    END
    ELSE IF @Operacion = 'INSERT'
    BEGIN
        INSERT INTO Municipio (Nombre_municipio, ID_estado)
        VALUES (@Nombre_municipio, @ID_estado);
    END
    ELSE IF @Operacion = 'UPDATE'
    BEGIN
        UPDATE Municipio
        SET Nombre_municipio = @Nombre_municipio,
            ID_estado = @ID_estado
        WHERE ID_municipio = @ID_municipio;
    END
    ELSE IF @Operacion = 'DELETE'
    BEGIN
        DELETE FROM Municipio
        WHERE ID_municipio = @ID_municipio;
    END
END;
GO
--
CREATE PROCEDURE GestionEmpresa
    @Operacion VARCHAR(10),
    @ID_empresa INT = NULL,
    @Nombre NVARCHAR(100) = NULL,
    @ID_pais TINYINT = NULL,
    @ID_estado TINYINT = NULL,
    @ID_municipio TINYINT = NULL,
    @Calle NVARCHAR(100) = NULL,
    @Correo NVARCHAR(320) = NULL,
    @Numero_telefono NVARCHAR(15) = NULL
AS
BEGIN
    IF @Operacion = 'SELECT'
    BEGIN
        SELECT e.ID_empresa, e.Nombre, e.Calle, e.Correo, e.Numero_telefono,
               p.ID_pais, p.Nombre_pais, 
               es.ID_estado, es.Nombre_estado, 
               m.ID_municipio, m.Nombre_municipio
        FROM Empresa e
        JOIN Pais p ON e.ID_pais = p.ID_pais
        JOIN Estado es ON e.ID_estado = es.ID_estado
        JOIN Municipio m ON e.ID_municipio = m.ID_municipio;
    END
    ELSE IF @Operacion = 'INSERT'
    BEGIN
        INSERT INTO Empresa (Nombre, ID_pais, ID_estado, ID_municipio, Calle, Correo, Numero_telefono)
        VALUES (@Nombre, @ID_pais, @ID_estado, @ID_municipio, @Calle, @Correo, @Numero_telefono);
    END
    ELSE IF @Operacion = 'UPDATE'
    BEGIN
        UPDATE Empresa
        SET Nombre = @Nombre,
            ID_pais = @ID_pais,
            ID_estado = @ID_estado,
            ID_municipio = @ID_municipio,
            Calle = @Calle,
            Correo = @Correo,
            Numero_telefono = @Numero_telefono
        WHERE ID_empresa = @ID_empresa;
    END
    ELSE IF @Operacion = 'DELETE'
    BEGIN
        DELETE FROM Empresa
        WHERE ID_empresa = @ID_empresa;
    END
END;
GO
--
CREATE PROCEDURE [dbo].[GestionCondicion] 
    @Operacion VARCHAR(10),
    @ID_condicion TINYINT = NULL,
    @Descripcion NVARCHAR(100) = NULL
AS
BEGIN
    IF @Operacion = 'SELECT'
    BEGIN
        SELECT * FROM Condicion;
    END
    ELSE IF @Operacion = 'INSERT'
    BEGIN
        INSERT INTO Condicion (Descripcion)
        VALUES (@Descripcion);
    END
    ELSE IF @Operacion = 'UPDATE'
    BEGIN
        UPDATE Condicion
        SET Descripcion = @Descripcion
        WHERE ID_condicion = @ID_condicion;
    END
    ELSE IF @Operacion = 'DELETE'
    BEGIN
        DELETE FROM Condicion
        WHERE ID_condicion = @ID_condicion;
    END
END;
GO
--
CREATE PROCEDURE [dbo].[GestionIdioma]
    @Operacion VARCHAR(10),
    @ID_idioma TINYINT = NULL,
    @Nombre NVARCHAR(100) = NULL
AS
BEGIN
    IF @Operacion = 'SELECT'
    BEGIN
        SELECT * FROM Idioma;
    END
    ELSE IF @Operacion = 'INSERT'
    BEGIN
        INSERT INTO Idioma (Nombre)
        VALUES (@Nombre);
    END
    ELSE IF @Operacion = 'UPDATE'
    BEGIN
        UPDATE Idioma
        SET Nombre = @Nombre
        WHERE ID_idioma = @ID_idioma;
    END
    ELSE IF @Operacion = 'DELETE'
    BEGIN
        DELETE FROM Idioma
        WHERE ID_idioma = @ID_idioma;
    END
END;
GO
--
CREATE PROCEDURE [dbo].[GestionUbicacion]
    @Operacion VARCHAR(10),
    @ID_ubicacion TINYINT = NULL,
    @Seccion NVARCHAR(30) = NULL,
    @Estanteria TINYINT = NULL
AS
BEGIN
    IF @Operacion = 'SELECT'
    BEGIN
        SELECT * FROM Ubicacion;
    END
    ELSE IF @Operacion = 'INSERT'
    BEGIN
        INSERT INTO Ubicacion (Seccion, Estanteria)
        VALUES (@Seccion, @Estanteria);
    END
    ELSE IF @Operacion = 'UPDATE'
    BEGIN
        UPDATE Ubicacion
        SET Seccion = @Seccion,
            Estanteria = @Estanteria
        WHERE ID_ubicacion = @ID_ubicacion;
    END
    ELSE IF @Operacion = 'DELETE'
    BEGIN
        DELETE FROM Ubicacion
        WHERE ID_ubicacion = @ID_ubicacion;
    END
END;
GO
--
CREATE PROCEDURE [dbo].[GestionEditorial]
    @Operacion VARCHAR(10),
    @ID_editorial SMALLINT = NULL,
    @Nombre NVARCHAR(100) = NULL
AS
BEGIN
    IF @Operacion = 'SELECT'
    BEGIN
        SELECT * FROM Editorial;
    END
    ELSE IF @Operacion = 'INSERT'
    BEGIN
        INSERT INTO Editorial (Nombre)
        VALUES (@Nombre);
    END
    ELSE IF @Operacion = 'UPDATE'
    BEGIN
        UPDATE Editorial
        SET Nombre = @Nombre
        WHERE ID_editorial = @ID_editorial;
    END
    ELSE IF @Operacion = 'DELETE'
    BEGIN
        DELETE FROM Editorial
        WHERE ID_editorial = @ID_editorial;
    END
END;
GO
--
CREATE PROCEDURE [dbo].[GestionGenero]
    @Operacion VARCHAR(10),
    @ID_genero SMALLINT = NULL,
    @Nombre NVARCHAR(100) = NULL
AS
BEGIN
    IF @Operacion = 'SELECT'
    BEGIN
        SELECT * FROM Genero;
    END
    ELSE IF @Operacion = 'INSERT'
    BEGIN
        INSERT INTO Genero (Nombre)
        VALUES (@Nombre);
    END
    ELSE IF @Operacion = 'UPDATE'
    BEGIN
        UPDATE Genero
        SET Nombre = @Nombre
        WHERE ID_genero = @ID_genero;
    END
    ELSE IF @Operacion = 'DELETE'
    BEGIN
        DELETE FROM Genero
        WHERE ID_genero = @ID_genero;
    END
END;
GO
--
CREATE PROCEDURE [dbo].[GestionAutor]
    @Operacion VARCHAR(10),
    @ID_autor SMALLINT = NULL,
    @Nombre NVARCHAR(100) = NULL,
    @Apellido NVARCHAR(100) = NULL
AS
BEGIN
    IF @Operacion = 'SELECT'
    BEGIN
        SELECT * FROM Autor;
    END
    ELSE IF @Operacion = 'INSERT'
    BEGIN
        INSERT INTO Autor (Nombre, Apellido)
        VALUES (@Nombre, @Apellido);
    END
    ELSE IF @Operacion = 'UPDATE'
    BEGIN
        UPDATE Autor
        SET Nombre = @Nombre,
            Apellido = @Apellido
        WHERE ID_autor = @ID_autor;
    END
    ELSE IF @Operacion = 'DELETE'
    BEGIN
        DELETE FROM Autor
        WHERE ID_autor = @ID_autor;
    END
END;
GO
--
CREATE PROCEDURE [dbo].[GestionLibro]
    @Operacion VARCHAR(10),
    @ID_libro INT = NULL,
    @Titulo NVARCHAR(100) = NULL,
    @Numero_ISBN NVARCHAR(13) = NULL,
    @ID_editorial SMALLINT = NULL,
    @Year_publicacion DATETIME = NULL,
    @N_paginas SMALLINT = NULL,
    @Tipo_pasta CHAR(1) = NULL,
    @ID_ubicacion TINYINT = NULL,
    @ID_idioma TINYINT = NULL,
    @ID_condicion TINYINT = NULL
AS
BEGIN
	IF @Operacion = 'SELECTONE'
    BEGIN
        SELECT l.ID_libro, l.Titulo, l.Numero_ISBN, l.ID_editorial, e.Nombre AS Nombre_editorial, 
               l.Year_publicacion, l.N_paginas, l.Tipo_pasta, l.ID_ubicacion, u.Seccion AS Seccion_ubicacion, u.Estanteria AS Estanteria_ubicacion, 
               l.ID_idioma, i.Nombre AS Nombre_idioma, l.ID_condicion, c.Descripcion AS Descripcion_condicion
        FROM Libro l
            JOIN Editorial e ON l.ID_editorial = e.ID_editorial
            JOIN Ubicacion u ON l.ID_ubicacion = u.ID_ubicacion
            JOIN Idioma i ON l.ID_idioma = i.ID_idioma
            JOIN Condicion c ON l.ID_condicion = c.ID_condicion
			WHERE l.ID_libro = @ID_libro;
    END
    ELSE IF @Operacion = 'SELECT'
    BEGIN
        SELECT l.ID_libro, l.Titulo, l.Numero_ISBN, l.ID_editorial, e.Nombre AS Nombre_editorial, 
               l.Year_publicacion, l.N_paginas, l.Tipo_pasta, l.ID_ubicacion, u.Seccion AS Seccion_ubicacion, u.Estanteria AS Estanteria_ubicacion, 
               l.ID_idioma, i.Nombre AS Nombre_idioma, l.ID_condicion, c.Descripcion AS Descripcion_condicion
        FROM Libro l
            JOIN Editorial e ON l.ID_editorial = e.ID_editorial
            JOIN Ubicacion u ON l.ID_ubicacion = u.ID_ubicacion
            JOIN Idioma i ON l.ID_idioma = i.ID_idioma
            JOIN Condicion c ON l.ID_condicion = c.ID_condicion;
    END
    ELSE IF @Operacion = 'INSERT'
    BEGIN
        INSERT INTO Libro (Titulo, Numero_ISBN, ID_editorial, Year_publicacion, N_paginas, Tipo_pasta, ID_ubicacion, ID_idioma, ID_condicion)
        VALUES (@Titulo, @Numero_ISBN, @ID_editorial, @Year_publicacion, @N_paginas, @Tipo_pasta, @ID_ubicacion, @ID_idioma, @ID_condicion);
    END
    ELSE IF @Operacion = 'UPDATE'
    BEGIN
        UPDATE Libro
        SET Titulo = @Titulo,
            Numero_ISBN = @Numero_ISBN,
            ID_editorial = @ID_editorial,
            Year_publicacion = @Year_publicacion,
            N_paginas = @N_paginas,
            Tipo_pasta = @Tipo_pasta,
            ID_ubicacion = @ID_ubicacion,
            ID_idioma = @ID_idioma,
            ID_condicion = @ID_condicion
        WHERE ID_libro = @ID_libro;
    END
    ELSE IF @Operacion = 'DELETE'
    BEGIN
        DELETE FROM Libro
        WHERE ID_libro = @ID_libro;
    END
END;
GO

--
CREATE PROCEDURE [dbo].[GestionGeneroLibro]
    @Operacion VARCHAR(10),
    @ID_genero SMALLINT = NULL,
    @ID_libro INT = NULL
AS
BEGIN
    IF @Operacion = 'SELECT'
    BEGIN
        SELECT gl.ID_genero, g.Nombre AS Nombre_genero
		FROM GeneroLibro gl
		JOIN Genero g ON g.ID_genero = gl.ID_genero
		WHERE ID_libro = @ID_libro
    END
    ELSE IF @Operacion = 'INSERT'
    BEGIN
        INSERT INTO GeneroLibro (ID_genero, ID_libro)
        VALUES (@ID_genero, @ID_libro);
    END
    ELSE IF @Operacion = 'DELETE'
    BEGIN
        DELETE FROM GeneroLibro
        WHERE ID_libro = @ID_libro; --Se borra todos los registros del libro, y despues hacer insert con lo nuevo 
    END
END;
GO
--
CREATE PROCEDURE [dbo].[GestionAutorLibro]
    @Operacion VARCHAR(10),
    @ID_autor SMALLINT = NULL,
    @ID_libro INT = NULL
AS
BEGIN
    IF @Operacion = 'SELECT'
    BEGIN
        SELECT al.ID_autor, a.Nombre AS Nombre_autor
		FROM AutorLibro al
		JOIN Autor a ON a.ID_autor = al.ID_autor
		WHERE ID_libro = @ID_libro
    END
    ELSE IF @Operacion = 'INSERT'
    BEGIN
        INSERT INTO AutorLibro (ID_autor, ID_libro)
        VALUES (@ID_autor, @ID_libro);
    END
    ELSE IF @Operacion = 'DELETE'
    BEGIN
        DELETE FROM AutorLibro
        WHERE ID_libro = @ID_libro; --Se borra todos los registros del libro, y despues hacer insert con lo nuevo 
    END
END;
GO
--
CREATE PROCEDURE [dbo].[GestionCargo]
    @Operacion VARCHAR(10),
    @ID_cargo TINYINT = NULL,
    @Descripcion NVARCHAR(100) = NULL,
    @ID_rol TINYINT = NULL
AS
BEGIN
    IF @Operacion = 'SELECT'
    BEGIN
        SELECT c.ID_cargo, c.Descripcion, c.ID_rol, r.Descripcion AS Descripcion_rol
        FROM Cargo c
        JOIN Rol r ON c.ID_rol = r.ID_rol;
    END
    ELSE IF @Operacion = 'INSERT'
    BEGIN
        INSERT INTO Cargo (Descripcion, ID_rol)
        VALUES (@Descripcion, @ID_rol);
    END
    ELSE IF @Operacion = 'UPDATE'
    BEGIN
        UPDATE Cargo
        SET Descripcion = @Descripcion,
            ID_rol = @ID_rol
        WHERE ID_cargo = @ID_cargo;
    END
    ELSE IF @Operacion = 'DELETE'
    BEGIN
        DELETE FROM Cargo
        WHERE ID_cargo = @ID_cargo;
    END
END
GO

CREATE PROCEDURE [dbo].[GestionEmpleado]
    @Operacion VARCHAR(10),
    @ID_empleado INT = NULL,
    @Nombre NVARCHAR(100) = NULL,
    @Apellido NVARCHAR(100) = NULL,
    @ID_pais TINYINT = NULL,
    @ID_estado TINYINT = NULL,
    @ID_municipio TINYINT = NULL,
    @Calle NVARCHAR(100) = NULL,
    @Correo NVARCHAR(320) = NULL,
    @Numero_telefono NVARCHAR(15) = NULL,
    @Fecha_contratacion DATETIME = NULL,
    @Fecha_nacimiento DATETIME = NULL,
    @ID_cargo TINYINT = NULL,
	@Estado_empleado BIT = NULL,
	@Clave NVARCHAR(100) = NULL
AS
BEGIN
    IF @Operacion = 'SELECT'
    BEGIN
        SELECT e.ID_empleado, e.Nombre, e.Apellido, e.ID_pais, p.Nombre_pais, 
               e.ID_estado, es.Nombre_estado, e.ID_municipio, m.Nombre_municipio, 
               e.Calle, e.Correo, e.Numero_telefono, e.Fecha_contratacion, 
               e.Fecha_nacimiento, e.ID_cargo, e.Clave, c.Descripcion AS Descripcion_cargo,
			   Estado_empleado
        FROM Empleado e
        JOIN Pais p ON e.ID_pais = p.ID_pais
        JOIN Estado es ON e.ID_estado = es.ID_estado
        JOIN Municipio m ON e.ID_municipio = m.ID_municipio
        JOIN Cargo c ON e.ID_cargo = c.ID_cargo;
    END
    ELSE IF @Operacion = 'INSERT'
    BEGIN
        INSERT INTO Empleado (Nombre, Apellido, ID_pais, ID_estado, ID_municipio, Calle, Correo, Numero_telefono, Fecha_contratacion, Fecha_nacimiento, ID_cargo, Estado_empleado, Clave)
        VALUES (@Nombre, @Apellido, @ID_pais, @ID_estado, @ID_municipio, @Calle, @Correo, @Numero_telefono, GETDATE(), @Fecha_nacimiento, @ID_cargo, 1, @Clave);
    END
    ELSE IF @Operacion = 'UPDATE'
    BEGIN
        UPDATE Empleado
        SET Nombre = @Nombre,
            Apellido = @Apellido,
            ID_pais = @ID_pais,
            ID_estado = @ID_estado,
            ID_municipio = @ID_municipio,
            Calle = @Calle,
            Correo = @Correo,
            Numero_telefono = @Numero_telefono,
            Fecha_nacimiento = @Fecha_nacimiento,
            ID_cargo = @ID_cargo,
			Estado_empleado = @Estado_empleado
        WHERE ID_empleado = @ID_empleado;
    END
END;
GO
--
CREATE PROCEDURE [dbo].[GestionCliente]
    @Operacion VARCHAR(10),
    @ID_cliente INT = NULL,
    @Nombre NVARCHAR(100) = NULL,
    @Apellido NVARCHAR(100) = NULL,
    @ID_pais TINYINT = NULL,
    @ID_estado TINYINT = NULL,
    @ID_municipio TINYINT = NULL,
    @Calle NVARCHAR(100) = NULL,
    @Correo NVARCHAR(320) = NULL,
    @Numero_telefono NVARCHAR(15) = NULL,
    @Fecha_registro DATETIME = NULL,
    @Fecha_nacimiento DATETIME = NULL,
    @Estado_renta BIT = NULL
AS
BEGIN
    IF @Operacion = 'SELECT'
    BEGIN
        SELECT c.ID_cliente, c.Nombre, c.Apellido, c.ID_pais, p.Nombre_pais, c.ID_estado, e.Nombre_estado, c.ID_municipio, m.Nombre_municipio, 
               c.Calle, c.Correo, c.Numero_telefono, c.Fecha_registro, c.Fecha_nacimiento, c.Estado_renta
        FROM Cliente c
        JOIN Pais p ON c.ID_pais = p.ID_pais
        JOIN Estado e ON c.ID_estado = e.ID_estado
        JOIN Municipio m ON c.ID_municipio = m.ID_municipio;
    END
    ELSE IF @Operacion = 'INSERT'
    BEGIN
        INSERT INTO Cliente (Nombre, Apellido, ID_pais, ID_estado, ID_municipio, Calle, Correo, Numero_telefono, Fecha_registro, Fecha_nacimiento, Estado_renta)
        VALUES (@Nombre, @Apellido, @ID_pais, @ID_estado, @ID_municipio, @Calle, @Correo, @Numero_telefono, GETDATE(), @Fecha_nacimiento, @Estado_renta);
    END
    ELSE IF @Operacion = 'UPDATE'
    BEGIN
        UPDATE Cliente
        SET Nombre = @Nombre,
            Apellido = @Apellido,
            ID_pais = @ID_pais,
            ID_estado = @ID_estado,
            ID_municipio = @ID_municipio,
            Calle = @Calle,
            Correo = @Correo,
            Numero_telefono = @Numero_telefono,
            Fecha_nacimiento = @Fecha_nacimiento,
            Estado_renta = @Estado_renta
        WHERE ID_cliente = @ID_cliente;
    END
END;
GO
--
CREATE PROCEDURE [dbo].[GestionRenta]
    @Operacion VARCHAR(10),
    @ID_renta INT = NULL,
    @Fecha_renta DATETIME = NULL,
    @Fecha_devolucion DATETIME = NULL,
    @Fecha_devolucion_real DATETIME = NULL,
    @ID_cliente INT = NULL
AS
BEGIN
    IF @Operacion = 'SELECT'
    BEGIN
        SELECT * FROM Renta;
    END
    ELSE IF @Operacion = 'INSERT'
    BEGIN
        -- Verificar si el cliente existe
        IF NOT EXISTS (
            SELECT 1 
            FROM Cliente 
            WHERE ID_cliente = @ID_cliente
        )
        BEGIN
            -- Si el cliente no existe, lanzar un error
            RAISERROR('Error: El cliente con ID %d no existe.', 16, 1, @ID_cliente);
            RETURN; -- Termina el procedimiento aquí
        END

        -- Verificar si el cliente tiene Estado_renta activo
        IF NOT EXISTS (
            SELECT 1 
            FROM Cliente 
            WHERE ID_cliente = @ID_cliente 
            AND Estado_renta = 1
        )
        BEGIN
            -- Usar RAISERROR para que se pueda capturar el mensaje en la API
            RAISERROR('Error: El cliente no está habilitado para realizar una renta.', 16, 1);
            RETURN; -- Termina el procedimiento aquí
        END

        INSERT INTO Renta (Fecha_renta, Fecha_devolucion, Fecha_devolucion_real, ID_cliente)
        VALUES (GETDATE(), @Fecha_devolucion, @Fecha_devolucion_real, @ID_cliente);

        PRINT 'Renta insertada correctamente.';
    END
    ELSE IF @Operacion = 'UPDATE'
    BEGIN
        UPDATE Renta
        SET Fecha_devolucion_real = GETDATE()
        WHERE ID_renta = @ID_renta;
    END
    ELSE IF @Operacion = 'DELETE'
    BEGIN
        DELETE FROM Renta
        WHERE ID_renta = @ID_renta;
    END
END;
GO



CREATE PROCEDURE [dbo].[GestionDetalleRenta]
    @Operacion VARCHAR(10),
	@ID_detalle_renta INT = NULL,
    @ID_renta INT = NULL,
    @ID_libro INT = NULL,
	@ID_condicion TINYINT = NULL
AS
BEGIN
    IF @Operacion = 'SELECT'
    BEGIN
        SELECT dr.ID_detalle_renta, dr.ID_renta, dr.ID_libro, dr.ID_condicion, c.Descripcion FROM DetalleRenta dr
		JOIN Condicion c ON dr.ID_condicion = c.ID_condicion
		WHERE dr.ID_renta = @ID_renta;
    END
    ELSE IF @Operacion = 'INSERT'
    BEGIN
        INSERT INTO DetalleRenta (ID_renta, ID_libro, ID_condicion)
        VALUES (@ID_renta, @ID_libro, @ID_condicion);
    END
    ELSE IF @Operacion = 'UPDATE'
    BEGIN
        UPDATE DetalleRenta
        SET ID_renta = @ID_renta,
            ID_libro = @ID_libro,
            ID_condicion = @ID_condicion
        WHERE ID_detalle_renta = @ID_detalle_renta;
    END
    ELSE IF @Operacion = 'DELETE'
    BEGIN
        DELETE FROM DetalleRenta
        WHERE ID_detalle_renta = @ID_detalle_renta;
    END
END;
GO
--
CREATE PROCEDURE [dbo].[GestionTipoMulta]
    @Operacion VARCHAR(10),
    @ID_tipo_multa SMALLINT = NULL,
    @Descripcion NVARCHAR(100) = NULL,
    @Tarifa MONEY = NULL
AS
BEGIN
    IF @Operacion = 'SELECT'
    BEGIN
        SELECT * FROM TipoMulta;
    END
    ELSE IF @Operacion = 'INSERT'
    BEGIN
        INSERT INTO TipoMulta (Descripcion, Tarifa)
        VALUES (@Descripcion, @Tarifa);
    END
    ELSE IF @Operacion = 'UPDATE'
    BEGIN
        UPDATE TipoMulta
        SET Descripcion = @Descripcion,
            Tarifa = @Tarifa
        WHERE ID_tipo_multa = @ID_tipo_multa;
    END
    ELSE IF @Operacion = 'DELETE'
    BEGIN
        DELETE FROM TipoMulta
        WHERE ID_tipo_multa = @ID_tipo_multa;
    END
END;
GO
--
CREATE PROCEDURE [dbo].[GestionMulta]
    @Operacion VARCHAR(10),
    @ID_multa INT = NULL,
    @Motivo NVARCHAR(100) = NULL,
    @Monto MONEY = NULL,
    @Metodo_pago NVARCHAR(30) = NULL,
    @Numero_tarjeta NVARCHAR(16) = NULL,
    @Fecha_multa DATETIME = NULL,
    @ID_tipo_multa SMALLINT = NULL,
    @ID_renta INT = NULL
AS
BEGIN
    IF @Operacion = 'SELECT'
    BEGIN
        SELECT * FROM Multa;
    END
    ELSE IF @Operacion = 'INSERT'
    BEGIN
        INSERT INTO Multa (Motivo, Monto, Metodo_pago, Numero_tarjeta, Fecha_multa, ID_tipo_multa, ID_renta)
        VALUES (@Motivo, @Monto, @Metodo_pago, @Numero_tarjeta, GETDATE(), @ID_tipo_multa, @ID_renta);
    END
    ELSE IF @Operacion = 'UPDATE'
    BEGIN
        UPDATE Multa
        SET Motivo = @Motivo,
            Monto = @Monto,
            Metodo_pago = @Metodo_pago,
            Numero_tarjeta = @Numero_tarjeta,
            ID_tipo_multa = @ID_tipo_multa,
            ID_renta = @ID_renta
        WHERE ID_multa = @ID_multa;
    END
    ELSE IF @Operacion = 'DELETE'
    BEGIN
        DELETE FROM Multa
        WHERE ID_multa = @ID_multa;
    END
END;
GO
--
CREATE PROCEDURE [dbo].[ObtenerUltimaRenta]
AS
BEGIN
    SELECT TOP 1
        ID_renta,
        Fecha_renta,
        Fecha_devolucion,
        Fecha_devolucion_real,
        ID_cliente
    FROM
        Renta
    ORDER BY
        ID_renta DESC;
END;
GO
--
--CREATE PROCEDURE [dbo].[Login]
--@ID_empleado INT
--AS
--BEGIN
--	SELECT e.Clave AS Clave, c.ID_rol As ID_rol, e.Estado_empleado FROM Empleado e
--	JOIN Cargo c ON e.ID_cargo = c.ID_cargo
--	WHERE ID_empleado = @ID_empleado
--END
--GO

CREATE PROCEDURE [dbo].[Login]
    @ID_empleado INT
AS
BEGIN
    -- Verificar si el empleado existe
    IF NOT EXISTS (
        SELECT 1 
        FROM Empleado 
        WHERE ID_empleado = @ID_empleado
    )
    BEGIN
        -- Si el empleado no existe, lanzar un error
        RAISERROR('Error: El empleado con ID %d no existe.', 16, 1, @ID_empleado);
        RETURN; -- Termina el procedimiento aquí
    END

    -- Si el empleado existe, realizar la consulta
    SELECT 
        e.Clave AS Clave, 
        c.ID_rol AS ID_rol, 
        e.Estado_empleado 
    FROM Empleado e
    JOIN Cargo c ON e.ID_cargo = c.ID_cargo
    WHERE e.ID_empleado = @ID_empleado;
END
GO


CREATE PROCEDURE [dbo].[ObtenerUltimoLibro]
AS
BEGIN
    SELECT TOP 1
        ID_libro
        FROM
        Libro
    ORDER BY
        ID_libro DESC;
END;
GO

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------Triggers----------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\

