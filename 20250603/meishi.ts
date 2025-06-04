//usage: API_KEY=openai_api_key node meishi.mjs image.jpeg
import OpenAI from "openai";
import { resolve } from 'path';
import sharp from "sharp";
import exifr from 'exifr';

(async () => {
  const openai = new OpenAI({ apiKey: process.env.API_KEY });
  const path = resolve(process.argv[2])
  const { width, height } = await sharp(path).metadata();
  const scale = 1024 / Math.max(width, height);
  let image = sharp(path).resize(Math.round(width * scale), Math.round(height * scale));
  switch (await exifr.orientation(path)) {
    case 2: // 左右反転
      image = image.flop();
      break;
    case 3: // 180度回転
      image = image.rotate(180);
      break;
    case 4: // 上下反転
      image = image.flip();
      break;
    case 5: // 上下反転 + 90度右回転
      image = image.flip().rotate(90);
      break;
    case 6: // 90度右回転
      image = image.rotate(90);
      break;
    case 7: // 左右反転 + 90度右回転
      image = image.flop().rotate(90);
      break;
    case 8: // 90度左回転
      image = image.rotate(-90);
      break;
    case 1:
    default:
      // そのまま
      break;
  }
  const buffer = await image.toFormat('webp').toBuffer();

  const response = await openai.responses.create({
    model: "gpt-4.1-nano",
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text", text: `あなたは画像から指定フォーマットのJSONを抽出するアシスタントです。
以下のjsonテンプレートに従い、画像から名刺情報を読み取ってjson文字列を返してください。

{
 "kanji": "%ここに日本語氏名を入れてください%",
 "kana": "%ここにふりがなを入れてください%",
 "english": "%ここに英語氏名を入れてくさい%",
 "title": "%ここに役職を入れてください%",
 "organization": "%ここに組織名を入れてください%",
 "license": "%ここに資格名を入れてください%",
 "company": "%ここに会社名を入れてください%",
 "address": "%ここに住所を入れてください%",
 "postal": "%ここに郵便番号を入れてください%",
 "tel": "%ここに電話番号を入れてください%",
 "mobile": "%ここに携帯電話番号を入れてください%",
 "fax": "%ここにFAX番号を入れてください%",
 "email": "%ここにメールアドレスを入れてください%",
 "hobby": "%ここに趣味を入れてください%",
 "homepage": "%ここにホームページを入れてください%"
}` },
          {
            type: "input_image",
            detail: "auto",
            image_url: `data:image/webp;base64,${buffer.toString('base64')}`,
          },
        ],
      },
    ],
  });

  console.log(response);
})()