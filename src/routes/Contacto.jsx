
const Contacto = () => {
    return(
    <section id="resultado" className="section" style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
      <h2>Contacto</h2>
      <p>¿Tienes alguna oferta, proyecto en mente o simplemente quieres saludar? Rellena el formulario y te responderé lo antes posible.</p>

      <form 
        action="" // Una vez demos backend, completaré esta acción 
        // method="POST"
        style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}
      >
        {/* Campo para el email del usuario */}
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
          <label htmlFor="email" style={{ marginBottom: '5px', fontWeight: 'bold' }}>Tu Correo Electrónico:</label>
          <input 
            type="email" 
            id="email"
            name="email" 
            required 
            placeholder="ejemplo@correo.com"
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        {/* Campo para el mensaje */}
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
          <label htmlFor="mensaje" style={{ marginBottom: '5px', fontWeight: 'bold' }}>Mensaje:</label>
          <textarea 
            id="mensaje"
            name="message" 
            required 
            rows="5"
            placeholder="Introduzca el texto aquí"
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', resize: 'vertical' }}
          ></textarea>
        </div>

        {/* Botón de enviar */}
        <button 
          type="submit"
          style={{
            background: '#3b82f6',
            color: 'white',
            padding: '12px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
            marginTop: '10px'
          }}
        >
          Enviar Mensaje
        </button>
      </form>
    </section>
  )
}

export default Contacto;