import React, {PureComponent} from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import QRCode from 'qrcode.react'
import PageHeader from '../components/header'
import Sidebar from '../components/sidebar'

import navsConfig from '../nav.config.json';
import { default as pathMap } from '../page-route'
import '../assets/style/docs.scss'

class Docs extends PureComponent {
  constructor () {
    super(...arguments)
    this.state = {
      fixed: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.refs.atMarkdown.scrollTo(0, 0)
    }
  }

  render () {
    const data = navsConfig['components']
    const { fixed } = this.state
    const pathname = this.props.location.pathname
    const reg = /\/\S+\/(\S+)/
    const result = pathname.match(reg)
    const curDemoPath = pathMap[result[1]] || ''
    const curPageUrl = `${window.location.origin}${window.location.pathname}/h5/index.html#/pages/${curDemoPath}/index`
    return (
      <div className='app' id='app'>
        <PageHeader collapse />
        <div className='at-container row'>
          <div className='at-sidebar col-sm-24 col-md-6 col-lg-4'>
            <Sidebar data={data} />
          </div>
          <div ref='atMarkdown' className={`at-markdown col-sm-24 col-md-18 col-lg-20 ${curDemoPath ? 'at-markdown--demo' : ''}`}>
          {
            curDemoPath &&
            <div className='qrcode-menu' style={{right: '420px'}}>
              <div className='qrcode-container'>
                <img src={require('../assets/qr_code.png')} alt='qrcode' />
                <div className='qrcode-modal'>
                  <h6>扫描二维码查看演示效果</h6>
                  <div className='code-image'>
                    <QRCode value={curPageUrl} size='140' />
                  </div>
                </div>
              </div>
              <div className='wxapp-container'>
                <img src={require('../assets/wxapp-logo.png')} alt='qrcode' />
                <div className='qrcode-modal'>
                  <h6>扫描二维码查看演示效果</h6>
                  <div className='code-image'>
                    <img className='wxapp-qrcode' src={require('../assets/wxapp.jpg')} alt='wxapp' />
                  </div>
                </div>
              </div>
            </div>
          }
            <Switch>
              {data.map(item => {
                if (item.items) {
                  return item.items.map((item, index) => {
                    return (
                      <Route
                        key={index}
                        path={`/docs/${item.name.toLowerCase()}`}
                        component={require(`../view/${item.name}`).default}
                      />
                    )
                  })
                }
                if (item.groups) {
                  return item.groups.map(item => {
                    return item.items.map((item, index) => {
                      return (
                        <Route
                          key={index}
                          path={`/docs/${item.name.toLowerCase()}`}
                          component={require(`../view/${item.name}`).default}
                        />
                      )
                    })
                  })
                }
              })}
              <Redirect path='/docs/' to={{pathname: '/docs/introduction'}} />
            </Switch>
            {
              curDemoPath &&
              <div className={ fixed ? 'demo-frame fixed' : 'demo-frame'} id="J-demo-frame">
                  {
                    curDemoPath ?
                    <iframe src={ `./h5/index.html#/pages/${curDemoPath}/index` } frameborder='0'></iframe> :
                    <iframe src='./h5/index.html' frameborder='0'></iframe>
                  }
                <div className='iphone-frame'></div>
              </div>
            }
          </div>
        </div>
        {/* <PageFooter></PageFooter> */}
      </div>
    )
  }
}

export default Docs
