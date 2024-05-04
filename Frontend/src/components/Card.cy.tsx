import React from 'react'
import Card from './Card'

describe('<Card />', () => {

  let testObj: {dentistName: string, imgSrc: string, dentistId: string}

  beforeEach(()=>{
    testObj = {
      dentistName: "Albert Instin",
      imgSrc: "https://source.unsplash.com/7bMdiIqz_J4",
      dentistId: "6620b0d4efbbca938f669b71",
    }
  })

  it('Should display right dentist', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Card dentistName={testObj.dentistName}
      imgSrc={testObj.imgSrc}
      dentistId={testObj.dentistId}/>)
  })
})