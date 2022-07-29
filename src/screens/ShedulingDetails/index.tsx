import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons'
import { addDays, format } from 'date-fns';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';
import { useTheme } from 'styled-components';
import { CarDTO } from '../../DTOs/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from './styles';
import { api } from '../../services/api';
import { Alert } from 'react-native';

interface Params {
  car: CarDTO,
  dates: string[]
}

interface RentalPeriod {
  start: string;
  end: string;
}

export function ShedulingDetails() {
  const [isLoading, setIsLoading] = useState(false)
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)
  const navigation = useNavigation()
  const { colors } = useTheme()

  const route = useRoute()
  const { car, dates } = route.params as Params;

  const rentTotal = Number(dates.length * car.rent.price)

  async function handleConfirmRental() {
    setIsLoading(true)
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`)

    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates
    ]

    await api.post('/schedules_byuser', {
      user_id: 1,
      car,
      startDate: format(addDays(new Date(dates[0]), 1), 'dd/MM/yyyy'),
      endDate: format(addDays(new Date(dates[dates.length - 1]), 1), 'dd/MM/yyyy')
    })

    api.put(`/schedules_bycars/${car.id}`, {
      id: car.id,
      unavailable_dates,
    })
    .then(() => navigation.navigate('schedulingComplete'))
    .catch(() => {
      setIsLoading(false)
      Alert.alert('Não foi possível confirmar o agendamento.')
    })

    
  }

  
  useEffect(() => {
    setRentalPeriod({
      start: format(addDays(new Date(dates[0]), 1), 'dd/MM/yyyy'),
      end: format(addDays(new Date(dates[dates.length - 1]), 1), 'dd/MM/yyyy'),
    })
  }, [])
  return (
    <Container>
      <Header>
        <BackButton />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map(accessory => (
            <Accessory 
               key={accessory.type}
               name={accessory.name}
               icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.rent.price} x${dates.length} diárias`}</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button 
          title="Alugar agora" 
          color={colors.success} 
          onPress={handleConfirmRental}
          disabled={isLoading}
          loading={isLoading}
        />
      </Footer>
    </Container>
  );
}