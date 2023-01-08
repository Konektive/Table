import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import styles from './App.module.css'
import {FcNext, FcPrevious} from 'react-icons/fc'


export  interface Product {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

type State = {
  products: Product[];
  filterId: string;
  itemsPerPage: number;
  modalProduct: Product | null;
  error: Error | null;
  page: number;
};

type Props = {
  products: Product[];
  filterId: string;
  setFilterId: React.Dispatch<React.SetStateAction<string>>;
  itemsPerPage: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  modalProduct: Product | null;
  setModalProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  error: Error | null;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

function App(props: Props) {
  // Initialize state
  const [state, setState] = useState<State>({
    products: [],
    filterId: '',
    itemsPerPage: 5,
    modalProduct: null,
    error: null,
    page: 1
  });

  // Destructure state
  const { products, filterId, itemsPerPage, modalProduct, error, page } = state;

  useEffect(() => {
    axios
      .get('https://reqres.in/api/products')
      .then(response => setState({ ...state, products: response.data.data }))
      .catch(error => setState({ ...state, error }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.replace(/\D/g, '');
  setState({ ...state, filterId: input, page:1 });
};


  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.replace(/\D/g, '');
    setState({ ...state, itemsPerPage: Number(input) });
  };

       const previousPage = () => {
        setState({ ...state, page: page - 1 });
       };
      const handlePageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value.replace(/\D/g, '');
        setState({ ...state, page: Number(input) });
        };

      const nextPage = () => {
        setState({ ...state, page: page + 1 });
      };

      const filteredProducts = products.filter(product => {
        return product.id.toString().includes(filterId);
      });

      const handleRowClick = (product: Product) => {
        setState({ ...state, modalProduct: product });
      };

      const closeModal = () => {
        setState({ ...state, modalProduct: null });
      };

      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = page * itemsPerPage;
      const displayedProducts = filteredProducts.slice(startIndex, endIndex);

      return (
        <div className={styles.wrap}>
          {error && <h1>{error.message}</h1>}

          <div className={styles.inputs}></div>
          <label>Sort by Id:</label>
          <input
            type="text"
            value={filterId}
            onChange={handleFilterIdChange}
            data-testid="filter-id-input"
          />
          <label>Items per page:</label>
          <input
            type="text"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            data-testid="items-per-page-input"
            />
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                 <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {displayedProducts.map(product => (
                <tr
                  key={product.id}
                  style={{ backgroundColor: product.color }}
                  onClick={() => handleRowClick(product)}
                  data-testid="table-row"
                >
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.controls}>
          <button onClick={previousPage} data-testid="previous-button" disabled={page === 1}>
            <FcPrevious/>
          </button>
          <input
            type="text"
            value={page}
            onChange={handlePageChange}
            data-testid="page-input"
          />
          <button onClick={nextPage} disabled={endIndex >= filteredProducts.length} data-testid="next-button">
            <FcNext/>
            </button>
            </div>
          {modalProduct && (
            <Modal className={styles.modal} data-testid="modal" isOpen={true} onRequestClose={closeModal}>
              <h1>{modalProduct.name}</h1>
              <p>ID: {modalProduct.id}</p>
              <p>Year: {modalProduct.year}</p>
              <p>Color: {modalProduct.color}</p>
              <p>Pantone value: {modalProduct.pantone_value}</p>
              <button onClick={closeModal} data-testid="close-button">Close</button>
            </Modal>
          )}
        </div>
      );
    }

export default App;