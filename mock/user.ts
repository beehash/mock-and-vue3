const tokens = {
  admin: {
    token: 'admin-token',
  },
  editor: {
    token: 'editor-token',
  },
};
const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor',
  },
};
export default [{
  url: '/user/login',
  type: 'post',
  response: (config: MockResponseOptions) => {
    const { username } = config.query;
    const token = (tokens as Obj)[username];

    if (!token) {
      return {
        code: '39002',
        msg: 'Account and Password are incorrect',
      };
    }

    return {
      code: '20000',
      data: token,
    };
  },
}, {
  url: '/user/info',
  type: 'get',
  response: (config: MockResponseOptions) => {
    const { token } = config.query;
    const userinfo = (users as Obj)[token];
    if (!userinfo) {
      return {
        code: 50008,
        message: 'Login failed, unable to get user details.',
      };
    }

    return {
      code: 20000,
      data: userinfo,
    };
  },
}, {
  url: '/user/logout',
  type: 'post',
  reponse: () => ({
    code: 20000,
    msg: 'success',
  }),
}];
