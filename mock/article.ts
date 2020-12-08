import Mock from 'mockjs';
import { ArticleDetail } from '@/models/article.model';

const list: ArticleDetail[] = [];
const count = 100;

for (let i = 0; i < count; i += 1) {
  list.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    author: '@cname',
    reviewer: '@cname',
    title: '@title(5,15)',
    contentShort: '我是测试数据',
  }));
}

export default [{
  url: '/article/list',
  type: 'get',
  response: (config: MockResponseOptions) => {
    const { page, size, title } = config.query;

    let mockList = (title
      && list.filter((item) => item.title && item.title.indexOf(title) > -1))
      || list;

    console.log(page * size, Math.ceil(page) + 1 * size);
    mockList = mockList
      .filter((item: ArticleDetail, index: number) => index > Math.ceil(page) * size
      && index < (Math.ceil(page) + 1) * size);

    return {
      code: 20000,
      data: {
        totoal: list.length,
        list: mockList,
      },
    };
  },
}];
