require('dotenv').config()
const amqp = require('amqplib')
const NotesService = require('./NotesService')
const MailSender = require('./MailSender')
const Listener = require('./listener')

const init = async () => {
  const notesService = new NotesService()
  const mailSender = new MailSender()
  const listener = new Listener(notesService, mailSender)

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER)
  const channel = await connection.createChannel()

  // Memastikan queue dengan nama export:notes telah terbuat menggunakan fungsi channel.assertQueue
  await channel.assertQueue('export:notes', {
    durable: true
  })

  // consume/ambil queue export:notes dengan menetapkan listener.listen sebagai fungsi callback-nya (message)
  channel.consume('export:notes', listener.listen, { noAck: true })
}

init()
