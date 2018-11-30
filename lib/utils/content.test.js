import { getLanguage, getSupportedLanguages, getMessage, getLabel } from './content';
describe('content :: getSupportedLanguages', () => {
  it('should return an array of languages when passed a string', () => {
    expect(getSupportedLanguages('en,fr')).toEqual(['en', 'fr']);
  });
  it('should return an array of languages when passed an array', () => {
    expect(getSupportedLanguages(['en', 'fr'])).toEqual(['en', 'fr']);
  });
  it('should return an array of languages from env when passed nothing', () => {// TODO fix test env variables
    //expect(getSupportedLanguages()).toEqual(process.env.REACT_APP_INTERFACE_LANGUAGES.split(','))
  });
  it('should get default supported languages from env.INTERFACE_LANGUAGES', () => {// TODO fix test env variables
    //expect(getSupportedLanguages()).toEqual(process.env.REACT_APP_INTERFACE_LANGUAGES.split(','))
  });
});
describe('content :: getLanguage', () => {
  it('should return languageDefault when useClient is false', () => {
    const languageDefault = 'fr';
    expect(getLanguage([], null, languageDefault, false)).toEqual(languageDefault);
  });
  it('should return fallbackLanguage when no default is specific and when useClient is false', () => {
    expect(getLanguage([], null, null, false)).toEqual('en');
  });
  it('should return locale language when locale language is supported with useClient is true', () => {
    expect(getLanguage(['en-CA'], {
      language: 'en-CA'
    }, 'fr', true)).toEqual('en-CA');
  });
  it('should return base language when locale language is not supported but base language is with useClient is true', () => {
    expect(getLanguage(['en'], {
      language: 'en-CA'
    }, 'fr', true)).toEqual('en');
  });
  it('should return defaultLanguage when local language is not supported and neither is base language with useClient is true', () => {
    expect(getLanguage(['fr'], {
      language: 'en-CA'
    }, 'fr', true)).toEqual('fr');
  });
  it('should get default navigator from browser', () => {// TODO fix test env variables
    //expect(getLanguage(['en-US'])).toEqual('en-US')
  });
  it('should get default language from env.INTERFACE_LANGUAGE_DEFAULT', () => {// TODO fix test env variables
    //expect(getLanguage([process.env.REACT_APP_INTERFACE_LANGUAGE_DEFAULT], {language: 'en-CA'})).toEqual( process.env.REACT_APP_INTERFACE_LANGUAGE_DEFAULT)
  });
  it('should get useClient setting from env.INTERFACE_USE_CLIENT', () => {
    expect(getLanguage([], {
      language: 'en-CA'
    }, 'en')).toEqual('en');
  });
});
describe('content :: getMessage', () => {
  it('should throw a TypeError when there is no key passed', () => {
    expect(() => getMessage()).toThrow(TypeError);
  });
  it('should throw a TypeError when there is no language passed', () => {
    expect(() => getMessage('TEST_KEY', null)).toThrow(TypeError);
  });
  it('should throw a RangeError when the key does not exist in content', () => {
    expect(() => getMessage('TEST_KEY', 'en', {})).toThrow(RangeError);
  });
  it('should throw a RangeError when the key does not have an entry for language and MESSAGE_NOT_FOUND is not set', () => {
    expect(() => getMessage('TEST_KEY', 'en', {
      TEST_KEY: {}
    })).toThrow(RangeError);
  });
  it('should return MESSAGE_NOT_FOUND when key does not exist in the languge', () => {
    const messages = {
      MESSAGE_NOT_FOUND: {
        en: 'Not found'
      },
      TEST_KEY: {}
    };
    expect(getMessage('TEST_KEY', 'en', messages)).toEqual(messages.MESSAGE_NOT_FOUND.en);
  });
  it('should return a message from the key and language passed', () => {
    const messages = {
      TEST_KEY: {
        en: 'Test Message'
      }
    };
    expect(getMessage('TEST_KEY', 'en', messages)).toEqual(messages.TEST_KEY.en);
  });
});
describe('content :: getLabel', () => {
  it('should return an empty string when passed undefined', () => {
    expect(getLabel(undefined)).toEqual('');
  });
  it('should return the string if a string is passed to it', () => {
    expect(getLabel('Test')).toEqual('Test');
  });
  it('should return the language from the object that is passed to it', () => {
    expect(getLabel({
      fr: 'Test'
    }, 'fr')).toEqual('Test');
  });
  it('should return the language default env language ', () => {// TODO fix test env variables
    //expect(getLabel({[process.env.REACT_APP_INTERFACE_LANGUAGE_DEFAULT]: 'Test'}, 'zzz')).toEqual('Test')
  });
  it('should return the hardcoded fallback language as a last resort ', () => {
    expect(getLabel({
      'en': 'Test'
    }, 'zzz')).toEqual('Test');
  });
  it('should return an empty string if there is no possible match', () => {
    expect(getLabel({
      '123': 'Test'
    }, 'zzz')).toEqual('');
  });
});