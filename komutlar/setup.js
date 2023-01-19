const {
    SlashCommandBuilder
  } = require('@discordjs/builders');
const { CommandInteractionOptionResolver } = require('discord.js');

  const { QuickDB } = require('quick.db');
const db = new QuickDB();


  module.exports = {
    data: new SlashCommandBuilder()
      .setName('setup')
      .setDescription('Botu kurarsınız.')
      .addRoleOption(option =>
        option.setName('kayıtcı-rol')
        .setDescription('Kayıt Yetkilisini Seç.')
        .setRequired(true))
      .addRoleOption(option =>
        option.setName('erkek-rol')
        .setDescription('Erkek Rolünü Seç')
        .setRequired(true))
        .addRoleOption(option =>
            option.setName('kadın-rol')
            .setDescription('Kadın Rolünü Seç')
            .setRequired(true))
            .addRoleOption(option =>
                option.setName('kayıtsız-rol')
                .setDescription('Kayıtsız Rolünü Seç')
                .setRequired(true))
                .addChannelOption(option =>
                    option.setName('hosgeldin-kanal')
                    .setDescription('Hoşgeldin Kanalını Seç')
                    .setRequired(true))
                    .addChannelOption(option =>
                        option.setName('log-kanal')
                        .setDescription('Log Kanalını Seç')
                        .setRequired(true))
                        .addStringOption(option =>
                            option.setName('tag')
                            .setDescription('İsimin Başına Gelecek Tagını Seç')
                            .setRequired(true)),
        
    async execute(interaction, client) {
      const semoizmyetkili = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.user.id);

      let semoizmperms = semoizmyetkili.permissions;

      if(!semoizmperms.has("ADMINISTRATOR")) return interaction.reply({content: `Yetkin yok!`, ephemeral: true})

      const kayitci = interaction.options.getRole('kayıtcı-rol');
      const erkek = interaction.options.getRole('erkek-rol');
      const kadin = interaction.options.getRole('kadın-rol');
      const kayitsiz = interaction.options.getRole('kayıtsız-rol');
      const hosgeldin = interaction.options.getChannel('hosgeldin-kanal');
      const log = interaction.options.getChannel('log-kanal');
      const tag = interaction.options.getString('tag');


      const semoizmkayitci = kayitci.id
      const semoizmerkek = erkek.id
      const semoizmkadin = kadin.id
      const semoizmkayitsiz = kayitsiz.id
      const semoizmhosgeldin = hosgeldin.id
      const semoizmlog = log.id
      const semoizmtag = tag


      await db.set(`semoizmkayitci`, semoizmkayitci)
      await db.set(`semoizmerkek`, semoizmerkek)
      await db.set(`semoizmkadin`, semoizmkadin)
      await db.set(`semoizmkayitsiz`, semoizmkayitsiz)
      await db.set(`semoizmhosgeldin`, semoizmhosgeldin)
      await db.set(`semoizmlog`, semoizmlog)
      await db.set(`semoizmtag`, semoizmtag)

      let semoizmembed =  new client.discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`⚙️ Semoizm Public Register Setup Menü!`)
      //.setAuthor({ name: `${client.user.username} by Semoizm`, iconURL: 'https://cdn.discordapp.com/emojis/995430074293694585.webp', url: 'https://instagram.com/semoizm' })
      .setThumbnail('https://cdn.discordapp.com/emojis/990002915928317982.gif')
      .setURL('https://github.com/semoizm')
      .addFields(
          { name: '\u200B', value: '\u200B' },
          { name: '👤 Kayıtcı Rol', value: '<@&'+ semoizmkayitci +'>', inline: true },
          { name: '👤 Erkek Rol', value:  '<@&'+ semoizmerkek +'>', inline: true },
          { name: `👤 Kadın Rol`, value:  '<@&'+ semoizmkadin +'>', inline: true },
          { name: `👤 Kayıtsız Rol `, value:  '<@&'+ semoizmkayitsiz +'>', inline: true },
          { name: '🧩 Hoşgeldin Kanal', value: '<#'+ semoizmhosgeldin +'>', inline: true },
          { name: '🧩 Log Kanal', value: '<#'+ semoizmlog +'>', inline: true },
      )


      interaction.reply({content: `**-Herhangi bir sorunda bana [instagramdan](https://instagram.com/Semoizm) ulaşabilirsiniz!**`, embeds: [semoizmembed], ephemeral: true})

    },
  };