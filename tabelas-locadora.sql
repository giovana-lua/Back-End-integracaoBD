CREATE TABLE tbl_ator (
id_ator INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
nome VARCHAR (100) NOT NULL,
biografia TEXT NOT NULL,
data_nascimento DATE NOT NULL,
data_falecimento DATE NULL,
pais_origem VARCHAR(100) NOT NULL
);

insert into tbl_ator(nome, biografia, data_nascimento, data_falecimento, pais_origem) 
values ("Nina Dobrev", "Nina Dobrev é uma atriz e produtora búlgaro-canadense nascida em 9 de janeiro de 1989, em Sófia, Bulgária. Ela se mudou para o Canadá quando tinha dois anos e ficou conhecida por seus papéis como Mia Jones em Degrassi: The Next Generation e principalmente como Elena Gilbert e Katherine Pierce na série The Vampire Diaries. Sua carreira também inclui aparições em filmes como As Vantagens de Ser Invisível, xXx: Reativado e várias comédias românticas.", "1989-01-09", null, "Bulgária" );

CREATE TABLE tbl_filme_genero (
id_filme_genero int NOT NULL PRIMARY KEY AUTO_INCREMENT,
id_filme int NOT NULL,
id_genero INT NOT NULL,

constraint FK_FILME_FILME_GENERO
foreign key (id_filme)
references tbl_filme(id),

constraint FK_GENERO_FILME_GENERO
foreign key (id_genero)
references tbl_genero(id_genero)


);