import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import numpy as np
import cv2
import os

# Charger et préparer les données (exemple avec des images de surveillance)

data_dir = "data"
image = cv2.imread("image.jpg")
img_size = (224, 224)
batch_size = 32

datagen = keras.preprocessing.image.ImageDataGenerator(validation_split=0.2)

train_data = datagen.flow_from_directory(
    data_dir, target_size=img_size, batch_size=batch_size, class_mode='binary', subset='training')

val_data = datagen.flow_from_directory(
    data_dir, target_size=img_size, batch_size=batch_size, class_mode='binary', subset='validation')

# Définir le modèle
model = keras.Sequential([
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(224, 224, 3)),
    layers.MaxPooling2D(2, 2),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D(2, 2),
    layers.Flatten(),
    layers.Dense(128, activation='relu'),
    layers.Dense(1, activation='sigmoid')
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Entraîner le modèle
model.fit(train_data, validation_data=val_data, epochs=10)

# Sauvegarde du modèle en TFLite
converter = tf.lite.TFLiteConverter.from_keras_model(model)
tflite_model = converter.convert()

with open("security_model.tflite", "wb") as f:
    f.write(tflite_model)

print("Modèle entraîné et converti en TFLite avec succès.")