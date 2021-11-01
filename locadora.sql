-- MySQL dump 10.13  Distrib 8.0.25, for Linux (x86_64)
--
-- Host: localhost    Database: locadora
-- ------------------------------------------------------
-- Server version	8.0.25-0ubuntu0.20.10.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `nome` varchar(255) NOT NULL,
  `cpf` varchar(20) NOT NULL,
  `rg` varchar(15) NOT NULL,
  `data_nascimento` date NOT NULL,
  `sexo` char(1) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `celular` varchar(20) NOT NULL,
  `rua` varchar(100) NOT NULL,
  `numero` int NOT NULL,
  `complemento` varchar(100) DEFAULT NULL,
  `bairro` varchar(100) NOT NULL,
  `cep` varchar(20) NOT NULL,
  `cidade` varchar(50) NOT NULL,
  `estado` varchar(50) NOT NULL,
  `login` varchar(20) NOT NULL,
  `senha` varchar(20) NOT NULL,
  `numero_cnh` varchar(30) NOT NULL,
  `registro_cnh` varchar(30) NOT NULL,
  `validade_cnh` date NOT NULL,
  `categoria_cnh` varchar(5) NOT NULL,
  `locatario_ativo` tinyint(1) NOT NULL,
  `email_confirmado` tinyint(1) DEFAULT NULL,
  `email_confirmacao` varchar(100) DEFAULT NULL,
  `user_session` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`cpf`),
  UNIQUE KEY `cpf` (`cpf`),
  UNIQUE KEY `rg` (`rg`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `celular` (`celular`),
  UNIQUE KEY `login` (`login`),
  UNIQUE KEY `numero_cnh` (`numero_cnh`),
  UNIQUE KEY `registro_cnh` (`registro_cnh`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cupons`
--

DROP TABLE IF EXISTS `cupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cupons` (
  `id_cupom` int NOT NULL AUTO_INCREMENT,
  `cupom` varchar(20) NOT NULL,
  `porcentagem_desconto` int NOT NULL,
  PRIMARY KEY (`id_cupom`),
  UNIQUE KEY `id_cupom` (`id_cupom`),
  UNIQUE KEY `cupom` (`cupom`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cupons`
--

LOCK TABLES `cupons` WRITE;
/*!40000 ALTER TABLE `cupons` DISABLE KEYS */;
INSERT INTO `cupons` VALUES (1,'UNICSUL',10),(2,'GEIZA',15),(3,'CARRO',5);
/*!40000 ALTER TABLE `cupons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funcionarios`
--

DROP TABLE IF EXISTS `funcionarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `funcionarios` (
  `nome` varchar(255) NOT NULL,
  `cpf` varchar(20) NOT NULL,
  `rg` varchar(15) NOT NULL,
  `data_nascimento` date NOT NULL,
  `sexo` char(1) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `celular` varchar(20) NOT NULL,
  `rua` varchar(100) NOT NULL,
  `numero` int NOT NULL,
  `complemento` varchar(100) DEFAULT NULL,
  `bairro` varchar(100) NOT NULL,
  `cep` varchar(20) NOT NULL,
  `cidade` varchar(50) NOT NULL,
  `estado` varchar(50) NOT NULL,
  `login` varchar(20) NOT NULL,
  `senha` varchar(20) NOT NULL,
  `numero_cnh` varchar(30) NOT NULL,
  `registro_cnh` varchar(30) NOT NULL,
  `validade_cnh` date NOT NULL,
  `categoria_cnh` varchar(5) NOT NULL,
  `data_admissao` date NOT NULL,
  `data_demissao` date DEFAULT NULL,
  `salario` decimal(10,0) NOT NULL,
  `cargo` varchar(50) NOT NULL,
  `locatario_ativo` tinyint(1) NOT NULL,
  PRIMARY KEY (`cpf`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionarios`
--

LOCK TABLES `funcionarios` WRITE;
/*!40000 ALTER TABLE `funcionarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `funcionarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locacao_devolucao`
--

DROP TABLE IF EXISTS `locacao_devolucao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locacao_devolucao` (
  `id_locacao` varchar(20) NOT NULL,
  `cpf_locatario` varchar(20) NOT NULL,
  `id_veiculo` int NOT NULL,
  `data_locacao` date NOT NULL,
  `hora_locacao` time NOT NULL,
  `data_retirada` date NOT NULL,
  `hora_retirada` time NOT NULL,
  `data_devolucao` date NOT NULL,
  `hora_devolucao` time NOT NULL,
  `tempo_locacao` varchar(10) NOT NULL,
  `id_funcionario` int NOT NULL,
  `valor_total_locacao` varchar(50) NOT NULL,
  `cupom_aplicado` varchar(50) NOT NULL,
  `valor_descontos` varchar(50) NOT NULL,
  `valor_total_a_pagar` varchar(50) NOT NULL,
  `local_retirada` varchar(50) NOT NULL,
  `local_devolucao` varchar(50) NOT NULL,
  `cadeirinha` tinyint(1) NOT NULL,
  `capa_cinto_animais` tinyint(1) NOT NULL,
  `pagamento_no_site` tinyint(1) NOT NULL,
  `cartao_pagamento` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_locacao`),
  UNIQUE KEY `id_locacao` (`id_locacao`),
  UNIQUE KEY `cpf_locatario` (`cpf_locatario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locacao_devolucao`
--

LOCK TABLES `locacao_devolucao` WRITE;
/*!40000 ALTER TABLE `locacao_devolucao` DISABLE KEYS */;
/*!40000 ALTER TABLE `locacao_devolucao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `veiculos`
--

DROP TABLE IF EXISTS `veiculos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `veiculos` (
  `id_carro` int NOT NULL,
  `renavam` varchar(100) NOT NULL,
  `placa` varchar(30) NOT NULL,
  `chassi` varchar(30) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `modelo` varchar(50) NOT NULL,
  `ano` int NOT NULL,
  `numero_portas` int NOT NULL,
  `motor` varchar(50) NOT NULL,
  `cambio_automatico` tinyint(1) NOT NULL,
  `combustivel` varchar(30) NOT NULL,
  `img_path` varchar(100) NOT NULL,
  `subtitles` varchar(250) NOT NULL,
  `local_retirada` varchar(50) NOT NULL,
  `available_car` tinyint(1) NOT NULL,
  `valor_diaria` varchar(50) NOT NULL,
  `cpf_cliente_locatario` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_carro`),
  UNIQUE KEY `id_carro` (`id_carro`),
  UNIQUE KEY `cpf_cliente_locatario` (`cpf_cliente_locatario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `veiculos`
--

LOCK TABLES `veiculos` WRITE;
/*!40000 ALTER TABLE `veiculos` DISABLE KEYS */;
INSERT INTO `veiculos` VALUES (100006,'113264049','BRH1M11','124c49100a0621158','Fiat','147',1976,2,'1.0, 55 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car10.jpg','Carro que inaugurou a FIAT no Brasil.','Santo Amaro',1,'299.99',NULL),(100015,'110000009','BRH1J18','124c49100a1521158','Fiat','147',1976,2,'1.0, 55 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car10.jpg','Carro que inaugurou a FIAT no Brasil.','Jardim Paulista',1,'299.99',NULL),(102345,'110000000','BRB1E18','124c59safwb321158','Fiat','147',1976,2,'1.0, 55 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car10.jpg','Carro que inaugurou a FIAT no Brasil.','Campo Limpo',1,'299.99',NULL),(102443,'110300009','BRH1H29','124c49102a4321158','Fiat','147',1976,2,'1.0, 55 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car10.jpg','Carro que inaugurou a FIAT no Brasil.','Barra Funda',1,'299.99',NULL),(103155,'110015269','BRH1O12','124c49103a5521158','Fiat','147',1976,2,'1.0, 55 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car10.jpg','Carro que inaugurou a FIAT no Brasil.','Vila Mariana',1,'299.99',NULL),(104445,'910000009','BRH2K18','234c49104a4591tg8','Volkswagen','Kombi',1957,3,'1.6, 80 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car2.jpg','Volkswagen Kombi, veículo comercial ligeiro, econômico e espaçoso.','Socorro',1,'299.99',NULL),(106655,'110040009','BRH1G58','124c49106a5521158','Fiat','147',1976,2,'1.0, 55 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car10.jpg','Carro que inaugurou a FIAT no Brasil.','Vila Guilherme',1,'299.99',NULL),(108215,'110000609','BRH1D61','124c49108a1521158','Fiat','147',1976,2,'1.0, 55 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car10.jpg','Carro que inaugurou a FIAT no Brasil.','Cachoeirinha',1,'299.99',NULL),(120546,'000001909','BRH1O12','90fd4c120a46ecas8','Fiat','Uno Turbo i.e.',1994,4,'1.4, 118 cv, 3.000 rpm',0,'Gasolina','/src/img/car-database/car15.jpg','O primeiro turbinado de fábrica e com injeção eletrônica.','Vila Mariana',1,'299.99',NULL),(122357,'001100269','BRH1O12','344d47122a57e1158','Alfa Romeo','Alfa Romeo 2000',2000,4,'2.0, 110 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car12.jpg','Veículo conversível da fabricante italiana Alfa Romeo.','Vila Mariana',1,'299.99',NULL),(123085,'910000009','BRH1K18','134c49123a8521t1s','Volkswagen','Fusca',1936,2,'1.6, 65 cv, 4 Cilindros',0,'Gasolina','/src/img/car-database/car1.jpg','Volkswagen Typ 1, popularmente conhecido como Fusca no Brasil, ideal para passeios em família.','Socorro',1,'299.99',NULL),(123159,'100005009','BRH1F59','134c49123a5921t1s','Volkswagen','Fusca',1936,2,'1.6, 65 cv, 4 Cilindros',0,'Gasolina','/src/img/car-database/car1.jpg','Volkswagen Typ 1, popularmente conhecido como Fusca no Brasil, ideal para passeios em família.','Pirituba',1,'299.99',NULL),(123448,'100000609','BRH1D65','134c49123a4821t1s','Volkswagen','Fusca',1936,2,'1.6, 65 cv, 4 Cilindros',0,'Gasolina','/src/img/car-database/car1.jpg','Volkswagen Typ 1, popularmente conhecido como Fusca no Brasil, ideal para passeios em família.','Vila Matilde',1,'299.99',NULL),(123453,'100000079','BRH1B15','134c49123a5321t1s','Volkswagen','Fusca',1936,2,'1.6, 65 cv, 4 Cilindros',0,'Gasolina','/src/img/car-database/car1.jpg','Volkswagen Typ 1, popularmente conhecido como Fusca no Brasil, ideal para passeios em família.','Lajeado',1,'299.99',NULL),(123456,'100000000','BRA1E19','134c69e6fsb321t1s','Volkswagen','Fusca',1936,2,'1.6, 65 cv, 4 Cilindros',0,'Gasolina','/src/img/car-database/car1.jpg','Volkswagen Typ 1, popularmente conhecido como Fusca no Brasil, ideal para passeios em família.','Sapopemba',1,'299.99',NULL),(126666,'102000009','BRH1I19','134c49126a6621t1s','Volkswagen','Fusca',1936,2,'1.6, 65 cv, 4 Cilindros',0,'Gasolina','/src/img/car-database/car1.jpg','Volkswagen Typ 1, popularmente conhecido como Fusca no Brasil, ideal para passeios em família.','Vila Leopoldina',1,'299.99',NULL),(141205,'910000509','BRH1K16','124c49141a0521158','Fiat','147',1976,2,'1.0, 55 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car10.jpg','Carro que inaugurou a FIAT no Brasil.','Ipiranga',1,'299.99',NULL),(146345,'110000609','BRH1C59','124c49146a4521158','Fiat','147',1976,2,'1.0, 55 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car10.jpg','Carro que inaugurou a FIAT no Brasil.','Pari',1,'299.99',NULL),(154948,'000110269','BRH1O12','564d49154a48ecas8','Dodge','Charger R/T',1969,4,'5.2, 396 cv, V8',0,'Gasolina','/src/img/car-database/car13.jpg','Primeiro muscle car brasileiro, feito pela Chrysler nos anos 70.','Vila Mariana',1,'299.99',NULL),(156009,'080045509','BRH1L16','78404c156a09ecas8','Volkswagen','SP2',1972,4,'1.7, 54 cv, boxer',0,'Gasolina','/src/img/car-database/car14.jpg','Um cupê de estilo esportivo.','Parelheiros',1,'299.99',NULL),(160590,'000164109','BRH1M14','90fd4c160a90ecas8','Fiat','Uno Turbo i.e.',1994,4,'1.4, 118 cv, 3.000 rpm',0,'Gasolina','/src/img/car-database/car15.jpg','O primeiro turbinado de fábrica e com injeção eletrônica.','Moema',1,'299.99',NULL),(161066,'100164009','BRH1M14','134c49161a6621t1s','Volkswagen','Fusca',1936,2,'1.6, 65 cv, 4 Cilindros',0,'Gasolina','/src/img/car-database/car1.jpg','Volkswagen Typ 1, popularmente conhecido como Fusca no Brasil, ideal para passeios em família.','Moema',1,'299.99',NULL),(163210,'000011269','BRH1O12','78404c163a10ecas8','Volkswagen','SP2',1972,4,'1.7, 54 cv, boxer',0,'Gasolina','/src/img/car-database/car14.jpg','Um cupê de estilo esportivo.','Vila Mariana',1,'299.99',NULL),(178901,'000001679','BRH6C65','634949178a0121158','Chevrolet','Opala',1968,4,'1.8, 171 cv, 6 cilindros',0,'Gasolina','/src/img/car-database/car6.jpg','Primeiro automóvel de passeio fabricado pela montadora no país, rápido e estiloso.','Itaquera',1,'299.99',NULL),(182345,'110000008','BRH1A62','124c49182a4521158','Fiat','147',1976,2,'1.0, 55 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car10.jpg','Carro que inaugurou a FIAT no Brasil.','Ermelino Matarazzo',1,'299.99',NULL),(188966,'100340009','BRH1H38','134c49188a6621t1s','Volkswagen','Fusca',1936,2,'1.6, 65 cv, 4 Cilindros',0,'Gasolina','/src/img/car-database/car1.jpg','Volkswagen Typ 1, popularmente conhecido como Fusca no Brasil, ideal para passeios em família.','Morumbi',1,'299.99',NULL),(190113,'900000519','BRH8K17','83494c190a1321158','Chevrolet','Kadett Gsi',1989,2,'2.0 carburado, 150 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car8.jpg','Ideal para passeios, com câmbio automático, ar-condicionado e a direção hidráulica.','Ipiranga',1,'299.99',NULL),(199476,'011015269','BRH1O12','234c49199a76e1158','Fiat','Romi-Isetta',1956,1,'9,5 hp, 35 cv, 4500 RPM',0,'Gasolina','/src/img/car-database/car11.jpg','Veículo de apenas 2,28m de comprimento e espaço para duas pessoas.','Vila Mariana',1,'299.99',NULL),(231787,'010005009','BRH2F59','234c49231a8791tg8','Volkswagen','Kombi',1957,3,'1.6, 80 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car2.jpg','Volkswagen Kombi, veículo comercial ligeiro, econômico e espaçoso.','Pirituba',1,'299.99',NULL),(234087,'010164009','BRH2N14','234c49234a8791tg8','Volkswagen','Kombi',1957,3,'1.6, 80 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car2.jpg','Volkswagen Kombi, veículo comercial ligeiro, econômico e espaçoso.','Moema',1,'299.99',NULL),(234487,'012000009','BRH2I19','234c49234a8791tg8','Volkswagen','Kombi',1957,3,'1.6, 80 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car2.jpg','Volkswagen Kombi, veículo comercial ligeiro, econômico e espaçoso.','Vila Leopoldina',1,'299.99',NULL),(234527,'010000079','BRH2B15','234c49234a2791tg8','Volkswagen','Kombi',1957,3,'1.6, 80 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car2.jpg','Volkswagen Kombi, veículo comercial ligeiro, econômico e espaçoso.','Lajeado',1,'299.99',NULL),(234567,'010000000','BRA2E19','234c69e6fwb391tg8','Volkswagen','Kombi',1957,3,'1.6, 80 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car2.jpg','Volkswagen Kombi, veículo comercial ligeiro, econômico e espaçoso.','Aricanduva',1,'299.99',NULL),(234592,'010000609','BRH2D65','234c49234a9291tg8','Volkswagen','Kombi',1957,3,'1.6, 80 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car2.jpg','Volkswagen Kombi, veículo comercial ligeiro, econômico e espaçoso.','Vila Matilde',1,'299.99',NULL),(237737,'010300009','BRH2H38','234c49237a3791tg8','Volkswagen','Kombi',1957,3,'1.6, 80 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car2.jpg','Volkswagen Kombi, veículo comercial ligeiro, econômico e espaçoso.','Raposo Tavares',1,'299.99',NULL),(284567,'010000008','BRH2A62','234c49284a6791tg8','Volkswagen','Kombi',1957,3,'1.6, 80 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car2.jpg','Volkswagen Kombi, veículo comercial ligeiro, econômico e espaçoso.','Bom Retiro',1,'299.99',NULL),(294007,'080045809','BRH2L15','234c49294a0791tg8','Volkswagen','Kombi',1957,3,'1.6, 80 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car2.jpg','Volkswagen Kombi, veículo comercial ligeiro, econômico e espaçoso.','Marsilac',1,'299.99',NULL),(313598,'001005009','BRH3F69','334c49313a9821uf8','Volkswagen','Gol GTI',1988,2,'2.0, 16 válvulas, 4 cilindros, 120 cv',0,'Gasolina','/src/img/car-database/car3.jpg','Conhecido por inaugurar a era da injeção eletrônica no Brasil, o carro combina luxo e conforto em um só veículo.','Santana',1,'299.99',NULL),(315096,'001164009','BRH3N14','334c49315a9621uf8','Volkswagen','Gol GTI',1988,2,'2.0, 16 válvulas, 4 cilindros, 120 cv',0,'Gasolina','/src/img/car-database/car3.jpg','Conhecido por inaugurar a era da injeção eletrônica no Brasil, o ca4ro combina luxo e conforto em um só veículo.','Moema',1,'299.99',NULL),(320008,'901000009','BRH3K17','334c49320a0821uf8','Volkswagen','Gol GTI',1988,2,'2.0, 16 válvulas, 4 cilindros, 120 cv',0,'Gasolina','/src/img/car-database/car3.jpg','Conhecido por inaugurar a era da injeção eletrônica no Brasil, o carro combina luxo e conforto em um só veículo.','Socorro',1,'299.99',NULL),(336690,'002010009','BRH5I23','534949336a9031t18','Ford','Escort Xr3',1983,2,'1.8, 116 cv, 5600 RPM, AP',0,'Gasolina','/src/img/car-database/car5.jpg','Primeiro carro mundial da Ford, o Escort surgiu na Europa em 1968.','Pinheiros',1,'299.99',NULL),(341158,'001300009','BRH3H38','334c49341a5821uf8','Volkswagen','Gol GTI',1988,2,'2.0, 16 válvulas, 4 cilindros, 120 cv',0,'Gasolina','/src/img/car-database/car3.jpg','Conhecido por inaugurar a era da injeção eletrônica no Brasil, o carro combina luxo e conforto em um só veículo.','Raposo Tavares',1,'299.99',NULL),(341348,'001000609','BRH3D36','334c49341a4821uf8','Volkswagen','Gol GTI',1988,2,'2.0, 16 válvulas, 4 cilindros, 120 cv',0,'Gasolina','/src/img/car-database/car3.jpg','Conhecido por inaugurar a era da injeção eletrônica no Brasil, o carro combina luxo e conforto em um só veículo.','Jardim Helena',1,'299.99',NULL),(345578,'001000079','BRH3B15','334c49345a7821uf8','Volkswagen','Gol GTI',1988,2,'2.0, 16 válvulas, 4 cilindros, 120 cv',0,'Gasolina','/src/img/car-database/car3.jpg','Conhecido por inaugurar a era da injeção eletrônica no Brasil, o carro combina luxo e conforto em um só veículo.','Itaim Paulista',1,'299.99',NULL),(345678,'001000000','BRA3E19','334c69e6fwb321uf8','Volkswagen','Gol GTI',1988,2,'2.0, 16 válvulas, 4 cilindros, 120 cv',0,'Gasolina','/src/img/car-database/car3.jpg','Conhecido por inaugurar a era da injeção eletrônica no Brasil, o carro combina luxo e conforto em um só veículo.','Bela Vista',1,'299.99',NULL),(347678,'001000008','BRH3A62','334c49347a7821uf8','Volkswagen','Gol GTI',1988,2,'2.0, 16 válvulas, 4 cilindros, 120 cv',0,'Gasolina','/src/img/car-database/car3.jpg','Conhecido por inaugurar a era da injeção eletrônica no Brasil, o carro combina luxo e conforto em um só veículo.','Liberdade',1,'299.99',NULL),(377998,'002000009','BRH3I19','334c49377a9821uf8','Volkswagen','Gol GTI',1988,2,'2.0, 16 válvulas, 4 cilindros, 120 cv',0,'Gasolina','/src/img/car-database/car3.jpg','Conhecido por inaugurar a era da injeção eletrônica no Brasil, o carro combina luxo e conforto em um só veículo.','Pinheiros',1,'299.99',NULL),(385048,'083245849','BRH3L15','334c49385a4821uf8','Volkswagen','Gol GTI',1988,2,'2.0, 16 válvulas, 4 cilindros, 120 cv',0,'Gasolina','/src/img/car-database/car3.jpg','Conhecido por inaugurar a era da injeção eletrônica no Brasil, o carro combina luxo e conforto em um só veículo.','Marsilac',1,'299.99',NULL),(402569,'000165009','BRH4N13','434c49402a697bt18','Ford','Maverick',1973,2,'1.8, 120 cv, V8',0,'Gasolina','/src/img/car-database/car4.jpg','Ford Maverick, reune esportividade e requinte em um carro só.','Moema',1,'299.99',NULL),(405678,'010110009','BRH1J18','564d49405a78ecas8','Dodge','Charger R/T',1969,4,'5.2, 396 cv, V8',0,'Gasolina','/src/img/car-database/car13.jpg','Primeiro muscle car brasileiro, feito pela Chrysler nos anos 70.','Vila Andrade',1,'299.99',NULL),(417789,'000100609','BRH4D36','434c49417a897bt18','Ford','Maverick',1973,2,'1.8, 120 cv, V8',0,'Gasolina','/src/img/car-database/car4.jpg','Ford Maverick, reune esportividade e requinte em um carro só.','Sapopemba',1,'299.99',NULL),(451279,'000105009','BRH4F69','434c49451a797bt18','Ford','Maverick',1973,2,'1.8, 120 cv, V8',0,'Gasolina','/src/img/car-database/car4.jpg','Ford Maverick, reune esportividade e requinte em um carro só.','Tucuruvi',1,'299.99',NULL),(452069,'010011009','BRH1J18','78404c452a69ecas8','Volkswagen','SP2',1972,4,'1.7, 54 cv, boxer',0,'Gasolina','/src/img/car-database/car14.jpg','Um cupê de estilo esportivo.','Vila Andrade',1,'299.99',NULL),(454466,'002100009','BRH4I23','434c49454a667bt18','Ford','Maverick',1973,2,'1.8, 120 cv, V8',0,'Gasolina','/src/img/car-database/car4.jpg','Ford Maverick, reune esportividade e requinte em um carro só.','Pinheiros',1,'299.99',NULL),(455689,'000300009','BRH4H37','434c49455a897bt18','Ford','Maverick',1973,2,'1.8, 120 cv, V8',0,'Gasolina','/src/img/car-database/car4.jpg','Ford Maverick, reune esportividade e requinte em um carro só.','Rio Pequeno',1,'299.99',NULL),(456059,'083245849','BRH4L15','434c49456a597bt18','Ford','Maverick',1973,2,'1.8, 120 cv, V8',0,'Gasolina','/src/img/car-database/car4.jpg','Ford Maverick, reune esportividade e requinte em um carro só.','Campo Belo',1,'299.99',NULL),(456689,'000100008','BRH4A62','434c49456a897bt18','Ford','Maverick',1973,2,'1.8, 120 cv, V8',0,'Gasolina','/src/img/car-database/car4.jpg','Ford Maverick, reune esportividade e requinte em um carro só.','Liberdade',1,'299.99',NULL),(456789,'000100000','BRA4E19','434c69e6fwb37bt18','Ford','Maverick',1973,2,'1.8, 120 cv, V8',0,'Gasolina','/src/img/car-database/car4.jpg','Ford Maverick, reune esportividade e requinte em um carro só.','Campo Limpo',1,'299.99',NULL),(457789,'000100079','BRH4B65','434c49457a897bt18','Ford','Maverick',1973,2,'1.8, 120 cv, V8',0,'Gasolina','/src/img/car-database/car4.jpg','Ford Maverick, reune esportividade e requinte em um carro só.','Itaim Paulista',1,'299.99',NULL),(477059,'900100009','BRH4K17','434c49477a597bt18','Ford','Maverick',1973,2,'1.8, 120 cv, V8',0,'Gasolina','/src/img/car-database/car4.jpg','Ford Maverick, reune esportividade e requinte em um carro só.','Socorro',1,'299.99',NULL),(516370,'000015009','BRH5F69','534949516a7031t18','Ford','Escort Xr3',1983,2,'1.8, 116 cv, 5600 RPM, AP',0,'Gasolina','/src/img/car-database/car5.jpg','Primeiro carro mundial da Ford, o Escort surgiu na Europa em 1968.','Tucuruvi',1,'299.99',NULL),(527890,'000010079','BRH5B65','534949527a9031t18','Ford','Escort Xr3',1983,2,'1.8, 116 cv, 5600 RPM, AP',0,'Gasolina','/src/img/car-database/car5.jpg','Primeiro carro mundial da Ford, o Escort surgiu na Europa em 1968.','Itaquera',1,'299.99',NULL),(550690,'900010009','BRH5K17','534949550a9031t18','Ford','Escort Xr3',1983,2,'1.8, 116 cv, 5600 RPM, AP',0,'Gasolina','/src/img/car-database/car5.jpg','Primeiro carro mundial da Ford, o Escort surgiu na Europa em 1968.','Cidade Ademar',1,'299.99',NULL),(562260,'000310009','BRH5H37','534949562a6031t18','Ford','Escort Xr3',1983,2,'1.8, 116 cv, 5600 RPM, AP',0,'Gasolina','/src/img/car-database/car5.jpg','Primeiro carro mundial da Ford, o Escort surgiu na Europa em 1968.','Rio Pequeno',1,'299.99',NULL),(567050,'000165269','BRH5N13','534949567a5031t18','Ford','Escort Xr3',1983,2,'1.8, 116 cv, 5600 RPM, AP',0,'Gasolina','/src/img/car-database/car5.jpg','Primeiro carro mundial da Ford, o Escort surgiu na Europa em 1968.','Vila Mariana',1,'299.99',NULL),(567850,'000010008','BRH5A62','534949567a5031t18','Ford','Escort Xr3',1983,2,'1.8, 116 cv, 5600 RPM, AP',0,'Gasolina','/src/img/car-database/car5.jpg','Primeiro carro mundial da Ford, o Escort surgiu na Europa em 1968.','Vila Formosa',1,'299.99',NULL),(567890,'000010000','BRA5E19','534969e6fwb331t18','Ford','Escort Xr3',1983,2,'1.8, 116 cv, 5600 RPM, AP',0,'Gasolina','/src/img/car-database/car5.jpg','Primeiro carro mundial da Ford, o Escort surgiu na Europa em 1968.','Bela Vista',1,'299.99',NULL),(600901,'900001509','BRH6K17','634949600a0121158','Chevrolet','Opala',1968,4,'1.8, 171 cv, 6 cilindros',0,'Gasolina','/src/img/car-database/car6.jpg','Primeiro automóvel de passeio fabricado pela montadora no país, rápido e estiloso.','Cidade Ademar',1,'299.99',NULL),(618890,'000010609','BRH5D36','534949618a9031t18','Ford','Escort Xr3',1983,2,'1.8, 116 cv, 5600 RPM, AP',0,'Gasolina','/src/img/car-database/car5.jpg','Primeiro carro mundial da Ford, o Escort surgiu na Europa em 1968.','Sapopemba',1,'299.99',NULL),(649922,'083261849','BRH6L15','634949649a2221158','Chevrolet','Opala',1968,4,'1.8, 171 cv, 6 cilindros',0,'Gasolina','/src/img/car-database/car6.jpg','Primeiro automóvel de passeio fabricado pela montadora no país, rápido e estiloso.','Campo Belo',1,'299.99',NULL),(670711,'000165269','BRH6N13','634949670a1121158','Chevrolet','Opala',1968,4,'1.8, 171 cv, 6 cilindros',0,'Gasolina','/src/img/car-database/car6.jpg','Primeiro automóvel de passeio fabricado pela montadora no país, rápido e estiloso.','Vila Mariana',1,'299.99',NULL),(673221,'000301009','BRH6H37','634949673a2121158','Chevrolet','Opala',1968,4,'1.8, 171 cv, 6 cilindros',0,'Gasolina','/src/img/car-database/car6.jpg','Primeiro automóvel de passeio fabricado pela montadora no país, rápido e estiloso.','Lapa',1,'299.99',NULL),(675501,'012001009','BRH6J23','634949675a0121158','Chevrolet','Opala',1968,4,'1.8, 171 cv, 6 cilindros',0,'Gasolina','/src/img/car-database/car6.jpg','Primeiro automóvel de passeio fabricado pela montadora no país, rápido e estiloso.','Pinheiros',1,'299.99',NULL),(678321,'000045009','BRH6G26','634949678a2121158','Chevrolet','Opala',1968,4,'1.8, 171 cv, 6 cilindros',0,'Gasolina','/src/img/car-database/car6.jpg','Primeiro automóvel de passeio fabricado pela montadora no país, rápido e estiloso.','Tucuruvi',1,'299.99',NULL),(678731,'000001609','BRH6D36','634949678a3121158','Chevrolet','Opala',1968,4,'1.8, 171 cv, 6 cilindros',0,'Gasolina','/src/img/car-database/car6.jpg','Primeiro automóvel de passeio fabricado pela montadora no país, rápido e estiloso.','Sapopemba',1,'299.99',NULL),(678901,'000001000','BRA6E19','634969e6fwb721158','Chevrolet','Opala',1968,4,'1.8, 171 cv, 6 cilindros',0,'Gasolina','/src/img/car-database/car6.jpg','Primeiro automóvel de passeio fabricado pela montadora no país, rápido e estiloso.','Campo Limpo',1,'299.99',NULL),(678904,'000001008','BRH6A62','634949678a0421158','Chevrolet','Opala',1968,4,'1.8, 171 cv, 6 cilindros',0,'Gasolina','/src/img/car-database/car6.jpg','Primeiro automóvel de passeio fabricado pela montadora no país, rápido e estiloso.','Vila Formosa',1,'299.99',NULL),(706502,'900000509','BRH7K17','73494s706a0221158','Chevrolet','Chevette',1973,4,'1.4, 73 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car7.jpg','Linhas modernas com motor de 1.4 litro e 73 cv.','Pedreira',1,'299.99',NULL),(709020,'003260849','BRH7M11','73494s709a2021158','Chevrolet','Chevette',1973,4,'1.4, 73 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car7.jpg','Linhas modernas com motor de 1.4 litro e 73 cv.','Campo Grande',1,'299.99',NULL),(723456,'011000008','BRH1B62','234c49723a56e1158','Fiat','Romi-Isetta',1956,1,'9,5 hp, 35 cv, 4500 RPM',0,'Gasolina','/src/img/car-database/car11.jpg','Veículo de apenas 2,28m de comprimento e espaço para duas pessoas.','Ermelino Matarazzo',1,'299.99',NULL),(732612,'000000609','BRH7C23','73494s732a1221158','Chevrolet','Chevette',1973,4,'1.4, 73 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car7.jpg','Linhas modernas com motor de 1.4 litro e 73 cv.','Itaquera',1,'299.99',NULL),(746012,'000040109','BRH7G58','73494s746a1221158','Chevrolet','Chevette',1973,4,'1.4, 73 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car7.jpg','Linhas modernas com motor de 1.4 litro e 73 cv.','Mandaqui',1,'299.99',NULL),(777412,'010000109','BRH7J23','73494s777a1221158','Chevrolet','Chevette',1973,4,'1.4, 73 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car7.jpg','Linhas modernas com motor de 1.4 litro e 73 cv.','Itaim Bibi',1,'299.99',NULL),(780362,'000165269','BRH7N13','73494s780a6221158','Chevrolet','Chevette',1973,4,'1.4, 73 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car7.jpg','Linhas modernas com motor de 1.4 litro e 73 cv.','Vila Mariana',1,'299.99',NULL),(783372,'000300109','BRH7H37','73494s783a7221158','Chevrolet','Chevette',1973,4,'1.4, 73 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car7.jpg','Linhas modernas com motor de 1.4 litro e 73 cv.','Lapa',1,'299.99',NULL),(787292,'000000609','BRH7D61','73494s787a9221158','Chevrolet','Chevette',1973,4,'1.4, 73 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car7.jpg','Linhas modernas com motor de 1.4 litro e 73 cv.','Vila Prudente',1,'299.99',NULL),(789012,'000000100','BRA7E19','73496s96fwn321158','Chevrolet','Chevette',1973,4,'1.4, 73 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car7.jpg','Linhas modernas com motor de 1.4 litro e 73 cv.','Cambuci',1,'299.99',NULL),(789032,'000000108','BRH7A97','73494s789a3221158','Chevrolet','Chevette',1973,4,'1.4, 73 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car7.jpg','Linhas modernas com motor de 1.4 litro e 73 cv.','Cidade Tiradentes',1,'299.99',NULL),(815063,'003260849','BRH8M11','83494c815a6321158','Chevrolet','Kadett Gsi',1989,2,'2.0 carburado, 150 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car8.jpg','Ideal para passeios, com câmbio automático, ar-condicionado e a direç8o hidráulica.','Campo Grande',1,'299.99',NULL),(822323,'010000019','BRH8J23','83494c822a2321158','Chevrolet','Kadett Gsi',1989,2,'2.0 carburado, 150 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car8.jpg','Ideal para passeios, com câmbio automático, ar-condicionado e a direção hidráulica.','Itaim Bibi',1,'299.99',NULL),(869823,'000000619','BRH8C23','83494c869a2321158','Chevrolet','Kadett Gsi',1989,2,'2.0 carburado, 150 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car8.jpg','Ideal para passeios, com câmbio automático, ar-condicionado e a direção hidráulica.','Parque do Carmo',1,'299.99',NULL),(890123,'000000010','BRA8E19','83499c96fob321158','Chevrolet','Kadett Gsi',1989,2,'2.0 carburado, 150 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car8.jpg','Ideal para passeios, com câmbio automático, ar-condicionado e a direção hidráulica.','Sapopemba',1,'299.99',NULL),(890163,'000040019','BRH8G58','83494c890a6321158','Chevrolet','Kadett Gsi',1989,2,'2.0 carburado, 150 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car8.jpg','Ideal para passeios, com câmbio automático, ar-condicionado e a direção hidráulica.','Mandaqui',1,'299.99',NULL),(890223,'000000018','BRH8A97','83494c890a2321158','Chevrolet','Kadett Gsi',1989,2,'2.0 carburado, 150 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car8.jpg','Ideal para passeios, com câmbio automático, ar-condicionado e a direção hidráulica.','Cidade Tiradentes',1,'299.99',NULL),(890263,'000000619','BRH8D61','83494c890a6321158','Chevrolet','Kadett Gsi',1989,2,'2.0 carburado, 150 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car8.jpg','Ideal para passeios, com câmbio automático, ar-condicionado e a direção hidráulica.','Vila Prudente',1,'299.99',NULL),(891173,'000300019','BRH8H37','83494c891a7321158','Chevrolet','Kadett Gsi',1989,2,'2.0 carburado, 150 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car8.jpg','Ideal para passeios, com câmbio automático, ar-condicionado e a direção hidráulica.','Lapa',1,'299.99',NULL),(892693,'000165269','BRH8O13','83494c892a9321158','Chevrolet','Kadett Gsi',1989,2,'2.0 carburado, 150 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car8.jpg','Ideal para passeios, com câmbio automático, ar-condicionado e a di16ção hidráulica.','Vila Mariana',1,'299.99',NULL),(900491,'900000509','BRH9K16','934946900a9121158','Chevrolet','Brasília',1973,2,'1.6, 65 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car9.jpg','Conforto de um automóvel com maior espaço interno e desenho mais contemporâneo.','Pedreira',1,'299.99',NULL),(901005,'003264049','BRH9M11','934946901a0521158','Chevrolet','Brasília',1973,2,'1.6, 65 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car9.jpg','Conforto de um automóvel com maior espaço interno e desenho mais contemporâneo.','Campo Grande',1,'299.99',NULL),(901224,'000040009','BRH9G58','934946901a2421158','Chevrolet','Brasília',1973,2,'1.6, 65 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car9.jpg','Conforto de um automóvel com maior espaço interno e desenho mais contemporâneo.','Vila Maria',1,'299.99',NULL),(901234,'000000001','BRA9E19','934996s9mwb321158','Chevrolet','Brasília',1973,2,'1.6, 65 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car9.jpg','Conforto de um automóvel com maior espaço interno e desenho mais contemporâneo.','Campo Limpo',1,'299.99',NULL),(901261,'010000009','BRH9J23','934946901a6121158','Chevrolet','Brasília',1973,2,'1.6, 65 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car9.jpg','Conforto de um automóvel com maior espaço interno e desenho mais contemporâneo.','Jardim Paulista',1,'299.99',NULL),(901434,'000000609','BRH9D61','934946901a3421158','Chevrolet','Brasília',1973,2,'1.6, 65 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car9.jpg','Conforto de um automóvel com maior espaço interno e desenho mais contemporâneo.','Casa Verde',1,'299.99',NULL),(901664,'000300009','BRH9H37','934946901a6421158','Chevrolet','Brasília',1973,2,'1.6, 65 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car9.jpg','Conforto de um automóvel com maior espaço interno e desenho mais contemporâneo.','Barra Funda',1,'299.99',NULL),(904834,'000000609','BRH9C59','934946904a3421158','Chevrolet','Brasília',1973,2,'1.6, 65 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car9.jpg','Conforto de um automóvel com maior espaço interno e desenho mais contemporâneo.','Parque do Carmo',1,'299.99',NULL),(905678,'000514009','BRH1M14','564d49905a78ecas8','Dodge','Charger R/T',1969,4,'5.2, 396 cv, V8',0,'Gasolina','/src/img/car-database/car13.jpg','Primeiro muscle car brasileiro, feito pela Chrysler nos anos 70.','Santo Amaro',1,'299.99',NULL),(905847,'003264049','BRH1M11','344d47905a47e1158','Alfa Romeo','Alfa Romeo 2000',2000,4,'2.0, 110 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car12.jpg','Veículo conversível da fabricante italiana Alfa Romeo.','Santo Amaro',1,'299.99',NULL),(906890,'010001109','BRH1J18','90fd4c906a90ecas8','Fiat','Uno Turbo i.e.',1994,4,'1.4, 118 cv, 3.000 rpm',0,'Gasolina','/src/img/car-database/car15.jpg','O primeiro turbinado de fábrica e com injeção eletrônica.','Vila Andrade',1,'299.99',NULL),(909234,'000000008','BRH9A97','934946909a3421158','Chevrolet','Brasília',1973,2,'1.6, 65 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car9.jpg','Conforto de um automóvel com maior espaço interno e desenho mais contemporâneo.','Ermelino Matarazzo',1,'299.99',NULL),(911556,'011040009','BRH1G58','234c49911a56e1158','Fiat','Romi-Isetta',1956,1,'9,5 hp, 35 cv, 4500 RPM',0,'Gasolina','/src/img/car-database/car11.jpg','Veículo de apenas 2,28m de comprimento e espaço para duas pessoas.','Vila Medeiros',1,'299.99',NULL),(912490,'000041109','BRH1G38','90fd4c912a90ecas8','Fiat','Uno Turbo i.e.',1994,4,'1.4, 118 cv, 3.000 rpm',0,'Gasolina','/src/img/car-database/car15.jpg','O primeiro turbinado de fábrica e com injeção eletrônica.','Morumbi',1,'299.99',NULL),(917389,'000011609','BRH1C65','78404c917a89ecas8','Volkswagen','SP2',1972,4,'1.7, 54 cv, boxer',0,'Gasolina','/src/img/car-database/car14.jpg','Um cupê de estilo esportivo.','Artur Alvim',1,'299.99',NULL),(919524,'000015269','BRH9O13','934946919a2421158','Chevrolet','Brasília',1973,2,'1.6, 65 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car9.jpg','Conforto de um automóvel com maior espaço interno e desenho mais contemporâneo.','Vila Mariana',1,'299.99',NULL),(921501,'011000009','BRH1J18','234c49921a01e1158','Fiat','Romi-Isetta',1956,1,'9,5 hp, 35 cv, 4500 RPM',0,'Gasolina','/src/img/car-database/car11.jpg','Veículo de apenas 2,28m de comprimento e espaço para duas pessoas.','Jardim Paulista',1,'299.99',NULL),(922789,'000041009','BRH1G38','78404c922a89ecas8','Volkswagen','SP2',1972,4,'1.7, 54 cv, boxer',0,'Gasolina','/src/img/car-database/car14.jpg','Um cupê de estilo esportivo.','Morumbi',1,'299.99',NULL),(923023,'013264049','BRH1M11','234c49923a23e1158','Fiat','Romi-Isetta',1956,1,'9,5 hp, 35 cv, 4500 RPM',0,'Gasolina','/src/img/car-database/car11.jpg','Veículo de apenas 2,28m de comprimento e espaço para duas pessoas.','Santo Amaro',1,'299.99',NULL),(923429,'011000609','BRH1C59','234c49923a29e1158','Fiat','Romi-Isetta',1956,1,'9,5 hp, 35 cv, 4500 RPM',0,'Gasolina','/src/img/car-database/car11.jpg','Veículo de apenas 2,28m de comprimento e espaço para duas pessoas.','Pari',1,'299.99',NULL),(923456,'011000000','BRC1E18','234c59e9fc96e1158','Fiat','Romi-Isetta',1956,1,'9,5 hp, 35 cv, 4500 RPM',0,'Gasolina','/src/img/car-database/car11.jpg','Veículo de apenas 2,28m de comprimento e espaço para duas pessoas.','Alto de Pinheiros',1,'299.99',NULL),(923956,'012300009','BRH1I29','234c49923a56e1158','Fiat','Romi-Isetta',1956,1,'9,5 hp, 35 cv, 4500 RPM',0,'Gasolina','/src/img/car-database/car11.jpg','Veículo de apenas 2,28m de comprimento e espaço para duas pessoas.','Barra Funda',1,'299.99',NULL),(931577,'002100009','BRH1I29','344d47931a77e1158','Alfa Romeo','Alfa Romeo 2000',2000,4,'2.0, 110 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car12.jpg','Veículo conversível da fabricante italiana Alfa Romeo.','Jaguara',1,'299.99',NULL),(934567,'001100000','BRD1E18','344d67c9fc96e1158','Alfa Romeo','Alfa Romeo 2000',2000,4,'2.0, 110 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car12.jpg','Veículo conversível da fabricante italiana Alfa Romeo.','Bela Vista',1,'299.99',NULL),(934667,'001100609','BRH1C65','344d47934a67e1158','Alfa Romeo','Alfa Romeo 2000',2000,4,'2.0, 110 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car12.jpg','Veículo conversível da fabricante italiana Alfa Romeo.','Penha',1,'299.99',NULL),(939067,'011100009','BRH1J18','344d47939a67e1158','Alfa Romeo','Alfa Romeo 2000',2000,4,'2.0, 110 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car12.jpg','Veículo conversível da fabricante italiana Alfa Romeo.','Jardim Paulista',1,'299.99',NULL),(940070,'080145509','BRH1L16','564d49940a70ecas8','Dodge','Charger R/T',1969,4,'5.2, 396 cv, V8',0,'Gasolina','/src/img/car-database/car13.jpg','Primeiro muscle car brasileiro, feito pela Chrysler nos anos 70.','Jabaquara',1,'299.99',NULL),(941978,'000110609','BRH1C65','564d49941a78ecas8','Dodge','Charger R/T',1969,4,'5.2, 396 cv, V8',0,'Gasolina','/src/img/car-database/car13.jpg','Primeiro muscle car brasileiro, feito pela Chrysler nos anos 70.','Penha',1,'299.99',NULL),(944598,'002110009','BRH1I29','564d49944a98ecas8','Dodge','Charger R/T',1969,4,'5.2, 396 cv, V8',0,'Gasolina','/src/img/car-database/car13.jpg','Primeiro muscle car brasileiro, feito pela Chrysler nos anos 70.','Jaguara',1,'299.99',NULL),(945617,'000115009','BRH1F95','564d49945a17ecas8','Dodge','Charger R/T',1969,4,'5.2, 396 cv, V8',0,'Gasolina','/src/img/car-database/car13.jpg','Primeiro muscle car brasileiro, feito pela Chrysler nos anos 70.','Perus',1,'299.99',NULL),(945678,'000110000','BRE1E18','564d79c9fc96ecas8','Dodge','Charger R/T',1969,4,'5.2, 396 cv, V8',0,'Gasolina','/src/img/car-database/car13.jpg','Primeiro muscle car brasileiro, feito pela Chrysler nos anos 70.','Cambuci',1,'299.99',NULL),(946678,'000110079','BRH1B62','564d49946a78ecas8','Dodge','Charger R/T',1969,4,'5.2, 396 cv, V8',0,'Gasolina','/src/img/car-database/car13.jpg','Primeiro muscle car brasileiro, feito pela Chrysler nos anos 70.','Ponte Rasa',1,'299.99',NULL),(950589,'000164009','BRH1M14','78404c950a89ecas8','Volkswagen','SP2',1972,4,'1.7, 54 cv, boxer',0,'Gasolina','/src/img/car-database/car14.jpg','Um cupê de estilo esportivo.','Moema',1,'299.99',NULL),(956589,'000011079','BRH1B62','78404c956a89ecas8','Volkswagen','SP2',1972,4,'1.7, 54 cv, boxer',0,'Gasolina','/src/img/car-database/car14.jpg','Um cupê de estilo esportivo.','Guaianases',1,'299.99',NULL),(956789,'000011000','BRF1E18','78406cd15c96ecas8','Volkswagen','SP2',1972,4,'1.7, 54 cv, boxer',0,'Gasolina','/src/img/car-database/car14.jpg','Um cupê de estilo esportivo.','Bela Vista',1,'299.99',NULL),(956945,'000015009','BRH1F59','78404c956a45ecas8','Volkswagen','SP2',1972,4,'1.7, 54 cv, boxer',0,'Gasolina','/src/img/car-database/car14.jpg','Um cupê de estilo esportivo.','Anhanguera',1,'299.99',NULL),(959229,'002011009','BRH1I29','78404c959a29ecas8','Volkswagen','SP2',1972,4,'1.7, 54 cv, boxer',0,'Gasolina','/src/img/car-database/car14.jpg','Um cupê de estilo esportivo.','Perdizes',1,'299.99',NULL),(961110,'002001109','BRH1I29','90fd4c961a10ecas8','Fiat','Uno Turbo i.e.',1994,4,'1.4, 118 cv, 3.000 rpm',0,'Gasolina','/src/img/car-database/car15.jpg','O primeiro turbinado de fábrica e com injeção eletrônica.','Perdizes',1,'299.99',NULL),(964567,'001100079','BRH1B62','344d47964a67e1158','Alfa Romeo','Alfa Romeo 2000',2000,4,'2.0, 110 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car12.jpg','Veículo conversível da fabricante italiana Alfa Romeo.','Ponte Rasa',1,'299.99',NULL),(966490,'000001609','BRH1C65','90fd4c966a90ecas8','Fiat','Uno Turbo i.e.',1994,4,'1.4, 118 cv, 3.000 rpm',0,'Gasolina','/src/img/car-database/car15.jpg','O primeiro turbinado de fábrica e com injeção eletrônica.','Artur Alvim',1,'299.99',NULL),(967840,'000001179','BRH1B62','90fd4c967a40ecas8','Fiat','Uno Turbo i.e.',1994,4,'1.4, 118 cv, 3.000 rpm',0,'Gasolina','/src/img/car-database/car15.jpg','O primeiro turbinado de fábrica e com injeção eletrônica.','Guaianases',1,'299.99',NULL),(967890,'000001100','BRG1E18','90fd6cccd996ecas8','Fiat','Uno Turbo i.e.',1994,4,'1.4, 118 cv, 3.000 rpm',0,'Gasolina','/src/img/car-database/car15.jpg','O primeiro turbinado de fábrica e com injeção eletrônica.','Cambuci',1,'299.99',NULL),(973890,'000005109','BRH1F59','90fd4c973a90ecas8','Fiat','Uno Turbo i.e.',1994,4,'1.4, 118 cv, 3.000 rpm',0,'Gasolina','/src/img/car-database/car15.jpg','O primeiro turbinado de fábrica e com injeção eletrônica.','Anhanguera',1,'299.99',NULL),(983267,'001105009','BRH1F95','344d47983a67e1158','Alfa Romeo','Alfa Romeo 2000',2000,4,'2.0, 110 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car12.jpg','Veículo conversível da fabricante italiana Alfa Romeo.','Perus',1,'299.99',NULL),(983456,'011005609','BRH1F95','234c49983a56e1158','Fiat','Romi-Isetta',1956,1,'9,5 hp, 35 cv, 4500 RPM',0,'Gasolina','/src/img/car-database/car11.jpg','Veículo de apenas 2,28m de comprimento e espaço para duas pessoas.','Cachoeirinha',1,'299.99',NULL),(988467,'001140009','BRH1G58','344d47988a67e1158','Alfa Romeo','Alfa Romeo 2000',2000,4,'2.0, 110 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car12.jpg','Veículo conversível da fabricante italiana Alfa Romeo.','Vila Medeiros',1,'299.99',NULL),(995575,'081145509','BRH1L16','344d47995a75e1158','Alfa Romeo','Alfa Romeo 2000',2000,4,'2.0, 110 cv, 4 cilindros',0,'Gasolina','/src/img/car-database/car12.jpg','Veículo conversível da fabricante italiana Alfa Romeo.','Jabaquara',1,'299.99',NULL),(996096,'981045509','BRH1L16','234c49996a96e1158','Fiat','Romi-Isetta',1956,1,'9,5 hp, 35 cv, 4500 RPM',0,'Gasolina','/src/img/car-database/car11.jpg','Veículo de apenas 2,28m de comprimento e espaço para duas pessoas.','Jabaquara',1,'299.99',NULL),(999678,'000140009','BRH1G38','564d49999a78ecas8','Dodge','Charger R/T',1969,4,'5.2, 396 cv, V8',0,'Gasolina','/src/img/car-database/car13.jpg','Primeiro muscle car brasileiro, feito pela Chrysler nos anos 70.','Morumbi',1,'299.99',NULL);
/*!40000 ALTER TABLE `veiculos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-31 17:40:26
