# Este archivo se usa para correr la app en servidores como Gunicorn o Heroku

from app import app as application

if __name__ == "__main__":
    application.run()
