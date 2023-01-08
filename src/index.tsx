import React from 'react'
import ReactDOM from 'react-dom/client'
import App, { Product } from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App products={[]} filterId={''} setFilterId={function (value: React.SetStateAction<string>): void {
      throw new Error('Function not implemented.')
    } } itemsPerPage={0} setItemsPerPage={function (value: React.SetStateAction<number>): void {
      throw new Error('Function not implemented.')
    } } modalProduct={null} setModalProduct={function (value: React.SetStateAction<Product | null>): void {
      throw new Error('Function not implemented.')
    } } error={null} page={0} setPage={function (value: React.SetStateAction<number>): void {
      throw new Error('Function not implemented.')
    } } />
  </React.StrictMode>,
)
