import { writeFileSync } from 'fs';
import { join } from 'path';

import { TWorkDetails } from '../../src/shared/lib';
import artists from '../../data/artists.json';
import works from '../../data/works.json';
import channelLots from '../../data/telegram-lots.json';

const OUTPUT_PATH = join(__dirname, '../../data/telegram-lots.json');

const BOT_KEY = '5311692781:AAF0obyeYPivxfA1IqrCuR45RF2w0TXAYY0';
const TARGET_CHANNEL = '-1001751172226';

// https://ibb.co/q1mPvpj
// https://ibb.co/rbVjZ0t
// https://ibb.co/YfMw7wn
// https://ibb.co/VNCRdL7
// https://ibb.co/Cb1RF6j
// https://ibb.co/1JbdDLX
// https://ibb.co/Rbkr9dX
// https://ibb.co/RYWrB8z
// Because telegram cant add photos for github pages

const TEMP_IMAGES = {
  '13': 'https://i.ibb.co/nkQ5Fjm/work-13.jpg',
  '25': 'https://i.ibb.co/KNJP9hG/work-25.jpg',
  '26': 'https://i.ibb.co/QYRtFtS/work-26.jpg',
  '27': 'https://i.ibb.co/wLQVTd9/work-27.jpg',
  '28': 'https://i.ibb.co/9b8Qjhx/work-28.jpg',
  '29': 'https://i.ibb.co/Fqn0SKY/work-29.jpg',
  '30': 'https://i.ibb.co/9gkKNSx/work-30.jpg',
  '31': 'https://i.ibb.co/TY5jbym/work-31.jpg',
};

type TWorkInfoParams = {
  name: string;
  author: string;
  initialPrice: string;
  imageURI: string;
  infoURI: string;
  size?: string;
};
const getWorkInfo = ({
  name,
  author,
  initialPrice,
  size,
  infoURI,
}: TWorkInfoParams) => {
  return `<b>${name}</b>\n\nАвтор: ${author}\nРазмер: ${size}\n<a href="${infoURI}">Информация о работе</a>\n\n<b>Начальная цена: ${initialPrice} ₽</b>`;
};

const getWorkInfoParams = (work: TWorkDetails): TWorkInfoParams | undefined => {
  const authorDetails = artists[work.artistId as keyof typeof artists];
  if (authorDetails?.name && work?.auction?.price && work?.photo?.localURI) {
    const result: TWorkInfoParams = {
      name: work.name,
      author: authorDetails.name,
      initialPrice: work.auction.price,
      imageURI:
        TEMP_IMAGES[work.id] ??
        `https://over-over.github.io/nabrosok-2022//images/works/work-${work.id}.jpg`,
      infoURI: `https://over-over.github.io/nabrosok-2022/work/${work.id}`,
      size: work.size,
    };
    return result;
  }
};

const sendBotMessage = async (id: string): Promise<object> => {
  const selectedWork = works[id as keyof typeof works];
  if (selectedWork) {
    const messageParams = getWorkInfoParams(selectedWork);
    if (!messageParams) {
      return;
    }
    const messageMarkup = getWorkInfo(messageParams);
    const messageURI = encodeURIComponent(messageMarkup);

    try {
      const result = await fetch(
        `https://api.telegram.org/bot${BOT_KEY}/sendPhoto?chat_id=${TARGET_CHANNEL}&photo=${messageParams.imageURI}&parse_mode=HTML&caption=${messageURI}&disable_notification=true`,
      );

      if (result.status !== 200) {
        // throw new Error(
        //   `Wrong status: ${id}, ${result.status}, ${result.statusText}`,
        // );
      }

      const body = await result.json();
      channelLots[id] = JSON.stringify(body);
      writeFileSync(OUTPUT_PATH, JSON.stringify(channelLots));
      console.log('Successfully posted work', id, messageParams.name);

      return body;
    } catch (error) {
      console.error('Failed to post work', error);
      throw new Error("Can't send request via bot");
    }
    // fetch(
    //   `https://api.telegram.org/bot${BOT_KEY}/sendMessage?chat_id=${TARGET_CHANNEL}&parse_mode=HTML&text=${messageURI}&disable_web_page_preview=true`,
    // );
  }
};

const prepareMessages = async () => {
  const channelLotsIds = Object.keys(channelLots) as Array<keyof typeof works>;
  const workIds = Object.keys(works) as Array<keyof typeof works>;

  for (const id of workIds) {
    if (channelLotsIds.includes(id)) {
      continue;
    }

    try {
      await sendBotMessage(id);
    } catch (error) {
      console.error('Failed to post messages in channel', error);
      break;
    }
  }

  writeFileSync(OUTPUT_PATH, JSON.stringify(channelLots));
  console.log('Updated telegram-lots.json');
};

prepareMessages();
