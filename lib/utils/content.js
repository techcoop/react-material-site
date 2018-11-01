const fallbackLanguage = 'en'; // Gets supported languages

export const getSupportedLanguages = (supported = process.env.INTERFACE_LANGUAGES) => {
  if (typeof supported === 'string' || supported instanceof String) {
    supported = supported.split(',');
  }

  return supported;
}; // Gets user language and locale if supported or use application default
// TODO also check if language default is supported?
// TODO also check if fallback language is supported? Wisdom is using a hard coded fallback? Support for non english sites?

export const getLanguage = (supported, userNavigator = navigator, languageDefault = process.env.INTERFACE_LANGUAGE_DEFAULT, useClient = process.env.INTERFACE_USE_CLIENT) => {
  // If we do not want to use client language
  if (!useClient) {
    // Use language default if it's set
    if (languageDefault) {
      return languageDefault;
    } // Otherwise use fallback


    return fallbackLanguage;
  } // Try to parse a supported language, otherwise use default


  const userLanguage = userNavigator.language || userNavigator.userLanguage; // TODO need to handle cases where this isn't an array

  if (!supported) {
    return false;
  }

  supported = new Set(supported); // First check if userLanguage is supported localized

  if (supported.has(userLanguage)) {
    return userLanguage;
  } // If not, check if base language is supported


  if (userLanguage.includes('-')) {
    const baseLanguage = userLanguage.split('-')[0];

    if (supported.has(baseLanguage)) {
      return baseLanguage;
    }
  } // If neither of those, use language default


  if (languageDefault) {
    return languageDefault;
  } // Last resport use fallback


  return fallbackLanguage;
}; // Gets localized ui message

export const getMessage = (key, language = process.env.INTERFACE_LANGUAGE_DEFAULT, messages = {}) => {
  if (!key) {
    throw new TypeError('You must pass a key to retrieve a message');
  }

  if (!language) {
    throw new TypeError('You must pass a language to retrieve a message');
  }

  if (!messages[key]) {
    throw new RangeError('Cannot find ' + key + ' in message content');
  } // If we don't have this key in this language, try to display message not found


  if (!messages[key][language]) {
    if (messages['MESSAGE_NOT_FOUND'] && messages['MESSAGE_NOT_FOUND'][language]) {
      console.warn('Error locating the correct message for ' + key + ' in languge ' + language + '. MESSAGE_NOT_FOUND shown instead');
      return messages['MESSAGE_NOT_FOUND'][language];
    }

    throw new RangeError('Cannot find MESSAGE_NOT_FOUND in language message content');
  }

  return messages[key][language];
}; // Gets label from string or object with language

export const getLabel = (label, language = process.env.INTERFACE_LANGUAGE_DEFAULT) => {
  // If label is empty, return empty string
  if (!label) {
    return '';
  } // If it is a string, just return that


  if (typeof label === 'string' || label instanceof String) {
    return label;
  } // Otherwise try to find for this language


  if (label[language]) {
    return label[language];
  } // Otherwise check for env default


  if (label[process.env.INTERFACE_LANGUAGE_DEFAULT]) {
    return label[process.env.INTERFACE_LANGUAGE_DEFAULT];
  } // Lastly use hardcoded fallback


  if (label[fallbackLanguage]) {
    return label[fallbackLanguage];
  } // Or return empty string if nothing else


  return '';
};