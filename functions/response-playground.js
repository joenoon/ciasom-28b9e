const res = {
  version: '1.0',
  href: 'https://api.npr.org/listening/v2/recommendations?channel=npr',
  attributes: {},
  items: [
    {
      version: '1.0',
      href:
        'https://api.npr.org/listening/v2/recommendations?channel=npr&sharedMediaId=200010:151-2018-01-29-06-54',
      attributes: {
        type: 'stationId',
        uid: '200010:151-2018-01-29-06-54',
        title: 'KQED',
        skippable: true,
        slug: 'San Francisco',
        provider: 'KQED',
        duration: 15,
        date: '2018-01-29T06:54:59-05:00',
        rationale: 'Selected by NPR',
        rating: {
          mediaId: '200010:151-2018-01-29-06-54',
          origin: 'STID',
          rating: 'START',
          elapsed: 0,
          duration: 15,
          channel: 'npr',
          affiliations: [],
          timestamp: '2018-01-29T06:54:59-0500',
          cohort: 'F',
        },
      },
      items: [],
      links: {
        audio: [
          {
            'content-type': 'audio/aac',
            href:
              'https://ondemand.npr.org/npr-mp4/stationid/150_efe5a1ed221dd7cfb525bd1d8c897c93.mp4',
          },
        ],
        image: [
          {
            'content-type': 'image/png',
            href: 'https://media.npr.org/images/stations/nprone_logos/kqed.png',
            rel: 'logo',
          },
        ],
        provider: [
          {
            'content-type': 'application/json',
            href:
              'https://api.npr.org/listening/v2/organizations/151/recommendations',
          },
        ],
        recommendations: [
          {
            'content-type': 'application/json',
            href:
              'https://api.npr.org/listening/v2/ratings?recommend=true&channel=npr&prevStories=1&queued=%5B%5D&flow=0',
          },
        ],
      },
      errors: [],
    },
    {
      version: '1.0',
      href:
        'https://api.npr.org/listening/v2/recommendations?channel=npr&sharedMediaId=200070:1|2018-01-29T06:00:00-0500|short',
      attributes: {
        type: 'audio',
        uid: '200070:1|2018-01-29T06:00:00-0500|short',
        title: 'National Newscast',
        skippable: true,
        provider: 'NPR',
        duration: 179,
        date: '2018-01-29T06:00:00-05:00',
        description: 'A brief update',
        rationale: '',
        rating: {
          mediaId: '200070:1|2018-01-29T06:00:00-0500|short',
          origin: 'HRNC',
          rating: 'START',
          elapsed: 0,
          duration: 179,
          channel: 'npr',
          affiliations: [],
          timestamp: '2018-01-29T06:54:59-0500',
          cohort: 'F',
        },
      },
      items: [],
      links: {
        audio: [
          {
            'content-type': 'audio/mp3',
            href:
              'https://ondemand.npr.org/anon.npr-mp3/npr/newscasts/2018/01/29/newscastShort060843.mp3',
          },
          {
            'content-type': 'audio/aac',
            href:
              'https://ondemand.npr.org/npr-mp4/npr/newscasts/2018/01/29/newscastShort060843.mp4',
          },
          {
            'content-type': 'application/vnd.apple.mpegurl',
            href:
              'https://ondemandhls.npr.org/nprhls/npr/newscasts/2018/01/29/newscastShort060843/master.m3u8',
          },
        ],
        recommendations: [
          {
            'content-type': 'application/json',
            href:
              'https://api.npr.org/listening/v2/ratings?recommend=true&channel=npr&prevStories=1&queued=%5B%5D&flow=1',
          },
        ],
      },
      errors: [],
    },
    {
      version: '1.0',
      href:
        'https://api.npr.org/listening/v2/recommendations?channel=npr&sharedMediaId=581505378:581512581',
      attributes: {
        type: 'audio',
        uid: '581505378:581512581',
        title: 'Monday, January 29th, 2018',
        audioTitle: 'Monday, January 29th, 2018',
        primary: true,
        geofence: {
          restricted: false,
          countries: [],
        },
        skippable: true,
        provider: 'NPR',
        program: 'Up First',
        duration: 752,
        date: '2018-01-29T05:58:00-05:00',
        description:
          "From the State of the Union address to immigration talks, President Trump begins a busy week. What kind of agenda will he set? Also, Vladimir Putin's biggest critic was arrested at a protest he organized. What brought thousands of Russians into the streets?",
        rationale: 'One of our popular programs',
        rating: {
          mediaId: '581505378:581512581',
          origin: 'FEATURED',
          rating: 'START',
          elapsed: 0,
          duration: 752,
          channel: 'npr',
          affiliations: ['510318'],
          timestamp: '2018-01-29T06:54:59-0500',
          cohort: 'F',
        },
      },
      items: [],
      links: {
        up: [
          {
            'content-type': 'text/html',
            href: 'https://www.npr.org/podcasts/510318/up-first',
          },
          {
            'content-type': 'application/json',
            href:
              'https://api.npr.org/listening/v2/aggregation/510318/recommendations',
          },
        ],
        web: [
          {
            'content-type': 'application/xml',
            href:
              'http://api.npr.org/query?id=581505378&profileTypeId=15&apiKey=MDI5NDI3MDQwMDE0ODMwMzg1MDUwN2U2OA000',
          },
          {
            'content-type': 'text/html',
            href: 'https://www.npr.org/player/embed/581505378/581512581',
            rel: 'embed',
          },
        ],
        audio: [
          {
            'content-type': 'audio/mp3',
            href:
              'https://play.podtrac.com/npr-510318/ondemand.npr.org/anon.npr-mp3/npr/upfirst/2018/01/20180129_upfirst_12918upfirst2.mp3?orgId=1&d=752&p=510318&story=581505378&t=podcast&e=581505378&NPROne=true',
          },
          {
            'content-type': 'audio/mp3',
            href:
              'https://play.podtrac.com/npr-510318/npr.mc.tritondigital.com/NPR_510318/media/anon.npr-mp3/npr/upfirst/2018/01/20180129_upfirst_12918upfirst2.mp3?orgId=1&d=752&p=510318&story=581505378&t=podcast&e=581505378&NPROne=true&dl=1',
            rel: 'download',
          },
          {
            'content-type': 'audio/aac',
            href:
              'https://play.podtrac.com/npr-510318/ondemand.npr.org/npr-mp4/npr/upfirst/2018/01/20180129_upfirst_12918upfirst2.mp4?orgId=1&d=752&p=510318&story=581505378&t=podcast&e=581505378&NPROne=true',
          },
        ],
        onramps: [
          {
            'content-type': 'text/html',
            href: 'http://one.npr.org/i/581505378:581512581',
          },
        ],
        image: [
          {
            'content-type': 'image/jpeg',
            href:
              'https://media.npr.org/assets/img/2018/01/29/thumbnail_3000x1688-e503b7e8653a8117b45285d094aae828a67581e6.jpg?s=600',
            rel: 'standard',
            image: '581507336',
            provider: 'NPR',
          },
          {
            'content-type': 'image/jpeg',
            href:
              'https://media.npr.org/assets/img/2018/01/29/thumbnail_3000x1688_wide-fde023c1eeb1861196a5f8346c7df5ee9d92e808.jpg?s=600',
            rel: 'wide',
            image: '581507336',
            provider: 'NPR',
          },
          {
            'content-type': 'image/jpeg',
            href:
              'https://media.npr.org/assets/img/2018/01/29/thumbnail_3000x1688-e503b7e8653a8117b45285d094aae828a67581e6.jpg?s=600',
            rel: 'enlargement',
            image: '581507336',
            provider: 'NPR',
          },
          {
            'content-type': 'image/jpeg',
            href:
              'https://media.npr.org/assets/img/2018/01/29/thumbnail_3000x1688_brick-b6b2d98d6511b438eb03bf7971fe286dbeddd8d5.jpg?s=600',
            rel: 'brick',
            image: '581507336',
            provider: 'NPR',
          },
          {
            'content-type': 'image/jpeg',
            href:
              'https://media.npr.org/assets/img/2018/01/29/thumbnail_3000x1688_vert-098918586649c36058ed28e07706cad0644b87b5.jpg?s=600',
            rel: 'vertical',
            image: '581507336',
            provider: 'NPR',
          },
          {
            'content-type': 'image/jpeg',
            href:
              'https://media.npr.org/assets/img/2018/01/29/thumbnail_3000x1688_slide-09ef613c41c181bfc60a83a97f7f25b36c669ff6.jpg?s=600',
            rel: 'slide',
            image: '581507336',
            provider: 'NPR',
          },
          {
            'content-type': 'image/png',
            href:
              'https://media.npr.org/assets/img/2017/03/21/upfirst-66525983c2f737ee022c71a593a757b791a28009.png?s=600',
            rel: 'logo_standard',
            image: '521015272',
            provider: 'NPR',
          },
          {
            'content-type': 'image/png',
            href:
              'https://media.npr.org/assets/img/2017/03/21/upfirst_sq-ffcb53c89446b62b66fefb97b9356ad49b31bc5d.png?s=600',
            rel: 'logo_square',
            image: '521015272',
            provider: 'NPR',
          },
          {
            'content-type': 'image/png',
            href:
              'https://media.npr.org/assets/img/2017/03/21/upfirst_wide-5152f3dd1efe85f9278ba7ea9bde3df14289a85a.png?s=600',
            rel: 'logo_wide',
            image: '521015272',
            provider: 'NPR',
          },
          {
            'content-type': 'image/png',
            href:
              'https://media.npr.org/assets/img/2017/03/21/upfirst_sq-ffcb53c89446b62b66fefb97b9356ad49b31bc5d.png?s=600',
            rel: 'logo_enlargement',
            image: '521015272',
            provider: 'NPR',
          },
          {
            'content-type': 'image/png',
            href:
              'https://media.npr.org/assets/img/2017/03/21/upfirst_brick-c1f63ffc730bde777cab9ba81679faa05be370f8.png?s=600',
            rel: 'logo_brick',
            image: '521015272',
            provider: 'NPR',
          },
          {
            'content-type': 'image/png',
            href:
              'https://media.npr.org/assets/img/2017/03/21/upfirst_slide-fb6de5537704ea619efe46043387807830f1c0ad.png?s=600',
            rel: 'logo_slide',
            image: '521015272',
            provider: 'NPR',
          },
        ],
        recommendations: [
          {
            'content-type': 'application/json',
            href:
              'https://api.npr.org/listening/v2/ratings?recommend=true&channel=npr&prevStories=1&queued=%5B%5D&flow=3',
          },
        ],
      },
      errors: [],
    },
    {
      version: '1.0',
      href:
        'https://api.npr.org/listening/v2/recommendations?channel=npr&sharedMediaId=581397024:581397027',
      attributes: {
        type: 'audio',
        uid: '581397024:581397027',
        title: 'Rep. Jim Himes On The Nunes Memo ',
        audioTitle: 'Rep. Jim Himes On The Nunes Memo ',
        primary: true,
        geofence: {
          restricted: false,
          countries: [],
        },
        skippable: true,
        slug: 'National Security',
        provider: 'NPR',
        program: 'weekend edition sunday',
        duration: 286,
        date: '2018-01-28T07:56:00-05:00',
        description:
          "Republicans say they have a memo listing FBI abuses. NPR's Lulu Garcia-Navarro speaks with Democratic Rep. Jim Himes, who says Republicans are trying to discredit the Trump-Russia inquiry.",
        rationale: 'One of our top stories',
        rating: {
          mediaId: '581397024:581397027',
          origin: 'LEAD',
          rating: 'START',
          elapsed: 0,
          duration: 286,
          channel: 'npr',
          affiliations: [],
          timestamp: '2018-01-29T06:54:59-0500',
          cohort: 'F',
        },
      },
      items: [],
      links: {
        up: [
          {
            'content-type': 'text/html',
            href: 'https://www.npr.org/programs/weekend-edition-sunday/',
          },
        ],
        web: [
          {
            'content-type': 'text/html',
            href:
              'https://www.npr.org/2018/01/28/581397024/rep-jim-himes-on-the-nunes-memo',
          },
          {
            'content-type': 'application/xml',
            href:
              'http://api.npr.org/query?id=581397024&apiKey=MDI5NDI3MDQwMDE0ODMwMzg1MDUwN2U2OA000',
          },
          {
            'content-type': 'text/html',
            href: 'http://n.pr/2FpRHa2',
          },
          {
            'content-type': 'text/html',
            href:
              'https://www.npr.org/templates/transcript/transcript.php?storyId=581397024',
            rel: 'transcript',
          },
          {
            'content-type': 'text/html',
            href: 'https://www.npr.org/player/embed/581397024/581397027',
            rel: 'embed',
          },
        ],
        audio: [
          {
            'content-type': 'audio/mp3',
            href:
              'https://ondemand.npr.org/anon.npr-mp3/npr/wesun/2018/01/20180128_wesun_senate_intelligence_memo.mp3?orgId=1&topicId=1122&d=286&p=10&story=581397024&NPROne=true',
          },
          {
            'content-type': 'audio/mp3',
            href:
              'https://ondemand.npr.org/anon.npr-mp3/npr/wesun/2018/01/20180128_wesun_senate_intelligence_memo.mp3?orgId=1&topicId=1122&d=286&p=10&story=581397024&NPROne=true&dl=1',
            rel: 'download',
          },
          {
            'content-type': 'audio/x-ms-wax',
            href:
              'https://www.npr.org/templates/dmg/dmg_wmref_em.php?id=581397027&type=1&mtype=WM&orgId=1&topicId=1122&d=286&p=10&story=581397024&NPROne=true',
          },
          {
            'content-type': 'audio/aac',
            href:
              'https://ondemand.npr.org/npr-mp4/npr/wesun/2018/01/20180128_wesun_senate_intelligence_memo.mp4?orgId=1&topicId=1122&d=286&p=10&story=581397024&NPROne=true',
          },
          {
            'content-type': 'application/vnd.apple.mpegurl',
            href:
              'https://ondemandhls.npr.org/nprhls//npr/wesun/2018/01/20180128_wesun_senate_intelligence_memo/master.m3u8?NPROne=true',
          },
        ],
        onramps: [
          {
            'content-type': 'text/html',
            href: 'http://one.npr.org/i/581397024:581397027',
          },
        ],
        recommendations: [
          {
            'content-type': 'application/json',
            href:
              'https://api.npr.org/listening/v2/ratings?recommend=true&channel=npr&prevStories=1&queued=%5B%5D&flow=5',
          },
        ],
      },
      errors: [],
    },
  ],
  links: {},
  errors: [],
};

const types = new Set();

res.items.forEach(item => {
  const {type, title} = item.attributes;
  const {audio, image} = item.links;
  const firstAudio = (audio && audio[0] && audio[0].href) || null;
  const firstImage = (image && image[0] && image[0].href) || null;
  // if (types.has(type)) return;
  // types.add(type);
  console.log('-->', type, title, firstAudio, firstImage);
  // console.log(item);
});
