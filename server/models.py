from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!

class User(db.Model, SerializerMixin):
    __table_name__ = 'users'
    
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String)
    _password_hash = db.Column(db.String)
    grade_level = db.Column(db.Integer)
    card_decks = db.relationship('Card_Deck', backref= 'users')
    answers = db.relationship('Answer', back_populates = 'user', cascade='all, delete-orphan')
    question_cards = association_proxy('answers', 'question_card')
    
    @property
    def password_hash(self):
        return self._password_hash
    @password_hash.setter
    def password_hash(self):
        byte_object = plain_password.encode('utf-8')
        encrypted_password = byte_object.generate_password_hash(byte_object)
        hash_password_string = encrypted_password.decode('utf-8')
        self._password_hash = hash_password_string


class Subject(db.Model, SerializerMixin):
    __table_name__ = 'subjects'

    id = db.Column(db.Integer, primary_key = True)
    type_operation = db.Column(db.String)

class Questions(db.Model, SerializerMixin):
    __table_name__ = 'questions'

    id = db.Column(db.Integer, primary_key = True)
    content = db.Column(db.String)
    correct_answer = db.Column(db.String)

class Answer(db.Model, SerializerMixin):
    __table_name__ = 'answers'

    id = db.Column(db.Integer, primary_key = True)
    user_answer = db.Column(db.String)
    is_correct = db.Column(db.Boolean)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    question_card_id = db.Column(db.Integer, db.ForeignKey('question_cards.id'))
    user = db.relationship('User', back_populates = 'answers')
    question_card = db.relationship('Question_Card', back_populates = 'answers')

    

class Card_Deck(db.Model, SerializerMixin):
    __table_name__ = 'card_decks'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    question_card_id = db.Column(db.Integer, db.ForeignKey('question_cards.id'))
    question_card = db.relationship('Question_Card', backref= 'card_decks')


class Question_Card(db.Model, SerializerMixin):
    __table_name__ = "question_cards"

    id = db.Column(db.Integer, primary_key = True)
    is_complete = db.Column(db.Boolean)
    card_deck_id = db.Column(db.Integer,db.ForeignKey('card_decks.id'))
    answers = db.relationship('Answer', back_populates = 'question_card', cascade='all, delete-orphan')
    users = association_proxy('answers', 'user')







##                              users ----< cardeck ///
#                               cardeck ----< question_card ///


#                               users --- < answers > ---- question_card

#                               answer -----< questioncard >----- question 

#                               subject ----< questions 









