export const user = {
  uid: 0, 
  email: 'Ash@Gotta_catch_"em_al', 
  name: '小智', 
  photo: 'https://i.imgur.com/vCsCG.png', 
  accessToken: 0
}

export const friendLists = {
  nextId: 1,
  0: {
    id: 0,
    title: '小智與他的快樂夥伴',
    members: ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'],
    parent: -1,
    children: [6, 2, 4, 5, 7]
  },
  1: {
    id: 1,
    title: '同伴',
    members: ['0','1','2','3','4','5'],
    parent: 6,
    children: []
  },
  2: {
    id: 2,
    title: '對手',
    members: ['6','7','14','15','16','17'],
    parent: 0,
    children: [9, 3]
  },
  3: {
    id: 3,
    title: '邪惡組織',
    members: ['14','15','16'],
    parent: 2,
    children: [8, 10, 11]
  },
  4: {
    id: 4,
    title: '研究員',
    members: ['11','12','13'],
    parent: 0,
    children: []
  },
  5: {
    id: 5,
    title: '複製人大軍',
    members: ['19','20','21','22','23','24','25','26','27','28'],
    parent: 0,
    children: []
  },
  6: {
    id: 6,
    title: '後宮',
    members: ['0','1','2','3','4','5','6','7','8','9','10'],
    parent: 0,
    children: [1]
  },
  7: {
    id: 7,
    title: '神奇寶貝',
    members: ['8','16','9','10','29','30','31'],
    parent: 0,
    children: []
  },
  8: {
    id: 8,
    title: '火箭隊',
    members: ['14','15','16'],
    parent: 3,
    children: []
  },
  9: {
    id: 9,
    title: '宿敵',
    members: ['17'],
    parent: 2,
    children: []
  },
  10: {
    id: 10,
    title: '水艦隊',
    members: [],
    parent: 3,
    children: []
  },
  11: {
    id: 11,
    title: '火岩隊',
    members: [],
    parent: 3,
    children: []
  }
};

export const friends = {
  data: [
    {
      id: '0',
      name: '小霞',
      picture: {
        data: {
          url: 'http://ruby.komica.org/pix/img2504.jpg'
        }
      }
    },
    {
      id: '1',
      name: '小剛',
      picture: {
        data: {
          url: 'http://pic.pimg.tw/iamotaku/1334164236-3186181645.jpg'
        }
      }
    },
    {
      id: '2',
      name: '小遙',
      picture: {
        data: {
          url: 'http://pic.baike.soso.com/p/20120928/20120928201844-895773885.jpg'
        }
      }
    },
    {
      id: '3',
      name: '小光',
      picture: {
        data: {
          url: 'http://filb.de/content/anime/dp/061/384.jpg'
        }
      }
    },
    {
      id: '4',
      name: '艾莉絲',
      picture: {
        data: {
          url: 'http://wiki.komica.org/pix/img9949.jpg'
        }
      }
    },
    {
      id: '5',
      name: '莎莉娜',
      picture: {
        data: {
          url: 'http://www.005.tv/uploads/allimg/160406/10353413U-1.jpg'
        }
      }
    },
    {
      id: '6',
      name: '米茹菲',
      picture: {
        data: {
          url: 'https://i.imgur.com/wReCLzg.jpg'
        }
      }
    },
    {
      id: '7',
      name: '愛兒',
      picture: {
        data: {
          url: 'http://img.pokemonbbs.com/upl/03/1453980294-1.jpg'
        }
      }
    },
    {
      id: '8',
      name: '美洛耶塔',
      picture: {
        data: {
          url: 'http://moefou.90g.org/wiki_cover/000/01/41/000014108.jpg?v=1363317153'
        }
      }
    },
    {
      id: '9',
      name: '菊草葉',
      picture: {
        data: {
          url: 'http://gmcdn.kikinote.net/wp-content/uploads/2016/11/d9a2803a6ef893713a2dd4383435a0be1480400768.png'
        }
      }
    },
    {
      id: '10',
      name: '皮卡丘',
      picture: {
        data: {
          url: 'http://ruby.komica.org/pix/img1685.png'
        }
      }
    },
    {
      id: '11',
      name: '大木博士',
      picture: {
        data: {
          url: 'http://cdn2.ettoday.net/images/1982/1982186.jpg'
        }
      }
    },
    {
      id: '12',
      name: '小田卷博士',
      picture: {
        data: {
          url: 'http://i.zeze.com/attachment/forum/201508/29/124047asytsnn91zb7191i.jpg'
        }
      }
    },
    {
      id: '13',
      name: '空木博士',
      picture: {
        data: {
          url: 'https://avatars.plurk.com/8999226-big2.jpg'
        }
      }
    },
    {
      id: '14',
      name: '武藏',
      picture: {
        data: {
          url: 'http://images.warchina.com/src/201609/1b71329922.jpg'
        }
      }
    },
    {
      id: '15',
      name: '小次郎',
      picture: {
        data: {
          url: 'https://i.ytimg.com/vi/TtpIZttTxoo/maxresdefault.jpg'
        }
      }
    },
    {
      id: '16',
      name: '喵喵',
      picture: {
        data: {
          url: 'http://www.qq1234.org/uploads/allimg/150410/10200325X-0.jpg'
        }
      }
    },
    {
      id: '17',
      name: '小茂',
      picture: {
        data: {
          url: 'http://photo.renwen.com/4/211/421102_1355909011508676_s.jpg'
        }
      }
    },
    {
      id: '18',
      name: '花子',
      picture: {
        data: {
          url: 'http://pic.baike.soso.com/p/20140605/20140605105801-64916018.jpg'
        }
      }
    },
    {
      id: '19',
      name: '喬伊小姐',
      picture: {
        data: {
          url: 'http://a4.att.hudong.com/10/82/01300001009299131276825110655.jpg'
        }
      }
    },
    {
      id: '20',
      name: '喬伊小姐',
      picture: {
        data: {
          url: 'http://a4.att.hudong.com/10/82/01300001009299131276825110655.jpg'
        }
      }
    },
    {
      id: '21',
      name: '喬伊小姐',
      picture: {
        data: {
          url: 'http://a4.att.hudong.com/10/82/01300001009299131276825110655.jpg'
        }
      }
    },
    {
      id: '22',
      name: '喬伊小姐',
      picture: {
        data: {
          url: 'http://a4.att.hudong.com/10/82/01300001009299131276825110655.jpg'
        }
      }
    },
    {
      id: '23',
      name: '喬伊小姐',
      picture: {
        data: {
          url: 'http://a4.att.hudong.com/10/82/01300001009299131276825110655.jpg'
        }
      }
    },
    {
      id: '24',
      name: '君莎小姐',
      picture: {
        data: {
          url: 'https://i.ytimg.com/vi/emSY0N2h3ok/hqdefault.jpg'
        }
      }
    },
    {
      id: '25',
      name: '君莎小姐',
      picture: {
        data: {
          url: 'https://i.ytimg.com/vi/emSY0N2h3ok/hqdefault.jpg'
        }
      }
    },
    {
      id: '26',
      name: '君莎小姐',
      picture: {
        data: {
          url: 'https://i.ytimg.com/vi/emSY0N2h3ok/hqdefault.jpg'
        }
      }
    },
    {
      id: '27',
      name: '君莎小姐',
      picture: {
        data: {
          url: 'https://i.ytimg.com/vi/emSY0N2h3ok/hqdefault.jpg'
        }
      }
    },
    {
      id: '28',
      name: '君莎小姐',
      picture: {
        data: {
          url: 'https://i.ytimg.com/vi/emSY0N2h3ok/hqdefault.jpg'
        }
      }
    },
    {
      id: '29',
      name: '傑尼龜',
      picture: {
        data: {
          url: 'https://i.imgur.com/3WImjAd.jpg'
        }
      }
    },
    {
      id: '30',
      name: '小火龍',
      picture: {
        data: {
          url: 'http://www.xiaoji.fm/upload/20140615/fadd4080-f428-11e3-a6f3-00163e017549.jpg'
        }
      }
    },
    {
      id: '31',
      name: '妙娃種子',
      picture: {
        data: {
          url: 'http://mepopedia.com/~css104-2c/hw04/hw04-1035445156/images/20140923041225733.png'
        }
      }
    },
    {
      id: '',
      name: '',
      picture: {
        data: {
          url: ''
        }
      }
    },
    {
      id: '',
      name: '',
      picture: {
        data: {
          url: ''
        }
      }
    },
    {
      id: '',
      name: '',
      picture: {
        data: {
          url: ''
        }
      }
    },
  ]
}


