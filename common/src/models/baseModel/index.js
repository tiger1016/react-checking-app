export default class BaseModel {
  downloading (state = {}, { progress, progressTotal }) {
    return {
      ...state,
      loading: true,
      loadingMessage: null,
      progress,
      progressTotal,
      error: null
    }
  }

  error (state = {}, { error }) {
    return {
      ...state,
      loading: false,
      loadingMessage: null,
      loadingEvent: null,
      error
    }
  }

  loadingWithMessage (state = {}, { loadingMessage, loadingEvent }) {
    return {
      ...state,
      loading: true,
      loadingMessage,
      loadingEvent,
      error: null
    }
  }
}
