import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  font-family: "Arial", sans-serif;
  background-color:rgb(8, 8, 8);
  padding: 20px;
  min-height: 100vh;
`;

const Title = styled.h1`
  color: #333;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const ListItem = styled.div`
  padding: 10px 20px;
  background-color: #e63946;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  text-transform: capitalize;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #d62828;
  }
`;

const Loading = styled.p`
  font-size: 1.2rem;
  color: #888;
`;

const DogImage = styled.img`
  margin-top: 20px;
  max-width: 300px;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
`;

function Dogs() {
  const [dogs, setDogs] = useState([]); // Lista de raças
  const [loading, setLoading] = useState(true); // Carregando os dados
  const [selectedDog, setSelectedDog] = useState(null); // Raça selecionada
  const [dogImage, setDogImage] = useState(null); // Imagem da raça selecionada

  // Buscar lista de raças de cachorros
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://dog.ceo/api/breeds/list/all");
        const data = response.data.message;
        setDogs(Object.keys(data));
      } catch (error) {
        console.error("Erro ao buscar as raças de cachorros:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Buscar imagem ao clicar em uma raça
  async function fetchDogImage(dog) {
    try {
      const response = await axios.get(
        `https://dog.ceo/api/breed/${dog}/images/random`
      );
      setDogImage(response.data.message); // Atualiza a imagem
      setSelectedDog(dog); // Define a raça selecionada
    } catch (error) {
      console.error("Erro ao buscar a imagem do cachorro:", error);
    }
  }

  return (
    <Container>
      <Title>Raças de Cachorros 🐶</Title>
      {loading && <Loading>Carregando...</Loading>}

      {/* Grid de raças */}
      <Grid>
        {dogs.map((dog, index) => (
          <ListItem key={index} onClick={() => fetchDogImage(dog)}>
            {dog}
          </ListItem>
        ))}
      </Grid>

      {/* Exibe a imagem do cachorro selecionado */}
      {selectedDog && dogImage && (
        <div>
          <h2>Raça: {selectedDog}</h2>
          <DogImage src={dogImage} alt={`Imagem de um ${selectedDog}`} />
        </div>
      )}
    </Container>
  );
}

export default Dogs;

