import { Keyboard, KeyboardEvent } from 'react-native';

export default class UseKeyboard{
    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow',
          this._keyboardDidShow,
        );
        this.keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          this._keyboardDidHide,
        );
      }
    
      componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
      }
    
      _keyboardDidShow() {
        alert('Keyboard Shown');
      }
    
      _keyboardDidHide() {
        alert('Keyboard Hidden');
      }
    
};