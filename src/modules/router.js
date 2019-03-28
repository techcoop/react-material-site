import { replace, push } from 'connected-react-router'

export const sortList = (sortDir, sortField, sortName = 'sort') => {
  return async (dispatch, getState) => {
    sortDir = parseInt(sortDir)
    const router = getState().router
    const search = new URLSearchParams(router.location.search)

    if (isNaN(sortDir)) {
      search.delete(`${sortName}Dir`)
      search.delete(`${sortName}Field`)
    } else if (sortDir === -1 || sortDir === 1) {
      search.set(`${sortName}Dir`, sortDir)
      search.set(`${sortName}Field`, sortField)
    }
    
    dispatch(replace({pathname: router.location.pathname, search: `?${search.toString()}`}))
  }
}

// TODO add 100 ms interval to prevent useless requests?
export const filterList = (filterValue, filterField) => {
  return async (dispatch, getState) => {
    const router = getState().router
    const search = new URLSearchParams(router.location.search)
    if (filterValue && filterValue.length > 0) {
      search.set(filterField, `*${filterValue}*`)
    } else {
      search.delete(filterField)
    }

    dispatch(replace({pathname: router.location.pathname, search: `?${search.toString()}`}))
  }
}

export const goToPage = (page) => {
  return async (dispatch, getState) => {
    // If we are passed a regular string, just wrap as pathname
    if (typeof page === 'string' || page instanceof String) {
      dispatch(push({pathname: page}))
      return
    }

    // If we don't have a search, just push page and hope for the best
    if (!page.search) {
      dispatch(push(page))
      return
    }

    // If search is a string should be okay
    if (typeof page.search === 'string' || page.search instanceof String) {
      dispatch(push(page))
      return
    }
    
    // If search is a URLSearchParams parse to string
    if (page.search.constructor.name === 'URLSearchParams') {
      dispatch(push({pathname: page.pathname, search: `?${page.search.toString()}`}))
      return
    } 
    
    // Hope search is an parseable object and serialize
    try {
      const search = new URLSearchParams(page.search)
      dispatch(push({pathname: page.pathname, search: `?${search.toString()}`}))
      return
    } catch (e) {
      console.error('Unable to parse page object:\n')
      console.error(e)
    }
  }
}
