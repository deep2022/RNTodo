import I18n from "react-native-i18n"
import en from '../locales/english'
import hn from '../locales/hindi'


I18n.fallbacks = true
I18n.translations = {en, hn}

export default I18n