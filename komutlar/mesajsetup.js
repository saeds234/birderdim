const {
    SlashCommandBuilder
  } = require('@discordjs/builders');
  
  const { QuickDB } = require('quick.db');
const db = new QuickDB();
const moment = require("moment");
moment.locale("tr");


  module.exports = {
    data: new SlashCommandBuilder()
      .setName('mesaj-setup')
      .setDescription('Bot mesajlarını ayarla.')
      .addStringOption(option =>
        option.setName('hoşgeldin-mesaj')
        .setDescription('Biri sunucuya katıldığında atılacak mesaj?')
        .setRequired(false)),
    async execute(interaction, client) {
      const semoizmyetkili = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.user.id);
      const semoizmhosgeldinmsg = interaction.options.getString('hoşgeldin-mesaj')
      let semoizmperms = semoizmyetkili.permissions;

      if(!semoizmperms.has("ADMINISTRATOR")) return interaction.reply({content: `Yetkin yok!`, ephemeral: true})


      const semoizmhosgeldinmsg1 = await db.get(`semoizmhosgeldinmesaj`)
      let semoizmhosgeldinmsgreel = ""

      if (!semoizmhosgeldinmsg1) {
semoizmhosgeldinmsgreel = 'k_etiket **Sunucuya Hoşgeldin!** s_altSeninle beraber **s_kisi** kişiye ulaştık s_alt**Hesap Kuruluş:** `k_kurulus` s_alt**Sunucuya Katılım:** `k_katilis`'
      } else {
semoizmhosgeldinmsgreel = semoizmhosgeldinmsg1
      }


   

const semoizmhosgeldinmsgreel1 = semoizmhosgeldinmsgreel
?.replaceAll("k_etiket", `<@${interaction.user.id}>`)
?.replaceAll("s_alt", `\n`)
?.replaceAll("s_kisi", `${interaction.guild.memberCount}`)
?.replaceAll("k_kurulus", `${moment(interaction.user.createdAt).format('D MMMM YYYY')}`)
?.replaceAll("k_katilis", `${moment(interaction.joinedAt).format('D MMMM YYYY')}`)

const semoizmhosgeldinmsgayarlandi = semoizmhosgeldinmsg
?.replaceAll("k_etiket", `<@${interaction.user.id}>`)
?.replaceAll("s_alt", `\n`)
?.replaceAll("s_kisi", `${interaction.guild.memberCount}`)
?.replaceAll("k_kurulus", `${moment(interaction.user.createdAt).format('D MMMM YYYY')}`)
?.replaceAll("k_katilis", `${moment(interaction.joinedAt).format('D MMMM YYYY')}`)


      if(!semoizmhosgeldinmsg) return interaction.reply({content: '`k_etiket` = Kullanıcya etiket atar, \n`s_kisi` = Sunucudaki üye sayısını gösterir, \n`s_alt` = Bir alt satıra geçmeye yarar, \n`k_kurulus` = Hesabın kuruluş tarihini yazar, \n`k_katilis` = Hesabın sunucuya katılım tarihini yazar. \n**-Ayarlanmış mesajınız**: \n\n' + semoizmhosgeldinmsgreel1 , ephemeral: true})

  if(semoizmhosgeldinmsg) {
     interaction.reply({content: `**Mesaj Başarıyla Ayarlandı:** \n\n${semoizmhosgeldinmsgayarlandi}`, ephemeral: true})
     await db.set(`semoizmhosgeldinmesaj`, semoizmhosgeldinmsg)
  }
    },
  };