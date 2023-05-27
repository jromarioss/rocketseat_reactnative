import { useEffect, useRef, useState } from 'react';
import Animated, { Layout, SlideInRight, SlideOutRight } from 'react-native-reanimated';
import { HouseLine, Trash } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { View, ScrollView, Alert } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler'

import { Header } from '../../components/Header';
import { HistoryCard, HistoryProps } from '../../components/HistoryCard';

import { styles } from './styles';
import { historyGetAll, historyRemove } from '../../storage/quizHistoryStorage';
import { Loading } from '../../components/Loading';
import { THEME } from '../../styles/theme';

export function History() {
  const swipeableRefs = useRef<Swipeable[]>([]); //para manipular o componente direto sem q ele renderiza
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState<HistoryProps[]>([]);

  const { goBack } = useNavigation();


  async function fetchHistory() {
    const response = await historyGetAll();
    setHistory(response);
    setIsLoading(false);
  }

  async function remove(id: string) {
    await historyRemove(id);

    fetchHistory();
  }

  function handleRemove(id: string, index: number) {
    swipeableRefs.current?.[index].close(); //chama o menu direto e fecha ele

    Alert.alert(
      'Remover',
      'Deseja remover esse registro?',
      [
        {
          text: 'Sim', onPress: () => remove(id)
        },
        { text: 'Não', style: 'cancel' }
      ]
    );

  }

  useEffect(() => {
    fetchHistory();
  }, []);

  if (isLoading) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <Header
        title="Histórico"
        subtitle={`Seu histórico de estudos${'\n'}realizados`}
        icon={HouseLine}
        onPress={goBack}
      />

      <ScrollView
        contentContainerStyle={styles.history}
        showsVerticalScrollIndicator={false}
      >
        {
          history.map((item, index) => (
            <Animated.View 
              key={item.id}
              entering={SlideInRight}
              exiting={SlideOutRight}
              layout={Layout.springify()}
            >
              <Swipeable
                ref={(ref) => {
                  if (ref) {
                    swipeableRefs.current.push(ref)
                  }
                }}  
                overshootLeft={false} //ele trava no limite da lixeira
                containerStyle={ styles.swipeableContainer } //estilizar o swipeable
                leftThreshold={10} //se arrasta um pouco ja vai
                renderRightActions={() => null} //para no ios nao mover para direita
                onSwipeableOpen={() => handleRemove(item.id, index)} //faz evento quando deslisa e abre
                renderLeftActions={() => ( //mostra menu lado esquerdo
                  <View style={ styles.swipeableRemove }>
                    <Trash 
                      size={32} 
                      color={THEME.COLORS.GREY_100} 
                    />
                  </View>
                )}
              >
                <HistoryCard data={item} />
              </Swipeable>
            </Animated.View>
          ))
        }
      </ScrollView>
    </View>
  );
}