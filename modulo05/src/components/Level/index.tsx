import { useEffect } from 'react';
import { Pressable, PressableProps } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated'

import { THEME } from '../../styles/theme';
import { styles } from './styles';

const PressableAnimated = Animated.createAnimatedComponent(Pressable)

const TYPE_COLORS = {
  EASY: THEME.COLORS.BRAND_LIGHT,
  HARD: THEME.COLORS.DANGER_LIGHT,
  MEDIUM: THEME.COLORS.WARNING_LIGHT,
}

type Props = PressableProps & {
  title: string;
  isChecked?: boolean;
  type?: keyof typeof TYPE_COLORS;
}

export function Level({ title, type = 'EASY', isChecked = false, ...rest }: Props) {
  const scale = useSharedValue(1)
  const checked = useSharedValue(0)

  const COLOR = TYPE_COLORS[type];

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      backgroundColor: interpolateColor(
        checked.value,
        [0, 1], //quais valores possivel
        ['transparent', COLOR] //a cor que quer definir para cada valor
      )
    }
  })

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        checked.value,
        [0, 1], //quais valores possivel
        [COLOR, THEME.COLORS.GREY_100] //a cor que quer definir para cada valor
      )
    }
  })

  function onPressIn() {
    scale.value = withTiming(1.1) //altera o tamanho aumenta
  }

  function onPressOut() {
    scale.value = withTiming(1);
  }

  useEffect(() => {
    checked.value = withTiming(isChecked ? 1 : 0, { duration: 1000 })
  }, [checked])

  return (
    <PressableAnimated 
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[styles.container,animatedContainerStyle,]}
      {...rest}
    >
      <Animated.Text style={[styles.title,animatedTextStyle,]}>
        {title}
      </Animated.Text>
    </PressableAnimated>
  );
}