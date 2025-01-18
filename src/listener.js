class Listener {
  constructor (notesService, mailSender) {
    this._notesService = notesService
    this._mailSender = mailSender

    this.listen = this.listen.bind(this)
  }

  async listen (message) {
    try {
      /*
      Saat ini untuk message bertipe ConsumeMessage, guna mendapatkan konten aslinya kita bisa memakai fungsi message.content.toString() serta mengubah string menjadi objek menggunakan JSON.parse.
      */
      const { userId, targetEmail } = JSON.parse(message.content.toString())

      const notes = await this._notesService.getNotes(userId)
      // Fungsi sendEmail hanya menerima content dalam bentuk string, itulah alasan mengapa kita menggunakan JSON.stringify pada pengiriman notes.
      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(notes))
      // Di akhir fungsi listen, kita tampilkan result pada console yang dikembalikan oleh sendEmail agar kita bisa mengetahui apakah email berhasil terkirim atau tidak.
      console.log(result)
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = Listener
