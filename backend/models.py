from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    phone_number = db.Column(db.String(15), unique=True, nullable=False)
    name = db.Column(db.String(100))
    opt_in_status = db.Column(db.Boolean, default=False)
    appointments = db.relationship('Appointment', backref='user', lazy=True)
    ratings = db.relationship('Rating', backref='user', lazy=True)

# class Appointment(db.Model):
#     __tablename__ = 'appointments'
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     date = db.Column(db.Date, nullable=False)
#     time = db.Column(db.Time, nullable=False)
#     reason = db.Column(db.Text, nullable=False)
#     status = db.Column(db.Enum('Scheduled', 'Completed', 'Cancelled'), 
#                       default='Scheduled')
class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # <-- Critical
    date = db.Column(db.Date)  # Ensure this is Date type
    time = db.Column(db.Time)  # Or String if storing as text
    reason = db.Column(db.String)
    status = db.Column(db.String)
class Rating(db.Model):
    __tablename__ = 'ratings'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)  # 1-5
    feedback = db.Column(db.Text)