export type RoomMessage = {
  _id: string;
  userId: {
    _id: string;
    username: string;
    avatar: string;
  };
  message: string;
  createdAt: Date;
};

export type RoomMember = {
  _id: string;
  userId: string;
  roomId: string;
  online: boolean;
};

export type Room = {
  _id: string;
  name: string;
  creator: string;
};

export type MyErrorResponse = {
  response: {
    data: {
      message: string;
    };
    status: number;
  };
};

export type AuthCredentials = {
  username: string;
  password: string;
};

export type User = {
  _id: string;
  username: string;
  avatar: string;
};
