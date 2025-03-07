from flask import Flask, request, jsonify, send_from_directory
from PIL import Image
import os

# Initialisation de l'application Flask
app = Flask(__name__)

# Configuration du dossier de téléchargement
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Fonction pour convertir une image en noir et blanc
def convertir_en_noir_et_blanc(image_path, output_path):
    try:
        # Ouvrir l'image
        image = Image.open(image_path)

        # Convertir l'image en noir et blanc
        image_nb = image.convert("L")

        # Sauvegarder l'image convertie
        image_nb.save(output_path)
        return True, output_path
    except Exception as e:
        return False, str(e)

# Route pour convertir une image en noir et blanc
@app.route('/convert', methods=['POST'])
def convert_image():
    # Vérifier si un fichier image est présent dans la requête
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    # Récupérer le fichier image de la requête
    image = request.files['image']
    input_path = os.path.join(app.config['UPLOAD_FOLDER'], image.filename)
    output_path = os.path.join(app.config['UPLOAD_FOLDER'], 'bw_' + image.filename)

    # Sauvegarder l'image téléchargée
    image.save(input_path)

    # Convertir l'image en noir et blanc
    success, result = convertir_en_noir_et_blanc(input_path, output_path)

    # Retourner le résultat de la conversion
    if success:
        return jsonify({"message": "Image converted successfully", "output_path": output_path}), 200
    else:
        return jsonify({"error": result}), 500

# Route pour servir les fichiers téléchargés et convertis
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# Point d'entrée de l'application
if __name__ == '__main__':
    # Créer le dossier de téléchargement s'il n'existe pas
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])
    # Démarrer l'application Flask
    app.run(debug=True)