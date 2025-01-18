const nodemailer = require('nodemailer')

class MailSender {
  constructor () {
    this._transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    })
  }

  sendEmail (targetEmail, content) {
    //* Objek message configuration untuk fungsi this._transporter.sendMail
    const message = {
      from: 'Notes Apps', // pengirim
      to: targetEmail, // penerima
      subject: 'Ekspor Catatan', // judul
      text: 'Terlampir hasil dari ekspor catatan', // isi email
      attachments: [ // lampiran
        {
          filename: 'notes.json',
          content
        }
      ]
    }

    //* Gunakan fungsi this._transporter.sendMail untuk mengirimkan email
    /*
    Fungsi sendMail akan mengembalikan promise yang membawa status pengiriman email.
    Kita bisa manfaatkan itu sebagai nilai return. Tujuannya, agar kita bisa menggunakan async/await
    ketika menggunakan fungsi sendEmail untuk mendapatkan status pengirimannya.
    */
    return this._transporter.sendMail(message)
  }
}

module.exports = MailSender
