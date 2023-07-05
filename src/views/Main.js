import {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import {launchImageLibrary} from 'react-native-image-picker';

import colors from '../utils/colors';
import FileIcon from '../assets/svg/FileIcon';
import LogoIcon from '../assets/svg/LogoIcon';

const Main = () => {
  const [images, setImages] = useState([
    {source: require('../assets/images/desert-g5b00bfc6d_1280.jpg')},
    {source: require('../assets/images/fire-gba37cebcf_1280.jpg')},
    {source: require('../assets/images/kiwi-g45c340bc7_1280.png')},
    {source: require('../assets/images/monstera-g122453459_1280.jpg')},
    {source: require('../assets/images/sea-gc66cb4043_1280.jpg')},
    {source: require('../assets/images/woman-gd78323cbc_1280.jpg')},
  ]);
  const [selectedImage, setSelectedImage] = useState('');
  const [visible, setVisible] = useState(false);

  const pickImage = async () => {
    await launchImageLibrary({mediaType: 'photo', quality: 0.5})
      .then(value => {
        if (value.assets && value.assets.length > 0) {
          value.assets.map(img => {
            setImages(prev => [...prev, {source: {uri: img.uri}}]);
          });
        }
      })
      .catch(error => console.log(error));
  };

  const FloatingButton = ({onPress}) => {
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <FileIcon />
      </TouchableOpacity>
    );
  };

  const RenderItem = ({item, onPress}) => {
    return (
      <TouchableOpacity style={styles.item} onPress={onPress}>
        <Image style={styles.image} source={item.source} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        <LogoIcon style={{position: 'absolute', left: 15}}/>
        <Text style={styles.headerTitle}>Imágenes</Text>
      </View>
      <View style={styles.container}>
        <FlatList
          scrollEnabled
          data={images}
          renderItem={({item, index}) => (
            <RenderItem
              key={index}
              item={item}
              onPress={() => {
                setSelectedImage(item.source);

                setVisible(true);
              }}
            />
          )}
          numColumns={3}
        />
      </View>
      <FloatingButton onPress={() => pickImage()} />
      <ImageView
        images={[selectedImage]}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: colors.light,
    flex: 1,
  },
  header: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    padding: 10,
  },
  headerTitle: {
    color: colors.light,
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    fontSize: 20,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
    padding: 5,
  },
  item: {
    flex: 1,
    margin: 3,
    height: 120,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: colors.secondary,
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Main;
