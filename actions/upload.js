import levenshtein from 'fast-levenshtein'
import { globalMessage } from './ui'
import { getLabel } from 'react-material-site/utils/content'
import { getFormConfig } from 'react-material-site/utils/form'
import { PostFiles } from 'react-material-site/utils/xhr'

// TODO add aliases for analyzers, decide others to support

const analyzers = {
  full_name_analyzer: ['full Name', 'name', 'nom complet'],
  first_name_analyzer: ['first Name', 'given Name'],
  last_name_analyzer: ['last name', 'family name', 'sur name'],
  email_analyzer: ['email', 'email address', 'courriel'],
  phone_analyzer: ['phone', 'phone number', 'telephone', 'telephone number'],
  location_analyzer: ['full address', 'location'],
  country_analyzer: ['country', 'payes'],
  state_analyzer: ['state', 'province'],
  city_analyzer: ['city'],
  address_analyzer: ['address', 'street address', 'street'],
  shipping_analyzer: ['postal Code', 'postal', 'zip', 'zip code', 'shipping code'],
}

const RECORD_LIMIT = 50000

// ------------------------------------
// Constants
// ------------------------------------
export const UPLOAD_UPDATE = 'UPLOAD_UPDATE'

// ------------------------------------
// Actions
// ------------------------------------
export const uploadUpdate = (params) => {
  return {
    type    : UPLOAD_UPDATE,
    payload : params
  }
}

export const analyzeFile = (acceptedFiles, rejectedFiles) => {
  return (dispatch, getState) => {
    const state = getState()

    // Make sure that only a single file was dragged
    // TODO figure out best way to configure these types of simple error cases
    if (acceptedFiles.length > 1) {
      const error = getLabel({
        en: 'You can only upload one file at a time.', 
        fr: 'Vous ne pouvez télécharger qu\'un seul fichier à la fois.'
      }, state.ui.language)

      dispatch(globalMessage(error))
      return
    }

    // Analyze file contents
    const file = acceptedFiles[0]
    const reader = new FileReader()
    const analyzeError = getLabel({
      en: 'There was a problem processing your file, please try again!',
      fr: 'Un problème est survenu lors du traitement de votre fichier. Veuillez réessayer!'
    }, state.ui.language)

    // Handle errors
    reader.onabort = () => {
      dispatch(globalMessage(analyzeError))
    }

    reader.onerror = () => {
      dispatch(globalMessage(analyzeError))
    }
    
    // Process success
    reader.onload = () => {
      // Error if result is empty
      if (!reader.result) {
        dispatch(globalMessage(analyzeError))
        return
      }

      // Error if there are no lines, or lines aren't parsable
      const lines = reader.result.split(/[\r\n]+/g)
      if (lines.length === 0) {
        dispatch(globalMessage(analyzeError))
        return
      }

      // Error if we can't find any field names in the first row
      const csvFields = lines[0].split(',')
      if (csvFields.length === 0) {
        dispatch(globalMessage(analyzeError))
        return
      }

      // If we have no rows beyond the header row
      const count = lines.length - 1
      if (count === 0) {
        dispatch(globalMessage(analyzeError))
        return
      }
      
      // Check if this file is over the line limit
      if (count > RECORD_LIMIT) {
        const limitError = getLabel({
          en: `Sorry the limit for records is currently ${RECORD_LIMIT}, please try a smaller file.`,
          fr: `Désolé la limite pour les enregistrements est actuellement ${RECORD_LIMIT}, s'il vous plaît essayez un fichier plus petit.`
        }, state.ui.language)
        dispatch(globalMessage(limitError))
        return
      }

      const fields = [].reduce.call(csvFields, (data, field) => {
        const results = []
        Object.keys(analyzers).forEach((analyzer) => {
          analyzers[analyzer].forEach((name) => {
            results.push({name: name, analyzer: analyzer, distance: levenshtein.get(field.toLowerCase(), name)})
          })
        })
      
        results.sort(function (a, b) {
          return a.distance - b.distance
        })
        
        // If the edit distance is greater than or equal to the string length minus 1, flag as ignore
        // TODO reasses
        let analyzer = results[0].analyzer
        if (results[0].distance >= field.length - 2) {
          analyzer = 'ignore'
        }
      
        data[field] = analyzer
      
        return data
      }, {})

      // Everything looks good, update state and move to next step
      dispatch(uploadUpdate({count: count, fields: fields, file: file, step: 1}))
    }

    reader.readAsBinaryString(file)
  }
}

export const analyzerChange = (event) => {
  return (dispatch, getState) => {
    const upload = getState().upload
    upload.fields[event.target.name] = event.target.value
    dispatch(uploadUpdate(upload))
  }
}

export const fileUpload = () => {
  return (dispatch, getState) => {
    const state = getState()

    const config = getFormConfig('upload')
    dispatch(uploadUpdate({loading: true, step: 3}))
    const request = PostFiles(config.action, [state.upload.file])
    
    Object.keys(state.upload.fields).forEach((field) => {
      request.field(field, state.upload.fields[field])
    })

    request.then((resolve) => {
      console.error(resolve)

      dispatch(uploadUpdate({loading: false}))
      dispatch(uploadUpdate({count: 0, fields: {}, file: null}))
    }, (error) => {
      console.error(error)
      const message = getLabel({
        en: 'There was an issue processing your file, please try again!',
        fr: 'Un problème est survenu lors du traitement de votre fichier. Veuillez réessayer!'
      }, state.ui.language)
      dispatch(uploadUpdate({loading: false}))
      dispatch(globalMessage(message))
    })

  }
}

export const changeStep = (step) => {
  return (dispatch, getState) => {
    dispatch(uploadUpdate({step: step}))

  }
}

export const nextStep = () => {
  return (dispatch, getState) => {
    const state = getState().upload
    state.step += 1
    dispatch(uploadUpdate(state))
  }
}

export const previousStep = (event) => {
  return (dispatch, getState) => {
    console.log('asdas')
  }
}

export const actions = {
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPLOAD_UPDATE] : (state, action) => Object.assign({}, state, action.payload)
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  loading: false,
  file: null,
  fields: {},
  count: 0,
  step: 0
}

export default function uploadReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
