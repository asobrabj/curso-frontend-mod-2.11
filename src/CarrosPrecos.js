import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FipeApi() {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    // Buscar as marcas de carros na tabela FIPE
    axios
      .get('https://parallelum.com.br/fipe/api/v1/carros/marcas')
      .then((response) => {
        setBrands(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar marcas:', error);
      });
  }, []);

  useEffect(() => {
    // Buscar os modelos da marca selecionada acima
    if (selectedBrand !== '') {
      axios
        .get(
          `https://parallelum.com.br/fipe/api/v1/carros/marcas/${selectedBrand}/modelos`
        )
        .then((response) => {
          setModels(response.data.modelos);
        })
        .catch((error) => {
          console.error('Erro ao buscar modelos:', error);
        });
    }
  }, [selectedBrand]);

  useEffect(() => {
    // Buscar os anos de carros do modelo selecionado
    if (selectedModel !== '') {
      axios
        .get(
          `https://parallelum.com.br/fipe/api/v1/carros/marcas/${selectedBrand}/modelos/${selectedModel}/anos`
        )
        .then((response) => {
          setYears(response.data);
        })
        .catch((error) => {
          console.error('Erro ao buscar anos:', error);
        });
    }
  }, [selectedModel, selectedBrand]);

  useEffect(() => {
    // Buscar o preço do carro selecionado do Carro acima
    if (selectedYear !== '') {
      axios
        .get(
          `https://parallelum.com.br/fipe/api/v1/carros/marcas/${selectedBrand}/modelos/${selectedModel}/anos/${selectedYear}`
        )
        .then((response) => {
          setPrice(response.data.Valor);
        })
        .catch((error) => {
          console.error('Erro ao buscar preço:', error);
        });
    }
  }, [selectedYear, selectedModel, selectedBrand]);

  return (
    <div>
      <h2>Consulta de Preço de Carro - FIPE</h2>
      <div>
        <label>Marca:</label>
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          <option value="">Selecione uma marca</option>
          {brands.map((brand) => (
            <option key={brand.codigo} value={brand.codigo}>
              {brand.nome}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Modelo:</label>
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
        >
          <option value="">Selecione um modelo</option>
          {models.map((model) => (
            <option key={model.codigo} value={model.codigo}>
              {model.nome}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Ano:</label>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">Selecione um ano</option>
          {years.map((year) => (
            <option key={year.codigo} value={year.codigo}>
              {year.nome}
            </option>
          ))}
        </select>
      </div>
      {price && (
        <div>
          <h2>Preço:</h2>
          <p>{price}</p>
        </div>
      )}
    </div>
  );
}

export default FipeApi;
