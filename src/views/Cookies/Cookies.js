import React from 'react'

import CoreLayout from '../../layouts/CoreLayout'
import Content from '../../components/Content'
import Table from '../../components/Table'

export const Cookies = (props) => (
  <CoreLayout {...props} contentStyle={{padding: '20px'}}>
    {console.log(props)}
    <Content
      style={{marginBottom: '20px'}}
      headerType='headline4'
      header={props.content.local.get(['cookie policy', 'page title', props.ui.language])}
    />
    <Content
      bodyStyle={{margin: '25px 0'}}
      body={props.content.local.get(['cookie policy', 'introduction', props.ui.language])}
    />

    <Content
      style={{margin: '25px 0'}}
      headerType='headline6'
      header={props.content.local.get(['cookie policy', 'cookie title', props.ui.language])}
    />
    <Table 
      wrap
      fields={{
        name: {label: 'Name', style: {width: '100px'}},
        description: {label: 'Description', style: {width: '150px'}},
        duration: {label: 'Duration', style: {width: '50px'}}
      }}
      data={props.content.local.get(['cookie policy', 'cookies', props.ui.language])}
      style={{maxWidth: '700px'}}
    />

    <Content
      style={{margin: '25px 0'}}
      headerType='headline6'
      header={props.content.local.get(['cookie policy', 'storage title', props.ui.language])}
    />
    <Table 
      wrap
      fields={{
        name: {label: 'Name', style: {width: '100px'}},
        description: {label: 'Description', style: {width: '150px'}},
        duration: {label: 'Duration', style: {width: '50px'}}
      }}
      data={props.content.local.get(['cookie policy', 'storage', props.ui.language])}
      style={{maxWidth: '700px'}}
    />

    <Content
      bodyStyle={{margin: '25px 0'}}
      body={props.content.local.get(['cookie policy', 'privacy', props.ui.language])}
    />

  </CoreLayout>
)

// TODO define props
Cookies.defaultProps = {
}

Cookies.propTypes = {
}

export default Cookies
