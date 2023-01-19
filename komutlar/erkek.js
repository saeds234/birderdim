const {
    SlashCommandBuilder, codeBlock
  } = require('@discordjs/builders');
  
  const { MessageActionRow, MessageButton} = require('discord.js');

  const { QuickDB } = require('quick.db');
const db = new QuickDB();

  module.exports = {
    data: new SlashCommandBuilder()
      .setName('erkek')
      .setDescription('Erkek olarak kayıt et.')
      .addUserOption(option =>
        option.setName('üye')
        .setDescription('Kayıt edilecek üye.')
        .setRequired(true))
      .addStringOption(option =>
        option.setName('isim')
        .setDescription('Kullanıcının ismi.')
        .setRequired(true))
        .addIntegerOption(option =>
            option.setName('yaş')
            .setDescription('Kullanıcının yaşı.')
            .setRequired(true)),
    async execute(interaction, client) {
      const semoizmuye = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.options.getUser('üye').id);
      const semoizmkullanan = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.user.id);
      const semoizmisim = interaction.options.getString('isim');
      const semoizmyas = interaction.options.getInteger('yaş');
      const semoizmyetkili = await db.get(`semoizmkayitci`)

      if(!semoizmkullanan.roles.cache.get(semoizmyetkili)) return interaction.reply({content: `Yeterli yetkin bulunmuyor!!`, ephemeral: true});

      const semoizmerkek = await db.get(`semoizmerkek`)
      const semoizmkadin = await db.get(`semoizmkadin`)
      const semoizmkayitsiz = await db.get(`semoizmkayitsiz`)
      const semoizmtag = await db.get(`semoizmtag`)
      const semoizmlog1 = await db.get(`semoizmlog`)
      const logkanal = client.guilds.cache.get(interaction.guildId).channels.cache.get(semoizmlog1)

      const yetkilicik = semoizmkullanan.id
      const uyecik = semoizmuye.id
    
      let semoizmisimcik = semoizmisim.charAt(0).toUpperCase() + semoizmisim.slice(1).toLowerCase();
      await semoizmuye.roles.add(semoizmerkek)
      await semoizmuye.roles.remove(semoizmkadin)
      await semoizmuye.roles.remove(semoizmkayitsiz)

      await db.add(`semoizmerkeksayi_${yetkilicik}`, 1)
      await db.set(`semoizmkayiteden_${uyecik}`, yetkilicik)
      await db.set(`semoizmisimcik_${uyecik}`, semoizmisimcik)
      await db.set(`semoizmyascik_${uyecik}`, semoizmyas)
      await db.set(`semoizmcinsiyetcik_${`uyecik`}`, `erkek`)

      semoizmuye.setNickname(semoizmtag +' '+ semoizmisimcik + ` '` + semoizmyas).catch(err => console.log(`Semoizm`))

            //logkanal

            const semoizmrow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('primary123321')
                    .setLabel(interaction.member.user.username+'#'+interaction.member.user.discriminator)
                    .setStyle('SECONDARY')
          .setEmoji('1026038643065880656')
          .setDisabled(true),
            );
      
      
      const semoembed = new client.discord.MessageEmbed()
        .setColor('6d6ee8')
        .setThumbnail(semoizmuye.displayAvatarURL())
        .setDescription('**・Yeni bir kullanıcı kayıt edildi!** \n\n・**Kullanıcı**; <@'+ semoizmuye.id +'> | `'+ semoizmuye.id +'`\n\n・**İsim & Yaş**; `'+ semoizmisim +'`-`'+ semoizmyas +'`\n\n・**Verilen Rol**; <@&'+ semoizmerkek  +'> ')
        .setFooter({ text: 'Semoizm', iconURL: client.user.avatarURL()})
        .setTimestamp();
     
      interaction.reply({content: ` \`${semoizmisim} '${semoizmyas}\` **olarak kayıt edildi**. \n\n${semoizmuye}`, ephemeral: true})
      logkanal.send({embeds: [semoembed],  components: [semoizmrow] })
    },
  };