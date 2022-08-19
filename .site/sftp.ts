import Client from 'ssh2-sftp-client'

const sftp = new Client()

const config = {
  host: 'xiefeng.tech',
  port: 22,
  username: 'root',
  password: 'xf.1314.X'
}

sftp.connect(config)
  .then(() => sftp.list('/'))
  .then(data => data.forEach(item => console.log(item.name)))
  .catch(err => {
    console.log(err, 'catch error')
  }).then(() => sftp.end())


