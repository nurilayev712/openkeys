const fs = require('fs');
const path = require('path');
const https = require('https');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const skinsDir = path.join(__dirname, '..', 'public', 'images', 'skins');
const casesDir = path.join(__dirname, '..', 'public', 'images', 'cases');

function download(url, dest) {
  return new Promise((resolve) => {
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      console.log('Exists:', path.basename(dest));
      return resolve(true);
    }
    const f = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, dest).then(resolve);
      }
      if (res.statusCode !== 200) {
        f.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        console.log('Error', res.statusCode, url);
        return resolve(false);
      }
      res.pipe(f);
      f.on('finish', () => {
        f.close();
        console.log('Saved:', path.basename(dest), fs.statSync(dest).size, 'bytes');
        resolve(true);
      });
    }).on('error', e => {
      console.error(e.message);
      resolve(false);
    });
  });
}

const STEAM_AKAMAI = 'https://community.akamai.steamstatic.com/economy/image/';

const additional = [
  // CS2
  {
    dest: path.join(skinsDir, 'glock-umbral.png'),
    url: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK8-eAWie_vx3suNgWxa_nBovp3PXyo76Ii_FPAQmDMYiTLYDthm_kdbmZry2slCLjoMQzC7_3y1J7nts_a9cBi_qumx0'
  },
  {
    dest: path.join(skinsDir, 'mac10-sakkaku.png'),
    url: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1Y-s2jaac8cM-AD2ybwOVjj-xsSyCmmFMk5mnRzdeqdSnCPVN2DpV3QeELtELrlIbiPrzqsVOMjdlBnySvjH5O8G81tOTP5a5f'
  },
  // PUBG
  {
    dest: path.join(skinsDir, 'pubg-m416-orange.png'),
    url: STEAM_AKAMAI + '-8zOYQcPJoBYU7uKzjw0RZajjFiA_AojfFoacglhStOfdn6gbpcbDuuPIxAIsohHfCnyq89XR3ZYQqutoVKgDM8rPo-0E5-eECMbzgIELg'
  },
  {
    dest: path.join(skinsDir, 'pubg-m416-digital.png'),
    url: STEAM_AKAMAI + '-8zOYQcPJoBYU7uKzjw0RZajjFiA_AojfFoacglhStOfdn6gbpcbDuuPIxAIsohHfCnyq89XR3ZYQqutoVKgDM8rPo-3EZ-eECOL1Ow7BQ'
  },
  {
    dest: path.join(skinsDir, 'pubg-kar98-orange.png'),
    url: STEAM_AKAMAI + '-8zOYQcPJoBYU7uKzjw0RZajjFiA_AojfFoacglhStOfdn6gbpcbDuuPIxAIsohHfCnyq89XR3ZYQqutoVKgDM8rPo-0EJ-eECPj9OoUtg'
  },
  {
    dest: path.join(skinsDir, 'pubg-awm-gold.png'),
    url: STEAM_AKAMAI + '-8zOYQcPJoBYU7uKzjw0RZajjFiA_AojfFoacglhStOfdn6gbpcbDuuPIxAIsohHfCnyq89XR3ZYQqutoVKgDM8rPo-yFp-eECMyXy2lLg'
  },
  {
    dest: path.join(skinsDir, 'pubg-trenchcoat.png'),
    url: STEAM_AKAMAI + '-8zOYQcPJoBYU7uKzjw0RZajjFiA_AojfFoacglhStOfdn6gbpcbDuuPIxAIsohHfCnyq89XR3ZYQqutoVKiD88vPo-3H5-eECPOudAiUA'
  },
  {
    dest: path.join(skinsDir, 'pubg-bandana.png'),
    url: STEAM_AKAMAI + '-8zOYQcPJoBYU7uKzjw0RZajjFiA_AojfFoacglhStOfdn6gbpcbDuuPIxAIsohHfCnyq89XR3ZYQqutoVKiD88tPo-3Fp-eECPRqoAaiw'
  },
  {
    dest: path.join(skinsDir, 'pubg-pan-target.png'),
    url: STEAM_AKAMAI + '-8zOYQcPJoBYU7uKzjw0RZajjFiA_AojfFoacglhStOfdn6gbpcbDuuPIxAIsohHfCnyq89XR3ZYQqutoVKgDM8rPo-yH5-eECMpzQN8og'
  },
  {
    dest: path.join(skinsDir, 'pubg-helmet-lvl3.png'),
    url: STEAM_AKAMAI + '-8zOYQcPJoBYU7uKzjw0RZajjFiA_AojfFoacglhStOfdn6gbpcbDuuPIxAIsohHfCnyq89XR3ZYQqutoVKgDM8pP4-0E5-eECOs_hsKVQ'
  },
  {
    dest: path.join(casesDir, 'case-pubg-survivor.png'),
    url: STEAM_AKAMAI + '-8zOYQcPJoBYU7uKzjw0RZajjFiA_AojfFoacglhStOfdn6gbpcbDuuPIxAIsohHfCnyq89XR3ZYQqutoVKiCs8qPo-3Fp-eECPmznk5pQ'
  },
  {
    dest: path.join(casesDir, 'case-pubg-aviator.png'),
    url: STEAM_AKAMAI + '-8zOYQcPJoBYU7uKzjw0RZajjFiA_AojfFoacglhStOfdn6gbpcbDuuPIxAIsohHfCnyq89XR3ZYQqutoVKgC84qPo-3FJ-eECOY0tzEWg'
  }
];

async function run() {
  for (const item of additional) {
    await download(item.url, item.dest);
  }
  console.log('All additional assets ready!');
}

run();
