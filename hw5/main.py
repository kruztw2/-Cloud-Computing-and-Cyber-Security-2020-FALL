# /usr/bin/env python3

from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)

# MySql datebase
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://admin:admin_password@127.0.0.1:3306/hw5"

db = SQLAlchemy(app)

class Users(db.Model):
    __tableusername__ = 'users'
    ID = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), unique=True, nullable=False)
    password = db.Column(db.String(30), nullable=False)

    def __init__(self, username, password):
        self.username = username
        self.password = password


@app.route('/')
def index():
    db.create_all()
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return render_template('register.html')

    print(request.form)
    username = request.form.get('username')
    password = request.form.get('password')
    if not len(username) or not len(password):
        return "Invalid username or password"
    else:
        new_user = Users(username, password)
        db.session.add(new_user)
        db.session.commit()

    return render_template('login.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        user = Users.query.filter_by(username=username, password=password).first()
        print("user = ", user)
        if (user):
            return "hello " + username
        else:
            return "Not found!"
    return render_template('login.html')

if __name__ == "__main__":
    app.run(debug=True)
