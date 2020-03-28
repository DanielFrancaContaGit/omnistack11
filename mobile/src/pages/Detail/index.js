import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';
import styles from './style';

export default function Detail() {

  const navigation = useNavigation();
  const route = useRoute();

  const incident = route.params.incident;
  const message =`Olá ${incident.name}, Estou entrando em contato pois gostaria de ajudar no caso ${incident.title} com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}`

  function navigateBack() {
    navigation.goBack();
  }

  function sandMail() {
    MailComposer.composeAsync({
      subject: `Heroi do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message,
    });
  }

  function sendWatsapp() {
    //não o que deve ser colocado no lugar desse ponto e virgula
    Linking.openURL(`whatsapp://send?phone=5581999118026;text=${message}`);
  }

  return(
    <View style={styles.container}>
        <View style={styles.header}>
          <Image source={logoImg} />

          <TouchableOpacity onPress={navigateBack}>
            <Feather name="arrow-left" size={28} color="#E02041"/>
          </TouchableOpacity>
        </View>
        <View style={styles.incident}>

          <Text style={[styles.incidentsProperty, {marginTop: 0  }]}>ONG:</Text>
          <Text style={styles.incidentsValue}>{incident.name} de {incident.city}/{incident.uf} </Text>
          
          <Text style={styles.incidentsProperty}>Caso:</Text>
          <Text style={styles.incidentsValue}>{incident.description}</Text>
        
          <Text style={styles.incidentsProperty}>VALOR:</Text>
          <Text style={styles.incidentsValue}>
            {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}
          </Text>

        </View>

        <View style={styles.contactBox} >
          <Text style={styles.heroTitle}>Salve o Dia</Text>
          <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
        
          <Text style={styles.heroDescription}>Entre em contato:</Text>
        
          <View style={styles.actions}>
            <TouchableOpacity style={styles.action} onPress={sendWatsapp}>
              <Text style={styles.actionText}>Whatsapp</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.action} onPress={sandMail}>
              <Text style={styles.actionText}>E-mail</Text>
            </TouchableOpacity>
          </View>
        </View>

    </View>
  );
}