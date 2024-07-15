import React from 'react'
import Button from '@/components/ui/Button'

describe('<Button />', () => {
  beforeEach(() => {
    cy.mount(<Button>テスト</Button>)
  })

  it('コンポーネントがレンダリングされる', () => {
    cy.contains('テスト').should('be.visible')
  })

  it('disabledがtrueの場合、クリックできない', () => {
    cy.mount(<Button disabled>テスト</Button>)
    cy.contains('テスト').should('be.disabled')
  })
})