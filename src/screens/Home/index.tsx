import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize'
import { Ionicons } from '@expo/vector-icons'

import Logo from '../../assets/logo.svg'
import { api } from '../../services/api';
import { CarDTO } from '../../DTOs/CarDTO';

import { Car } from '../../components/Car';
import { Load } from '../../Load';
import { useTheme } from 'styled-components';

import { 
  Container, 
  Header, 
  TotalCars, 
  HeaderContent, 
  CarList,
  MyCarsButton
} from './styles';


export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const navigation = useNavigation()
  const { colors } = useTheme()
  const carData = {
    brand: 'AUDI',
    name: 'RS 5 Coupé',
    rent: {
      period: 'AO DIA',
      price: 120
    },
    thumbnail: 'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png'
  }

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('carDetails', {car})
  }

  function handleOpenMyCars(){
    navigation.navigate('myCars')
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/cars')
        setCars(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCars()
  }, [])
  return (
    <Container>
      <StatusBar
        barStyle='light-content'
        translucent
        backgroundColor="transparent"

      />
      <Header>
        <HeaderContent>
          <Logo
            width={RFValue(108)}
            height={RFValue(12)}
          />
          <TotalCars>
            Total de 12 carros
          </TotalCars>
        </HeaderContent>
      </Header>
      {
        isLoading
          ? <Load />
          : <CarList
            data={cars}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
          />

      }

      <MyCarsButton onPress={handleOpenMyCars}>
        <Ionicons 
          name="ios-car-sport"
          size={32}  
          color={colors.shape}
        />
      </MyCarsButton>

    </Container>
  );
}