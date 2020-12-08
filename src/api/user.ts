import { http } from '@/utils/http';
import { UserInfo } from '@/models/user.model';

export class UserApi {
  static login(data: {username: string}): HttpResponseP<boolean> {
    return http.post('/user/login', data);
  }

  static getUserInfo(params: {token: string}): HttpResponseP<UserInfo> {
    return http.get('/user/info', params);
  }

  static logout() {
    return http.get('/user/logput', null);
  }
}
