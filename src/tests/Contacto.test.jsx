// @vitest-environment jsdom
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Contacto from '../routes/Contacto.jsx';

describe('Componente Contacto - Render, Interacción y Estado', () => {

  it('Contacto', () => {
    // 1. RENDER
    render(<Contacto />);
    
    // Busca el input por su label "Tu correo electrónico"
    const inputEmail = screen.getByLabelText(/tu correo electrónico/i);
    
    // Comprobamos el estado inicial (debe estar vacío)
    expect(inputEmail.value).toBe('');

    // 2. INTERACCIÓN
    // Simulamos que un usuario teclea "ejemplo@email.com"
    fireEvent.change(inputEmail, { target: { value: 'ejemplo@email.com' } });

    // 3. ESTADO
    // Comprobamos que el estado interno de React se ha actualizado y el input muestra el texto
    expect(inputEmail.value).toBe('ejemplo@email.com');
  });

});