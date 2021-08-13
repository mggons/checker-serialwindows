const {
	WAConnection,
	MessageType,
	Presence,
	MessageOptions,
	Mimetype,
	WALocationMessage,
	WA_MESSAGE_STUB_TYPES,
	ReconnectMode,
	ProxyAgent,
	GroupSettingChange,
	waChatKey,
	mentionedJid,
	processTime,
 } = require("@adiwajshing/baileys")

/******COMIENZO DE LA ENTRADA DEL ARCHIVO******/
const { color, bgcolor } = require('./lib/color')
const { idiomas } = require('./src/idiomas')
const { negara } = require('./src/kodenegara')
const { virtex } = require('./src/virtex')
const { wait, pegatinas, musica, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { fetchJson } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
/******FIN DE ENTRADA DE ARCHIVO******/

/******COMIENZO DE LA ENTRADA DEL PAQUETE NPM******/
const fs = require('fs')
const moment = require('moment-timezone')
const { exec } = require('child_process')
const kagApi = require('@kagchi/kag-api')
const fetch = require('node-fetch')
/*const tiktod = require('tiktok-scraper')*/
const ffmpeg = require('fluent-ffmpeg')
const { removeBackgroundFromImageFile } = require('remove.bg')
const imgbb = require('imgbb-uploader')
const lolis = require('lolis.life')
const loli = new lolis()
const speed = require('performance-now')

/******FIN DE ENTRADA DEL PAQUETE NPM******/

/************Google Busqueda***********/
const google = require('google-it');
const axios = require("axios");

/******FIN DE ENTRADA DEL PAQUETE******/


/******COMIENZO DE LA ENTRADA JSON******/
const user = JSON.parse(fs.readFileSync('./database/json/user.json'))
const setting = JSON.parse(fs.readFileSync('./src/settings.json'))
const grupoadmin = JSON.parse(fs.readFileSync('./admin/grupoadmin.json'))

/******FIN DE ENTRADA JSON******/

/******INICIO DE LA ENTRADA DEL MENÚ******/
const { help } = require('./src/help')
const { count } = require('console')
/******FIN DE ENTRADA DEL MENÚ******/

/******CARGA DE ENTRADA VCARD******/
const vcard = 'BEGIN:VCARD\n' // Tarjeta de contacto
            + 'VERSION:3.0\n' 
            + 'FN:Admin-JDMTECH\n' // Nombre
            + 'ORG:Soporte y Aportes;\n' // Propietario
            + 'TEL;type=CELL;type=VOICE;waid=573144182071:+57 314 418 2071\n' // ID de WhatsApp + número de teléfono
            + 'END:VCARD'
/******FIN DE ENTRADA VCARD******/

admin = grupoadmin.admin
prefix = setting.prefix
blocked = []

/******CONFIGURACION DE CARGA******/
const settingan = JSON.parse(fs.readFileSync('./admin/set.json'))
const {
	author,
	pack
} = settingan
/******INICIO DE FUNCIONES ENTRADA******/

/******Entrada ApiKey******/
const apikey = setting.apikey 
const token_id = setting.token_id
/******Fin de la entrada de ApiKey******/


function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)} Horas ${pad(minutes)} Minutos ${pad(seconds)} Segundos`
}

async function starts() {
	const client = new WAConnection()
	client.version = [2, 2119, 6]
        client.logger.level = 'warn'
	console.log(banner.string)
	client.on('qr', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color(' Escanea el codigo QR rapido!!!  '))
	})

	fs.existsSync('./codec.json') && client.loadAuthInfo('./codec.json')
	client.on('connecting', () => {
		start('2', 'Desconectado')
	})
	client.on('open', () => {
		success('2', 'Conectado Exitoso')
	})
	await client.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./codec.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))


		client.on('CB:Blocklist', json => {
            if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	client.on('chat-update', async (mek) => {
		try {
            if (!mek.hasNewMessage) return
            mek = JSON.parse(JSON.stringify(mek)).messages[0]
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
			global.prefix
			global.blocked
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('America/Guayaquil').format('HH:mm:ss')
			const date = moment.tz('America/Guayaquil').format('DD/MM/YY')
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			let authorname = client.contacts[from] != undefined ? client.contacts[from].vname || client.contacts[from].notify : undefined
			const isCmd = body.startsWith(prefix)

			mess = {
				wait: '⌛ *En proceso, tardara un momento...* ⌛',
				waitcid: '⌛ *En proceso, optedremos tu CID de windows/office...* ⌛',
				waitpid: '⌛ *En proceso, averiguamos si tu serial es valido...* ⌛',
				success: '✔️ Listo ✔️',
				only: {
					group: '[❗] Este comando es solo para grupos',
					ownerG: '[❗] Este comando solo puede ser utilizado por un admin del grupo',
					ownerB: '[❗] Este comando solo lo usa los administradores del BOT',
					admin: '[❗] Este comando solo puede ser utilizado por administradores del grupo',
					Badmin: '[❗] Este comando solo se puede usar cuando el bot se convierte en administrador',
					}
			}
    		const apakah = ['Si','No']
            const kapankah = ['Otro día','Otra semana','Otro mes','Otro año']
			const botNumber = client.user.jid
			const ownerNumber = ["573144182071@s.whatsapp.net","573223598113@s.whatsapp.net,51979518883@s.whatsapp.net,51979518883@s.whatsapp.net"] // replace this with your number
			const nomorOwner = [ownerNumber]
	        const isGroup = from.endsWith('@g.us')
			const totalchat = await client.chats.all()
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
            const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isOwner = ownerNumber.includes(sender)
            const isUser = user.includes(sender)
            //const NomerOwner = '593997889284@s.whatsapp.net'

			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				client.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				client.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}

			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
 
       /******ENTRADA FIN DE FUNCIONES******/
			
			switch(command) {
		

				//Funcion de cambio de prefijo de bot
				case 'setprefix':
					
					if (args.length < 1) return
					if (!isOwner) return reply(mess.only.ownerB)
					prefix = args[0]
					setting.prefix = prefix
					fs.writeFileSync('./src/settings.json', JSON.stringify(setting, null, '\t'))
					reply(`El prefijo se ha cambiado correctamente a : ${prefix}`)
					break

				case 'exe':
	              	client.updatePresence(from, Presence.composing) 
	              	if (!isOwner) return reply(mess.only.ownerB)
	               	const cmd = body.slice(5)
	               	exec(cmd, (err, stdout) => {
		           	if(err) return client.sendMessage(from, "Adios", text, { quoted: mek })
		           	if (stdout) {
			       	client.sendMessage(from, stdout, text, { quoted: mek })
		           	}
	           		})
                  	break
                

				//Comando para verificar claves de windows u office
				case 'pid':
				case 'PID':
					act0= await getBuffer(`https://www.ardilu.com/wp-content/uploads/2019/01/claves-genericas-windows-10.jpg`)
					if (args.length < 1) return client.sendMessage(from, act0, image, { quoted: mek , caption : `¿Cual es la clave a testear?... Ejemplo: ${prefix}PID XXXXX-XXXXX-XXXXX-XXXXX-XXXXX`})
					reply(mess.waitpid)
					anu = await getBuffer(`https://kichhoat24h.com/public-api/check-key?key=${args[0]}&token=${token_id}`)
					teks = `${anu}\nSi no aparece nada, es por que la clave no es valida o no se puede verificar\n*Codigos de Error:*\n*0xC004C008:* Get confirmation ID on the website.\n*0xC004C020:* Get confirmation ID on the website,\nCall Microsoft support via skype.\n*Get Web:* Get confirmation ID on the website.\n*Call MS Support:* Call Microsoft support via skype.\n*0xC004C060:* Dead key.\n*0xC004C003:* Key blocked.\n*0xC004C004:* Fake key.\n*Unsupported:*\nThe key doesn't supported for get error code by the website.\n`
					logoms= await getBuffer(`https://winphonemetro.com/files/2012/08/Microsoft-Nuevo-Logotipo1.jpg`)
					client.sendMessage(from, logoms, image, { quoted: mek, caption : teks } )
					break

				case 'cid':
				case 'CID':
					act1= await getBuffer(`https://3.bp.blogspot.com/-nOI4gWHTJIs/V6ripqom34I/AAAAAAAAH1E/FFliA73LGIMYUzSre27_OdiBeBqDdeNYwCLcB/s1600/Windows-10-Activar-telefono-chat-%25284%2529.PNG`)
					act2= await getBuffer(`http://2.bp.blogspot.com/-xeJYzTqt33k/UMOzCQ4RcrI/AAAAAAAAARs/HXCNA8Sk1NQ/s1600/2vakydx.png`)
					if (args.length < 1) return client.sendMessage(from, act1, image, { quoted: mek , caption : `Cual es tu numero de CID... Ejemplo: ${prefix}CID 482959050031106449915731380086642307697546230726111227435334801`}),client.sendMessage(from, act2, image, { quoted: mek } )
					reply(mess.waitcid)
					anu = await getBuffer(`https://kichhoat24h.com/public-api/get-cid?iid=${args[0]}&token=${token_id}&auto_call=auto_call`)
					teks = `${anu}`
					logoms= await getBuffer(`https://winphonemetro.com/files/2012/08/Microsoft-Nuevo-Logotipo1.jpg`)
					client.sendMessage(from, logoms, image, { quoted: mek, caption : teks } )
					break

				//Funcion de Ping del servidor
				case 'status':   
				 	const timestamp = speed();
				 	const latensi = speed() - timestamp
				 	client.updatePresence(from, Presence.composing) 
				 	uptime = process.uptime()
				 	imgserver = await getBuffer(`https://yt3.ggpht.com/a-/AAuE7mDmtUNTELszsWCyDdH7NR2SS1GVmsSvsshW-Q=s240-mo-c-c0xffffffff-rj-k-no`)
					client.sendMessage(from, imgserver, image, { quoted: mek, caption: `Tiempo Respuesta: *${latensi.toFixed(2)} _Segundos_*
				 	\nSistema Operativo: *Windows Server 2019*\nRAM: *12GB*\nRed: *1GB*\nStatus: *Online*\nTipo de ejecutor: *Visual Studio Code + Node*
				 	\nDebug: *Off*\n\n*El bot esta activo*\n*${kyun(uptime)}*`, text, })
				 	break
			 	//Fin de la funcion


                default:
				if (isGroup && isSimi && budy != undefined) {
						console.log(budy)
						muehe = await simih(budy)
						console.log(muehe)
						reply(muehe)
					} else {
						console.log(color('[WARN]','red'), 'Unregistered Command from', color(sender.split('@')[0]))
					}
                           }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
}
starts()
