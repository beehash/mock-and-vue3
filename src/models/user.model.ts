interface UserInfoDetail {
  roles: string[];
  introduction: string;
  avatar: string;
  name: string;
}
export interface UserInfo {
  [key: string]: UserInfoDetail;
}
