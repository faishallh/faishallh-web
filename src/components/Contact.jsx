import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    pesan: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Pesan berhasil dikirim!");

    setFormData({
      nama: "",
      email: "",
      pesan: "",
    });
  };

  return (
    <section className="contact-section" id="contact">
      <div className="section-container">

        <span className="section-label">
          CONTACT
        </span>

        <h2>
          LET'S TALK
        </h2>

        <p>
          Punya pertanyaan, ide, atau ingin bekerja sama?
          Silakan kirim pesan melalui form di bawah.
        </p>

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >
          <div className="contact-field">
            <label htmlFor="nama">
              Nama
            </label>

            <input
              type="text"
              id="nama"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="Masukkan nama"
              required
            />
          </div>

          <div className="contact-field">
            <label htmlFor="email">
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Masukkan email"
              required
            />
          </div>

          <div className="contact-field">
            <label htmlFor="pesan">
              Pesan
            </label>

            <textarea
              id="pesan"
              name="pesan"
              value={formData.pesan}
              onChange={handleChange}
              placeholder="Tulis pesan kamu..."
              rows="6"
              required
            />
          </div>

          <button
            type="submit"
            className="contact-submit"
          >
            Kirim Pesan
            <span>→</span>
          </button>
        </form>

      </div>
    </section>
  );
}

export default Contact;