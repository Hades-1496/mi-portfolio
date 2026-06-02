import { useContext } from 'react';
import { DoomContext } from '../context/DoomContext';

const Contacto = () => {
  const { triggerGlitchMessage } = useContext(DoomContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    triggerGlitchMessage('ENVIANDO MENSAJE...');
    
    // Simulate successful transmission
    setTimeout(() => {
      triggerGlitchMessage('¡MENSAJE ENVIADO CON ÉXITO!');
      // Clear fields
      e.target.reset();
    }, 1500);
  };

  return (
    <section className="section contact-section-container">
      <h2>CONTACTO</h2>
      <p>
        ¿Tienes alguna oferta, proyecto en mente o simplemente quieres saludar? 
        Rellena el formulario y te responderé lo antes posible.
      </p>

      <form 
        onSubmit={handleSubmit}
        className="contact-form"
      >
        {/* Campo para el email del usuario */}
        <div className="form-group">
          <label htmlFor="email">TU CORREO ELECTRÓNICO:</label>
          <input 
            type="email" 
            id="email"
            name="email" 
            required 
            placeholder="ejemplo@correo.com"
            className="form-input"
          />
        </div>

        {/* Campo para el mensaje */}
        <div className="form-group">
          <label htmlFor="mensaje">MENSAJE:</label>
          <textarea 
            id="mensaje"
            name="message" 
            required 
            rows="5"
            placeholder="Escriba el texto de su mensaje aquí..."
            className="form-textarea"
          ></textarea>
        </div>

        {/* Botón de enviar */}
        <button 
          type="submit"
          className="btn-submit"
        >
          ENVIAR MENSAJE
        </button>
      </form>
    </section>
  );
};

export default Contacto;