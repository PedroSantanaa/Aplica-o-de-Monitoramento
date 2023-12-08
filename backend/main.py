from fastapi import FastAPI, UploadFile, Form
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import mysql.connector
import cv2
import numpy as np
import pytesseract
import re
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
import sqlite3

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Atualize isso para permitir o domínio correto
    allow_methods=["*"],
    allow_headers=["*"],
)
# Configurar a conexão com o banco de dados
# db_config = {
#     "host": "172.17.0.2",
#     "user": "SA",
#     "password": "SQLConnect1",
#     "database": "tcc",
#     "port": "1433"
# }
# db_config = {
#     "host": "172.17.0.2",
#     "user": "root",
#     "password": "rootTCC"
# }

# Nome do banco de dados que você deseja criar
database_name = "tcc"

#Conectando no SQlite
# conn = sqlite3.connect('registros.db')
# Conectar ao servidor MySQL
# conn = mysql.connector.connect(**db_config)
# cursor = conn.cursor()

# Crie o banco de dados se ele não existir
# cursor.execute(f"CREATE DATABASE IF NOT EXISTS {database_name}")

# Feche a conexão
# conn.close()

# Após criar o banco de dados, você pode atualizar o DATABASE_URL para incluir o nome do banco de dados
# DATABASE_URL = f"mysql+mysqlconnector://root:rootTCC@172.17.0.2/{database_name}"
SQLALCHEMY_DATABASE_URL = "sqlite:///registros.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
Base = declarative_base()

# Definir o modelo de dados
class Item(Base):
    __tablename__ = "registros"

    id = Column(Integer, primary_key=True, index=True)
    data= Column(String(55), index=True)
    hora = Column(String(55), index=True)
    nome = Column(String(255),index=True)


# Criar a tabela no banco de dados
Base.metadata.create_all(bind=engine)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@app.get("/users/")
async def info():
  db=SessionLocal()
  return db.query(Item).all()
  
@app.post("/registrar/")
async def registrar(file: UploadFile=Form(...),dataResponse: Optional[str]=Form(None)):
    # Lê o arquivo de imagem em bytes
    image_bytes = await file.read()

    # Carrega a imagem usando OpenCV
    nparr = np.frombuffer(image_bytes, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

# Definir limites para preto e cinza
    lower_black = np.array([0, 0, 0], dtype=np.uint8)
    upper_black = np.array([180, 180, 180], dtype=np.uint8)
    lower_gray = np.array([80, 80, 80], dtype=np.uint8)
    upper_gray = np.array([200, 200, 200], dtype=np.uint8)

    # Criar máscaras
    mask_black = cv2.inRange(image, lower_black, upper_black)
    mask_gray = cv2.inRange(image, lower_gray, upper_gray)

    # Combinar as máscaras
    combined_mask = cv2.bitwise_or(mask_black, mask_gray)

    # Usar a máscara combinada para isolar as áreas de interesse
    result = cv2.bitwise_and(image, image, mask=combined_mask)

    # Criar kernel personalizado
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3,3))

    # Realizar fechamento (dilatação seguida de erosão)
    close = cv2.morphologyEx(result, cv2.MORPH_CLOSE, kernel)

    # Inverter imagem para usar com Tesseract
    result = 255 - close

    # OCR com diferentes modos de segmentação de página


    # Reconhecimento de texto
    text = pytesseract.image_to_string(result, lang='por', config='--psm 6')
    print(text)

    # Dividir o texto em registros (como você fez no código original)
    # ...
    linhas = text.strip().split('\n')

    data = dataResponse
    hora = ""
    nome = ""

    db=SessionLocal()
    padrao = r'(.+?) Abertura'
    data_regex = r'\d{4}-\d{2}-\d{2}'
    for linha in linhas:
        data_match = re.search(data_regex, linha)
        # Use expressões regulares para verificar se a linha corresponde a data, hora ou nome
        if data_match:
            data = data_match.group()
        elif re.match(r'\d{2}:\d{2}', linha):
            hora = linha
        else:
            match = re.match(padrao, linha)
            if match:
              nome = match.group(1)
            else:
              nome = None


        # Insira o registro no banco de dados
        if hora and nome:
          registro=Item(data=data,hora=hora,nome=nome)
          db.add(registro)
    
    db.commit()
    db.close()
 