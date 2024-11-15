"""For running on a production environment."""

from collage import create_app

collage_app = create_app()

# if __name__ == "__main__":
#     app.run()

def app():
    collage_app.run()