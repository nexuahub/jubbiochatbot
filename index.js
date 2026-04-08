import { Client, GatewayIntentBits } from '@jubbio/core';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const repliedMessages = new Set();
const getMessageKey = (message) => `${message.id}-${message.createdTimestamp}`;

client.on('ready', () => {
  console.log(`✅ ${client.user.username} aktif!`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (message.reference) return;
  if (message.type === 'REPLY') return;

  const key = getMessageKey(message);
  if (repliedMessages.has(key)) return;

  const msg = message.content.toLowerCase();
  let cevap = null;

  // 🔥 KOMUT LİSTESİ
  if (msg === '/komut') {
    cevap =
`📜 Kullanılabilir Komutlar:

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

😄 Eğlence:
- "yerim seni" yaz → sürpriz cevap 😏

🤖 Diğer:
- botu etiketle (@bot) → cevap verir
`;
  }

  // 🔹 Mention
  else if (msg.includes(client.user.id)) {
    cevap = "Beni mi çağırdın 😏";
  } 

  // 🔥 YERİM SENİ KOMUTU (akıllı)
  else if (msg.includes("yerim") && msg.includes("seni")) {
    cevap = "Kim kimi yiyo lan 😄";
  }

  // 🔹 Normal komutlar
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

  // 🔥 TEK CEVAP GARANTİ
  if (cevap) {
    await message.reply(cevap);
    repliedMessages.add(key);
  }

  if (repliedMessages.size > 1000) repliedMessages.clear();
});

client.login("e7d50bbac900a1ecb7959a41f44aa2d0c8eba64d431e85c55cbef44c870bb059");
