/* eslint-disable no-restricted-syntax */
import { param2Obj } from '@/utils';
import Mock from 'mockjs';
import user from './user';
import article from './article';

const mocks = [
  ...user,
  ...article,
];
function xhrMockRequest(respond: any) {
  return (options: {url: string; type: 'get' | 'post'; body: any}) => {
    const { url, type, body } = options;
    let result = null;
    if (typeof respond === 'function') {
      result = respond({
        query: param2Obj(url),
        method: type,
        body: JSON.parse(body),
      });
    } else {
      result = respond;
    }

    return result;
  };
}
export function MockXHR(): void {
  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', xhrMockRequest(i.response));
  }
}

export const name = 'aaaa';
