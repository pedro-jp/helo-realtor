import { useRef } from 'react';
import { Animated, Dimensions, View } from 'react-native';

const { width, height } = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.9;
const ITEM_HEIGHT = height / 1.9;

export default function Carousel({ images }: any) {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View>
      <Animated.FlatList
        data={images}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width * 0.7, 0, width * 0.7],
          });

          return (
            <View
              style={{
                marginTop: 40,
                width,
                height: height / 1.8,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  borderRadius: 18,
                  shadowColor: '#969292',
                  shadowOffset: {
                    width: 0,
                    height: 12,
                  },
                  shadowOpacity: 0.58,
                  shadowRadius: 1.0,

                  elevation: 5,
                  padding: 3,
                  backgroundColor: '#ffffff52',
                }}
              >
                <View
                  style={{
                    width: ITEM_WIDTH,
                    height: ITEM_HEIGHT,
                    overflow: 'hidden',
                    alignItems: 'center',
                    borderRadius: 14,
                  }}
                >
                  <Animated.Image
                    style={{
                      width: ITEM_WIDTH,
                      height: ITEM_HEIGHT,
                      resizeMode: 'cover',
                      translateX,
                    }}
                    source={{
                      uri: `http://192.168.1.21:3332/files/${item.url}`,
                    }}
                  />
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
