import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Button, Icon, Menu } from 'antd'

export interface  DropOptionPops {
  onMenuClick?,
  menuOptions?,
  buttonStyle?,
  dropdownProps?,
}
const DropOption = ({onMenuClick, menuOptions, buttonStyle, dropdownProps} :DropOptionPops) => {
  const menu = menuOptions.map(item => <Menu.Item key={item.key}>{item.name}</Menu.Item>)
  return (<Dropdown
    overlay={<Menu onClick={onMenuClick}>{menu}</Menu>}
    {...dropdownProps}
  >
    <Button style={{ border: 'none', ...buttonStyle }}>
      <Icon style={{ marginRight: 2 }} type="bars" />
      <Icon type="down" />
    </Button>
  </Dropdown>)
}

export default DropOption
