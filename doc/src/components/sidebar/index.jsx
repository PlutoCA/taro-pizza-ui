import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'
import CollapseTransition from '../../lib/animations/collapse-transition'
import classnames from 'classnames'

import './style.scss'

class Sidebar extends PureComponent {
  constructor (...args) {
    super(...args)

    this.state = {
      currentOpenMenu: []
    }
  }

  toggleMenu (idx) {
    this.setState(function (state) {
      let { currentOpenMenu } = state

      if (currentOpenMenu.includes(idx)) {
        currentOpenMenu.splice(currentOpenMenu.indexOf(idx), 1)
      } else {
        currentOpenMenu.push(idx)
      }

      return {
        currentOpenMenu
      }
    })
  }

  render () {
    const { data: items } = this.props

    return (
      <nav className='at-nav'>
        {items.map((item, index) => {
          return (
            <div key={index}>
              <h2 className='at-nav__title'>{item.title}</h2>
              <ul className='at-nav__items'>
                {item.items &&
                  item.items.map((navItem, index) => {
                    return (
                      <li className='at-nav__item' key={index}>
                        <NavLink
                          exact
                          className='at-nav__page'
                          activeClassName='router-link-exact-active router-link-active'
                          to={{
                            pathname: `/${item.name.toLowerCase()}/${navItem.name.toLowerCase()}`
                          }}
                          replace
                        >
                          {navItem.title}
                        </NavLink>
                      </li>
                    )
                  })}
                {item.groups &&
                  item.groups.map((group, idx) => {
                    return (
                      <li className='at-nav__item active' key={idx}>
                        <a className='at-nav__group' onClick={this.toggleMenu.bind(this, idx)}>
                          {group.title}
                          <i className={classnames('icon', {
                            'icon-chevron-down': !this.state.currentOpenMenu.includes(
                              idx
                            ),
                            'icon-chevron-up': this.state.currentOpenMenu.includes(
                              idx
                            )
                          })}/>
                        </a>
                        <CollapseTransition
                          isShow={!this.state.currentOpenMenu.includes(idx)}
                        >
                          <ul className='at-nav__child-items'>
                            {' '}
                            {group.items.map((navItem, index) => {
                              return (
                                <li className='at-nav__child-item' key={index}>
                                  <NavLink
                                    className='at-nav__component'
                                    activeClassName='router-link-exact-active router-link-active'
                                    to={`/docs/${navItem.name.toLowerCase()}`}
                                    replace
                                  >
                                    {navItem.name}
                                    <span>{navItem.title}</span>
                                  </NavLink>
                                </li>
                              )
                            })}
                          </ul>
                        </CollapseTransition>
                      </li>
                    )
                  })}
              </ul>
            </div>
          )
        })}
      </nav>
    )
  }
}

export default Sidebar
