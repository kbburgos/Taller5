create database GoodReads;
use GoodReads;


create table Usuario(
	cedula varchar(10) primary key not null,
    nombre varchar(50),
    apellido varchar(50),
    correo varchar(50),
    fechaNacimiento date
    );
    
insert into Usuario values("0910786615", "Alejandra", "Avalos", "aleavalos@gmail.com","1996-05-05");
insert into Usuario values("0910786677", "Travis", "Maddox", "tmaddox@gmail.com","1978-05-05");
insert into Usuario values("0910734215", "Marishka", "Bueno", "mbueno@gmail.com","2000-08-12");
insert into Usuario values("0915567415", "Critopher", "Melloni", "cmelloni@gmail.com","1980-05-05");
insert into Usuario values("0910088796", "Dik", "Wolf", "aleavalos@gmail.com","1996-07-07");

create table Autor(
	id int primary key auto_increment,
    nombre_completo varchar(120)
    );
    
create table Libro(
	isbn varchar(15) primary key not null,
    titulo varchar(100),
    autor int,
    FOREIGN KEY (autor) REFERENCES Autor(id)
    );
    
create table Calificacion(
	id int primary key auto_increment,
    usuario varchar(10),
    libro varchar(15),
    FOREIGN KEY (libro) REFERENCES Libro(isbn),
    FOREIGN KEY (usuario) REFERENCES Usuario(cedula)
    );
