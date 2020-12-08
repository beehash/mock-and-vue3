import { http } from '@/utils/http';
import { ArticleDetail } from '@/models/article.model';

export class ArticleApi {
  static getArticleList(params: {page: number; size: number; title?: string}): HttpResponseP<ArticleDetail> {
    return http.get('/article/list', params);
  }
}
