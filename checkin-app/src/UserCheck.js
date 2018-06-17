// @flow

import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import styled from 'styled-components/native';

import Input from './components/Input';
import Modal from './components/Modal';
import UserCheckMutation from './UserCheckMutation.js';

const Wrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const InputWrapper = styled.View`
  flex: 2;
  justify-content: center;
`;

const ButtonWrapper = styled.View`
  flex: 2;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #000;
  font-weight: 700;
  font-size: 24px;
`;

const CheckInButton = styled.TouchableOpacity`
  width: 80%;
  height: 50px;
  border-radius: 500;
  background-color: #00e676;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CheckOutButton = styled.TouchableOpacity`
  width: 80%;
  height: 50px;
  border-radius: 500;
  background-color: #ff1744;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 35px;
`;

type State = {
  password: string,
  location: Object,
};

@withNavigation
class UserCheck extends Component<any, Props, State> {
  static navigationOptions = {
    title: 'UserCheck',
  };


  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const location = {
          lng: coords.longitude,
          lat: coords.latitude,
        };

        console.log('location', location);
        this.setState({ location });
      },
      error => console.log('navigator error message', error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  handleCheckIn = () => {
    const { hash, location } = this.state;

    const input = {
      hash,
      checkin: true,
      location,
    }
    console.log('input', input);

    const onCompleted = ({ UserCheck }) => {

      console.log(UserCheck.error);
      if (UserCheck.error === 'true') {
        this.setState({ errorText: 'Erro na operação' })
        return;
      } else {
        this.setState({ errorText: '', successText: 'Você fez seu checkin' })
        return;
      }
    }

    const onError = () => {
      console.log('onError');
    }

    UserCheckMutation.commit(input, onCompleted, onError);
  }

  state = {
    hash: '',
    location: {
      lng: '',
      lat: '',
    },
    errorText: '',
    successText: '',
    closeModal: () => this.setState({ errorText: '', successText: '' }),
    openModal: (errorText) => this.setState({ errorText }),
    openSuccessModal: (successText) => this.setState({ successText }),
  };

  render() {
    const { errorText, successText, closeModal, hash } = this.state;
    return (
      <Wrapper>
        <InputWrapper>
          <Input
            name="hash"
            placeholder="hash"
            value={hash}
            onChangeText={value => this.setState({ hash: value })}
          />
        </InputWrapper>
        <ButtonWrapper>
        <CheckInButton onPress={() => this.handleCheckIn()}>
          <ButtonText>Check In</ButtonText>
        </CheckInButton>
        </ButtonWrapper>
        <Modal
          visible={errorText || successText ? true : false}
          errorText={errorText}
          successText={successText}
          onRequestClose={closeModal}
          timeout={6000}
        />
      </Wrapper>
    );
  }
}

export default  UserCheck;