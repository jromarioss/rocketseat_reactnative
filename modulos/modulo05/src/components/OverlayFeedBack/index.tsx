import { useEffect} from 'react';
import { useWindowDimensions } from 'react-native';
import Animated, { Easing, useSharedValue, withSequence, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { Canvas, Rect, BlurMask } from '@shopify/react-native-skia';

import { THEME } from '../../styles/theme';

const STATUS = ['transparent', THEME.COLORS.BRAND_LIGHT, THEME.COLORS.DANGER_LIGHT];

type Props = {
  status: number;
}

export function OverlayFeedback({ status }: Props) {
  const opacity = useSharedValue(0)

  const color = STATUS[status]

  const { height, width } = useWindowDimensions() //obtem informação da tela atualizada sempre q muda

  const styleAnimated = useAnimatedStyle(() => {
    return {
      opacity: opacity.value
    }
  })

  useEffect(() => {
    opacity.value = withSequence(
      withTiming(1, { duration: 300, easing: Easing.bounce }), //apareceu
      withTiming(0) //ocutou
    )
  }, [status])

  return (
    <Animated.View style={[{ height, width, position: 'absolute' }, styleAnimated ]}>
      <Canvas style={{ flex: 1 }}>
        <Rect 
          x={0}
          y={0} //posicionamento dentro do canvas
          width={width}
          height={height}
          color={color}
        >
          <BlurMask blur={50} style='normal' />
        </Rect>
      </Canvas>
    </Animated.View>
  );
}