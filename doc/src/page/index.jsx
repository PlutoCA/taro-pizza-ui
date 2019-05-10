import React, {PureComponent} from 'react'
import { NavLink } from 'react-router-dom'

import PageHeader from '../components/header'
// import Footer from '../components/footer'
import '../assets/style/index.scss'

class Index extends PureComponent {
  goToGuide(e) {
    e.preventDefault()
  }
  goToSource(e) {
    e.preventDefault()
  }
  componentDidMount() {
    let header = document.getElementById('J-page-header')
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        header.classList.add('fixed')
      } else {
        header.classList.remove('fixed')
      }
    }, 100)

  }
  render() {
    return (
      <div className="wrapper">
        <PageHeader />
        {/* Banner */}
        <div className="bg-container">
          <div className="bg-top-border" />
          <div className="bg-top-shadow" />
          <div className="bg-bottom-border" />
          <div className="bg-bottom-shadow" />
          <div className="info-container">
            <div className="img-container" />
            <h1>Pizza UI</h1>
            <div className="info-desc">
              一套基于 Taro 框架开发的多端业务组件库
            </div>
            <div className="btn-container">
              <NavLink
                className="btn btn-start btn-start--pc"
                to="/docs/introduction"
              >
                开始使用
              </NavLink>
              <a
                className="btn btn-start btn-start--h5"
                href="https://nervjs.github.io/taro-ui/h5/index.html"
              >
                开始使用
              </a>
              <a
                className="btn btn-github"
                href="https://github.com/xiamu14/taro-pizza-ui"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
        {/* Features */}
        <div className="feature-wrapper">
          <div className="main-title">特性</div>
          <div className="panel-container">
            <div className="panel">
              <div className="panel-img">
                <img src={require("../assets/panel-img1.png")} />
              </div>
              <div className="panel-title">多端适配</div>
              <div className="panel-desc">
                一套组件可以在微信小程序 / H5 多端适配运行
              </div>
            </div>
            <div className="panel">
              <div className="panel-img">
                <img src={require("../assets/panel-img2.png")} />
              </div>
              <div className="panel-title">组件基于实际业务</div>
              <div className="panel-desc">
                所有组件都基于实际业务需求，抽象成都较高
              </div>
            </div>
            <div className="panel">
              <div className="panel-img">
                <img src={require("../assets/panel-img3.png")} />
              </div>
              <div className="panel-title">按需引用</div>
              <div className="panel-desc">
                可按需使用独立的组件，不必引入所有文件，可最小化的注入到项目中
              </div>
            </div>
            <div className="panel">
              {/* <div className='panel-tip-container'><img src={require('../assets/panel-tip.png')} /></div> */}
              <div className="panel-img">
                <img src={require("../assets/panel-img4.png")} />
              </div>
              <div className="panel-title">自定义样式</div>
              <div className="panel-desc">
                组件 Html 结构, className 都详细标注，方便开发者自由改写样式
              </div>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
}
export default Index
