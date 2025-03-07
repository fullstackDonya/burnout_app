from PIL import Image

def convertir_en_noir_et_blanc(image_path, output_path):
    try:
        # Ouvrir l'image
        image = Image.open(image_path)

        # Convertir l'image en noir et blanc
        image_nb = image.convert("L")

        # Sauvegarder l'image
        image_nb.save(output_path)
        print(f"L'image a été convertie en noir et blanc et sauvegardée à : {output_path}")
    except Exception as e:
        print(f"Une erreur est survenue : {e}")

# Exemple d'utilisation
chemin_image = "path_to_your_image.png"
sortie_image = "path_to_save_bw_image.png"
convertir_en_noir_et_blanc(chemin_image, sortie_image)