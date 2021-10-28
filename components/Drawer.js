import Link from 'next/link'
import BLOG from '@/blog.config'
import SearchInput from '@/components/SearchInput'
import MenuButtonGroup from '@/components/MenuButtonGroup'
import TocBar from '@/components/TocBar'
import React, { useImperativeHandle, useState } from 'react'
import InfoCard from '@/components/InfoCard'
import TagList from '@/components/TagList'
import Logo from '@/components/Logo'

/**
 * 抽屉面板，可以从侧面拉出
 * @returns {JSX.Element}
 * @constructor
 */
const Drawer = ({ post, currentTag, cRef, tags }) => {
  // 暴露给父组件 通过cRef.current.handleMenuClick 调用
  useImperativeHandle(cRef, () => {
    return {
      handleMenuClick: () => handleMenuClick()
    }
  })
  const [showDrawer, switchShowDrawer] = useState(false)
  // 点击按钮更改侧边抽屉状态
  const handleMenuClick = () => {
    switchShowDrawer(!showDrawer)
  }
  return <>
    <div className='fixed top-0 left-0 z-40 h-full'>
      <div
        className={(showDrawer ? 'shadow-2xl' : '-ml-72') + ' overflow-y-auto duration-200 w-72 h-full bg-white dark:bg-gray-800 border-r dark:border-gray-600'}>
        {/* LOGO */}
        <div
          className='sticky top-0 z-20 bg-white w-72 flex space-x-4 px-5 py-1 dark:border-gray-500 border-b dark:bg-gray-600 '>
          <div
            className='z-10 py-2 duration-200 mr-2 bg-white dark:bg-gray-600 text-gray-600 text-xl cursor-pointer dark:text-gray-300'>
            <i className='fa hover:scale-125 transform duration-200 fa-bars ' onClick={handleMenuClick} />
          </div>
         <Logo/>
        </div>
      </div>

      {/* 侧边菜单 */}
      <div
        className={(showDrawer ? 'shadow-2xl' : '-ml-72') + ' w-72 duration-200 h-full fixed left-0 top-16 overflow-y-auto'}>
        <div className='z-20'>
          <div className='px-5 my-3 block md:hidden'>
            <SearchInput currentTag={currentTag} />
          </div>
          <InfoCard/>
          {/* 菜单 */}
          <MenuButtonGroup allowCollapse={false} />
          {tags && (
            <div className='p-4'>
              {/* 标签云  */}
              <section>
                <strong className='text-xl text-gray-600 dark:text-gray-400'>标签</strong>
                <TagList tags={tags} currentTag={currentTag} />
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
    {/* 背景蒙版 */}
    <div className={(showDrawer ? 'block' : 'hidden') + ' fixed top-0 left-0 z-30 w-full h-full bg-black bg-opacity-50'}
         onClick={handleMenuClick} />
  </>
}
export default Drawer