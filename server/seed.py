#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Subject

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        Subject.query.delete()

        subjects= []

        s1 = Subject(type_operation='Division')
        subjects.append(s1)

        s2 = Subject(type_operation='Addition')
        subjects.append(s2)
        s3= Subject(type_operation='Subtraction')
        subjects.append(s3)
        s4= Subject(type_operation='Multiplication')
        subjects.append(s4)
        db.session.add_all(subjects)
        db.session.commit()