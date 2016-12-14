
const State = 
{
  friends: {
    0: {
      id: 0,
      name: "張文源",
      photo: "http://graph.facebook.com/1377607056/picture"
    },
    1: {
      id: 1,
      name: "張文愷",
      photo: "http://graph.facebook.com/1435407759/picture"
    },
    2: {
      id: 2,
      name: "黃素幸",
      photo: "http://graph.facebook.com/1467650176/picture"
    },
    3: {
      id: 3,
      name: "張清和",
      photo: "http://graph.facebook.com/100006037532610/picture"
    },
    4: {
      id: 4,
      name: "翁嘉妤",
      photo: "http://graph.facebook.com/1835455147/picture"
    },
    5: {
      id: 5,
      name: "李曜任",
      photo: "http://graph.facebook.com/100002594606035/picture"
    },
    6: {
      id: 6,
      name: "詹博雯",
      photo: "http://graph.facebook.com/100011554290317/picture"
    },
    7: {
      id: 7,
      name: "潘攀",
      photo: "http://graph.facebook.com/100000734157663/picture"
    },
    8: {
      id: 8,
      name: "Yolin Chen",
      photo: "http://graph.facebook.com/100000099558471/picture"
    },
    9: {
      id: 9,
      name: "溫婉涵",
      photo: "http://graph.facebook.com/100002255910731/picture"
    },
    10: {
      id: 10,
      name: "吳佩容",
      photo: "http://graph.facebook.com/100000156428001/picture"
    },
    11: {
      id: 11,
      name: "蔡宇軒",
      photo: "http://graph.facebook.com/1116432746/picture"
    },
    12: {
      id: 12,
      name: "Chichiu Hu",
      photo: "http://graph.facebook.com/100000263424411/picture"
    },
    13: {
      id: 13,
      name: "施佑萱",
      photo: "http://graph.facebook.com/100001462695482/picture"
    },
  },
  friendList: {
    0: {
      id: 0,
      title: "所有朋友",
      members: [1,2,3,4,5,6,7,8,9,10,11,12,13],
      parent: -1,
      children: [2,1,5,4,8]
    },
    1: {
      id: 1,
      title: "資訊種子",
      members: [4,5,6,7,8,9,10,11,12],
      parent: 0,
      children: [3]
    },
    2: {
      id: 2,
      title: "台大資管",
      members: [6],
      parent: 0,
      children: [7, 9]
    },
    3: {
      id: 3,
      title: "11屆",
      members: [4,5,6,8,9,10,11,12],
      parent: 1,
      children: [6]
    },
    4: {
      id: 4,
      title: "好麻吉",
      members: [4,5],
      parent: 0,
      children: []
    },
    5: {
      id: 5,
      title: "家人",
      members: [2,3,1],
      parent: 0,
      children: []
    },
    6: {
      id: 6,
      title: "單身",
      members: [4,5,6,8,10,12],
      parent: 3,
      children: []
    },
    7: {
      id: 7,
      title: "同屆",
      members: [6],
      parent: 2,
      children: []
    },
    8: {
      id: 8,
      title: "長輩",
      members: [],
      parent: 0,
      children: []
    },
    9: {
      id: 9,
      title: "學長姐",
      members: [],
      parent: 2,
      children: []
    },
  }
};

export default State
