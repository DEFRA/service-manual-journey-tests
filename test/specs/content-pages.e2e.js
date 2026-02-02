import { browser, expect } from '@wdio/globals'

import { Page } from 'page-objects/page'

const page = new Page()

const contentPages = [
  {
    path: '/accessibility',
    titlePattern: /Make sure everyone can use the service/
  },
  { path: '/design', titlePattern: /Design/ },
  { path: '/user-research', titlePattern: /User research/ },
  { path: '/content', titlePattern: /Content/ },
  { path: '/sustainability', titlePattern: /Deliver a sustainable service/ },
  { path: '/service-assessments', titlePattern: /Service assessments/ },
  {
    path: '/testing-and-assurance',
    titlePattern: /Quality Assurance and Test/
  },
  { path: '/business-analysis', titlePattern: /Business analysis/ },
  { path: '/product-and-delivery', titlePattern: /Product and delivery/ },
  {
    path: '/architecture-and-software-development',
    titlePattern: /Architecture/
  }
]

describe('Content pages', () => {
  contentPages.forEach(({ path, titlePattern }) => {
    it(`Should load ${path} with correct title`, async () => {
      await page.open(path)
      await expect(browser).toHaveTitle(titlePattern)
    })

    it(`Should display a heading on ${path}`, async () => {
      await page.open(path)
      await expect(page.pageHeading).toBeDisplayed()
    })
  })
})
