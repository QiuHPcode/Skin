
from flask_sqlalchemy import SQLAlchemy


db=SQLAlchemy()

class User_account(db.Model):
    __tablename__ = "user_account"
    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    user = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    date = db.Column(db.Date, nullable=False)
    deviceid = db.Column(db.String(255), nullable=True)

class User_info(db.Model):
    __tablename__ = "user_info"
    info_id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user_account.id'))
    username = db.Column(db.String(255), nullable=True)
    sex = db.Column(db.String(5), nullable=True)
    age = db.Column(db.Integer, nullable=True)
    birth = db.Column(db.String(7), nullable=True)
    date = db.Column(db.Date, nullable=True)
    is_default = db.Column(db.Integer, nullable=True)

class Count(db.Model):
    __tablename__ = "count"
    count = db.Column(db.BigInteger,primary_key=True )

class Sickness(db.Model):
    __tablename__ = "sickness"
    sickness_id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    sicknessurl = db.Column(db.String(255), nullable=False)
    Wsicknessname = db.Column(db.String(255), nullable=False)
    Csicknessname = db.Column(db.String(255), nullable=True)
    isChinesemedicine = db.Column(db.Integer, nullable=False)
    Wsymptoms = db.Column(db.String(255), nullable=False)
    Csymptoms = db.Column(db.String(255), nullable=True)
    Wcause = db.Column(db.String(255), nullable=False)
    Ccause = db.Column(db.String(255), nullable=True)
    Wtreatment = db.Column(db.String(255), nullable=False)
    Ctreatment = db.Column(db.String(255), nullable=True)
    urgency = db.Column(db.String(255), nullable=False)

class Result(db.Model):
    __tablename__ = "result"
    result_id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    info_id = db.Column(db.Integer, db.ForeignKey('user_info.info_id'))
    sickness_id1 = db.Column(db.Integer, db.ForeignKey('sickness.sickness_id'))
    probability_1 = db.Column(db.Float)
    sickness_id2 = db.Column(db.Integer, db.ForeignKey('sickness.sickness_id'))
    probability_2 = db.Column(db.Float)
    sickness_id3 = db.Column(db.Integer, db.ForeignKey('sickness.sickness_id'))
    probability_3 = db.Column(db.Float)
    date = db.Column(db.Date, nullable=True)
    resulturl = db.Column(db.String(255), nullable=True)





