import { Client, GatewayIntentBits } from '@jubbio/core';

// Bot oluşturma
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Daha önce yanıtlanan mesajları tut
const repliedMessages = new Set();
const getMessageKey = (message) => `${message.id}-${message.createdTimestamp}`;

client.on('ready', () => {
  console.log(`✅ ${client.user.username} aktif!`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;          // Bot kendi mesajına cevap vermesin
  if (message.reference) return;           // Reply mesajlarına cevap verme
  if (message.type === 'REPLY') return;    // Reply tipi mesajlara çık
  const key = getMessageKey(message);
  if (repliedMessages.has(key)) return;    // Aynı mesaj için birden fazla cevap yok

  const msg = message.content.toLowerCase();
  let cevap = null;

  // 🔥 KOMUT LİSTESİ
  if (msg === '/komut') {
    cevap = `📜 Kullanılabilir Komutlar:

👋 Selamlaşma:
- sa
- sea
- salam
- selam
- selamlar

💬 Sohbet:
- naber
- nasılsınız
- napıyorsunuz

🌞 Günlük:
- günaydın / güno
- iyi geceler
- iyi akşamlar
- iyi eğlenceler

🤖 Diğer:
- botu etiketle (@bot) → cevap verir
`;
  }

  // 🔹 Normal komutlar
  else if (msg.includes(client.user.id)) {
    cevap = "Beni mi çağırdın 😏";
  } 
  else if (msg === 'sa' || msg === 'selamun aleyküm' || msg === 'sea') {
    cevap = "Aleyküm Selam";
  } 
  else if (msg === 'salam') {
    cevap = "Sucuk şaka şaka aleyküm selam 😄";
  }
  else if (msg === 'selam') {
    cevap = "Selam!";
  } 
  else if (msg === 'selamlar') {
    cevap = "Selamlar 👋";
  } 
  else if (msg === 'naber') {
    cevap = "İyiyim 😎 sen?";
  } 
  else if (msg === 'günaydın' || msg === 'güno') {
    cevap = "Günaydın ☀️";
  } 
  else if (msg === 'iyi geceler') {
    cevap = "İyi geceler 🌙";
  } 
  else if (msg === 'iyi akşamlar') {
    cevap = "İyi akşamlar 🌆";
  } 
  else if (msg === 'iyi eğlenceler') {
    cevap = "İyi eğlenceler 🎉";
  } 
  else if (msg === 'nasılsınız') {
    cevap = "İyiyiz 😄 sen nasılsın?";
  } 
  else if (msg === 'napıyorsunuz') {
    cevap = "Bot görev başında 🤖";
  }
  else if (msg.includes('biri yerim seni')) {
    cevap = "Kim kimi yiyo lan 😳";
  }

  // Eğer cevap varsa gönder ve mesajı işaretle
  if (cevap) {
    await message.reply(cevap);
    repliedMessages.add(key);
  }

  // Belleği temizle
  if (repliedMessages.size > 1000) repliedMessages.clear();
});

// Token artık Environment Variable ile
client.login(process.env.BOT_TOKEN);
