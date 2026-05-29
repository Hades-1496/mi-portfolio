// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useContext } from 'react';
import { GithubProvider, GithubContext } from '../routes/GithubContext.jsx';

// Mock del hook useFetch
// Esto nos permite controlar los valores que devuelve useFetch durante los tests,
// evitando llamadas de red reales y simulando diferentes escenarios (cargando, éxito, error).
const mockUseFetch = vi.fn();
vi.mock('../hooks/useFetch.jsx', () => ({
  useFetch: mockUseFetch,
}));

// Componente auxiliar para consumir el contexto dentro de los tests
// Nos permite renderizar y comprobar los valores que el GithubProvider expone.
const TestConsumer = () => {
  const { listaProyectos, loading, error } = useContext(GithubContext);

  if (loading) return <div data-testid="loading">Cargando repositorios...</div>;
  if (error) return <div data-testid="error">Error: {error}</div>;
  if (listaProyectos && listaProyectos.length > 0) {
    return (
      <div data-testid="projects-list">
        <h2>Proyectos</h2>
        <ul>
          {listaProyectos.map((p) => (
            <li key={p.id}>{p.name}</li>
          ))}
        </ul>
      </div>
    );
  }
  return <div data-testid="empty">Sin proyectos</div>;
};

describe('GithubContext', () => {
  it('debe mostrar el estado de carga inicial', () => {
    // Configuramos el mock para que devuelva loading: true
    mockUseFetch.mockReturnValue({ data: [], loading: true, error: "" });

    render(
      <GithubProvider>
        <TestConsumer />
      </GithubProvider>
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
    expect(screen.getByText('Cargando repositorios...')).toBeInTheDocument();
  });

  it('debe mostrar un mensaje de error si falla la petición', () => {
    // Configuramos el mock para simular un error
    mockUseFetch.mockReturnValue({ data: [], loading: false, error: "Error de red" });

    render(
      <GithubProvider>
        <TestConsumer />
      </GithubProvider>
    );

    expect(screen.getByTestId('error')).toBeInTheDocument();
    expect(screen.getByText('Error: Error de red')).toBeInTheDocument();
  });

  it('debe mostrar la lista de proyectos cuando se cargan correctamente', () => {
    // Configuramos el mock para simular una respuesta exitosa
    const mockData = [
      { id: 1, name: 'Proyecto 1' },
      { id: 2, name: 'Proyecto 2' }
    ];
    mockUseFetch.mockReturnValue({ data: mockData, loading: false, error: "" });

    render(
      <GithubProvider>
        <TestConsumer />
      </GithubProvider>
    );

    expect(screen.getByTestId('projects-list')).toBeInTheDocument();
    expect(screen.getByText('Proyecto 1')).toBeInTheDocument();
    expect(screen.getByText('Proyecto 2')).toBeInTheDocument();
  });
});
