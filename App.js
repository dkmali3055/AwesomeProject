import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Button } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Mat, cv, CvImage } from 'react-native-opencv3';

export default () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const selectImage = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        setSelectedImage(source);
      }
    });
  };

  const addGlassesOverlay = async () => {
    if (!selectedImage) {
      console.log('Please select an image first');
      return;
    }

    // Load the image using OpenCV
    const imageUri = selectedImage.uri;
    const imgMat = await cv.imreadAsync(imageUri);

    // Load the glasses image (you need to replace this with the path to your glasses image)
    const glassesMat = await cv.imreadAsync('./specs-removebg-preview.png');

    // Perform image processing here (e.g., detect face and place glasses)

    // Example: Overlay glasses on the image
    const glassesRegion = new cv.Rect(100, 100, glassesMat.cols, glassesMat.rows);
    glassesMat.copyTo(imgMat.getRegion(glassesRegion));

    // Save the modified image
    const outputImagePath = './image.png';
    await cv.imwriteAsync(outputImagePath, imgMat);

    console.log('Glasses added successfully:', outputImagePath);
  };

  return (
    <View>
      <TouchableOpacity onPress={selectImage}>
        <View>
          {selectedImage && (
            <Image
              source={selectedImage}
              style={{ width: 200, height: 200, resizeMode: 'contain' }}
            />
          )}
          <Button title="Select Image" onPress={selectImage} />
        </View>
      </TouchableOpacity>

      {selectedImage && (
        <TouchableOpacity onPress={addGlassesOverlay}>
          <View>
            <Button title="Add Glasses Overlay" onPress={addGlassesOverlay} />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};


