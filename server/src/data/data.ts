interface chat{
    isGroupChat: Boolean,
    users: user[],
    _id: String,
    chatName: String,
    groupAdmin ?: user
}

interface user{
    name: String,
    email: String
}

export const chats : chat[]  = [
    {
      isGroupChat: false,
      users: [
        {
          name: "John",
          email: "john@example.com",
        },
        {
          name: "Brain",
          email: "brain@example.com",
        },
      ],
      _id: "617a077e18c25468bc7c4dd4",
      chatName: "John",
    },
    {
      isGroupChat: false,
      users: [
        {
          name: "Anon",
          email: "anon@example.com",
        },
        {
          name: "brain",
          email: "brain@example.com",
        },
      ],
      _id: "617a077e18c25468b27c4dd4",
      chatName: "Anon",
    },
    {
      isGroupChat: false,
      users: [
        {
          name: "Anthony",
          email: "anthony@example.com",
        },
        {
          name: "Jacob",
          email: "jacob@example.com",
        },
      ],
      _id: "617a077e18c2d468bc7c4dd4",
      chatName: "Anthony",
    },
    {
      isGroupChat: true,
      users: [
        {
          name: "Kevin",
          email: "Kevin@example.com",
        },
        {
          name: "prath",
          email: "prath@example.com",
        },
        {
          name: "Anon",
          email: "anon@example.com",
        },
      ],
      _id: "617a518c4081150716472c78",
      chatName: "Friends",
      groupAdmin: {
        name: "Kevin Ampere",
        email: "kevin@example.com",
      },
    },
    {
      isGroupChat: false,
      users: [
        {
          name: "John",
          email: "john@example.com",
        },
        {
          name: "Chef",
          email: "chef@example.com",
        },
      ],
      _id: "617a077e18c25468bc7cfdd4",
      chatName: "John Cena",
    },
    {
      isGroupChat: true,
      users: [
        {
          name: "John Cena",
          email: "johncena@example.com",
        },
        {
          name: "mishra",
          email: "mishra@example.com",
        },
        {
          name: "Klass",
          email: "klass@example.com",
        },
      ],
      _id: "617a518c4081150016472c78",
      chatName: "Chill Zone",
      groupAdmin: {
        name: "mishra",
        email: "mishra@example.com",
      },
    },
    {
      isGroupChat: true,
      users: [
        {
          name: "Under taker",
          email: "under@example.com",
        },
        {
          name: "Rey misterio",
          email: "misterior@example.com",
        },
        {
          name: "Brain",
          email: "brain@example.com",
        },
      ],
      _id: "617a518c4081150016472c64",
      chatName: "Money in the Bank",
      groupAdmin: {
        name: "Rey misterio",
        email: "misterio@example.com",
      },
    },
  ];