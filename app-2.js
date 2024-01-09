/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroMaterials,
  ViroAnimations,
  ViroBox,
} from '@viro-community/react-viro';






ViroMaterials.createMaterials({
  /**
   * Material in its simplest form is just diffused color
   */
  white: {
    diffuseColor: 'rgba(255,255,255,1)',
  },
  /**
   * We can also diffuse a texture here.
   */
  grid: {
    diffuseTexture: require('./grid_bg.jpg'),
  },
});
ViroAnimations.registerAnimations({
  /** To begin with we have added simple rotation animation */
  rotate: {
    properties: {
    rotateY: '+=90',
    },
    duration: 2500, //.25 seconds
  },
});



const BoxTexture = () => {
  const onInitialized = (arSceneState , reason ) => {
    console.log(reason,"state" , arSceneState);
  };

  return (
    /** ViroARScene will open up AR enabled camera in your scene */
    <ViroARScene onTrackingUpdated={onInitialized}>
    {/**
    * Here us our ViroBox a 3D element with position in AR space
    */}
    <ViroBox
        position={[0, -0.5, -1]}
        animation={{name: 'rotate', run: true, loop: true}} // We have defined our animation at the top;
        scale={[0.3, 0.3, 0.1]}
        materials={['grid']} // We have defined material at the top;
    />
    </ViroARScene>
  );
};

export default () => {
  // All AR scene will reside in ViroARSceneNavigator:
  return (
    <ViroARSceneNavigator
    autofocus={true}
    initialScene={{
        scene: BoxTexture,
    }}
    style={styles.f1}
    />
  );
};

const styles = StyleSheet.create({
  f1: {
    flex: 1,
  },
});


