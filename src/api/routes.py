from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from .models import db, User
from flask_cors import CORS

api = Blueprint('api', __name__)

CORS(api)


@api.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({"message": "Email y contraseña son obligatorios"}), 400

        if User.query.filter_by(email=email).first():
            return jsonify({"message": "El usuario ya existe"}), 400

        user = User(email=email, password=password, is_active=True)
        db.session.add(user)
        db.session.commit()

        return jsonify({"message": "Usuario creado correctamente"}), 201

    except Exception as e:
        print("Error en signup:", e)
        return jsonify({"message": "Error interno en el servidor", "error": str(e)}), 500


@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Email y contraseña son obligatorios"}), 400

    user = User.query.filter_by(email=email).first()
    if user and user.password == password:

        token = create_access_token(identity=user.email)
        return jsonify({
            "user": {"id": user.id, "email": user.email},
            "token": token
        }), 200
    else:
        return jsonify({"message": "Credenciales inválidas"}), 401


@api.route('/private', methods=['GET'])
@jwt_required()
def private():

    email = get_jwt_identity()  # Esto ahora es el email
    user = User.query.filter_by(email=email).first()

    return jsonify({"message": f"Bienvenido {user.email}"}), 200
