import '@testing-library/jest-dom'
import getDentists from '@/libs/getDentists'
import DentistCatalog from '@/components/DentistCatalog'
import { screen, render, waitFor, getByTestId } from '@testing-library/react'
import Card from '@/components/Card'

describe('Dentist test',()=>{
    let dentistsJson:DentistJson
    beforeEach(async () => {
        dentistsJson= await getDentists()
    })
    it('Dentist no no appear on init',()=>{
        let date = ""
        const catalog = DentistCatalog({dentistsJson,date})
        render(catalog)
        expect(screen.queryByTestId('1112')).toBeNull()
    })  
    it('Dentist appear on have date',()=>{
        let date = new Date().toISOString()
        const catalog = DentistCatalog({dentistsJson,date})
        render(catalog)
        const card = screen.getAllByTestId('1112')
        expect(card[0]).toBeInTheDocument()
    })  
})