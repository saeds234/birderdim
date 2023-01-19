const fs = require('fs');
const {
  Client,
  Collection,
  Intents
} = require('discord.js');
const config = require('./ayarlar.json');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS],
});

const moment = require("moment");
moment.locale("tr");

const { QuickDB } = require('quick.db');
const db = new QuickDB();

const Discord = require('discord.js');
client.discord = Discord;
client.config = config;

let ayarlar = require('./ayarlar.json');
const { execute } = require('./komutlar/erkek');

client.commands = new Collection();
const commandFiles = fs.readdirSync('./komutlar').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./komutlar/${file}`);
  client.commands.set(command.data.name, command);
};

const semoizmyazin = require('./yazilar.json');

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction, client, config);
  } catch (error) {
    console.error(error);
    return interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true
    });
  };
});

client.on('ready', () => {
  client.user.setActivity({ name: ayarlar.oynuyor, type: "WATCHING" })
  console.log('[LOG] Bot Aktif!')
 })

client.login(ayarlar.token);

//yeni komutlar alt kısma//

 client.on('guildMemberAdd', async member => {
  try {
    const hgkanal = await db.get(`semoizmhosgeldin`)
  const semoizmkanal = member.guild.channels.cache.get(hgkanal)
const semoizmyaziss = await db.get(`semoizmhosgeldinmesaj`)
const semoizmkayitsiz = await db.get(`semoizmkayitsiz`)

member.roles.add(semoizmkayitsiz)


  const semoizmyazi = semoizmyaziss
  ?.replaceAll("k_etiket", `<@${member.user.id}>`)
  ?.replaceAll("s_alt", `\n`)
  ?.replaceAll("s_kisi", `${member.guild.memberCount}`)
  ?.replaceAll("k_kurulus", `${moment(member.user.createdAt).format('D MMMM YYYY')}`)
  ?.replaceAll("k_katilis", `${moment(member.joinedAt).format('D MMMM YYYY')}`)

  semoizmkanal.send({content: semoizmyazi});
  } catch (error) {
    console.error(error)
  }
});

