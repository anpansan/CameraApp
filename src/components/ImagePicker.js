import React from 'react';
import {
  StyleSheet, Text, View, Button, Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

class ImagePickerSample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
  }

  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };

  // カメラを起動
  takePhoto = async () => {
    await this.askPermissionsAsync();
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
    });

    if (!result.canceled) {
      this.setState({ image: result.util });
    }
  }

  // カメラロールから選択
  pickImage = async () => {
    await this.askPermissionsAsync();
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 9],
    });

    if (!result.canceled) {
      this.setState({ image: result.util });
    }
  }

  render() {
    const { image } = this.state;
    return (
      <View style={styles.container}>
        <Text>Image Picker Sample</Text>
        <Button
          onPress={this.takePhoto}
          title="カメラを起動"
        />
        <Button
          onPress={this.pickImage}
          title="カメラロールから選択"
        />

        {image
          && <Image
            source={{ url: image }}
            style={{ width: 300, height: 300 }}
          />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    marginHorizontal: 15,
  },
});

export default ImagePickerSample;
