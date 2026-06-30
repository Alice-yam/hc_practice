// ダミーユーザーデータ
export const dummyUsers = [
  {
    id: "1",
    name: "John",
    avatar:
      "https://static.kirara-code.net/images/create_a_cute_icon_illustration_of_a_dog_with_fewe-1760659931137_a6d63b41-5850-45f0-b3fb-474fab9a8b27.png",
    isOnline: true,
  },
  {
    id: "2",
    name: "Sarah",
    avatar:
      "https://static.kirara-code.net/images/create_a_new_cute_icon_illustration_of_a_different-1760659962445_2a57cd7c-f845-4d38-adf4-29e04a8b8c20.png",
    isOnline: true,
  },
  {
    id: "3",
    name: "Mike",
    avatar:
      "https://static.kirara-code.net/images/create_a_new_cute_icon_illustration_of_a_different-1760660011574_1f95b3ea-c257-43a8-9f6f-7d1ac5f31631.png",
    isOnline: false,
  },
  {
    id: "4",
    name: "Emma",
    avatar:
      "https://static.kirara-code.net/images/create_a_new_cute_icon_illustration_of_a_different-1760660017525_a32bdde6-507c-4b11-bdda-029f9009167f.png",
    isOnline: true,
  },
  {
    id: "5",
    name: "David",
    avatar:
      "https://static.kirara-code.net/images/create_a_new_cute_icon_illustration_of_a_different-1760660017525_85443f66-394c-48f8-98cf-b9ec5449714c.png",
    isOnline: false,
  },
  {
    id: "current",
    name: "You",
    avatar:
      "https://static.kirara-code.net/images/create_a_new_cute_icon_illustration_of_a_different-1760660023324_d4d84b8f-69f9-4843-a1ed-496e5daeaff3.png",
    isOnline: true,
  },
];

// 現在のユーザー（自分）
const currentUser = dummyUsers.find((user) => user.id === "current");

// ダミーメッセージデータ
export const dummyMessages = {
  1: [
    {
      id: "1",
      content: "こんにちは！元気ですか？",
      sender: dummyUsers[0],
      timestamp: new Date("2024-01-15T10:30:00"),
      isRead: true,
    },
    {
      id: "2",
      content: "はい、元気です！ありがとうございます。",
      sender: currentUser,
      timestamp: new Date("2024-01-15T10:32:00"),
      isRead: true,
    },
    {
      id: "3",
      content: "今日の会議の件ですが、どうなりましたか？",
      sender: dummyUsers[0],
      timestamp: new Date("2024-01-15T14:15:00"),
      isRead: false,
    },
  ],
  2: [
    {
      id: "4",
      content: "お疲れ様です！",
      sender: dummyUsers[1],
      timestamp: new Date("2024-01-15T09:00:00"),
      isRead: true,
    },
    {
      id: "5",
      content: "お疲れ様です！今日もよろしくお願いします。",
      sender: currentUser,
      timestamp: new Date("2024-01-15T09:01:00"),
      isRead: true,
    },
    {
      id: "6",
      content: "資料の件、確認していただけましたか？",
      sender: dummyUsers[1],
      timestamp: new Date("2024-01-15T11:30:00"),
      isRead: true,
    },
  ],
  3: [
    {
      id: "7",
      content: "プロジェクトの進捗はいかがですか？",
      sender: dummyUsers[2],
      timestamp: new Date("2024-01-14T16:00:00"),
      isRead: true,
    },
    {
      id: "8",
      content: "順調に進んでいます。来週には中間報告ができそうです。",
      sender: currentUser,
      timestamp: new Date("2024-01-14T16:05:00"),
      isRead: true,
    },
  ],
  4: [
    {
      id: "9",
      content: "今度の飲み会、参加しますか？",
      sender: dummyUsers[3],
      timestamp: new Date("2024-01-15T12:00:00"),
      isRead: false,
    },
  ],
  5: [
    {
      id: "10",
      content: "昨日のプレゼン、お疲れ様でした！",
      sender: dummyUsers[4],
      timestamp: new Date("2024-01-15T13:30:00"),
      isRead: false,
    },
    {
      id: "11",
      content: "ありがとうございます！皆さんのおかげです。",
      sender: currentUser,
      timestamp: new Date("2024-01-15T13:32:00"),
      isRead: true,
    },
  ],
};

// ダミーチャットデータ
export const dummyChats = [
  {
    id: "1",
    name: "John",
    type: "user",
    participants: [dummyUsers[0]],
    lastMessage: dummyMessages["1"][dummyMessages["1"].length - 1],
    unreadCount: 1,
  },
  {
    id: "2",
    name: "Sarah",
    type: "user",
    participants: [dummyUsers[1]],
    lastMessage: dummyMessages["2"][dummyMessages["2"].length - 1],
    unreadCount: 0,
  },
  {
    id: "3",
    name: "Mike",
    type: "user",
    participants: [dummyUsers[2]],
    lastMessage: dummyMessages["3"][dummyMessages["3"].length - 1],
    unreadCount: 0,
  },
  {
    id: "4",
    name: "Emma",
    type: "user",
    participants: [dummyUsers[3]],
    lastMessage: dummyMessages["4"][dummyMessages["4"].length - 1],
    unreadCount: 1,
  },
  {
    id: "5",
    name: "David",
    type: "user",
    participants: [dummyUsers[4]],
    lastMessage: dummyMessages["5"][dummyMessages["5"].length - 1],
    unreadCount: 0,
  },
];
